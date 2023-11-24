import { ChordTypes, TChordType } from "../../../ProgressionGenerator/types";
import { TristateCheckbox } from "./TristateCheckbox";

export interface IChordSelectionHeaders
{
    //[selected:bool, chordName: string][Note-Index: number][ChordType-Index: number]
    isChordSelected: [boolean, string][][];
    editable: boolean,
    handleChordTypeToggled: (type: TChordType, newState: boolean) => void
}

const chordTypeAliasMap = new Map<TChordType, string>(
    [["", "maj"]]
);

export function ChordSelectionHeaders(props: IChordSelectionHeaders)
{
    return (
        <thead>
            <tr>
                <th key={-1}>Tonic</th>
                {ChordTypes.map((type, idx) => {
                    const displayedName = chordTypeAliasMap.get(type) || type;
                    const firstRowSelection = props.isChordSelected[0][idx][0]
                    const indeterminate: boolean = !props.isChordSelected.every((row) => {
                        return row[idx][0] === firstRowSelection;
                    });

                    const checked: boolean = indeterminate? false: firstRowSelection;

                    return (
                        <th 
                            key={idx}
                        >
                            <p className="my-1">{displayedName}</p>
                            <TristateCheckbox 
                                indeterminate={indeterminate}
                                caption={""}
                                onChange={(newState) => props.handleChordTypeToggled(type, newState)}
                                disabled={!props.editable}
                                checked={checked}
                            />
                        </th>
                    );
                })}
            </tr>
        </thead>
    )
}