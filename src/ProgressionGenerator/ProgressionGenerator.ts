import { TGeneratorStrategy } from "../ChordDefinitions/chords";
import { FavourNewChordsProgressionGenerator } from "./FavourNewChordsProgressionGenerator";
import { RandomProgressionGenerator } from "./RandomProgressionGenerator";
import { IChordProgression } from "./templateGenerator";

const randomGenerator = new RandomProgressionGenerator();
const favourNewChordsGenerator = new FavourNewChordsProgressionGenerator();

export function GetProgressionBasedOnStrategy(
    strategy: TGeneratorStrategy,
    permittedChords: Set<string>,
    permittedProgressions: Set<string>) : IChordProgression
{
    switch(strategy)
    {
        case "random":
            return randomGenerator.Generate(permittedChords, permittedProgressions);
        case "favour-unseen-chords":
            return favourNewChordsGenerator.Generate(permittedChords, permittedProgressions);
    }
}