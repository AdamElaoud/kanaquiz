import { Icon, Tooltip, TooltipContent, TooltipTrigger } from "@/common/components";
import { FontAwesomeIconType, Size, TimeUnits } from "@/common/types";
import { buildClassNames, prettifyTime } from "@/common/utils/utils";
import CorrectAnswerDisplay from "@/components/correct-answer-display/CorrectAnswerDisplay";
import { QuestionResult } from "@/types";

import "./QuestionBreakdown.scss";

const QuestionBreakdown = (props: QuestionResult) : JSX.Element => {
    const { answer, context, correct, response, time } = props;

    const answerDisplay = typeof answer === "string" ? answer : answer.join(" ");

    const questionBreakdownClasses = buildClassNames({ correct }, ["question-breakdown"]);

    return (
        <div className = {questionBreakdownClasses}>
            <span className = "result">
                {correct && <Icon type = {FontAwesomeIconType.Check} size = {Size.Small}/>}
                {!correct && <Icon type = {FontAwesomeIconType.X} size = {Size.Small}/>}

                {correct && answerDisplay}
                {!correct && <CorrectAnswerDisplay answer = {answer} omitTitle = {true} response = {response}/>}
            </span>

            <span className = "detail-buttons">
                {context && <Tooltip>
                    <TooltipTrigger tabIndex = {-1}>
                        <Icon tabIndex = {0} className = "context" type = {FontAwesomeIconType.Book} size = {Size.Mini} />
                    </TooltipTrigger>
                    <TooltipContent>
                        {context}
                    </TooltipContent>
                </Tooltip>}
                <Tooltip>
                    <TooltipTrigger tabIndex = {-1}>
                        <Icon
                            tabIndex = {0}
                            className = "time"
                            type = {FontAwesomeIconType.Stopwatch}
                            size = {context ? Size.Mini : Size.Small}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        {prettifyTime(time, true, new Set<TimeUnits>([TimeUnits.Ms]))}
                    </TooltipContent>
                </Tooltip>
            </span>
        </div>
    );
};

export default QuestionBreakdown;