import { Children, useMemo, useState } from "react";
import { ReactElement } from "@/types";
import TabHeader from "./TabHeader";

interface Props {
    startingTab?: number,
    onTabChange?: (prevTabIndex: number, prevTabTitle: string, newTabIndex: number, newTabTitle: string) => void,
    children: ReactElement[],
    className?: string
};

const DEFAULT_STARTING_TAB = 0;

const TabSet = (props: Props) : JSX.Element => {
    const { children, className, onTabChange, startingTab } = props;

    const [activeTabIndex, setActiveTabIndex] = useState(startingTab || DEFAULT_STARTING_TAB);

    const tabHeaderData = useMemo(() => {
        return Children.map(children, (tab: ReactElement, tabIndex) => {
            const { icon, iconSize, title } = tab.props;

            return {
                ...(icon && { icon }),
                ...(iconSize && { iconSize }),
                tabIndex,
                ...(title && { title }),
            };
        });

    }, [children]);

    const onTabHeaderClick = (newTabIndex: number) => () => {
        if (onTabChange)
            onTabChange(activeTabIndex, tabHeaderData[activeTabIndex].title, newTabIndex, tabHeaderData[newTabIndex].title);

        setActiveTabIndex(newTabIndex);
    };

    return (
        <div className = {className}>
            {tabHeaderData.map(data => <TabHeader changeTab = {onTabHeaderClick} {...data}/>)}
            {children[activeTabIndex]}
        </div>
    );
};

export default TabSet;