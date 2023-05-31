import { ReactSetState } from "@/types";
import { useState, useCallback } from "react";

const useLocalStorage = <T,>(key: string, initialValue: T): [T, ReactSetState<T>] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;

        } catch (error) {
            console.log(error);
            
            localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    });

    const setValue = useCallback((valueOrFn: React.SetStateAction<T>) => {
        try {
            const valueToStore = valueOrFn instanceof Function ? valueOrFn(storedValue) : valueOrFn;
            
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));

        } catch (error) {
            console.log(error);
        }
    }, [key, setStoredValue, storedValue]);

    return [storedValue, setValue];
}

export default useLocalStorage;