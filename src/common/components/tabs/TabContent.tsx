import useWindowSize from "@/common/hooks/useWindowSize";
import { CSSStyles } from "@/common/types";
import { SCREEN_FILL_WIDTH } from "@/utils/constants";

import useTabSet from "./useTabset";

import "./TabContent.scss";

const TabContent = () : JSX.Element => {
    const { activeTabIndex, tabs } = useTabSet();
    const [windowWidth] = useWindowSize();

    const activeTab = tabs[activeTabIndex];
    const { className, content } = activeTab;

    const tabClasses = className ? `tab ${className}`: "tab";

    const style: CSSStyles = {
        flexWrap: windowWidth <= SCREEN_FILL_WIDTH * 1.75 ? "nowrap" : "wrap"
    };

    return (
        <main className = "tab-content">
            <div className = {tabClasses} style = {style}>
                {content()}
            </div>
        </main>
    );
};

export default TabContent;