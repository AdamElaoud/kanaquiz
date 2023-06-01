import { useState } from "react";
import { IconType, ReactInputOnChangeEvent, Size } from "@/common/types";
import "./QuizTypeCard.scss";
import { Icon } from "@/common/components";
import { QuizType } from "@/types";
import useQuizSelections from "@/hooks/useQuizSelections";

interface Props {
    iconType: IconType,
    title: string,
    quizType: QuizType
};

const DEFAULT_QUESTION_AMOUNT = 10;
const MINIMUM_QUESTION_AMOUNT = 1;
const MAXIMUM_QUESTION_AMOUNT = 50;

const QuizTypeCard = (props: Props) : JSX.Element => {
    const { iconType, title, quizType } = props;

    const [questionAmount, setQuestionAmount] = useState<number>(DEFAULT_QUESTION_AMOUNT);
    const { quizSelections, updateQuizSelections } = useQuizSelections();
    
    const onQuestionAmountChange = (event: ReactInputOnChangeEvent) => {
        const input = parseInt(event.target.value);
        setQuestionAmount(input);
    };
    
    const isSelected = quizSelections.includes(quizType);
    const classes = isSelected ? "quiz-type is-selected" : "quiz-type";

    return (
        <div className = {classes} onClick = {() => updateQuizSelections(quizType)}>
            {title}
            <Icon type = {iconType} size = {Size.Large} />
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
    );
};

export default QuizTypeCard;