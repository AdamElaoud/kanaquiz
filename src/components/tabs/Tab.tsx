import { CustomIconType, FontAwesomeIconType, ReactChildren, Size } from "@/types";

export interface TabProps {
    children: ReactChildren,
    className?: string,
    icon?: FontAwesomeIconType | CustomIconType,
    iconSize?: Size,
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