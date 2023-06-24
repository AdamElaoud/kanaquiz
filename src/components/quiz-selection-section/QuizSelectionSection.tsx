import { Side, ToggleButtonConfig } from "@/common/types";
import "./QuizSelectionSection.scss";
import { HelpTooltip, ToggleButton } from "@/common/components";

interface Props {
    buttons: [ToggleButtonConfig, ToggleButtonConfig],
    defaultActiveSide: Side,
    helpTooltip?: string // coming soon,
    title: string
};

const QuizSelectionSection = (props: Props) : JSX.Element => {
    const { buttons, defaultActiveSide, helpTooltip, title } = props;

    return (
        <div className = "quiz-selection-section">
            <span className = "section-title">
                <span>{title}</span>
                {helpTooltip && <HelpTooltip tooltip = {helpTooltip}/>}
            </span>
            
            <ToggleButton buttons = {buttons} defaultActiveSide = {defaultActiveSide}/>
        </div>
    );
};

export default QuizSelectionSection;