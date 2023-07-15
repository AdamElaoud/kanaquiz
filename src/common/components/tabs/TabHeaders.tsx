import TabHeader from "./TabHeader";
import useTabSet from "./useTabset";

import "./TabHeaders.scss";

const TabHeaders = () : JSX.Element => {
    const { activeTabIndex, onTabHeaderClick, tabs } = useTabSet();

    return (
        <nav className = "tab-headers">
            {tabs.map((tab, index) =>
                <TabHeader
                    key = {tab.ID}
                    changeTab = {onTabHeaderClick(index)}
                    iconSize = {tab.iconSize}
                    iconType = {tab.iconType}
                    isActiveTab = {activeTabIndex === index}
                    title = {tab.title}
                />
            )}
        </nav>
    );
};

export default TabHeaders;