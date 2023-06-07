import { useState } from "react";
import "./ToggleSwitch.scss";

interface Props {
    disabled?: boolean,
    onDeactivate?: () => void,
    onActivate: () => void,
    startDeactivated?: boolean
};


const ToggleSwitch = (props: Props) : JSX.Element => {
    const { disabled, onDeactivate, onActivate, startDeactivated } = props;

    const [activated, setActivated] = useState(!disabled && !startDeactivated);

    const onToggle = () => {
        if (!disabled) {
            if (!activated)
                onActivate();
            else if (onDeactivate)
                onDeactivate();
    
            setActivated(currentStatus => !currentStatus);
        }
    };

    const classes = ["toggle-switch"];
    if (activated) classes.push("activated");
    else classes.push("deactivated");
    if (disabled) classes.push("disabled");

    return (
        <div className = {classes.join(" ")}>
            <button className = "toggle-switch-button" onClick = {onToggle}/>
        </div>
    );
};

export default ToggleSwitch;