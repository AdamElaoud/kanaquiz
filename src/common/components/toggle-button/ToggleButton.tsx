import { ReactButtonOnClickEvent, ReactButtonOnClick, ToggleButtonConfig, Side, ReactForwardedRef } from "@/common/types";
import { useState, forwardRef, useEffect } from "react";
import "./ToggleButton.scss";

interface Props {
    activeButton?: Side,
    buttons: [ToggleButtonConfig, ToggleButtonConfig],
    className?: string,
    defaultActiveSide?: Side,
    disabled?: boolean
};

const DEFAULT_ACTIVE_SIDE = Side.Left;
const DEFAULT_DISABLED = false;

const ToggleButton = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) : JSX.Element => {
    const { activeButton, buttons, className, defaultActiveSide = DEFAULT_ACTIVE_SIDE || activeButton, disabled = DEFAULT_DISABLED } = props;

    const [activeSide, setActiveSide] = useState(defaultActiveSide);

    useEffect(() => {
        if (activeButton)
            setActiveSide(activeButton);
    }, [activeButton]);

    const [leftButton, rightButton] = buttons;

    const leftButtonClasses = ["left", "toggle-button-item"];
    if (activeSide === Side.Left) leftButtonClasses.push("active")
    if (leftButton.className) leftButtonClasses.push(leftButton.className);

    const rightButtonClasses = ["right", "toggle-button-item"];
    if (activeSide === Side.Right) rightButtonClasses.push("active")
    if (rightButton.className) rightButtonClasses.push(rightButton.className);


    const onClick = (sideOnClick: ReactButtonOnClick, side: Side) => (event: ReactButtonOnClickEvent) => {
        if (!disabled && side !== activeSide) {
            setActiveSide(side);
            sideOnClick(event);
        }
    };

    const toggleButtonClasses = ["toggle-button"];
    if (disabled) toggleButtonClasses.push("disabled");
    if (className) toggleButtonClasses.push(className);

    return (
        <div className = {toggleButtonClasses.join(" ")} ref = {ref}>
            <button className = {leftButtonClasses.join(" ")} onClick = {onClick(leftButton.onClick, Side.Left)}>
                {leftButton.content}
            </button>
            <button className = {rightButtonClasses.join(" ")} onClick = {onClick(rightButton.onClick, Side.Right)}>
                {rightButton.content}
            </button>
        </div>
    );
});

export default ToggleButton;