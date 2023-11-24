import React from "react";
import { IChordProgression, emptyChordProgression } from "../../ProgressionGenerator/templateGenerator";
import { NewProgressionPrompt } from "./Components/NewProgressionPrompt";
import { ChordCardList } from "../../Common/ChordCardList/ChordCardList";
import { useOutletContext } from "react-router-dom";
import { GetProgressionBasedOnStrategy } from "../../ProgressionGenerator/ProgressionGenerator";
import { IOutletContext } from "../../Context/OutletContext";
import { TGeneratorStrategy } from "../../ChordDefinitions/chords";

type TErrMsg = string;
type TChordProgressionResult = [(IChordProgression | undefined), (TErrMsg | undefined)];

function TryGenerateNewProgression(
    permittedChords: string[], 
    chordTemplates: string[],
    generatorStrategy: TGeneratorStrategy) : TChordProgressionResult
{
    const permittedChordSet = new Set<string>(permittedChords);
    const permittedProgressionSet = new Set<string>(chordTemplates);

    try
    {
        const newProgression = GetProgressionBasedOnStrategy(
            generatorStrategy, 
            permittedChordSet, 
            permittedProgressionSet
        );

        return [newProgression, undefined];
    }
    catch(e: any)
    {
        return [undefined, e.toString()];
    }
}

export function ChordProgression()
{
    const { permittedChords, 
            chordTemplates, 
            generatorStrategy, 
            fretboardRotatable,
            hideDiagrams } = useOutletContext<IOutletContext>();

    const [chordProgressionResult, setChordProgressionResult] = React.useState<TChordProgressionResult>(
        () => TryGenerateNewProgression(permittedChords, chordTemplates, generatorStrategy)
    );

    const chordProgression: IChordProgression = chordProgressionResult[0] || emptyChordProgression;
    const errMsg: string | undefined = chordProgressionResult[1];

    function GenerateNewProgression()
    {
        const newProgressionResult = TryGenerateNewProgression(permittedChords, chordTemplates, generatorStrategy);
        setChordProgressionResult(newProgressionResult);
    }

    function ClearErrorMessage()
    {
        setChordProgressionResult(([progression, _]) => [progression, undefined]);
    }

    return (
        <>
            <NewProgressionPrompt
                onNewProgressionRequested={GenerateNewProgression}
                description={chordProgression.desc}
                tonic={chordProgression.root}
                errMsg={errMsg}
                clearErrMsg={ClearErrorMessage}
            />    
            <ChordCardList
                chords={chordProgression.chords}
                fretboardRotatable={fretboardRotatable}
                hideDiagram={hideDiagrams}
            />
        </>
    )
}
