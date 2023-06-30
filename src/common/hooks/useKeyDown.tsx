import { useEffect, useState } from "react";
import { EventSubscription } from "../types";

const useKeyDown = (subscriptions: EventSubscription[], scope: HTMLElement = document.body) : KeyboardEvent | null => {
    const [keyPressed, setKeyPressed] = useState<KeyboardEvent | null>(null);

    useEffect(() => {
        const respondToEvent = (event: KeyboardEvent) => {
            subscriptions.forEach(sub => {
                if (sub.eventKeys.has(event.key)) sub.responseFn(event);
            });

            setKeyPressed(event);
        };

        scope.addEventListener('keydown', respondToEvent);

        return () => scope.removeEventListener('keydown', respondToEvent);

    }, [scope, subscriptions]);
    
    return keyPressed;
};

export default useKeyDown;