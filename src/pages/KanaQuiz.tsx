import { Button, Icon } from "@/common/components";
import useDebounce from "@/common/hooks/useDebounce";
import { FontAwesomeIconType, Size, TextInputState } from "@/common/types";
import ChoiceInputRow from "@/components/choice-row/ChoiceInputRow";
import useKanaSelections from "@/hooks/useKanaSelections";
import useQuizSelections from "@/hooks/useQuizSelections";
import useWordSelections from "@/hooks/useWordSelections";
import { QuizFormat } from "@/types";
import { generateQuestions } from "@/utils/utils";
import { useEffect, useMemo, useRef, useState } from "react";

import "./KanaQuiz.scss";

const KanaQuiz = () : JSX.Element => {
    const { quizSelections } = useQuizSelections();
    const { kanaSelections } = useKanaSelections();
    const { wordSelections } = useWordSelections();
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [incorrectCount, setIncorrectCount] = useState<number>(0);
    const textInputRefs = useRef<HTMLInputElement[]>([]);

    const remainingQuestions = quizSelections.amount - correctCount - incorrectCount;
    const activeQuestionIndex = correctCount + incorrectCount;

    const questions = useMemo(() => 
        generateQuestions(
            quizSelections,
            kanaSelections,
            wordSelections
        ), [kanaSelections, quizSelections, wordSelections]);

    const activeQuestion = questions[activeQuestionIndex];

    const isMultChoice = quizSelections.format === QuizFormat.MultipleChoice;

    useEffect(() => {
        if (!isMultChoice) {
            textInputRefs.current = Array.from(document.querySelectorAll("input[type = text]"));
            textInputRefs.current[0].focus();
        }

    }, [isMultChoice]);

    const onInputChange = useDebounce<TextInputState, void>(({ newValue }) => {
        if (newValue.length > 0) {
            const currentInputIndex = textInputRefs.current?.findIndex(ele => ele === document.activeElement);

            if (currentInputIndex !== textInputRefs.current.length - 1)
                textInputRefs.current[currentInputIndex + 1].focus();
            else
                textInputRefs.current[currentInputIndex].blur();
        }
    }, 400);

    const checkAnswer = (response: string) => () => {
        if (response === activeQuestion.answer) {
            console.log("correct!");
            setCorrectCount(count => count + 1);

        } else {
            console.log("incorrect!");
            setIncorrectCount(count => count + 1);
        }
    };

    const promptQuestionClasses = ["prompt-question"];
    if (activeQuestion.prompt.length > 7) promptQuestionClasses.push("large-word");

    return (
        <div className = "kana-quiz-page">
            <div className = "quiz-status">
                <span className = "status-number">
                    <Icon className = "correct" type = {FontAwesomeIconType.Check} size = {Size.Mini} />
                    {correctCount}
                </span>
                <span className = "status-number">
                    <Icon className = "incorrect" type = {FontAwesomeIconType.X} size = {Size.Mini} />
                    {incorrectCount}
                </span>
                <span className = "status-number">
                    <Icon className = "remaining" type = {FontAwesomeIconType.Question} size = {Size.Mini} />
                    {remainingQuestions}
                </span>
            </div>

            <div className = "prompt-and-answer-input">
                <div className = "prompt">
                    <div className = {promptQuestionClasses.join(" ")}>
                        {activeQuestion.prompt}
                    </div>

                    {activeQuestion.context && <div className = "prompt-context">
                        {activeQuestion.context}
                    </div>}
                </div>

                <div className = "answer-input">
                    {isMultChoice && activeQuestion.choices?.map(choice => {
                        return (
                            <Button key = {choice} className = "choice-button" onClick = {checkAnswer(choice)}>
                                {choice}
                            </Button>
                        );
                    })}
                    {!isMultChoice && <ChoiceInputRow answers = {activeQuestion.answer} onChange = {onInputChange}/>}
                </div>
            </div>
        </div>
    );
};

export default KanaQuiz;