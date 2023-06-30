import { useState, useEffect } from "react";
import { MouseClickState } from "../types";

const useMouseClick = (onMouseClick?: (mouseClickState: MouseClickState) => void, scope: HTMLElement = document.body) : MouseEvent | null => {
    const [mouseClick, setMouseClick] = useState<MouseEvent | null>(null);

    useEffect(() => {
        const updateNextFocusTarget = (event: MouseEvent) => {
            const previousClickTarget = mouseClick ? mouseClick.target as HTMLElement : null;
            const nextClickTarget = event.target as HTMLElement;

            if (onMouseClick)
                onMouseClick({ event, previousClickTarget, nextClickTarget });

            setMouseClick(event);
        };

        scope.addEventListener('click', updateNextFocusTarget);

        return () => scope.removeEventListener('click', updateNextFocusTarget);
        
    }, [mouseClick, onMouseClick, scope]);
    
    return mouseClick;
}

export default useMouseClick;