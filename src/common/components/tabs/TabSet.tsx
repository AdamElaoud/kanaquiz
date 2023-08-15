import { BasicID, CSSStyles, PlainFn, ReactForwardedRef, ReactNode, TabConfig, TabState } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { createContext, forwardRef, useState } from "react";

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
    id?: string,
    onTabChange?: (tabState: TabState) => void,
    startingTabID?: BasicID,
    style?: CSSStyles,
    tabs: TabConfig[]
};

const DEFAULT_STARTING_TAB_INDEX = 0;

const TabSet = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) => {
    const { children, className, id, onTabChange, startingTabID, style, tabs } = props;

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

    const classes = buildClassNames({ [className ?? ""]: className }, ["tabset"]);

    return (
        <TabSetContext.Provider value = {value}>
            <div className = {classes} id = {id} style = {style} ref = {ref}>
                {children}
            </div>
        </TabSetContext.Provider>
    );
});

export default TabSet;