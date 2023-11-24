import React from "react"

export interface IUseFitText
{
    fontSizeEm: string
    ref: React.RefObject<HTMLElement>
}

function BinSearchSize(
    nIterationsLeft: number, 
    lower: number, 
    upper: number, 
    element: HTMLElement,
    maxHeightPx: number, 
    maxWidthPx: number)
{
    if(nIterationsLeft <= 0) return `${((lower + upper) / 2)}em`;

    const pivot = (lower + upper) / 2;
    const fontSize = `${pivot}em`;
    element.style.fontSize = fontSize;

    if(element.scrollWidth > maxWidthPx || element.scrollHeight > maxHeightPx)
    {
        return BinSearchSize(nIterationsLeft - 1, lower, pivot, element, maxHeightPx, maxWidthPx);
    }
    else
    {
        return BinSearchSize(nIterationsLeft - 1, pivot, upper, element, maxHeightPx, maxWidthPx);
    }
}

export function useFitText(minSizeEm: number, maxSizeEm: number, text: string, disable: boolean)
{
    const [fontSizeEm, setFontSizeEm] = React.useState<string>(`${minSizeEm}em`);
    const ref = React.useRef<HTMLElement>(null);

    function CalculateNewSize()
    {
        if(ref.current === null) return;

        const bounds = ref.current.getBoundingClientRect();
            
        const newFontSize = BinSearchSize(10, minSizeEm, maxSizeEm, ref.current, bounds.height, bounds.width);

        setFontSizeEm(newFontSize);
    }

    React.useLayoutEffect(
        () => {
            if(ref.current === null || disable) return;

            CalculateNewSize();

            const resizeHandler = () => {CalculateNewSize()};

            window.addEventListener("resize", resizeHandler);

            return () => window.removeEventListener("resize", resizeHandler);

        }, [ref.current, text, minSizeEm, maxSizeEm, disable]
    );

    return {ref, fontSizeEm};
}