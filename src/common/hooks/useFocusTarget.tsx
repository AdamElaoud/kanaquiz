import { useState, useEffect } from "react";

const useFocusTarget = () : HTMLElement | null => {
    const [nextFocusTarget, setNextFocusTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const updateNextFocusTarget = (event: FocusEvent) => setNextFocusTarget(event.target as HTMLElement);

        window.addEventListener('focusin', updateNextFocusTarget);

        return () => window.removeEventListener('focusin', updateNextFocusTarget);
    }, []);
    
    return nextFocusTarget;
}

export default useFocusTarget;