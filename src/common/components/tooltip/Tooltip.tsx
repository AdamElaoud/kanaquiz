import { CSSStyles, Position, ReactElement } from "@/common/types";
import { Tooltip as ReactTooltip, removeStyle, ITooltip } from "react-tooltip";

import "./Tooltip.scss";

interface Props {
    anchorSelector: string,
    children: string | ReactElement,
    className?: string,
    delayHide?: number,
    delayShow?: number,
    disabled?: boolean,
    followMouse?: boolean,
    gap?: number,
    hideArrow?: boolean,
    interactable?: boolean,
    isOpen?: boolean,
    openOnClick?: boolean,
    position?: Position,
    renderFn?: (tooltipState: { content: string | null, activeAnchor: HTMLElement | null }) => string | ReactElement,
    style?: CSSStyles
};

// open on: 
// PC - click, hover
// mobile - click, click and hold

// defaults:
// PC - hover
// mobile - click


const DEFAULT_POSITION = Position.TopCenter;
const DEFAULT_DELAY_SHOW = 100;
const DEFAULT_DELAY_HIDE = 100;
const DEFAULT_GAP = 12;

const Tooltip = (props: Props) : JSX.Element => {
    const {
        anchorSelector,
        children,
        className,
        delayHide = DEFAULT_DELAY_HIDE,
        delayShow = DEFAULT_DELAY_SHOW,
        disabled,
        followMouse,
        gap = DEFAULT_GAP,
        hideArrow,
        interactable,
        isOpen,
        openOnClick,
        position = DEFAULT_POSITION,
        renderFn,
        style
    } = props;

    const tooltipClasses = ['tooltip'];
    if (className) tooltipClasses.push(className);

    const tooltipProps: ITooltip = {
        anchorSelect: anchorSelector,
        className: tooltipClasses.join(" "),
        classNameArrow: "tooltip-arrow",
        clickable: interactable,
        closeOnEsc: openOnClick,
        delayHide,
        delayShow,
        float: followMouse,
        hidden: disabled,
        isOpen,
        noArrow: hideArrow,
        offset: gap,
        openOnClick, // totally broken - weird stuff with openOnClick (position lost???)
        place: position,
        render: renderFn,
        style
    };

    return (
        <ReactTooltip {...tooltipProps} >
            {children}
        </ReactTooltip>
    );
};

removeStyle();

export default Tooltip;


/**
 * Requirements:
 * 
 * - position
 * - showDelay
 * - hideDelay
 * - delay (for both)
 * - showAnimation
 * - hideAnimation
 * - animation (for both)
 * - show via:
 *     - hover
 *     - click (mouse, pointer, touch)
 *     - press and hold (set delay - useLongPress?)
 * - interactable
 * - hideArrow
 * - isOpen
 * - gap / offset
 * - className
 * - style
 * - disabled
 * - closeOnEsc
 * - anchor (HTMLElement | ReactRef<HTMLElement> ?)
 * - children (content)
 * 
 */