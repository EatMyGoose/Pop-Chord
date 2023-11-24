import { ChordFingering } from "../types";
import { dom7Chords } from "./ukuleleDominant7";
import { majChords } from "./ukuleleMaj";
import { major7Chords } from "./ukuleleMajor7th";
import { minorChords } from "./ukuleleMinor";
import { minor7Chords } from "./ukuleleMinor7th";
import { sus4Chords } from "./ukuleleSuspended4th";


export const chordsFingeringMap = new Map<string, ChordFingering[]>(
    [
        ...majChords,
        ...minorChords,
        ...dom7Chords,
        ...minor7Chords,
        ...major7Chords,
        ...sus4Chords
    ]
);

export type TChordSelection = "all" | "basic" | "custom";

export type TGeneratorStrategy = "random" | "favour-unseen-chords";

export const allChords: string[] = Array.from(chordsFingeringMap.keys());
export const simpleChords: string[] = [
    "A", "B", "C", "C#", "D", "E", "F", "F#", "G",
    "Am", "Bm", "Cm", "C#m", "Dm", "Em", "Fm", "F#m", "Gm", "G#m",
    "B7", "E7", "A7", "D7", "G7"
]