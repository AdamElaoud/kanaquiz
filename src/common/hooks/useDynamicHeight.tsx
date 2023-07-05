import useWindowSize from "@/common/hooks/useWindowSize";
import { CSSStyles } from "@/common/types";

const useDynamicHeight = (partialFillSize: number, partialFillPercent: number, fillSize: number, fillPercent: number) : CSSStyles => {
    const [, windowHeight] = useWindowSize();
    
    const rangeMax = partialFillSize;
    const rangeMin = fillSize;

    if (windowHeight >= rangeMax) return { height: `${partialFillPercent}%` };
    if (windowHeight <= rangeMin) return { height: `${fillPercent}%` };

    const range = rangeMax - rangeMin;
    const value = windowHeight - rangeMin;

    const percentageOfRange = (value / range) * (fillPercent - partialFillPercent);

    return { height: `${fillPercent - percentageOfRange}%` };
};

export default useDynamicHeight;