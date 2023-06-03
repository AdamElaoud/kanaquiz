import { useState, useEffect } from "react";

const useMouseClick = () : HTMLElement | null => {
    const [mouseClickTarget, setMouseClickTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const updateNextFocusTarget = (event: MouseEvent) => setMouseClickTarget(event.target as HTMLElement);

        window.addEventListener('click', updateNextFocusTarget);

        return () => window.removeEventListener('click', updateNextFocusTarget);
    }, []);
    
    return mouseClickTarget;
}

export default useMouseClick;