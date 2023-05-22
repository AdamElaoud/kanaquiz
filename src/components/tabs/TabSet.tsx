import { Children, useEffect, useMemo, useState } from "react";
import { ReactElement } from "@/types";
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
    const { children, className, onTabChange, startingTabIndex } = props;

    const [activeTabIndex, setActiveTabIndex] = useState(startingTabIndex || DEFAULT_STARTING_TAB);

    const tabHeaderData = useMemo(() => {
        return Children.map(children, (tab: ReactElement, tabIndex) => {
            const { icon, iconSize, title } = tab.props;

            return {
                ...(icon && { icon }),
                ...(iconSize && { iconSize }),
                // NOTE: icon/title combinations should be unique
                key: `${tabIndex}-${icon}-${title}`,
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
                {tabHeaderData.map(data => <TabHeader changeTab = {onTabHeaderClick} {...data}/>)}
            </nav>
            <div className = "tab-content">
                {children[activeTabIndex]}
            </div>
        </div>
    );
};

export default TabSet;