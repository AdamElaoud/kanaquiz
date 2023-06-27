import { ReactElement } from "@/common/types";
import "./SelectionSection.scss";
import { HelpTooltip } from "@/common/components";

interface Props {
    children: ReactElement,
    helpTooltip?: string
    title: string
};

const SelectionSection = (props: Props) : JSX.Element => {
    const {
        children,
        helpTooltip,
        title
    } = props;

    return (
        <div className = "quiz-selection-section">
            <span className = "section-title">
                <span>{title}</span>
                {helpTooltip && <HelpTooltip tooltip = {helpTooltip}/>}
            </span>
            
            <span className = "section-content">
                {children}
            </span>
        </div>
    );
};

export default SelectionSection;