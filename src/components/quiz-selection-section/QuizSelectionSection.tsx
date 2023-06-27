import { Side, ToggleButtonConfig } from "@/common/types";
import "./QuizSelectionSection.scss";
import { HelpTooltip, ToggleButton } from "@/common/components";

interface Props {
    activeButton?: Side,
    buttons: [ToggleButtonConfig, ToggleButtonConfig],
    defaultActiveSide: Side,
    disabled?: boolean,
    helpTooltip?: string
    title: string
};

const DEFAULT_DISABLED = false;

const QuizSelectionSection = (props: Props) : JSX.Element => {
    const { activeButton, buttons, defaultActiveSide, disabled = DEFAULT_DISABLED, helpTooltip, title } = props;

    return (
        <div className = "quiz-selection-section">
            <span className = "section-title">
                <span>{title}</span>
                {helpTooltip && <HelpTooltip tooltip = {helpTooltip}/>}
            </span>
            
            <ToggleButton activeButton = {activeButton} buttons = {buttons} defaultActiveSide = {defaultActiveSide} disabled = {disabled}/>
        </div>
    );
};

export default QuizSelectionSection;