import { CustomIconType, FontAwesomeIconType, Size } from "@/types";
import Icon from "../icon/Icon";
import "./TabHeader.scss";

interface Props {
    icon?: FontAwesomeIconType | CustomIconType,
    iconSize?: Size,
    changeTab: (newTabIndex: number) => () => void,
    tabIndex: number,
    title?: string
};

const TabHeader = (props: Props) => {
    const { icon, iconSize, changeTab, tabIndex, title } = props;

    return (
        <div className = 'tabheader' onClick = {changeTab(tabIndex)}>
            {icon && <Icon size = {iconSize} type = {icon} />}
            {title && title}
        </div>
    );
};

export default TabHeader;