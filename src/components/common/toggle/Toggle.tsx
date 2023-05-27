import { ReactButtonOnClickEvent, ReactButtonOnClick } from "@/types";
import { useState } from "react";
import "./Toggle.scss";

export interface ToggleButtonConfig {
    className?: string,
    onClick: ReactButtonOnClick,
    text: string
};

export enum Side {
    Left = 'left',
    Right = 'right'
};

interface Props {
    buttons: [ToggleButtonConfig, ToggleButtonConfig],
    className?: string,
    defaultActiveSide?: Side
};

const DEFAULT_ACTIVE_SIDE = Side.Left;

const Toggle = (props: Props) : JSX.Element => {
    const { buttons, className, defaultActiveSide = DEFAULT_ACTIVE_SIDE } = props;

    const [activeSide, setActiveSide] = useState(defaultActiveSide);

    const [leftButton, rightButton] = buttons;

    const leftButtonClasses = ["left", "toggle-button"];
    if (activeSide === Side.Left) leftButtonClasses.push("active")
    if (leftButton.className) leftButtonClasses.push(leftButton.className);

    const rightButtonClasses = ["right", "toggle-button"];
    if (activeSide === Side.Right) rightButtonClasses.push("active")
    if (rightButton.className) rightButtonClasses.push(rightButton.className);


    const onClick = (sideOnClick: ReactButtonOnClick, side: Side) => (event: ReactButtonOnClickEvent) => {
        if (side !== activeSide) {
            setActiveSide(side);
            sideOnClick(event);
        }
    };

    const toggleClasses = className ? `toggle ${className}` : "toggle";

    return (
        <div className = {toggleClasses}>
            <button className = {leftButtonClasses.join(" ")} onClick = {onClick(leftButton.onClick, Side.Left)}>
                {leftButton.text}
            </button>
            <button className = {rightButtonClasses.join(" ")} onClick = {onClick(rightButton.onClick, Side.Right)}>
                {rightButton.text}
            </button>
        </div>
    );
};

export default Toggle;