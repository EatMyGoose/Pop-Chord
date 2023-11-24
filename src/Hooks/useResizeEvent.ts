import React from "react"

export function useResizeEvent(onResizeCallback: ()=>void)
{
    React.useEffect(
        () => {
            window.addEventListener("resize", onResizeCallback);
            return () => window.removeEventListener("resize", onResizeCallback);
        }
    , [onResizeCallback]);
}