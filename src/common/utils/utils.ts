import { ReactKeyboardEvent } from "../types";

export const onEnterPress = (responseFn?: (event: ReactKeyboardEvent) => void) => (event: ReactKeyboardEvent) => {
    if (responseFn && event.key === "Enter")
        responseFn(event);
};