import { CSSStyles, PlainFn, ReactForwardedRef } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { forwardRef, useState } from "react";

import "./ToggleSwitch.scss";

interface Props {
    className?: string,
    disabled?: boolean,
    id?: string,
    onDeactivate?: PlainFn,
    onActivate: PlainFn,
    startDeactivated?: boolean,
    style?: CSSStyles
};


const ToggleSwitch = forwardRef((props: Props, ref: ReactForwardedRef<HTMLButtonElement>) : JSX.Element => {
    const { className, disabled, id, onDeactivate, onActivate, startDeactivated, style } = props;

    const [activated, setActivated] = useState<boolean>(!disabled && !startDeactivated);

    const onToggle = () => {
        if (!disabled) {
            if (!activated)
                onActivate();
            else
                onDeactivate?.();
    
            setActivated(currentStatus => !currentStatus);
        }
    };

    const classes = buildClassNames({
        activated,
        className,
        deactivated: !activated,
        disabled
    }, ["toggle-switch"]);

    return (
        <div className = {classes} id = {id} style = {style}>
            <button ref = {ref} className = "toggle-switch-button" onClick = {onToggle}>
                <span className = "visually-hidden">toggle button</span>
            </button>
        </div>
    );
});

export default ToggleSwitch;