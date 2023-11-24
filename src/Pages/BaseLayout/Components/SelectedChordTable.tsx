import { ChordTypes, Notes, TChordType } from "../../../ProgressionGenerator/types";
import { ChordRow } from "./ChordRow";
import { ChordSelectionHeaders } from "./ChordSelectionHeaders";

export interface ISelectedChordTable
{
    selectedChords: string[];
    editable: boolean;
    onSelectionChanged: (newSelection: string[]) => void;
}

export function SelectedChordTable(props: ISelectedChordTable)
{
    const selectedSet: Set<string> = new Set<string>(props.selectedChords);

    //[selected:bool, chordName: string][Note-Index: number][ChordType-Index: number]
    //Ordered as per the "Notes" and "ChordTypes" arrays
    const isChordSelected: [boolean, string][][] = Notes.map( note => {
        return ChordTypes.map(suffix => {
            const fullChordName = note + suffix;
            const isSelected = selectedSet.has(fullChordName);
            return [isSelected, fullChordName];
        });
    })

    function HandleChordToggled(chordNameAndNewValue: [string, boolean][])
    {
        const newSelection = new Set<string>(selectedSet);

        for(const [chordName, newValue] of chordNameAndNewValue)
        {
            if(newValue === true) newSelection.add(chordName);
            else newSelection.delete(chordName);
        }
        
        props.onSelectionChanged(Array.from(newSelection.values()));
    }

    function HandleChordTypeToggled(chordType: TChordType, newValue: boolean)
    {
        HandleChordToggled(Notes.map(note => [note + chordType, newValue]));
    }

    return (
        <table className="table">
            <ChordSelectionHeaders
                isChordSelected={isChordSelected}
                editable={props.editable}
                handleChordTypeToggled={HandleChordTypeToggled}
            />
            
            <tbody>
                {Notes.map((note, idx) => {
                    return (
                        <ChordRow 
                            key={note}
                            tonic={note}
                            selected={isChordSelected[idx]}
                            editable={props.editable}
                            onChordToggled={HandleChordToggled}
                        />
                    );
                })}
            </tbody>
        </table>
    );
}