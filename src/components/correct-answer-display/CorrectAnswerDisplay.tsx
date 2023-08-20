import { TooltipText } from "@/common/components";

import "./CorrectAnswerDisplay.scss";

interface Props {
    answer: string | string[],
    omitTitle?: boolean,
    response: string | string[],
};

const DEFAULT_OMIT_TITLE = false;

const CorrectAnswerDisplay = (props: Props) : JSX.Element => {
    const { answer, omitTitle = DEFAULT_OMIT_TITLE, response } = props;

    const answerIsWord = typeof answer !== "string";

    // these type casts are protected by generateQuestions function. if "answer"
    // is a single string, "response" is guaranteed to be a string and
    // vice versa for arrays
    return (
        <span className = "answer-explanation">
            {!omitTitle && "Correct Answer:"}
            <span className = "correct-answer-with-details">
                {!answerIsWord && <TooltipText tooltip = {`You Answered: ${response as string}`}>
                    {answer}
                </TooltipText>}

                {answerIsWord && (response as string[]).map((kana, index) => {
                    if (kana === answer[index])
                        return <span className = "correct">{answer[index]}</span>

                    return (
                        <TooltipText key = {`${kana}-${index}`} tooltip = {`You answered: ${kana}`}>
                            {answer[index]}
                        </TooltipText>
                    );
                })}
            </span>
        </span>
    );
};

export default CorrectAnswerDisplay;