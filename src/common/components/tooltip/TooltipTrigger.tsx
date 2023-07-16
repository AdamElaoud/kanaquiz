import { ReactNode } from "@/common/types";

import useTooltip from "./useTooltip";

interface Props {
    children: ReactNode,
    tabIndex?: number
};

const DEFAULT_TAB_INDEX = 0;

const TooltipTrigger = (props: Props) : JSX.Element => {
    const { children, tabIndex = DEFAULT_TAB_INDEX } = props;

    const { refs, getReferenceProps } = useTooltip();

    // TODO: add press and hold logic here for mobile

    return (
        <div tabIndex = {tabIndex} ref = {refs.setReference} {...getReferenceProps()}>
            {children}
        </div>
    );
};

export default TooltipTrigger;