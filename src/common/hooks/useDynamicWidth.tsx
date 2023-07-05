import useWindowSize from "@/common/hooks/useWindowSize";
import { CSSStyles } from "@/common/types";

const useDynamicWidth = (partialFillSize: number, partialFillPercent: number, fillSize: number, fillPercent: number) : CSSStyles => {
    const [windowWidth] = useWindowSize();
    
    const rangeMax = partialFillSize;
    const rangeMin = fillSize;

    if (windowWidth >= rangeMax) return { width: `${partialFillPercent}%` };
    if (windowWidth <= rangeMin) return { width: `${fillPercent}%` };

    const range = rangeMax - rangeMin;
    const value = windowWidth - rangeMin;

    const percentageOfRange = (value / range) * (fillPercent - partialFillPercent);

    return { width: `${fillPercent - percentageOfRange}%` };
};

export default useDynamicWidth;