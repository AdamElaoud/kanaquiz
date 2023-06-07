import { useState } from "react";
import "./ToggleSwitch.scss";

interface Props {
    onDisable?: () => void,
    onEnable: () => void,
    startDisabled?: boolean,
};

const ToggleSwitch = (props: Props) : JSX.Element => {
    const { onDisable, onEnable, startDisabled } = props;

    const [enabled, setEnabled] = useState(!startDisabled);

    const onToggle = () => {
        if (!enabled)
            onEnable();
        else if (onDisable)
            onDisable();

        setEnabled(currentStatus => !currentStatus);
    };

    const classes = ["toggle-switch"];
    if (enabled) classes.push("enabled");
    else classes.push("disabled");

    return (
        <div className = {classes.join(" ")}>
            <button className = "toggle-switch-button" onClick = {onToggle}/>
        </div>
    );
};

export default ToggleSwitch;