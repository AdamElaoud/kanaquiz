import { IconType, Size } from "@/types";
import Icon from "../icon/Icon";
import "./TabHeader.scss";

interface Props {
    icon?: IconType,
    iconSize?: Size,
    isActiveTab: boolean,
    changeTab: (newTabIndex: number) => () => void,
    tabIndex: number,
    title?: string
};

const TabHeader = (props: Props) : JSX.Element => {
    const { icon, iconSize, isActiveTab, changeTab, tabIndex, title } = props;

    let classes = "tab-header";
    if (isActiveTab) classes += " active"

    return (
        <div className = {classes} onClick = {changeTab(tabIndex)}>
            {icon && <Icon size = {iconSize} type = {icon} />}
            {title && title}
        </div>
    );
};

export default TabHeader;