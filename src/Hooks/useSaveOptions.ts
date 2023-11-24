import React from "react";
import { IOutletContext } from "../Context/OutletContext";

export const LOCAL_SESSION_OPTION_KEY = "options";

export function useSaveOptions(options: IOutletContext)
{
    React.useEffect(
        () => {
            localStorage.setItem(LOCAL_SESSION_OPTION_KEY, JSON.stringify(options));
        }, 
        [
            options.chordType, 
            options.permittedChords, 
            options.chordTemplates, 
            options.generatorStrategy, 
            options.fretboardRotatable, 
            options.hideDiagrams
        ]
    );
}