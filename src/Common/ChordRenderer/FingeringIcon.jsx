import { Hemisphere, Anchor, Ellipse} from "react-zdog";
import { ZDogText } from "./ZDogText";

/** 
 * @typedef {object} props
 * @param {number} props.x
 * @param {number} props.y
 * @param {string} props.fingering
 */
export function FingeringIcon(props)
{
    const diameter = 5;
    const circleDepth = 1;
    return (
        <Anchor>
            <Ellipse 
                diameter={diameter -  circleDepth} 
                fill={true}
                stroke={circleDepth} 
                color="black"
                translate={{
                    x:props.x,
                    y:props.y,
                    z:circleDepth
                }}
            />
            <ZDogText 
                text={props.fingering}
                fontSize={7}
                x={0 + props.x}
                y={-2 + props.y}
                z={circleDepth + 1}
            />
        </Anchor>
    )
}