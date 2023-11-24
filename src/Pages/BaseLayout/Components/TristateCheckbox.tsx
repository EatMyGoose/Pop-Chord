import React from "react"

export interface ITristateCheckbox
{
    indeterminate: boolean
    caption: string
    checked: boolean
    onChange: (newValue: boolean) => void
    disabled: boolean
}

export function TristateCheckbox(props: ITristateCheckbox)
{
    const cbRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if(cbRef.current)
        {
            cbRef.current.indeterminate = props.indeterminate;
        }
    }, [cbRef.current, props.indeterminate]);

    return (
        <label className="form-checkbox">
            <input 
                type="checkbox"
                disabled={props.disabled}
                ref={cbRef}
                onChange={() => props.onChange(!props.checked)}
                checked={props.checked}
            />
            <i className="form-icon"></i>
            {props.caption}
        </label>
    )
}