import { ReactElement } from "@/common/types";

import { Tooltip, TooltipContent, TooltipTrigger } from "..";

import "./TooltipText.scss";

interface Props {
    children: string,
    tooltip: string | ReactElement
};

const TooltipText = (props: Props) : JSX.Element => {
    const { children, tooltip } = props;

    return (
        <Tooltip gap = {5}>
            <TooltipTrigger tabIndex = {-1}>
                <span className = "tooltip-text" tabIndex = {0}>
                    {children}
                </span>
            </TooltipTrigger>
            
            <TooltipContent>
                {tooltip}
            </TooltipContent>
        </Tooltip>
    );
};

export default TooltipText;