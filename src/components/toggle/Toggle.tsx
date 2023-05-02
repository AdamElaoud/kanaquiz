import { ReactButtonOnClickEvent, ReactButtonOnClick } from "@/types";
import { useState } from "react";

export interface ButtonConfig {
    onClick: ReactButtonOnClick,
    text: string
};

export enum Side {
    Left = 'left',
    Right = 'right'
};

interface Props {
    buttons: [ButtonConfig, ButtonConfig],
    defaultActiveSide?: Side
};

const Toggle = (props: Props) : JSX.Element => {
    const { buttons, defaultActiveSide } = props;

    const [activeSide, setActiveSide] = useState(defaultActiveSide);

    const [leftButton, rightButton] = buttons;

    const leftButtonClasses = activeSide === Side.Left ? 'left active' : 'left';
    const rightButtonClasses = activeSide === Side.Right ? 'right active' : 'right';

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