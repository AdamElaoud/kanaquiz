import { CSSStyles, IconType, ReactNode, Size } from "@/common/types";
import "./Tab.scss";
import useWindowSize from "@/common/hooks/useWindowSize";
import { SCREEN_FILL_WIDTH } from "@/utils/constants";

export interface TabProps {
    children: ReactNode,
    className?: string,
    icon?: IconType,
    iconSize?: Size,
    // NOTE: tabIDs should be unique and NOT generated from array index
    tabID: number,
    title?: string,
};

const Tab = (props: TabProps) : JSX.Element => {
    const { className, children } = props;

    const [windowWidth] = useWindowSize();

    const classes = className ? `tab ${className}`: "tab";

    const style: CSSStyles = {
        flexWrap: windowWidth <= SCREEN_FILL_WIDTH * 1.75 ? "nowrap" : "wrap"
    };
    
    return (
        <div className = {classes} style = {style}>
            {children}
        </div>
    );
};

export default Tab;