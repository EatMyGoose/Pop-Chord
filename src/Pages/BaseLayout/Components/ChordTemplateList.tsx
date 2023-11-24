import { allChordTemplateNames } from "../../../ProgressionGenerator/chordTemplates";

export interface IChordTemplateList
{
    selection: string[],
    onSelectionChanged: (newSelection:string[]) => void
    allChordTemplates: string[]
}

export function ChordTemplateList(props: IChordTemplateList)
{
    const selectedSet = new Set<string>(props.selection);

    function OnChangedSelection(name: string, newValue:boolean)
    {
        const newSelectedSet = new Set<string>(selectedSet);
        if(newValue === true) newSelectedSet.add(name);
        else newSelectedSet.delete(name);

        const newSelection: string[] =  props.allChordTemplates.filter(name => newSelectedSet.has(name));

        props.onSelectionChanged(newSelection);
    }

    function SetAll(newValue: boolean)
    {
        const newSelection = newValue === true? allChordTemplateNames : [];
        props.onSelectionChanged(newSelection);
    }

    function ItemRenderer(props:{name: string, selected:boolean})
    {
        const onClickHandler = () => OnChangedSelection(props.name, !props.selected);
        return (
            <div className="form-group px-1">
                <label className="form-checkbox">
                    <input type="checkbox" checked={props.selected} onChange={onClickHandler}/>
                    <i className="form-icon"/>
                    {props.name}
                </label>
            </div>
        )
    }

    return (
        <>
            <div className="columns">
                <div className="column">
                    <button 
                        className="btn btn-primary btn-block"
                        onClick={()=>SetAll(true)}
                    >
                        Select All
                    </button>
                </div>
                <div className="column">
                    <button 
                        className="btn btn-primary btn-block"
                        onClick={()=>SetAll(false)}
                    >
                        Clear All
                    </button>
                </div>
            </div>
            <div>
                {props.allChordTemplates.map((name, idx) => {
                    const isSelected = selectedSet.has(name);
                    return <ItemRenderer
                        key={idx}
                        name={name}
                        selected={isSelected}
                    />;
                })}
            </div>
        </>
    )
}
