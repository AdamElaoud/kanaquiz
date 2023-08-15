import { FontAwesomeIconType, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";

import { Icon, Tooltip, TooltipContent, TooltipTrigger } from "..";

import "./HelpTooltip.scss";

interface Props {
    disabled?: boolean,
    tooltip: string
};

const DEFAULT_DISABLED_SETTING = false;

const HelpTooltip = (props: Props) : JSX.Element => {
    const { disabled = DEFAULT_DISABLED_SETTING, tooltip } = props;

    const helpTooltipClasses = buildClassNames({ disabled }, ["help-tooltip"]);

    return (
        <>
            <Tooltip>
                <TooltipTrigger tabIndex = {-1}>
                    <Icon tabIndex = {0} className = {helpTooltipClasses} type = {FontAwesomeIconType.Question} size = {Size.Mini}/>
                </TooltipTrigger>
                <TooltipContent>
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </>
    );
};

export default HelpTooltip;