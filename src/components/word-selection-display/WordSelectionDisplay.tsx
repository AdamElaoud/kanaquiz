import { Icon } from "@/common/components";
import { FontAwesomeIconType, Size } from "@/common/types";

import "./WordSelectionDisplay.scss";

interface Props {
    isChecked: boolean,
    title: string
};

const WordSelectionDisplay = (props: Props) : JSX.Element => {
    const { isChecked, title } = props;

    const iconType = isChecked ? FontAwesomeIconType.Check : FontAwesomeIconType.X;
    const iconClasses = isChecked ? "check" : "x";

    return (
        <span className = "word-selection">
            <Icon className = {iconClasses} type = {iconType} size = {Size.Mini}/>
            {title}
        </span>
    );
};

export default WordSelectionDisplay;