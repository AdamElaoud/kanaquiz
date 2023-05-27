import { IconType, ReactChildren, Size } from "@/types";
import "./Button.scss";
import Icon from "../icon/Icon";

interface Props {
    children?: ReactChildren,
    className?: string,
    icon?: IconType,
    iconSize?: Size,
    onClick: () => void
};

const Button = (props: Props) : JSX.Element => {
    const { children, className, icon, iconSize, onClick } = props;

    const classes = className ? `button ${className}` : "button";

    return (
        <button className = {classes} onClick = {onClick}>
            {icon && <Icon size = {iconSize} type = {icon} />}
            {children}
        </button>
    );
};

export default Button;