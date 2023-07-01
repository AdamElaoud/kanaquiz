import { useEffect, useState } from "react";

const useFocusTarget = (scope: HTMLElement = document.body) : HTMLElement | null => {
    const [nextFocusTarget, setNextFocusTarget] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const updateNextFocusTarget = (event: FocusEvent) => setNextFocusTarget(event.target as HTMLElement);

        scope.addEventListener('focusin', updateNextFocusTarget);

        return () => scope.removeEventListener('focusin', updateNextFocusTarget);
    }, [scope]);
    
    return nextFocusTarget;
}

export default useFocusTarget;