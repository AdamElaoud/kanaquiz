import { Position, ReactElement, ReactRef } from "@/common/types";
import {
    UseFloatingReturn,
    arrow,
    autoUpdate,
    flip,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole
} from "@floating-ui/react";
import { useRef, useState, createContext } from "react";

type TooltipContextType = {
    arrowRef: ReactRef<SVGSVGElement>,
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>,
    getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>,
    getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>,
    open: boolean,
    setOpen: (open: boolean) => void,
} & UseFloatingReturn;

export const TooltipContext = createContext<TooltipContextType>({} as TooltipContextType);

interface Props {
    children: ReactElement[],
    defaultOpen?: boolean,
    disabled?: boolean,
    gap?: number,
    hideDelay?: number,
    holdDelay?: number,
    isOpen?: boolean,
    onOpenChange?: (open: boolean) => void,
    openOnClick?: boolean,
    position?: Position,
    showDelay?: number,
    toggleOnClick?: boolean
};

const DEFAULT_HIDE_DELAY = 100;
const DEFAULT_GAP = 14;
const DEFAULT_OPEN = false;
const DEFAULT_OPEN_ON_CLICK = false;
const DEFAULT_POSITION = Position.TopCenter;
const DEFAULT_SHOW_DELAY = 100;
const DEFAULT_TOGGLE_ON_CLICK = true;

const Tooltip = (props: Props) : JSX.Element => {
    const {
        children,
        defaultOpen = DEFAULT_OPEN,
        disabled,
        gap = DEFAULT_GAP,
        hideDelay = DEFAULT_HIDE_DELAY,
        holdDelay,
        isOpen: controlledOpen,
        onOpenChange: setControlledOpen,
        openOnClick = DEFAULT_OPEN_ON_CLICK,
        position = DEFAULT_POSITION,
        showDelay = DEFAULT_SHOW_DELAY,
        toggleOnClick = DEFAULT_TOGGLE_ON_CLICK
    } = props;

    const arrowRef = useRef<SVGSVGElement>(null);
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);

    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = setControlledOpen ?? setUncontrolledOpen;

    const floatingData = useFloating({
        middleware: [offset(gap), flip(), shift(), arrow({ element: arrowRef })],
        onOpenChange: (state) => setOpen(state),
        open,
        placement: position,
        whileElementsMounted: autoUpdate,
    });

    const { context } = floatingData;

    const baselineEnabled = !controlledOpen && !disabled;

    // show delay must be set to 0 or undefined to allow for hold delays to take effect
    // this seems to be a bug in floating UI (floating-ui.react.esm.js : onMouseEnter)
    const  parsedShowDelay = holdDelay ? 0 : showDelay;

    const hover = useHover(context, {
        delay: { open: parsedShowDelay, close: hideDelay },
        // disable hovering if opening on click
        enabled: baselineEnabled && !openOnClick,
        // if a hold delay is provided, allow hover events for mobile devices as well
        mouseOnly: !holdDelay,
        move: false,
        restMs: holdDelay
    });
    const focus = useFocus(context, { enabled: baselineEnabled });
    const click = useClick(context, {
        // click is used to provide open on click for PC and baseline
        // functionality for mobile devices. If a hold delay is provided,
        // mobile devices will get their events from hover events
        enabled: baselineEnabled && !holdDelay,
        // because this is always left enabled to provide basline mobile
        // functionality, ignore the mouse unless explicitly enabling openOnClick
        ignoreMouse: !openOnClick,
        toggle: toggleOnClick
    });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "tooltip" });

    const interactions = useInteractions([hover, focus, click, dismiss, role]);

    const value: TooltipContextType = {
        arrowRef,
        open,
        setOpen,
        ...interactions,
        ...floatingData
    };

    return (
        <TooltipContext.Provider value = {value}>
            {children}
        </TooltipContext.Provider>
    );
};

export default Tooltip;