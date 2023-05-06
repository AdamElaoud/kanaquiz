import { ReactButtonOnClickEvent, ReactButtonOnClick } from "@/types";
import { useState } from "react";
import "./Toggle.scss";

export interface ToggleButtonConfig {
    onClick: ReactButtonOnClick,
    text: string
};

export enum Side {
    Left = 'left',
    Right = 'right'
};

interface Props {
    buttons: [ToggleButtonConfig, ToggleButtonConfig],
    defaultActiveSide?: Side
};

const Toggle = (props: Props) : JSX.Element => {
    const { buttons, defaultActiveSide } = props;

    const [activeSide, setActiveSide] = useState(defaultActiveSide);

    const [leftButton, rightButton] = buttons;

    const leftButtonClasses = activeSide === Side.Left ? 'left toggle-button active' : 'left toggle-button';
    const rightButtonClasses = activeSide === Side.Right ? 'right toggle-button active' : 'right toggle-button';

    const onClick = (sideOnClick: ReactButtonOnClick, side: Side) => (event: ReactButtonOnClickEvent) => {
        setActiveSide(side);
        sideOnClick(event);
    };

    return (
        <div className = "toggle">
            <button className = {leftButtonClasses} onClick = {onClick(leftButton.onClick, Side.Left)}>
                {leftButton.text}
            </button>
            <button className = {rightButtonClasses} onClick = {onClick(rightButton.onClick, Side.Right)}>
                {rightButton.text}
            </button>
        </div>
    );
};

Toggle.defaultProps = {
    defaultActiveSide: Side.Left
};

export default Toggle;