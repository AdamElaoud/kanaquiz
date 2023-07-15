import { Icon } from "@/common/components";
import { IconType, PlainFn, ReactElementFn, Size } from "@/common/types";
import { onEnterPress } from "@/common/utils/utils";

import "./TabHeader.scss";

interface Props {
    changeTab: PlainFn,
    iconSize?: Size,
    iconType?: IconType,
    isActiveTab: boolean,
    title?: string | ReactElementFn
};

const TabHeader = (props: Props) : JSX.Element => {
    const { iconType, iconSize, isActiveTab, changeTab, title } = props;

    let classes = "tab-header";
    if (isActiveTab) classes += " active"

    return (
        // tabIndex is required for a div to be focusable
        <div className = {classes} onClick = {changeTab} tabIndex = {0} onKeyDown = {onEnterPress(changeTab)}>
            {iconType && <Icon size = {iconSize} type = {iconType} />}
            {title && typeof title === "function" ? title() : title}
        </div>
    );
};

export default TabHeader;