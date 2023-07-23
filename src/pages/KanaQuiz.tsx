import { Button, Icon } from "@/common/components";
import useDebounce from "@/common/hooks/useDebounce";
import { FontAwesomeIconType, Size, TextInputState } from "@/common/types";
import ChoiceInputRow from "@/components/choice-row/ChoiceInputRow";
import useKanaSelections from "@/hooks/useKanaSelections";
import useQuizSelections from "@/hooks/useQuizSelections";
import useSettings from "@/hooks/useSettings";
import useWordSelections from "@/hooks/useWordSelections";
import { QuizFormat } from "@/types";
import { generateQuestions } from "@/utils/utils";
import { useEffect, useMemo, useRef, useState } from "react";

import "./KanaQuiz.scss";

const KanaQuiz = () : JSX.Element => {
    const { quizSelections } = useQuizSelections();
    const { kanaSelections } = useKanaSelections();
    const { wordSelections } = useWordSelections();
    const { showDefinitions } = useSettings();
    const [multChoiceResponse, setMultChoiceResponse] = useState<string>("");
    const [writeResponses, setWriteResponses] = useState<string[]>([]);
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [incorrectCount, setIncorrectCount] = useState<number>(0);
    const textInputRefs = useRef<HTMLInputElement[]>([]);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    // this casting is protected by the step wizard. The user will not be 
    // allowed to reach this point unless a valid quiz question amount
    // number was supplied
    const remainingQuestions = quizSelections.amount as number - correctCount - incorrectCount;
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

    }, [isMultChoice, activeQuestionIndex]);

    const onInputChange = useDebounce<TextInputState, void>(({ newValue }) => {
        const currentInputIndex = textInputRefs.current?.findIndex(ele => ele === document.activeElement);

        setWriteResponses(currentResponses => {
            const copy = [...currentResponses];
            copy[currentInputIndex] = newValue;
            return copy;
        });

        if (newValue.length > 0) {
            if (currentInputIndex !== textInputRefs.current.length - 1)
                textInputRefs.current[currentInputIndex + 1].focus();
            else
                textInputRefs.current[currentInputIndex].blur();
        }
    }, 400);

    const checkAnswer = () => {
        if (isMultChoice) {
            if (multChoiceResponse === activeQuestion.answer)
                setCorrectCount(count => count + 1);
            else
                setIncorrectCount(count => count + 1);
    
            setMultChoiceResponse("");

        } else {
            const writeResponse = writeResponses.join(",");
            const answer = typeof activeQuestion.answer !== "string" ? activeQuestion.answer.join(",") : activeQuestion.answer;
            
            if (writeResponse === answer)
                setCorrectCount(count => count + 1);
            else
                setIncorrectCount(count => count + 1);

            setWriteResponses([]);
            textInputRefs.current.forEach(input => input.value = "");
            textInputRefs.current[0].focus();
        }
    };

    const makeSelection = (choice: string) => () => {
        const isSelection = choice === multChoiceResponse;

        if (isSelection) setMultChoiceResponse("");
        else setMultChoiceResponse(choice);
    };

    const submitIsEnabled =
        (isMultChoice && multChoiceResponse) ||
        (!isMultChoice && writeResponses.length === activeQuestion.answer.length && writeResponses.every(response => response !== ""))

    console.log('submitIsEnabled :>> ', submitIsEnabled);
    
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

                    {showDefinitions && activeQuestion.context && <div className = "prompt-context">
                        {activeQuestion.context}
                    </div>}
                </div>

                <div className = "answer-input">
                    {isMultChoice && activeQuestion.choices?.map(choice => {
                        const isSelection = choice === multChoiceResponse;

                        const buttonClasses = ["choice-button"];
                        if (isSelection) buttonClasses.push("is-selection");

                        return (
                            <Button key = {choice} className = {buttonClasses.join(" ")} onClick = {makeSelection(choice)}>
                                {choice}
                            </Button>
                        );
                    })}
                    {!isMultChoice && <ChoiceInputRow answers = {activeQuestion.answer} onChange = {onInputChange}/>}
                </div>

                <Button ref = {submitButtonRef} className = "submit-choice-button" onClick = {checkAnswer} disabled = {!submitIsEnabled}>
                    SUBMIT
                </Button>
            </div>
        </div>
    );
};

export default KanaQuiz;