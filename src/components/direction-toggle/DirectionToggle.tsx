import { FontAwesomeIconType, Side, ItemConfig, Size } from "@/common/types";
import { useState } from "react";
import "./DirectionToggle.scss";
import { Icon } from "@/common/components";

interface Props {
    className?: string,
    content: [ItemConfig, ItemConfig],
    defaultPointDirection?: Side,
    disabled?: boolean,
    onToggle?: (newDirection: Side) => void
};

const DEFAULT_POINT_DIRECTION = Side.Right;
const DEFAULT_DISABLED = false;

const DirectionToggle = (props: Props) : JSX.Element => {
    const {
        className,
        content,
        defaultPointDirection = DEFAULT_POINT_DIRECTION,
        disabled = DEFAULT_DISABLED,
        onToggle
    } = props;

    const [pointDirection, setPointDirection] = useState(defaultPointDirection);

    const [leftItem, rightItem] = content;

    const leftItemClasses = ["direction-toggle-item"];
    if (leftItem.className) leftItemClasses.push(leftItem.className);

    const rightItemClasses = ["direction-toggle-item"];
    if (rightItem.className) rightItemClasses.push(rightItem.className);

    const directionToggleClasses = ["direction-toggle"];
    if (disabled) directionToggleClasses.push("disabled");
    if (className) directionToggleClasses.push(className);

    const onClick = () => {
        const newDirection = pointDirection === Side.Left ? Side.Right : Side.Left;

        if (!disabled)
            setPointDirection(newDirection);
        
        if (onToggle)
            onToggle(newDirection);
    };

    return (
        <div className = {directionToggleClasses.join(" ")}>
            <div className = {leftItemClasses.join(" ")} onClick = {leftItem.onClick}>
                {leftItem.content}
            </div>
            <button className = "direction-toggle-button" onClick = {onClick} disabled = {disabled}>
                <Icon
                    size = {Size.Large}
                    type = {pointDirection === Side.Left ? FontAwesomeIconType.CircleArrowLeft : FontAwesomeIconType.CircleArrowRight}
                />
            </button>
            <div className = {rightItemClasses.join(" ")} onClick = {rightItem.onClick}>
                {rightItem.content}
            </div>
        </div>
    );
};

export default DirectionToggle;