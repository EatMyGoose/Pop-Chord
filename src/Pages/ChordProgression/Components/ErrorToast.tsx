interface IErrorToast
{
    msg? :string
    onClose: () => void
    styles?: React.CSSProperties
    className?: string
}

export function ErrorToast(props: IErrorToast)
{
    if(props.msg === undefined) return (<></>)

    return (
        <div style={props.styles} className={`toast toast-error ${props.className || ""}`}>
            <button 
                className="btn btn-clear float-right"
                onClick={props.onClose}
            />
            {props.msg}
        </div>
    );
}