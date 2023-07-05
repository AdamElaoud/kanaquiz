import { HTMLEvent, WindowEvent } from "@/common/types";
import { useEffect } from "react";

const useEvent = (event: HTMLEvent | WindowEvent, responseFn: (event: Event) => void, scope: Window | HTMLElement = document.body) => {
    useEffect(() => {
        scope.addEventListener(event, responseFn);

        return () => scope.removeEventListener(event, responseFn);
    }, [event, responseFn, scope]);
}

export default useEvent;