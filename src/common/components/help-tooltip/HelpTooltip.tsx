import { FontAwesomeIconType, Size } from "@/common/types";

import { Icon } from "..";

import "./HelpTooltip.scss";

interface Props {
    disabled?: boolean,
    tooltip: string
};

const DEFAULT_DISABLED_SETTING = false;

const HelpTooltip = (props: Props) : JSX.Element => {
    const { disabled = DEFAULT_DISABLED_SETTING, tooltip } = props;

    console.log(disabled);
    console.log(tooltip);

    return (
        <Icon className = "help-tooltip" type = {FontAwesomeIconType.Question} size = {Size.Mini}/>
    );
};

export default HelpTooltip;