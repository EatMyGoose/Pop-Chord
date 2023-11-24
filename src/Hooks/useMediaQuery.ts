
import React from "react"

const queryCache = new Map<string, MediaQueryList>();

export function useMediaQuery(query: string) : boolean
{
    const mediaQuery = queryCache.get(query) || window.matchMedia(query); 
    queryCache.set(query, mediaQuery);

    const [matches, setIsMatch] = React.useState<boolean>(mediaQuery.matches);

    React.useEffect(
        () => {
            const listener =  (e: MediaQueryListEvent) => {setIsMatch(e.matches)}
            mediaQuery.addEventListener("change", listener);
            return () => mediaQuery.removeEventListener("change", listener);
        }, [mediaQuery]
    );

    return matches;
}