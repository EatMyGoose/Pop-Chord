export interface IToggleButton
{
    checked: boolean,
    onChange: (newValue: boolean) => void,
    label: string,
    tooltip: string
}

export function ToggleButton(props: IToggleButton)
{
    return(
        <div className="form-group">
            <label 
                className="form-switch tooltip tooltip-bottom"
                data-tooltip={props.tooltip}
            >
                <input 
                    type="checkbox"
                    checked={props.checked}
                    onChange={() => props.onChange(!props.checked)}
                />
                <i className="form-icon"/> 
                {props.label}
            </label>
        </div>
    )
}