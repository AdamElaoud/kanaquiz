import { ReactChildren } from "@/types";
import "./Button.scss";

interface Props {
    children?: ReactChildren,
    onClick: () => void
};

const Button = (props: Props) : JSX.Element => {
    const { children, onClick, } = props;

    return (
        <button className = "button" onClick = {onClick}>
            {children}
        </button>
    );
};

export default Button;