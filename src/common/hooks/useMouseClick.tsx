import { useState, useEffect } from "react";
import { MouseClickState } from "../types";

const useMouseClick = (onMouseClick?: (mouseClickState: MouseClickState) => void, scope?: HTMLElement | null) : MouseEvent | null => {
    const [mouseClick, setMouseClick] = useState<MouseEvent | null>(null);

    useEffect(() => {
        const updateNextFocusTarget = (event: MouseEvent) => {
            const previousClickTarget = mouseClick ? mouseClick.target as HTMLElement : null;
            const nextClickTarget = event.target as HTMLElement;

            if (onMouseClick)
                onMouseClick({ event, previousClickTarget, nextClickTarget });

            setMouseClick(event);
        };

        if (scope)
            scope.addEventListener('click', updateNextFocusTarget);
        else
            window.addEventListener('click', updateNextFocusTarget);

        return () => {
            if (scope)
                scope.removeEventListener('click', updateNextFocusTarget);
            else
                window.removeEventListener('click', updateNextFocusTarget);
        };
        
    }, [mouseClick, onMouseClick, scope]);
    
    return mouseClick;
}

export default useMouseClick;