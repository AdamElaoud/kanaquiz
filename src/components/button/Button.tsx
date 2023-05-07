import { ReactChildren } from "@/types";
import "./Button.scss";

interface Props {
    children?: ReactChildren,
    className?: string,
    onClick: () => void
};

const Button = (props: Props) : JSX.Element => {
    const { children, className, onClick, } = props;

    const classes = className ? `button ${className}` : "button";

    return (
        <button className = {classes} onClick = {onClick}>
            {children}
        </button>
    );
};

export default Button;