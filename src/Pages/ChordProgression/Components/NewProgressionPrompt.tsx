import "./NewProgressionPrompt.css"
import { ErrorToast } from "./ErrorToast";

interface INewProgressionPrompt
{
    description: string,
    tonic: string,

    onNewProgressionRequested: () => void;
    errMsg: undefined | string,
    clearErrMsg: () => void;
}

export function NewProgressionPrompt(props: INewProgressionPrompt)
{
    return (
        <div className="debug-border card">
            <div className="card-body new-progression-header">
                <button
                    onClick={props.onNewProgressionRequested}
                    className="btn btn-primary btn-lg btn-block"
                    style={{marginBottom:"0.25em"}}
                >
                    New Progression
                </button>

                <h5
                    className="text-center"
                    style={{marginBottom:"0em"}}
                >
                    [Tonic: {props.tonic}] {props.description}
                </h5>

                <ErrorToast 
                    className="p-2 my-2"
                    msg={props.errMsg}
                    onClose={props.clearErrMsg}
                />
            </div>
        </div>
    )
}