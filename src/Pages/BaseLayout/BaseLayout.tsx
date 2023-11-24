import React from "react"

import "./BaseLayout.css"
import { AppFooter } from "./Components/AppFooter";
import { AppHeader } from "./Components/AppHeader";
import { Outlet} from "react-router-dom";
import { AppSideBar } from "./Components/AppSideBar";
import { TChordSelection, TGeneratorStrategy } from "../../ChordDefinitions/chords";
import { useSaveOptions } from "../../Hooks/useSaveOptions";
import { IOutletContext, TryLoadFromLocalStorage, defaultOutletContext } from "../../Context/OutletContext";
import { useObjectCache } from "../../Hooks/useObjectCache";

const settings = TryLoadFromLocalStorage() || defaultOutletContext;

export function BaseLayout()
{
    const [showSideBar, setShowSideBar] = React.useState<boolean>(false);
    
    const [chordSelection, setChordSelection] = React.useState<TChordSelection>(settings.chordType);
    const [permittedChords, setPermittedChords] = React.useState<string[]>(settings.permittedChords);
    const [chordTemplates, setChordTemplates] = React.useState<string[]>(settings.chordTemplates);
    const [generatorStrategy, setGeneratorStrategy] = React.useState<TGeneratorStrategy>(settings.generatorStrategy);
    const [fretboardDraggable, setFretboardDraggable] = React.useState<boolean>(settings.fretboardRotatable);
    const [hideDiagrams, setHideDiagrams] = React.useState<boolean>(settings.hideDiagrams);

    function onChordSelectionChanged(selection: TChordSelection, permittedChords: string[])
    {
      setChordSelection(selection);
      setPermittedChords(permittedChords);
    }

    const context: IOutletContext = useObjectCache<IOutletContext>({
      chordType: chordSelection,
      permittedChords: permittedChords,
      chordTemplates: chordTemplates,
      generatorStrategy: generatorStrategy,
      fretboardRotatable: fretboardDraggable,
      hideDiagrams: hideDiagrams
    });

    useSaveOptions(context);

    return (
        <>
          <AppSideBar 
            show={showSideBar}
            onCloseClicked={() => setShowSideBar(false)}
            onChordSelectionChanged={onChordSelectionChanged}
            permittedChords={permittedChords}
            chordType={chordSelection}

            chordTemplateSelection={chordTemplates}
            onChangeChordTemplateSelection={setChordTemplates}

            generatorStrategy={generatorStrategy}
            onGeneratorStrategyChanged={setGeneratorStrategy}

            fretboardDraggable={fretboardDraggable}
            onChangeFretboardDraggable={setFretboardDraggable}

            hideDiagrams={hideDiagrams}
            onChangeHideDiagrams={setHideDiagrams}
          />
          <div className="content-vertical-fill">
            <AppHeader
              onMenuClicked={()=>setShowSideBar(true)}
            />
    
            <div className="content-body container bg-gray">
              <div className="content centered debug-border base-layout-card-padding">
                <Outlet context={context}/>
              </div>
            </div>
    
            <AppFooter/>
          </div>
        </>
    );
}