import React from "react"
import "./ChordCard.css"
import { ChordFingering } from "../../types"
import {ChordRenderer} from "../ChordRenderer/ChordRenderer"

export interface IChordCard
{
    displayedName: string
    fingeringList: ChordFingering[]
    displayedFingeringIndex: number
    showChord: boolean
    onFingeringIndexChanged: (newIndex: number) => void
    fretboardRotatable: boolean
    hideDiagram: boolean
}

export function ChordCard(props: IChordCard)
{
    const nFingerings: number =  props.fingeringList.length;
    const [index, setIndex] = React.useState<number>(props.displayedFingeringIndex);

    function TrySetIndex(newIndex: number)
    {
        const validIndex = newIndex >= 0 && newIndex < nFingerings;
        if(!validIndex)
        {
            console.error(`Attempted to set invalid index ${newIndex}`);
            return;
        }

        setIndex(newIndex);
    }

    const leftDisabled: boolean = (index - 1) < 0;
    const rightDisabled: boolean = (index + 1) >= nFingerings;

    return (
        <div className="card debug-border chord-card-size">
            <div>
                <ChordRenderer 
                    displayedName={props.displayedName}
                    fingerings={props.fingeringList[index].fingering}
                    showChord={props.showChord}
                    draggable={props.fretboardRotatable}
                    hideDiagram={props.hideDiagram}
                />
            </div>

            <div className="card-footer bg-dark p-1">
                <div className="columns">
                    <div className="column col-4 sm-x-padding">
                        <button 
                            className="btn btn-action s-circle btn-sm p-centered"
                            onClick={()=> TrySetIndex(index - 1)}
                            disabled={leftDisabled}
                        >
                            <i className="icon icon-arrow-left"/>
                        </button>
                    </div>
                    <div className="column col-4 vertical-align-container sm-x-padding">
                        <div className="centered">
                            <span className="text-center">
                                {`${index + 1}/${nFingerings}`}
                            </span>
                        </div>
                    </div>
                    <div className="column col-4 sm-x-padding">
                        <button 
                            className="btn btn-action s-circle btn-sm p-centered"
                            onClick={()=> TrySetIndex(index + 1)}
                            disabled={rightDisabled}
                        >
                            <i className="icon icon-arrow-right"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}