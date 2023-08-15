import { CSSStyles, ReactElement, ReactForwardedRef } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { forwardRef } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "..";

import "./TooltipText.scss";

interface Props {
    children: string,
    className?: string,
    id?: string,
    style?: CSSStyles,
    tooltip: string | ReactElement
};

const TooltipText = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLSpanElement>) : JSX.Element => {
    const { children, className, id, style, tooltip } = props;

    const classes = buildClassNames({ [className ?? ""]: className }, ["tooltip-text"]);

    return (
        <Tooltip gap = {5}>
            <TooltipTrigger tabIndex = {-1}>
                <span className = {classes} id = {id} style = {style} ref = {ref} tabIndex = {0}>
                    {children}
                </span>
            </TooltipTrigger>
            
            <TooltipContent>
                {tooltip}
            </TooltipContent>
        </Tooltip>
    );
});

export default TooltipText;