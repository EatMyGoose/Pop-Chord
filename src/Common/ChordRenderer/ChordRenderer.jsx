import React from "react"
import { Illustration, useInvalidate} from "react-zdog";
import { linspace, linspace_interval } from "../../util";
import "./ChordRenderer.css"
import { ZDogText } from "./ZDogText";
import ZDog from "zdog"
import { FingeringIcon } from "./FingeringIcon";
import { ZDogFret } from "./ZDogFret";
import { ZDogString } from "./ZDogString";
import { useResizeEvent } from "../../Hooks/useResizeEvent";
import { useFitText } from "../../Hooks/useFitText";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
import { FingeringOverlay } from "./FingeringOverlay";

/**
 * @param {HTMLElement} canvasElem 
 * @param {(newZoomFactor:number)=>void} setZoomFactor 
 * @returns 
 */
function SetNewZoomFactor(canvasElem, setZoomFactor)
{
    if(canvasElem === null) return;
    
    const norminalWidthEm = parseFloat(getComputedStyle(canvasElem).getPropertyValue("--chord-canvas-base-width"));
    const norminalZoomFactor = 8.0;

    const fontWidthPix = parseFloat(getComputedStyle(canvasElem)["font-size"]);
    const emWidth = canvasElem.offsetWidth / fontWidthPix;
    const newZoomFactor = (emWidth / norminalWidthEm) * norminalZoomFactor;
    setZoomFactor(newZoomFactor);
}

/** 
 * @typedef {object} props
 * @param {string} props.displayedName
 * @param {boolean} props.showChord
 * @param {[number,number,number][]} props.fingerings //[string, fret, finger][]
 * @param {boolean} props.draggable
 * @param {boolean} props.hideDiagram
 */
export function ChordRenderer(props)
{
    const isMobileViewport = useMediaQuery("(max-width: 480px)")

    const maxFontSizeEm = isMobileViewport? 3 : 8;
    const {ref, fontSizeEm} = useFitText(0.1, maxFontSizeEm, props.displayedName, !props.hideDiagram);

    const [_, setInvalidate] = React.useState(0);
    const canvasRef = React.useRef(null);
    const [zoomFactor, setZoomFactor] = React.useState(8);

    //Re-render component during the mousedrag event
    const invalidate = React.useCallback(() => {setInvalidate(i => i +1 )}, []);

    //Change ZDog illustration scale when the window resizes
    const resizeCallback = React.useCallback(
        () => SetNewZoomFactor(canvasRef.current, setZoomFactor)
    , [canvasRef.current]);
    
    useResizeEvent(resizeCallback);

    React.useEffect(() => {
        SetNewZoomFactor(canvasRef.current, setZoomFactor);
    }, [canvasRef.current]);

    //(World coordinates) Width & height of the fretboard
    const width = 15;
    const height = 30;
    
    const fretPositions = linspace(-height/2, height/2, 4);
    const fretSpacing = linspace_interval(-height/2, height/2, 4);

    const stringPositions = linspace(-width/2, width/2, 2);

    const fingeringOverlay = (
        <FingeringOverlay 
            fingerings={props.fingerings}
            stringPositions={stringPositions}
            fretPositions={fretPositions}
            fretSpacing={fretSpacing}
        />
    );

    const chordNameHeader = (
        <div>
            <h1 className="text-center chord-canvas-header hide-md">
                {props.displayedName}
            </h1>
            <h3 className="text-center chord-canvas-header hide-xs show-md">
                {props.displayedName}
            </h3>
            <h5 className="text-center chord-canvas-header show-xs">
                {props.displayedName}
            </h5>
        </div>
    );
    
    const additionalClassList = props.hideDiagram? "hidden": ""; 
    const largeChordLabelVisibility = props.hideDiagram? "visible" : "hidden";

    return (
        <>
            {props.hideDiagram? undefined:  chordNameHeader}
            <div 
                className="chord-canvas p-centered chord-renderer-stack"
                ref={canvasRef}
            >
                <div className="chord-renderer-stack-element" style={{width:"100%", height:"100%"}}>
                    <div 
                        className="chord-renderer-vcenter-text" 
                        ref={ref}    
                        style={{fontSize:fontSizeEm, visibility: largeChordLabelVisibility}}
                    >
                        <p className="text-center my-1">{props.displayedName}</p>
                    </div>
                </div>
                <Illustration 
                    //The *entire* component needs to be remounted for changes to dragRotate to take effect
                    key={props.draggable}  

                    className={"debug-border chord-renderer-bg chord-renderer-stack-element chord-renderer-visibility " + additionalClassList}
                    zoom={zoomFactor} 
                    translate={{y:2.5}}
                    //element="canvas" //Janky -> Canvas repositions and rerenders multiple times before arriving at the correct image
                    dragRotate={props.draggable}
                    frameloop="demand" 
                    pointerEvents={true}
                    onDragMove={invalidate}
                >
                    {fretPositions.map((y, idx) => <ZDogFret key={idx} isNut={idx === 0} width={width} y={y}/>)}
                    {stringPositions.map((x, idx) => <ZDogString key={idx} height={height} x={x}/>)}
                
                    {fingeringOverlay}
                
                </Illustration>
            </div>
        </>
    )
}