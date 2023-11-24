import React from "react"
import ZFont from "zfont"
import ZDog from "zdog"
import { useZdog } from 'react-zdog'
import fontUrl from "../../assets/ToThePointRegular-n9y4.ttf"

ZFont.init(ZDog)

//TODO -> Submit PR for ZFont
Object.defineProperty(
    ZDog.Text.prototype,
    "font",
    {
        get: function() {
            return this._font;
        },
        set: function(newFont) {
            this._font = newFont;
            this.font.waitForLoad().then(() => {
                this.updateText();
                this.visible = true;
                // Find root Zdog.Illustration instance
                let root = this.addTo;
                while ( root !== undefined &&  //text object may already have been removed from the scene while the promise resolves
                        root.addTo !== undefined) {
                    root = root.addTo;
                }
                // Update render graph
                if (root && typeof root.updateRenderGraph === 'function') {
                    root.updateRenderGraph();
                }
        });
        }
    }
)

const font = new ZDog.Font({
    src:fontUrl
});

/** 
 * @typedef {object} props
 * @param {string} props.text
 * @param {number} props.fontSize
 * @param {number} props.x
 * @param {number} props.y
 * @param {number} props.z
 */
export function ZDogText(props)
{
    const { scene } = useZdog();

    let txt = React.useMemo(() => {
        return new ZDog.Text({ 
            font: font,
            value:props.text,
            fontSize: props.fontSize,
            color:"ivory",
            textAlign:"center",
            textBaseline: "middle",
            stroke:0.2,
            fill:true,
            translate: {
                x: props.x,
                y: props.y,
                z: props.z,
            }
        }); 
    }, [props.text, props.fontSize, props.x, props.y, props.z]);  

    React.useEffect(() => {
        scene.addChild(txt);
        return () => scene.removeChild(txt);
    }, [txt]);

    return <></>;
}