import { CustomIconType, FontAwesomeIconType, IconType, Size } from "@/common/types";
import { Icon } from "..";
import "./Step.scss";

interface Props {
    active?: boolean,
    className?: string,
    complete?: boolean,
    iconType?: IconType,
    showCheckOnComplete?: boolean,
    title: number | string,
};

const DEFAULT_ICON_TYPE = CustomIconType.Blank;

const Step = (props: Props) : JSX.Element => {
    const { active, className, complete, iconType = DEFAULT_ICON_TYPE, showCheckOnComplete, title } = props;

    const classes = ["step"];
    if (active) classes.push("active");
    if (className) classes.push(className);
    if (complete) classes.push("complete");

    const evaluatedIconType = showCheckOnComplete && complete ? FontAwesomeIconType.Check : iconType;

    return (
        <div className = {classes.join(" ")}>
            <Icon type = {evaluatedIconType} size = {Size.Medium} />
            <span className = "title">
                {title}
            </span>
        </div>
    );
};

export default Step;