import { ReactNode } from "@/common/types";

import useTooltip from "./useTooltip";

interface Props {
    children: ReactNode,
    tabIndex?: number
};

const
DEFAULT_TAB_INDEX = 0;

const TooltipTrigger = (props: Props) : JSX.Element => {
    const { children, tabIndex = DEFAULT_TAB_INDEX } = props;

    const { getReferenceProps, onPointerDown, onTouchStart, onTouchEnd, refs } = useTooltip();

    return (
        <span
            tabIndex = {tabIndex}
            ref = {refs.setReference}
            {...getReferenceProps()}
            onPointerDown = {onPointerDown}
            onTouchStart = {onTouchStart}
            onTouchEnd = {onTouchEnd}
        >
            {children}
        </span>
    );
};

export default TooltipTrigger;