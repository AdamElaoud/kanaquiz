import { useState } from "react";
import { IconType, ReactInputOnChangeEvent } from "@/common/types";
import "./QuizTypeCard.scss";
import { Icon } from "@/common/components";
import { QuizType } from "@/types";
import useQuizSelections from "@/hooks/useQuizSelections";
import { DEFAULT_QUESTION_AMOUNT, MAXIMUM_QUESTION_AMOUNT, MINIMUM_QUESTION_AMOUNT, QUIZ_TYPE_COLOR_CLASSNAMES, QUIZ_TYPE_DESCRIPTIONS, SCREEN_WIDTH_THRESHHOLD } from "@/utils/constants";
import useWindowSize from "@/common/hooks/useWindowSize";

interface Props {
    iconType: IconType,
    title: string,
    quizType: QuizType
};

const QuizTypeCard = (props: Props) : JSX.Element => {
    const { iconType, title, quizType } = props;

    const [windowWidth] = useWindowSize();
    const { quizSelections, updateQuizSelections } = useQuizSelections();
    const [questionAmount, setQuestionAmount] = useState<number>(() => {
        const quizSelection = quizSelections.find(selection => selection.type === quizType);
        const storedAmount = quizSelection?.amount;

        return storedAmount || DEFAULT_QUESTION_AMOUNT;
    });
    
    const onQuestionAmountChange = (event: ReactInputOnChangeEvent) => {
        const input = parseInt(event.target.value);

        // show flare if amount is out of bounds?
        if (input !== questionAmount && MINIMUM_QUESTION_AMOUNT <= input && input <= MAXIMUM_QUESTION_AMOUNT) {
            setQuestionAmount(input);
            updateQuizSelections(quizType, input);
        }
    };
    
    const isSelected = quizSelections.some(selection => selection.type === quizType);
    const classes = isSelected ? "quiz-type is-selected" : "quiz-type";

    const showDescription = windowWidth > SCREEN_WIDTH_THRESHHOLD;

    return (
        <div className = {classes} onClick = {() => updateQuizSelections(quizType, questionAmount)}>
            <div className = "quiz-type-header">
                <Icon className = {QUIZ_TYPE_COLOR_CLASSNAMES[quizType]} type = {iconType} />
                <span className = "quiz-type-title">
                    {title}
                </span>
            </div>

            {showDescription && <div className = "quiz-type-description">
                {QUIZ_TYPE_DESCRIPTIONS[quizType]}
            </div>}

            <div className = "quiz-type-input">
                <span className = "amount">Amount</span>
                <label className = "visually-hidden" htmlFor = {`${title}-input`}>Amount of questions for {title}</label>
                <input
                    name = {`${title}-input`}
                    type = "number"
                    min = {MINIMUM_QUESTION_AMOUNT}
                    max = {MAXIMUM_QUESTION_AMOUNT}
                    role = "input"
                    value = {questionAmount}
                    onChange = {onQuestionAmountChange}
                />
            </div>
        </div>
    );
};

export default QuizTypeCard;