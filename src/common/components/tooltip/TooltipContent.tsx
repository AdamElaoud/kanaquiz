import { CSSStyles, ReactNode } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { FloatingArrow } from "@floating-ui/react";

import useTooltip from "./useTooltip";

import "./TooltipContent.scss";

interface Props {
    children: ReactNode,
    className?: string,
    hideArrow?: boolean,
    id?: string,
    style?: CSSStyles
};

const TooltipContent = (props: Props) : JSX.Element | null => {
    const { children, className, hideArrow, id, style } = props;

    const { arrowRef, context, floatingStyles, getFloatingProps, open, refs } = useTooltip();

    const tooltipStyles = { ...style, ...floatingStyles };

    const tooltipClasses = buildClassNames({ className }, ["tooltip"]);

    // TODO: add animation styling here
    if (!open) return null;

    return (
        <div className = {tooltipClasses} id = {id} ref = {refs.setFloating} style = {tooltipStyles} {...getFloatingProps()}>
            {children}
            {!hideArrow && <FloatingArrow className = "tooltip-arrow" context = {context} ref = {arrowRef}/>}
        </div>
    );
};

export default TooltipContent;