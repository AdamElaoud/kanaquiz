import { Icon } from "@/common/components";
import { IconType, PlainFn, ReactForwardedRef, ReactNode, Side, Size } from "@/common/types";
import { forwardRef } from "react";

import "./Button.scss";

interface Props {
    children?: ReactNode,
    className?: string,
    disabled?: boolean,
    iconType?: IconType,
    iconSide?: Side,
    iconSize?: Size,
    id?: string,
    onClick: PlainFn
};

const DEFAULT_ICON_SIDE = Side.Left;
const DEFAULT_DISABLED_SETTING = false;

const Button = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLButtonElement>) : JSX.Element => {
    const { children, className, disabled, iconType, iconSide = DEFAULT_ICON_SIDE, iconSize, id, onClick } = props;

    const classes = className ? `button ${className}` : "button";

    const displayIcon = iconType && <Icon size = {iconSize} type = {iconType} />;

    return (
        <button id = {id} ref = {ref} className = {classes} disabled = {disabled || DEFAULT_DISABLED_SETTING} onClick = {onClick}>
            {iconSide === Side.Left && displayIcon}
            {children}
            {iconSide === Side.Right && displayIcon}
        </button>
    );
});

export default Button;