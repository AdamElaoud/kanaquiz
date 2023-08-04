import { Icon } from "@/common/components";
import { FontAwesomeIconType, Size } from "@/common/types";
import { QuestionResult } from "@/types";

import "./QuestionResult.scss";

const QuestionResult = (props: QuestionResult) : JSX.Element => {
    const { correct,  } = props;

    const questionResultClasses = ["question-result"];
    if (correct) questionResultClasses.push("correct")

    return (
        <div className = {questionResultClasses.join(" ")}>
            {correct && <Icon type = {FontAwesomeIconType.Check} size = {Size.Small}/>}
            {!correct && <Icon type = {FontAwesomeIconType.X} size = {Size.Small}/>}
        </div>
    );
};

export default QuestionResult;