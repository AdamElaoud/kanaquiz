import { Icon } from "@/common/components";
import { FontAwesomeIconType, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { QuestionResult as QuestionBreakdown } from "@/types";

import "./QuestionBreakdown.scss";

const QuestionBreakdown = (props: QuestionBreakdown) : JSX.Element => {
    const { correct,  } = props;

    const questionBreakdownClasses = buildClassNames({ correct }, ["question-breakdown"]);

    return (
        <div className = {questionBreakdownClasses}>
            {correct && <Icon type = {FontAwesomeIconType.Check} size = {Size.Small}/>}
            {!correct && <Icon type = {FontAwesomeIconType.X} size = {Size.Small}/>}
        </div>
    );
};

export default QuestionBreakdown;