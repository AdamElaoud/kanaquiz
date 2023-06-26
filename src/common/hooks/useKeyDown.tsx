import { useEffect, useState } from "react";
import { EventSubscription } from "../types";

const useKeyDown = (subscriptions: EventSubscription[]) : KeyboardEvent | null => {
    const [keyPressed, setKeyPressed] = useState<KeyboardEvent | null>(null);

    useEffect(() => {
        const respondToEvent = (event: KeyboardEvent) => {
            subscriptions.forEach(sub => {
                if (sub.eventKeys.has(event.key)) sub.responseFn(event);
            });

            setKeyPressed(event);
        };

        window.addEventListener('keydown', respondToEvent);

        return () => window.removeEventListener('keydown', respondToEvent);
    }, [subscriptions]);
    
    return keyPressed;
};

export default useKeyDown;