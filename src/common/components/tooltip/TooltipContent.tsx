import { CSSStyles, ReactNode } from "@/common/types";
import { FloatingArrow } from "@floating-ui/react";

import useTooltip from "./useTooltip";

import "./TooltipContent.scss";

interface Props {
    children: ReactNode,
    className?: string,
    hideArrow?: boolean,
    style?: CSSStyles
};

const TooltipContent = (props: Props) : JSX.Element | null => {
    const { children, className, hideArrow, style } = props;

    const { arrowRef, context, floatingStyles, getFloatingProps, open, refs } = useTooltip();

    const tooltipStyles = { ...style, ...floatingStyles };

    const tooltipClasses = ['tooltip'];
    if (className) tooltipClasses.push(className);

    // TODO: add animation styling here
    if (!open) return null;

    return (
        <div className = {tooltipClasses.join(" ")} ref = {refs.setFloating} style = {tooltipStyles} {...getFloatingProps()}>
            {children}
            {!hideArrow && <FloatingArrow className = "tooltip-arrow" context = {context} ref = {arrowRef}/>}
        </div>
    );
};

export default TooltipContent;