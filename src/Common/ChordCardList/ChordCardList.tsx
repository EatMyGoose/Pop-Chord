import "./ChordCardList.css"

import { ChordCard } from "../ChordCard/ChordCard"
import { chordsFingeringMap } from "../../ChordDefinitions/chords"

interface IChordListCard
{
    chords: string[]
    fretboardRotatable: boolean
    hideDiagram: boolean
}

export function ChordCardList(props: IChordListCard)
{
    return (
        <div className="chord-card-list" >
            {props.chords.map((chordName, idx) => {
                const chordList = chordsFingeringMap.get(chordName);
                if(chordList === undefined)
                {
                    return <h1>{chordName} not Found</h1>
                }

                return (
                    <div key={idx}>
                        <ChordCard
                            displayedName={chordName}
                            fingeringList={chordList}
                            displayedFingeringIndex={0}
                            showChord={true}
                            onFingeringIndexChanged={(idx) => {console.log(idx)}}
                            fretboardRotatable={props.fretboardRotatable}
                            hideDiagram={props.hideDiagram}
                        />
                    </div>
                );
            })}
        </div>
    )

}