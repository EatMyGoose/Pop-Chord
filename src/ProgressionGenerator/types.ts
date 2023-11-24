export const Notes = [
    "A" , "A#" , "B" , "C" , "C#" , "D" ,
    "D#" , "E" , "F" , "F#" , "G" , "G#"
] as const;

export const ChordTypes = [
    ""/*major triad*/, "m", "m7", "7", "maj7", "sus4" 
] as const;

export type TChordType = typeof ChordTypes[number]
export type TNote = typeof Notes[number];

export interface IChordModifier{
    flattened?: boolean
    suffix?: string
}

//Use the suffix to specify minotr chords
export type TRoot = (
    "I" |
    "II" |
    "III" |
    "IV" |
    "V" |
    "VI" |
    "VII" 
);

export interface IChordDefinition extends IChordModifier{
    root: TRoot
}

export function make_chord(root: TRoot, suffix?: TChordType, flattened?: boolean)
{
    return {
        root,
        suffix,
        flattened
    };
}

export const semitonesFromRoot = new Map<TRoot, number>([
    ["I", 0],
    ["II", 2],
    ["III", 4],
    ["IV", 5],
    ["V", 7],
    ["VI", 9],
    ["VII", 11],
]);

export const notePosition = new Map<TNote, number>([
    ["A", 0],
    ["A#", 1],
    ["B", 2],
    ["C", 3],
    ["C#", 4],
    ["D", 5],
    ["D#", 6],
    ["E", 7],
    ["F", 8],
    ["F#", 9],
    ["G", 10],
    ["G#", 11],
]);
