import { IconType, Size } from "@/common/types";
import Icon from "../icon/Icon";
import "./TabHeader.scss";
import { onEnterPress } from "@/common/utils/utils";

interface Props {
    icon?: IconType,
    iconSize?: Size,
    isActiveTab: boolean,
    changeTab: (newTabIndex: number) => () => void,
    tabID: number,
    title?: string
};

const TabHeader = (props: Props) : JSX.Element => {
    const { icon, iconSize, isActiveTab, changeTab, tabID, title } = props;

    let classes = "tab-header";
    if (isActiveTab) classes += " active"

    return (
        // tabIndex is required for a div to be focusable
        <div className = {classes} onClick = {changeTab(tabID)} tabIndex = {0} onKeyDown = {onEnterPress(changeTab(tabID))}>
            {icon && <Icon size = {iconSize} type = {icon} />}
            {title && title}
        </div>
    );
};

export default TabHeader;