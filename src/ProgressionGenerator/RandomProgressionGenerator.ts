import { IProgressionGenerator } from "./IProgressionGenerator";
import { GetPlayableChordProgression, IChordProgression } from "./templateGenerator";

export class RandomProgressionGenerator implements IProgressionGenerator
{
    Generate(   permittedChords: Set<string>, 
                permittedProgressions: Set<string>) : IChordProgression
    {
        return GetPlayableChordProgression(permittedChords, permittedProgressions);    
    }
}