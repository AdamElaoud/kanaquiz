import { useEffect, useState } from "react";
import { EventSubscription } from "../types";

const useKeyDown = (subscriptions: EventSubscription[], scope?: HTMLElement | null) : KeyboardEvent | null => {
    const [keyPressed, setKeyPressed] = useState<KeyboardEvent | null>(null);

    useEffect(() => {
        const respondToEvent = (event: KeyboardEvent) => {
            subscriptions.forEach(sub => {
                if (sub.eventKeys.has(event.key)) sub.responseFn(event);
            });

            setKeyPressed(event);
        };

        if (scope)
            scope.addEventListener('keydown', respondToEvent);
        else
            window.addEventListener('keydown', respondToEvent);

        return () => {
            if (scope)
                scope.removeEventListener('keydown', respondToEvent);
            else
                window.removeEventListener('keydown', respondToEvent);
        };

    }, [scope, subscriptions]);
    
    return keyPressed;
};

export default useKeyDown;