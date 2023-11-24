import { Shape} from "react-zdog";


/** 
 * @typedef {object} props
 * @param {number} props.width
 * @param {number} props.y
 * @param {boolean} props.isNut
 */
export function ZDogFret(props)
{
    const strokeWidth = props.isNut? 1.5 : 0.2;
    return  (
        <Shape 
            stroke={strokeWidth}
            color="black"
            path={[
                {x:-props.width / 2, y:props.y}, 
                {x:props.width / 2, y:props.y}
            ]}
        />
    )
}