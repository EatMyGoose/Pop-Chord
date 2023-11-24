import React from "react"

import "./AllChords.css"

import { ChordCardList } from "../../Common/ChordCardList/ChordCardList";
import { chordsFingeringMap } from "../../ChordDefinitions/chords";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../Context/OutletContext";

const allChords: string[] = Array.from(chordsFingeringMap.keys());

export function AllChords()
{
    const {fretboardRotatable} = useOutletContext<IOutletContext>();

    const [searchTerm, setSearchTerm] = React.useState<string>("");

    const trimmedSearchTerm = searchTerm.trim().toLowerCase(); 

    const filteredChords = ((trimmedSearchTerm === "")?
        allChords:
        allChords.filter(chordName => chordName.toLowerCase().startsWith(trimmedSearchTerm))
    )

    function OnSetSearchTerm(e: React.ChangeEvent<HTMLInputElement>)
    {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <form className="form-horizontal" onSubmit={e => e.preventDefault()}>
                <div className="form-group p-centered" style={{maxWidth:"30em"}}>
                    <div className="col-3 col-sm-12">
                        <label className="form-label label-lg" htmlFor="search-bar">Chord Name:</label>
                    </div>
                    <div className ="col-9 col-sm-12">
                        <input 
                            className="form-input input-lg" 
                            type="text" 
                            id="search-bar" 
                            placeholder="Search for chords"
                            onChange={OnSetSearchTerm}
                            value={searchTerm}
                            autoComplete="off"
                        />
                    </div>
                </div>
            </form>
            <ChordCardList
                  chords={filteredChords}
                  fretboardRotatable={fretboardRotatable}
                  hideDiagram={false}
            />
        </>
    )
}

