import { CustomIconType, IconType, Size } from "@/common/types";
import { Icon } from "..";
import "./Step.scss";

interface Props {
    active: boolean,
    complete: boolean,
    iconType?: IconType
    title: string,
};

const DEFAULT_ICON_TYPE = CustomIconType.Blank;

const Step = (props: Props) : JSX.Element => {
    const { active, complete, iconType = DEFAULT_ICON_TYPE, title } = props;

    const classes = ["step"];
    if (active) classes.push("active");
    if (complete) classes.push("complete");

    return (
        <div className = {classes.join(" ")}>
            <Icon type = {iconType} size = {Size.Large} />
            <span className = "title">
                {title}
            </span>
        </div>
    );
};

export default Step;