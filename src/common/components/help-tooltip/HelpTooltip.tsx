import { CSSStyles, FontAwesomeIconType, ReactForwardedRef, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { forwardRef } from "react";

import { Icon, Tooltip, TooltipContent, TooltipTrigger } from "..";

import "./HelpTooltip.scss";

interface Props {
    className?: string,
    disabled?: boolean,
    id?: string,
    style?: CSSStyles,
    tooltip: string
};

const DEFAULT_DISABLED_SETTING = false;

const HelpTooltip = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) : JSX.Element => {
    const { className, disabled = DEFAULT_DISABLED_SETTING, id, style, tooltip } = props;

    const helpTooltipClasses = buildClassNames({ className, disabled }, ["help-tooltip"]);

    return (
        <>
            <Tooltip>
                <TooltipTrigger tabIndex = {-1}>
                    <Icon
                        tabIndex = {0}
                        className = {helpTooltipClasses}
                        id = {id}
                        type = {FontAwesomeIconType.Question}
                        size = {Size.Mini}
                        style = {style}
                        ref = {ref}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </>
    );
});

export default HelpTooltip;