import imageUrl from "../../../assets/Rotoscoped Rat.gif"

export function AppFooter()
{
    return (
        <div className="bg-dark" style={{height:"3em", bottom:0}}>

            <img 
                className="d-inline-block"
                style={{height:"100%"}}
                src={imageUrl}
            />       
            <img 
                className="d-inline-block"
                style={{height:"100%"}}
                src={imageUrl}
            />     

            <img 
                className="d-inline-block float-right"
                style={{height:"100%"}}
                src={imageUrl}
            />       
            <img 
                className="d-inline-block float-right"
                style={{height:"100%"}}
                src={imageUrl}
            />        
        </div>
    );
}