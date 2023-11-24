import { chordTemplates } from "./chordTemplates";
import { IChordDefinition, Notes, TNote, notePosition, semitonesFromRoot } from "./types";
import { PickRandom } from "./util";

const position2Note = new Map<number, TNote>(
    Array.from(notePosition.entries()).map((noteAndPos) => {
        const [note, position] = noteAndPos;
        return [position, note];
    })
)

function GetNote(tonic: TNote, semitonesFromRoot: number) :  TNote
{
    const newPosition: number = 
        (notePosition.get(tonic) as number) + 
        semitonesFromRoot;
    
    return position2Note.get((newPosition % 12)) as TNote;
}

function GetSemitonesFromRoot(chord: IChordDefinition) : number
{
    const flattenedOffset = chord.flattened === true? -1: 0;
    return (
        semitonesFromRoot.get(chord.root) as number +
        flattenedOffset
    ) ;
}

export function GenerateFromTemplate(
    template: IChordDefinition[],
    tonic: TNote) : string[]
{
    const chords = template.map(chord => {
        const semitonesFromRoot: number = GetSemitonesFromRoot(chord) ;
        const note: TNote = GetNote(tonic, semitonesFromRoot);
        const suffix: string = chord.suffix || "";

        return note + suffix;
    });

    return chords;
}

export interface IChordProgression
{
    root: TNote,
    desc: string,
    chords: string[]
}

export const emptyChordProgression: IChordProgression = {
    root: "N/A" as TNote,
    desc: "Failed to generate",
    chords: []
};

function GenerateRandomProgression() : IChordProgression
{
    const root: TNote = PickRandom(Notes.map(i => i));
    const [desc, template] = PickRandom(chordTemplates);

    const chords: string[] = GenerateFromTemplate(template, root);

    return {
        root,
        desc,
        chords
    };
}

export function GetPlayableChordProgression(
    permittedChords: Set<string>,
    permittedProgressions: Set<string>) : IChordProgression
{
    if(permittedChords.size == 0 || permittedProgressions.size == 0)
    {
        let errors: string[] = [];
        if(permittedChords.size == 0) errors.push("No available chords to use");
        if(permittedProgressions.size == 0) errors.push("No available progression templates to use");

        throw new Error(`Unable to create template, details:\n${errors.join("\n")}`);
    }

    for(let i = 0; i < 1000; i++)
    {
        const progression = GenerateRandomProgression();

        const allChordsAvailable = progression.chords.every(chord => permittedChords.has(chord));
        const progressionPermitted = permittedProgressions.has(progression.desc);

        if(allChordsAvailable && progressionPermitted) return progression;
        else
        {
            console.log(progression);
        }
    }

    throw new Error("Unable to generate chord after 1000 attempts");
}