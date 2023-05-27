import { IconType, ReactNode, Size } from "@/types";
import "./Tab.scss";

export interface TabProps {
    children: ReactNode,
    className?: string,
    icon?: IconType,
    iconSize?: Size,
    // NOTE: tabIndices should be unique and NOT generated from array index
    tabIndex: number,
    title?: string,
};

const Tab = (props: TabProps) : JSX.Element => {
    const { className, children } = props;

    const classes = className ? `tab ${className}`: "tab";
    
    return (
        <div className = {classes}>
            {children}
        </div>
    );
};

export default Tab;