import { FontAwesomeIconType, Size } from "@/common/types";

import { Icon, Tooltip } from "..";

import "./HelpTooltip.scss";

interface Props {
    disabled?: boolean,
    id: string,
    tooltip: string
};

const DEFAULT_DISABLED_SETTING = false;

const HelpTooltip = (props: Props) : JSX.Element => {
    const { disabled = DEFAULT_DISABLED_SETTING, id, tooltip } = props;

    const helpTooltipClasses = ["help-tooltip"];
    if (disabled) helpTooltipClasses.push("disabled");

    return (
        <>
            <Icon id = {id} className = {helpTooltipClasses.join(" ")} type = {FontAwesomeIconType.Question} size = {Size.Mini}/>
            <Tooltip anchorSelector = {`#${id}`}>
                {tooltip}
            </Tooltip>
        </>
    );
};

export default HelpTooltip;