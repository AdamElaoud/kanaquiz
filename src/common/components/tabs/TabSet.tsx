import { Children, useMemo, useState } from "react";
import { ReactElement } from "@/common/types";
import TabHeader from "./TabHeader";
import "./TabSet.scss";

interface Props {
    startingTabIndex?: number,
    onTabChange?: (tabState: { prevTabIndex?: number, prevTabTitle?: string, newTabIndex?: number, newTabTitle?: string }) => void,
    children: ReactElement[],
    className?: string
};

const DEFAULT_STARTING_TAB = 0;

const TabSet = (props: Props) : JSX.Element => {
    const { children, className, onTabChange, startingTabIndex = DEFAULT_STARTING_TAB } = props;

    const [activeTabIndex, setActiveTabIndex] = useState<number>(startingTabIndex);

    const tabHeaderData = useMemo(() => {
        return Children.map(children, (tab: ReactElement) => {
            const { icon, iconSize, tabIndex, title } = tab.props;

            return {
                ...(icon && { icon }),
                ...(iconSize && { iconSize }),
                // NOTE: tabIndices should be unique and NOT generated from array index
                key: tabIndex,
                tabIndex,
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
                    newTabIndex,
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
            <div className = "tab-content">
                {children[activeTabIndex]}
            </div>
        </div>
    );
};

export default TabSet;