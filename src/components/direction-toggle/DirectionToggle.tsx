import { Icon } from "@/common/components";
import { FontAwesomeIconType, ItemConfig, Side, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { useState } from "react";

import "./DirectionToggle.scss";

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

    const leftItemClasses = buildClassNames({
        [leftItem.className ?? ""]: leftItem.className
    }, ["direction-toggle-item"]);

    const rightItemClasses = buildClassNames({
        [rightItem.className ?? ""]: rightItem.className
    }, ["direction-toggle-item"]);

    const directionToggleClasses = buildClassNames({
        disabled,
        [className ?? ""]: className
    }, ["direction-toggle"]);

    const onClick = () => {
        const newDirection = pointDirection === Side.Left ? Side.Right : Side.Left;

        if (!disabled)
            setPointDirection(newDirection);
        
        if (onToggle)
            onToggle(newDirection);
    };

    return (
        <div className = {directionToggleClasses}>
            <div className = {leftItemClasses} onClick = {leftItem.onClick}>
                {leftItem.content}
            </div>
            <button className = "direction-toggle-button" onClick = {onClick} disabled = {disabled}>
                <Icon
                    size = {Size.Large}
                    type = {pointDirection === Side.Left ? FontAwesomeIconType.CircleArrowLeft : FontAwesomeIconType.CircleArrowRight}
                />
            </button>
            <div className = {rightItemClasses} onClick = {rightItem.onClick}>
                {rightItem.content}
            </div>
        </div>
    );
};

export default DirectionToggle;