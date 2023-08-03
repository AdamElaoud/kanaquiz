import { PlainFn, ReactForwardedRef } from "@/common/types";
import { forwardRef, useState } from "react";

import "./ToggleSwitch.scss";

interface Props {
    disabled?: boolean,
    onDeactivate?: PlainFn,
    onActivate: PlainFn,
    startDeactivated?: boolean
};


const ToggleSwitch = forwardRef((props: Props, ref: ReactForwardedRef<HTMLButtonElement>) : JSX.Element => {
    const { disabled, onDeactivate, onActivate, startDeactivated } = props;

    const [activated, setActivated] = useState(!disabled && !startDeactivated);

    const onToggle = () => {
        if (!disabled) {
            if (!activated)
                onActivate();
            else
                onDeactivate?.();
    
            setActivated(currentStatus => !currentStatus);
        }
    };

    const classes = ["toggle-switch"];
    if (activated) classes.push("activated");
    else classes.push("deactivated");
    if (disabled) classes.push("disabled");

    return (
        <div className = {classes.join(" ")}>
            <button ref = {ref} className = "toggle-switch-button" onClick = {onToggle}>
                <span className = "visually-hidden">toggle button</span>
            </button>
        </div>
    );
});

export default ToggleSwitch;