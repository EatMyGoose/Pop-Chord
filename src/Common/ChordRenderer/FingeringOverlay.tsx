import { FingeringIcon } from "./FingeringIcon";

interface IFingeringOverlay
{
    fingerings: [number, number, number][] //[string, fret, finger][]
    stringPositions: number[],
    fretPositions: number[],
    fretSpacing: number
}

export function FingeringOverlay(props: IFingeringOverlay)
{
    return (
        props.fingerings.map((fretAndFinger, idx) => {
            const [string, fret, finger] = fretAndFinger;

            if(fret == 0) return (<></>); //open string
            
            const xPosition = props.stringPositions.at(string);
            let yPosition = 0;
            let displayedChar = "";
            
            if(fret < 0)
            {
                yPosition = props.fretPositions[0] - props.fretSpacing / 2;
                displayedChar = "X";
            }
            else
            {
                yPosition = props.fretPositions[fret] - props.fretSpacing / 2;
                displayedChar = finger.toString();
            }

            return (
                <FingeringIcon
                    key={idx}
                    fingering={displayedChar}
                    x={xPosition}
                    y={yPosition}
                />
            )
        })
    );
}
