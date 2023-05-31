import { IconType, ReactNode, Side, Size } from "@/common/types";
import "./Button.scss";
import Icon from "../icon/Icon";

interface Props {
    children?: ReactNode,
    className?: string,
    iconType?: IconType,
    iconSide?: Side,
    iconSize?: Size,
    onClick: () => void
};

const DEFAULT_ICON_SIDE = Side.Left;

const Button = (props: Props) : JSX.Element => {
    const { children, className, iconType, iconSide = DEFAULT_ICON_SIDE, iconSize, onClick } = props;

    const classes = className ? `button ${className}` : "button";

    const displayIcon = iconType && <Icon size = {iconSize} type = {iconType} />;

    return (
        <button className = {classes} onClick = {onClick}>
            {iconSide === Side.Left && displayIcon}
            {children}
            {iconSide === Side.Right && displayIcon}
        </button>
    );
};

export default Button;