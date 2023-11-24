import { IChordProgression } from "./templateGenerator";

export interface IProgressionGenerator
{
    Generate(   permittedChords: Set<string>, 
                permittedProgressions: Set<string>) : IChordProgression
}