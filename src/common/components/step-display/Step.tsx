import { BasicID, CustomIconType, FontAwesomeIconType, IconType, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";

import { Icon } from "..";

import "./Step.scss";

interface Props {
    active?: boolean,
    className?: string,
    complete?: boolean,
    iconType?: IconType,
    showCheckOnComplete?: boolean,
    title: BasicID,
};

const DEFAULT_ICON_TYPE = CustomIconType.Blank;

const Step = (props: Props) : JSX.Element => {
    const { active, className, complete, iconType = DEFAULT_ICON_TYPE, showCheckOnComplete, title } = props;

    const classes = buildClassNames({ active, complete, [className ?? ""]: className }, ["step"]);

    const evaluatedIconType = showCheckOnComplete && complete ? FontAwesomeIconType.Check : iconType;

    return (
        <div className = {classes}>
            <Icon type = {evaluatedIconType} size = {Size.Small} />
            <span className = "title">
                {title}
            </span>
        </div>
    );
};

export default Step;