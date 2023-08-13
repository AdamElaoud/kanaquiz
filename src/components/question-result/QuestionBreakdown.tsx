import { Icon } from "@/common/components";
import { FontAwesomeIconType, Size } from "@/common/types";
import { QuestionResult as QuestionBreakdown } from "@/types";

import "./QuestionBreakdown.scss";

const QuestionBreakdown = (props: QuestionBreakdown) : JSX.Element => {
    const { correct,  } = props;

    const questionBreakdownClasses = ["question-breakdown"];
    if (correct) questionBreakdownClasses.push("correct")

    return (
        <div className = {questionBreakdownClasses.join(" ")}>
            {correct && <Icon type = {FontAwesomeIconType.Check} size = {Size.Small}/>}
            {!correct && <Icon type = {FontAwesomeIconType.X} size = {Size.Small}/>}
        </div>
    );
};

export default QuestionBreakdown;