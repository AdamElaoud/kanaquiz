import { TooltipText } from "@/common/components";

import "./CorrectAnswerDisplay.scss";

interface Props {
    answer: string | string[],
    answerDetails: string | string[],
    questionIndex: number
};

const CorrectAnswerDisplay = (props: Props) : JSX.Element => {
    const { answer, answerDetails, questionIndex } = props;

    const answerIsWord = typeof answer !== "string";

    // these type casts are protected by generateQuestions function. if "answer"
    // is a single string, "answerDetails" is guaranteed to be a string and
    // vice versa for arrays
    return (
        <span className = "answer-explanation">
            Correct Answer:
            <span className = "correct-answer-with-details">
                {!answerIsWord && <TooltipText tooltip = {answerDetails as string}>
                    {answer}    
                </TooltipText>}
                {answerIsWord && (answerDetails as string[]).map((details, index) => {
                    return (
                        <TooltipText key = {`${questionIndex}-${details}-${index}`} tooltip = {details}>
                            {answer[index]}
                        </TooltipText>
                    );
                })}
            </span>
        </span>
    );
};

export default CorrectAnswerDisplay;