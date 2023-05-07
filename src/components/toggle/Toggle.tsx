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

const Toggle = (props: Props) : JSX.Element => {
    const { buttons, className, defaultActiveSide } = props;

    const [activeSide, setActiveSide] = useState(defaultActiveSide);

    const [leftButton, rightButton] = buttons;

    const leftButtonClasses = ["left", "toggle-button"];
    if (activeSide === Side.Left) leftButtonClasses.push("active")
    if (leftButton.className) leftButtonClasses.push(leftButton.className);

    const rightButtonClasses = ["right", "toggle-button"];
    if (activeSide === Side.Left) rightButtonClasses.push("active")
    if (leftButton.className) rightButtonClasses.push(leftButton.className);


    const onClick = (sideOnClick: ReactButtonOnClick, side: Side) => (event: ReactButtonOnClickEvent) => {
        setActiveSide(side);
        sideOnClick(event);
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

Toggle.defaultProps = {
    defaultActiveSide: Side.Left
};

export default Toggle;