import { ReactButtonOnClickEvent, ReactButtonOnClick, ToggleButtonConfig, Side, ReactForwardedRef } from "@/common/types";
import { useState, forwardRef } from "react";
import "./ToggleButton.scss";

interface Props {
    buttons: [ToggleButtonConfig, ToggleButtonConfig],
    className?: string,
    defaultActiveSide?: Side,
};

const DEFAULT_ACTIVE_SIDE = Side.Left;

const ToggleButton = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) : JSX.Element => {
    const { buttons, className, defaultActiveSide = DEFAULT_ACTIVE_SIDE } = props;

    const [activeSide, setActiveSide] = useState(defaultActiveSide);

    const [leftButton, rightButton] = buttons;

    const leftButtonClasses = ["left", "toggle-button-item"];
    if (activeSide === Side.Left) leftButtonClasses.push("active")
    if (leftButton.className) leftButtonClasses.push(leftButton.className);

    const rightButtonClasses = ["right", "toggle-button-item"];
    if (activeSide === Side.Right) rightButtonClasses.push("active")
    if (rightButton.className) rightButtonClasses.push(rightButton.className);


    const onClick = (sideOnClick: ReactButtonOnClick, side: Side) => (event: ReactButtonOnClickEvent) => {
        if (side !== activeSide) {
            setActiveSide(side);
            sideOnClick(event);
        }
    };

    const toggleClasses = className ? `toggle-button ${className}` : "toggle-button";

    return (
        <div className = {toggleClasses} ref = {ref}>
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