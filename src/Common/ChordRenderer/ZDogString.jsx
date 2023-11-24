import {Shape} from "react-zdog";

/** 
 * @typedef {object} props
 * @param {number} props.height
 * @param {number} props.x
 */
export function ZDogString(props)
{
    return  (
        <Shape 
            stroke={0.5}
            color="black"
            path={[
                {x:props.x, y:-props.height/2}, 
                {x:props.x, y:props.height/2}
            ]}
        />
    )
}