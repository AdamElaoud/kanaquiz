import { ReactElement, TabState } from "@/common/types";
import { Children, useMemo, useState } from "react";

import TabHeader from "./TabHeader";

import "./TabSet.scss";

interface Props {
    children: ReactElement[],
    className?: string
    onTabChange?: (tabState: TabState) => void,
    startingTabID?: number,
};

const TabSet = (props: Props) : JSX.Element => {
    const { children, className, onTabChange, startingTabID = children[0].props.tabID } = props;

    const [activeTabID, setActiveTabID] = useState<number>(() => {
        const allTabIDs: Set<number> = new Set(Children.map(children, tab => tab.props.tabID));
        if (allTabIDs.has(startingTabID))
            return startingTabID
        else
            return children[0].props.tabID;
    });

    const tabHeaderData = useMemo(() => {
        return Children.map(children, (tab: ReactElement) => {
            const { icon, iconSize, tabID, title } = tab.props;

            return {
                ...(icon && { icon }),
                ...(iconSize && { iconSize }),
                key: tabID,
                tabID,
                ...(title && { title }),
            };
        });

    }, [children]);

    const onTabHeaderClick = (newTabID: number) => () => {
        if (newTabID !== activeTabID) {
            if (onTabChange)
                onTabChange({
                    prevTabID: activeTabID,
                    prevTabTitle: tabHeaderData[activeTabID].title,
                    newTabID: newTabID,
                    newTabTitle: tabHeaderData[newTabID].title
                });
    
            setActiveTabID(newTabID);
        }
    };

    let classes = "tabset";
    if (className) classes += ` ${className}`;

    return (
        <div className = {classes}>
            <nav className = "tab-headers">
                {tabHeaderData.map(data => <TabHeader changeTab = {onTabHeaderClick} isActiveTab = {activeTabID === data.tabID} {...data}/>)}
            </nav>
            <main className = "tab-content">
                {children[activeTabID]}
            </main>
        </div>
    );
};

export default TabSet;