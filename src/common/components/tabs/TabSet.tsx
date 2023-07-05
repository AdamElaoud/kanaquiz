import { TabHeader } from "@/common/components";
import { ReactElement, TabState } from "@/common/types";
import { Children, useMemo, useState } from "react";

import "./TabSet.scss";

interface Props {
    children: ReactElement[],
    className?: string
    onTabChange?: (tabState: TabState) => void,
    startingTabID?: number,
};

const DEFAULT_STARTING_TAB_INDEX = 0;

const TabSet = (props: Props) : JSX.Element => {
    const { children, className, onTabChange, startingTabID = children[0].props.tabID } = props;

    const [activeTabIndex, setActiveTabIndex] = useState<number>(() => {
        const tabIDs = Children.map(children, tab => tab.props.tabID);

        const tabIndex = tabIDs.findIndex(ID => ID === startingTabID);

        return tabIndex === -1 ? DEFAULT_STARTING_TAB_INDEX : tabIndex;
    });

    const tabHeaderData = useMemo(() => {
        return Children.map(children, (tab: ReactElement, index: number) => {
            const { icon, iconSize, tabID, title } = tab.props;

            return {
                ...(icon && { icon }),
                ...(iconSize && { iconSize }),
                key: tabID,
                tabIndex: index,
                ...(title && { title }),
            };
        });

    }, [children]);

    const onTabHeaderClick = (newTabIndex: number) => () => {
        if (newTabIndex !== activeTabIndex) {
            if (onTabChange)
                onTabChange({
                    prevTabIndex: activeTabIndex,
                    prevTabTitle: tabHeaderData[activeTabIndex].title,
                    newTabIndex: newTabIndex,
                    newTabTitle: tabHeaderData[newTabIndex].title
                });
    
            setActiveTabIndex(newTabIndex);
        }
    };

    let classes = "tabset";
    if (className) classes += ` ${className}`;

    return (
        <div className = {classes}>
            <nav className = "tab-headers">
                {tabHeaderData.map(data => <TabHeader changeTab = {onTabHeaderClick} isActiveTab = {activeTabIndex === data.tabIndex} {...data}/>)}
            </nav>
            <main className = "tab-content">
                {children[activeTabIndex]}
            </main>
        </div>
    );
};

export default TabSet;