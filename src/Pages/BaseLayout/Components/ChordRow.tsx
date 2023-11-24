import { TNote } from "../../../ProgressionGenerator/types";
import { TristateCheckbox } from "./TristateCheckbox";

export interface IChordRow
{
    tonic: TNote,
    selected: [boolean, string][],
    onChordToggled: ( chordNameAndNewValue: [string, boolean][]) => void,
    editable: boolean
}


export function ChordRow(props: IChordRow)
{
    const indeterminate: boolean = !props.selected.every(
        ([selected, _]) => selected === props.selected[0][0]
    );
    const rowChecked: boolean = indeterminate? false : props.selected[0][0];

    function SetEntireRow(newValue: boolean)
    {
        props.onChordToggled(props.selected.map(s => [s[1], newValue]));
    }

    return (
        <tr>
            <td key={-1}>
                <TristateCheckbox 
                    indeterminate={indeterminate}
                    caption={props.tonic}
                    checked={rowChecked}
                    disabled={!props.editable}
                    onChange={(newState: boolean) => SetEntireRow(newState)}
                />
            </td>
            {
                props.selected.map(([selected, chordName], idx) => {
                    return (
                        <td key={idx}>
                            <label className="form-checkbox">
                                <input 
                                    type="checkbox" 
                                    checked={selected} 
                                    disabled={!props.editable}
                                    onChange={()=> props.onChordToggled([[chordName, !selected]])}
                                />
                                <i className="form-icon"></i>
                            </label>
                        </td>
                    )
                })
            }
        </tr>
    )
}
