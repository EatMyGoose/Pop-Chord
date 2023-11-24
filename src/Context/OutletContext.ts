import { TChordSelection, TGeneratorStrategy, allChords } from "../ChordDefinitions/chords";
import { LOCAL_SESSION_OPTION_KEY } from "../Hooks/useSaveOptions";
import { allChordTemplateNames } from "../ProgressionGenerator/chordTemplates";
import * as t from "io-ts"
import { isLeft } from "fp-ts/Either";
import { PathReporter } from "io-ts/PathReporter";

export interface IOutletContext
{
  chordType: TChordSelection,
  permittedChords: string[],
  chordTemplates: string[],
  generatorStrategy: TGeneratorStrategy,
  fretboardRotatable: boolean,
  hideDiagrams: boolean
}

export const defaultOutletContext: IOutletContext = 
{
    chordType: "all",
    permittedChords: allChords,
    chordTemplates: allChordTemplateNames,
    generatorStrategy: "random",
    fretboardRotatable: false,
    hideDiagrams: false
} as const;

const outletContextSchema = t.type({
    chordType: t.union([t.literal("all"), t.literal("basic"), t.literal("custom")]),
    permittedChords: t.array(t.string),
    chordTemplates: t.array(t.string),
    generatorStrategy: t.union([t.literal("random"), t.literal("favour-unseen-chords")]),
    fretboardRotatable: t.boolean,
    hideDiagrams: t.boolean
})

export function TryLoadFromLocalStorage() : IOutletContext | undefined
{
    const json = localStorage.getItem(LOCAL_SESSION_OPTION_KEY);
    if(json === null)
    {
        console.log(`[Local Storage] key:<${LOCAL_SESSION_OPTION_KEY}> empty`);
        return undefined;
    }

    const parsed: unknown = JSON.parse(json);
    const decoded = outletContextSchema.decode(parsed);

    if(isLeft(decoded))
    {
        const errMsg = `[Local Storage], validationed failed: <${PathReporter.report(decoded)}>`;
        console.log(errMsg);
        return undefined;
    }

    return decoded.right;
}