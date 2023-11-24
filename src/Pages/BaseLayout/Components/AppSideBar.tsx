import { TChordSelection, TGeneratorStrategy, allChords, simpleChords } from "../../../ChordDefinitions/chords";
import { allChordTemplateNames } from "../../../ProgressionGenerator/chordTemplates";
import "./AppSideBar.css"
import { ChordTemplateList } from "./ChordTemplateList";
import { SelectedChordTable } from "./SelectedChordTable";
import { ToggleButton } from "./ToggleButton";

export interface IAppSideBar
{
    show: boolean
    onCloseClicked: () => void
    onChordSelectionChanged: (selection: TChordSelection, chordList: string[]) => void

    permittedChords: string[]
    chordType: TChordSelection
    generatorStrategy: TGeneratorStrategy

    chordTemplateSelection: string[]
    onChangeChordTemplateSelection: (newSelection: string[]) => void
    onGeneratorStrategyChanged: (newStrategy: TGeneratorStrategy) => void

    fretboardDraggable: boolean;
    onChangeFretboardDraggable: (draggable: boolean) => void;

    hideDiagrams: boolean;
    onChangeHideDiagrams: (hidden: boolean) => void;
}

export function AppSideBar(props: IAppSideBar)
{
    const modifier: string = props.show? "open" : "";
    
    function onSideBarClosed()
    {
        props.onCloseClicked()
    }

    function onChordTypeChanged(e: React.ChangeEvent<HTMLSelectElement>)
    {
        const newValue: TChordSelection = e.target.value as TChordSelection;
        let newChordList: string[] = [];
        switch(newValue)
        {
            case "all":
                newChordList = allChords;
                break;
            case "basic":
                newChordList = simpleChords;
                break;
            case "custom":
                newChordList = props.permittedChords;
                break;
            default:
                console.assert(false, `Unhandled case ${newValue}`);
        }
        props.onChordSelectionChanged(newValue, newChordList);
    }

    function onGenerationStrategyChanged(e: React.ChangeEvent<HTMLSelectElement>)
    {
        const newStrategy: TGeneratorStrategy = e.target.value as TGeneratorStrategy;
        props.onGeneratorStrategyChanged(newStrategy);
    }

    function onCustomChordSelectionChanged(newSelection: string[])
    {
        props.onChordSelectionChanged("custom", newSelection);
    }

    return (
        <>
            <div className={`backdrop ${modifier}`}
                onClick={onSideBarClosed}
            />

            <div 
                className={`card bg-dark sidebar ${modifier}`}
                style={{border:0}}
            >
                <div className="card-body">
                    <div>
                        <h2 className="d-inline-block">Options</h2>
                        <button 
                            className="btn btn-action float-right"
                            onClick={onSideBarClosed}
                        >
                            <i className="icon icon-arrow-left"></i>
                        </button>
                    </div>

                    <ToggleButton 
                        checked={props.hideDiagrams}
                        onChange={props.onChangeHideDiagrams}
                        label="Hide Chord Diagrams"
                        tooltip={"Hides chord diagrams by default\nReveal by hovering over diagram"}
                    />

                    <ToggleButton 
                        checked={props.fretboardDraggable}
                        onChange={props.onChangeFretboardDraggable}
                        label="Enable Rotatable Fretboard"
                        tooltip={"Allows fretboard diagrams to be rotated\nby dragging across them"}
                    />

                    <div className="form-group">
                        <label 
                            className="form-label text-large" 
                            htmlFor="chord-types">
                            Chord Types
                        </label>
                        <select 
                            id={"chord-types"}
                            className="text-dark form-select"
                            value={props.chordType}
                            onChange={onChordTypeChanged}
                        >
                            <option value="all">All</option>
                            <option value="basic">Basic Chords</option>
                            <option value="custom">Custom Selection</option>
                        </select>
                    </div>

                    <details className="accordion">
                        <summary className="accordion-header text-large">
                            <i className="icon icon-arrow-right mr-1"></i>
                            Selected Chords
                        </summary>
                        <div className="accordion-body">
                            <SelectedChordTable 
                                selectedChords={props.permittedChords}
                                editable={props.chordType === "custom"}
                                onSelectionChanged={onCustomChordSelectionChanged}
                            />
                        </div>
                    </details>

                    <div className="form-group">
                        <label 
                            className="form-label text-large" 
                            htmlFor="input-example-1">
                            Chord Generation Strategy
                        </label>
                        <select 
                            id={"generator-strategy"}
                            className="text-dark form-select"
                            value={props.generatorStrategy}
                            onChange={onGenerationStrategyChanged}
                        >
                            <option value="random">Default</option>
                            <option value="favour-unseen-chords">Favour Unseen Chords</option>
                        </select>
                    </div>


                    <details className="accordion">
                        <summary className="accordion-header text-large">
                            <i className="icon icon-arrow-right mr-1"></i>
                            Chord Progression Selection
                        </summary>
                        <div className="accordion-body">
                            <ChordTemplateList
                                selection={props.chordTemplateSelection}
                                onSelectionChanged={props.onChangeChordTemplateSelection}
                                allChordTemplates={allChordTemplateNames}
                            />
                        </div>
                    </details>
                    
                </div>
            </div>
        </>
    )
}