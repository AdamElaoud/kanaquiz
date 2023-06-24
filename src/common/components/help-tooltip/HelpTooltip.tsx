import { FontAwesomeIconType } from "@/common/types";
import "./HelpTooltip.scss";
import { Icon } from "..";

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
        <Icon className = "help-tooltip" type = {FontAwesomeIconType.Question}/>
    );
};

export default HelpTooltip;