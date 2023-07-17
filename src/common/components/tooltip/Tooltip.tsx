import { PlainFn, Position, ReactElement, ReactRef } from "@/common/types";
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
import { useRef, useState, createContext, PointerEventHandler, PointerEvent } from "react";

type TooltipContextType = {
    arrowRef: ReactRef<SVGSVGElement>,
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>,
    getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>,
    getReferenceProps: (userProps?: React.HTMLProps<Element>) => Record<string, unknown>,
    onPointerDown: PointerEventHandler,
    open: boolean,
    onTouchStart: PlainFn,
    onTouchEnd: PlainFn,
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

    const pointerType = useRef<string | null>(null);
    const isTouching = useRef<boolean>(false);
    const arrowRef = useRef<SVGSVGElement>(null);
    const [uncontrolledOpen, setUncontrolledOpenState] = useState<boolean>(defaultOpen);
    
    const isPressAndHoldEnabled = !!holdDelay;

    const setUncontrolledOpen = (open: boolean) => {
        // if trying to open tooltip from a touch point, but touching has already ended
        // from the user lifting their finger up before the tooltip delay has shown, return
        if (open && isPressAndHoldEnabled && pointerType.current === "touch" && !isTouching.current) 
            return;

        setUncontrolledOpenState(open);
    };

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
    // on touch events (if an event is not a mouse event, delays default to 0 ms)
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

    const { getReferenceProps, ...restOfInteractions } = useInteractions([hover, focus, click, dismiss, role]);

    const { onPointerDown: referenceOnPointerDown } = getReferenceProps();

    const onPointerDown = (event: PointerEvent<Element>) => {
        pointerType.current = event.pointerType;
        (referenceOnPointerDown as (event: PointerEvent) => void)(event);
    };

    const onTouchStart = () => isTouching.current = true;
    const onTouchEnd = () => {
        if (isPressAndHoldEnabled)
            setUncontrolledOpenState(false);

        isTouching.current = false;
    };

    const value: TooltipContextType = {
        arrowRef,
        open,
        setOpen,
        onTouchStart,
        onTouchEnd,
        onPointerDown,
        getReferenceProps,
        ...restOfInteractions,
        ...floatingData
    };

    return (
        <TooltipContext.Provider value = {value}>
            {children}
        </TooltipContext.Provider>
    );
};

export default Tooltip;