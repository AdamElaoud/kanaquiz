import { EventHandling, ReactSetState } from "@/common/types";
import { GLOBAL_KEY, LOCAL_STORAGE_EVENT_NAME } from "@/utils/constants";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_SCOPE = document.body;

const DEFAULT_EVENT_HANDLING: EventHandling = {
    dispatch: false,
    listen: false,
    listenGlobal: false,
    scope: DEFAULT_SCOPE
};

const useLocalStorage = <T,>(key: string, initialValue: T, eventHandling: EventHandling = DEFAULT_EVENT_HANDLING): [T, ReactSetState<T>] => {
    const dispatch = useCallback(() => {
        const scope = eventHandling.scope ?? DEFAULT_SCOPE;

        scope?.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT_NAME, { detail: key }));
    }, [eventHandling.scope, key]);

    const getStoredValue = () => {
        try {
            const item = localStorage.getItem(key);

            if (item) return JSON.parse(item);

            localStorage.setItem(key, JSON.stringify(initialValue));
            if (eventHandling.dispatch) dispatch();
            
            return initialValue;

        } catch (error) {
            console.log(error);
            
            localStorage.setItem(key, JSON.stringify(initialValue));
            if (eventHandling.dispatch) dispatch();

            return initialValue;
        }
    };

    const [storedValue, setStoredValue] = useState<T>(getStoredValue);

    const setValue = useCallback((valueOrFn: React.SetStateAction<T>) => {
        try {
            const valueToStore = valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn;
            
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
            if (eventHandling.dispatch) dispatch();

        } catch (error) {
            console.log(error);
        }
    }, [dispatch, eventHandling.dispatch, key, storedValue]);

    const onStorageChange = (event: Event) => {
        const { detail } = event as CustomEvent;

        const isMatchingKeyEvent = eventHandling.listen && detail === key;
        const isGlobalEvent = eventHandling.listenGlobal && detail === GLOBAL_KEY;

        if (isMatchingKeyEvent || isGlobalEvent) setValue(getStoredValue());
    };

    useEffect(() => {
        const scope = eventHandling.scope ?? DEFAULT_SCOPE;
        const isListening = eventHandling.listen || eventHandling.listenGlobal;

        if (isListening) scope.addEventListener(LOCAL_STORAGE_EVENT_NAME, onStorageChange);

        return () => {
            if (isListening) scope.removeEventListener(LOCAL_STORAGE_EVENT_NAME, onStorageChange);
        };

    // this event listener is desired to be attached only on mount
    // eslint-disable-next-line
    }, []);

    return [storedValue, setValue];
}

export default useLocalStorage;