import { Side, ReactForwardedRef, PlainFn, ToggleButtonConfig } from "@/common/types";
import { useState, forwardRef } from "react";
import "./ToggleButton.scss";

interface Props {
    buttons: [ToggleButtonConfig, ToggleButtonConfig],
    className?: string,
    defaultActiveSide?: Side,
    disabled?: boolean
};

const DEFAULT_ACTIVE_SIDE = Side.Left;
const DEFAULT_DISABLED = false;

const ToggleButton = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) : JSX.Element => {
    const {
        buttons,
        className,
        defaultActiveSide = DEFAULT_ACTIVE_SIDE,
        disabled = DEFAULT_DISABLED
    } = props;

    const [activeSide, setActiveSide] = useState(defaultActiveSide);

    const [leftButton, rightButton] = buttons;

    const leftButtonClasses = ["toggle-button-item"];
    if (activeSide === Side.Left) leftButtonClasses.push("active")
    if (leftButton.className) leftButtonClasses.push(leftButton.className);

    const rightButtonClasses = ["toggle-button-item"];
    if (activeSide === Side.Right) rightButtonClasses.push("active")
    if (rightButton.className) rightButtonClasses.push(rightButton.className);


    const onClick = (sideOnClick: PlainFn, side: Side) => () => {
        if (!disabled && side !== activeSide) {
            setActiveSide(side);
            sideOnClick();
        }
    };

    const toggleButtonClasses = ["toggle-button"];
    if (disabled) toggleButtonClasses.push("disabled");
    if (className) toggleButtonClasses.push(className);

    return (
        <div className = {toggleButtonClasses.join(" ")} ref = {ref}>
            <button className = {leftButtonClasses.join(" ")} disabled = {disabled} onClick = {onClick(leftButton.onClick, Side.Left)}>
                {leftButton.content}
            </button>
            <button className = {rightButtonClasses.join(" ")} disabled = {disabled} onClick = {onClick(rightButton.onClick, Side.Right)}>
                {rightButton.content}
            </button>
        </div>
    );
});

export default ToggleButton;