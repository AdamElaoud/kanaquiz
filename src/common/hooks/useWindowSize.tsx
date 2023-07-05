import { WindowSize } from "@/common/types";
import { useLayoutEffect, useState } from "react";

const useWindowSize = () : WindowSize => {
    const [size, setSize] = useState<WindowSize>([0, 0]);

    useLayoutEffect(() => {
        const updateSize = () => setSize([window.innerWidth, window.innerHeight]);

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
    return size;
}

export default useWindowSize;