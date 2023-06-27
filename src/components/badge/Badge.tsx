import "./Badge.scss";

interface Props {
    value: number
};

const Badge = ({ value }: Props) : JSX.Element => {
    const numDigits = value.toString().length;

    let digitClass = "";
    if (numDigits === 2)
        digitClass = "two-digits";
    else if (numDigits > 2)
        digitClass = "three-or-more-digits";

    return (
        <div className = {`badge ${digitClass}`}>{value}</div>
    );
};

export default Badge;