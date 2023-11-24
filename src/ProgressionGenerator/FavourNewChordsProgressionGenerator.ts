import { IProgressionGenerator } from "./IProgressionGenerator";
import { GetPlayableChordProgression, IChordProgression } from "./templateGenerator";

type TChordName = string;
type TChosenIndex = number;

const CANDIDATES_PER_ROUND = 20;

function GetMeanProgressionScore(
    progression: IChordProgression,
    prevChordFreq: Map<TChordName, number>) : number
{
    let totalDeductions = 0;
    for(const chord of progression.chords)
    {
        totalDeductions -= (prevChordFreq.get(chord) || 0) ** 2;
    }

    const nChords = progression.chords.length;
    return totalDeductions / nChords;
}

//Normalizes all scores to a 0-1 scale
function NormalizeScores(scores: number[])
{
    let min = scores[0];
    let max = scores[1];
    for(const score of scores)
    {
        min = Math.min(score, min);
        max = Math.max(score, max);
    }

    const dist = max - min;
    if(dist == 0) return scores.map(() => 1);

    return scores.map(rawScore => (rawScore - min) / dist);
}

function ChooseWeightedRandom(scores:number[]) : TChosenIndex
{
    let cumSum = 0;
    for(const score of scores) cumSum += score;

    const chosenRand : number = Math.random() * cumSum;

    let prevBoundary = 0;
    for(let i = 0; i < scores.length; i++)
    {
        const nextBoundary = prevBoundary + scores[i];
        if(chosenRand >= prevBoundary && chosenRand <= nextBoundary)
        {
            return i;
        } 
    }

    return scores.length - 1;
}

export class FavourNewChordsProgressionGenerator implements IProgressionGenerator
{
    private chordFreqCount: Map<TChordName, number> = new Map<TChordName, number>();

    private RecordChosenChords(chosenProgression: IChordProgression)
    {
        for(const chord of chosenProgression.chords)
        {
            const newCount = (this.chordFreqCount.get(chord) || 0) + 1;
            this.chordFreqCount.set(chord, newCount);
        }
    }

    Generate(   permittedChords: Set<string>, 
                permittedProgressions: Set<string>) : IChordProgression
    {
        let candidates: IChordProgression[] = [];   
        let lastError: undefined | Error = undefined;     

        for(let i = 0; i < CANDIDATES_PER_ROUND; i++)
        {
            try
            {
                const next = GetPlayableChordProgression(permittedChords, permittedProgressions);
                candidates.push(next);
            }
            catch(e: any)
            {
                lastError = e;
                console.log(`iteration ${i} - ${e.toString()}`)
            }
        }

        if(candidates.length == 0)
        {
            throw lastError;
        }

        const progressionsScores: number[] = candidates.map(
            progression => GetMeanProgressionScore(progression, this.chordFreqCount)
        );

        const chosenProgressionIndex: TChosenIndex = ChooseWeightedRandom(
            NormalizeScores(progressionsScores)
        );

        const chosenProgression = candidates[chosenProgressionIndex];

        this.RecordChosenChords(chosenProgression);

        return chosenProgression;
    }
}