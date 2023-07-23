import { BasicID, PlainFn, ReactNode, TabConfig, TabState } from "@/common/types";
import { createContext, useState } from "react";

import "./TabSet.scss";

type TabSetContextType = {
    activeTabIndex: number,
    onTabHeaderClick: (newTabIndex: number) => PlainFn,
    tabs: TabConfig[]
};

export const TabSetContext = createContext<TabSetContextType>({} as TabSetContextType);

interface Props {
    children: ReactNode,
    className?: string,
    onTabChange?: (tabState: TabState) => void,
    startingTabID?: BasicID,
    tabs: TabConfig[]
};

const DEFAULT_STARTING_TAB_INDEX = 0;

const TabSet = (props: Props) => {
    const { children, className, onTabChange, startingTabID, tabs } = props;

    const [activeTabIndex, setActiveTabIndex] = useState<number>(() => {
        const tabIndex = tabs.findIndex(tab => tab.ID === startingTabID);

        return tabIndex === -1 ? DEFAULT_STARTING_TAB_INDEX : tabIndex;
    });

    const onTabHeaderClick = (newTabIndex: number) => () => {
        if (newTabIndex !== activeTabIndex) {
            onTabChange?.({
                prevTabIndex: activeTabIndex,
                prevTabTitle: tabs[activeTabIndex].title,
                newTabIndex: newTabIndex,
                newTabTitle: tabs[newTabIndex].title
            });
    
            setActiveTabIndex(newTabIndex);
        }
    };

    const value: TabSetContextType = {
        activeTabIndex,
        onTabHeaderClick,
        tabs
    };

    const classes = ["tabset"];
    if (className) classes.push(className);

    return (
        <TabSetContext.Provider value = {value}>
            <div className = {classes.join(" ")}>
                {children}
            </div>
        </TabSetContext.Provider>
    );
};

export default TabSet;