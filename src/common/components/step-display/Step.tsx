import { CustomIconType, FontAwesomeIconType, IconType, Size } from "@/common/types";
import { Icon } from "..";
import "./Step.scss";

interface Props {
    active: boolean,
    complete: boolean,
    iconType?: IconType,
    showCheckOnComplete?: boolean,
    title: string,
};

const DEFAULT_ICON_TYPE = CustomIconType.Blank;
const DEFAULT_SHOW_CHECK_ON_COMPLETE = false;

const Step = (props: Props) : JSX.Element => {
    const { active, complete, iconType = DEFAULT_ICON_TYPE, showCheckOnComplete = DEFAULT_SHOW_CHECK_ON_COMPLETE, title } = props;

    const classes = ["step"];
    if (active) classes.push("active");
    if (complete) classes.push("complete");

    const evaluatedIconType = showCheckOnComplete && complete ? FontAwesomeIconType.Check : iconType;

    return (
        <div className = {classes.join(" ")}>
            <Icon type = {evaluatedIconType} size = {Size.Large} />
            <span className = "title">
                {title}
            </span>
        </div>
    );
};

export default Step;