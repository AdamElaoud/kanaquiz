import { HelpTooltip } from "@/common/components";
import { ReactElement } from "@/common/types";

import "./QuizSelectionSection.scss";

interface Props {
    children: ReactElement,
    helpTooltip?: string
    title: string
};

const QuizSelectionSection = (props: Props) : JSX.Element => {
    const {
        children,
        helpTooltip,
        title
    } = props;

    return (
        <div className = "quiz-selection-section">
            <span className = "section-title">
                <span>{title}</span>
                {helpTooltip && <HelpTooltip id = {`${title}-help-tooltip`} tooltip = {helpTooltip}/>}
            </span>
            
            <span className = "section-content">
                {children}
            </span>
        </div>
    );
};

export default QuizSelectionSection;