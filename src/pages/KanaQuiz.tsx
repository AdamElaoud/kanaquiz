import { Button, Icon } from "@/common/components";
import useDebounce from "@/common/hooks/useDebounce";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { FontAwesomeIconType, ReactFormOnSubmitEvent, Size, TextInputState } from "@/common/types";
import { buildClassNames, calcTimeUnits } from "@/common/utils/utils";
import ChoiceInputRow from "@/components/choice-row/ChoiceInputRow";
import CorrectAnswerDisplay from "@/components/correct-answer-display/CorrectAnswerDisplay";
import useKanaSelections from "@/hooks/useKanaSelections";
import useQuizSelections from "@/hooks/useQuizSelections";
import useSettings from "@/hooks/useSettings";
import useWordSelections from "@/hooks/useWordSelections";
import { PageRoute, QuestionResult, QuizFormat } from "@/types";
import { SCREEN_FILL_PERCENT, SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_PERCENT, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import { generateQuestions } from "@/utils/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./KanaQuiz.scss";

const KanaQuiz = () : JSX.Element => {
    const navigate = useNavigate();
    const { quizSelections } = useQuizSelections();
    const { kanaSelections } = useKanaSelections();
    const { wordSelections } = useWordSelections();
    const { autoFocusNextInput, showDefinitions } = useSettings();
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [quizResults, setQuizResults] = useState<QuestionResult[]>([]);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [answerIsCorrect, setAnswerIsCorrect] = useState<boolean>(false);
    const [multChoiceResponse, setMultChoiceResponse] = useState<string>("");
    const [writeResponses, setWriteResponses] = useState<string[]>([]);
    const [correctCount, setCorrectCount] = useState<number>(0);
    const [incorrectCount, setIncorrectCount] = useState<number>(0);
    const textInputRefs = useRef<HTMLInputElement[]>([]);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const dynamicWidth = useDynamicWidth(
        SCREEN_PARTIAL_FILL_WIDTH,
        SCREEN_PARTIAL_FILL_PERCENT,
        SCREEN_FILL_WIDTH,
        SCREEN_FILL_PERCENT
    );

    // this value should only be generated on mount and should never be changed
    // eslint-disable-next-line
    const questions = useMemo(() => generateQuestions(quizSelections, kanaSelections, wordSelections), []);

    // this casting is protected by the step wizard. The user will not be 
    // allowed to reach this point unless a valid quiz question amount
    // number was supplied
    const remainingQuestions = quizSelections.amount as number - correctCount - incorrectCount;
    const activeQuestionIndex = correctCount + incorrectCount;
    const isLastQuestion = activeQuestionIndex === questions.length - 1;
    
    const activeQuestion = questions[activeQuestionIndex];
    const answerIsWord = typeof activeQuestion.answer !== "string";
    // type cast is protected by check for answerIsWord, TypeScript is just stoopid
    const activeQuestionAnswer = !answerIsWord ? activeQuestion.answer : (activeQuestion.answer as string[]).join(" ");
    const activeQuestionNumberOfPrompts = !answerIsWord ? 1 : activeQuestion.answer.length;

    const hasAnsweredAllInputs =
        writeResponses.length === activeQuestionNumberOfPrompts && writeResponses.every(response => response !== "");

    const isMultChoice = quizSelections.format === QuizFormat.MultipleChoice;

    const submitIsEnabled = 
        !showResult && 
        ((isMultChoice && multChoiceResponse) ||
        (!isMultChoice && hasAnsweredAllInputs));

    useEffect(() => {
        if (!isMultChoice) {
            textInputRefs.current = Array.from(document.querySelectorAll("input[type = text]"));
            textInputRefs.current[0].focus();
        }

    }, [isMultChoice, activeQuestionIndex]);

    const focusNextInput = useDebounce<{ value: string, currentInputIndex: number }, void>(({ value, currentInputIndex }) => {
        if (autoFocusNextInput && value.length > 0) {
            if (currentInputIndex !== textInputRefs.current.length - 1)
                textInputRefs.current[currentInputIndex + 1].focus();
            else
                textInputRefs.current[currentInputIndex].blur();
        }
    }, 550);

    const onInputChange = ({ newValue }: TextInputState) => {
        const value = newValue.toLowerCase();

        const currentInputIndex = textInputRefs.current?.findIndex(ele => ele === document.activeElement);

        setWriteResponses(currentResponses => {
            const copy = [...currentResponses];
            copy[currentInputIndex] = value;
            return copy;
        });

        focusNextInput({ value, currentInputIndex });
        return value;
    };

    const checkAnswer = () => {
        // only check answer if not already submitted
        if (!showResult) {
            let correct: boolean;
            let response: string | string[];

            if (isMultChoice) {
                correct = multChoiceResponse === activeQuestionAnswer;
                setAnswerIsCorrect(correct);

                response = multChoiceResponse;
    
            } else {
                const writeResponse = writeResponses.join(" ").toLocaleLowerCase();
                correct = writeResponse === activeQuestionAnswer;
                setAnswerIsCorrect(correct);

                response = writeResponses;
            }

            const endTime = new Date();
            const time = endTime.getTime() - startTime.getTime();
            const timeData = calcTimeUnits(time);
    
            setQuizResults(results => [...results, { ...activeQuestion, correct, response, time: timeData }]);
            setShowResult(true);
        }
    };

    const nextQuestion = () => {
        // if last question 
        if(isLastQuestion) {
            navigate(PageRoute.QuizRecap, { replace: true, state: { quizResults } });
            
        } else {
            if (answerIsCorrect) setCorrectCount(count => count + 1);
            else setIncorrectCount(count => count + 1);
    
            if (isMultChoice) setMultChoiceResponse("");
            else setWriteResponses([]);
    
            setStartTime(new Date());
            setShowResult(false);
        }
    };

    const makeSelection = (choice: string) => () => {
        const isSelection = choice === multChoiceResponse;

        if (isSelection) setMultChoiceResponse("");
        else setMultChoiceResponse(choice);
    };

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };

    const promptQuestionClasses = buildClassNames({
        "large-word": activeQuestion.prompt.length > 7
    }, ["prompt-question"]);

    const questionResultClasses = buildClassNames({ correct: answerIsCorrect }, ["question-result"]);

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
                    <div className = {promptQuestionClasses}>
                        {activeQuestion.prompt}
                    </div>

                    {showDefinitions && activeQuestion.context && <span className = "prompt-context">
                        {activeQuestion.context}
                    </span>}
                </div>

                <form className = "answer-input" onSubmit = {onSubmit}>
                    {isMultChoice && activeQuestion.choices?.map(choice => {
                        const isSelection = choice === multChoiceResponse;

                        const buttonClasses = buildClassNames({ "is-selection": isSelection }, ["choice-button"]);

                        return (
                            <Button
                                key = {`${activeQuestionIndex}-${choice}`}
                                disabled = {showResult}
                                className = {buttonClasses}
                                onClick = {makeSelection(choice)}
                            >
                                {choice}
                            </Button>
                        );
                    })}
                    {!isMultChoice &&
                        <ChoiceInputRow
                            questionIndex = {activeQuestionIndex}
                            disabled = {showResult}
                            answers = {activeQuestion.answer}
                            onChange = {onInputChange}
                        />}
                </form>
            </div>

            <Button ref = {submitButtonRef} className = "submit-choice-button" onClick = {checkAnswer} disabled = {!submitIsEnabled}>
                SUBMIT
            </Button>

            {showResult && <div className = {questionResultClasses} style = {dynamicWidth}>
                <span className = "question-result-title">
                    {answerIsCorrect && <Icon type = {FontAwesomeIconType.Check} size = {Size.Small}/>}
                    {!answerIsCorrect && <Icon type = {FontAwesomeIconType.X} size = {Size.Small}/>}
                    {answerIsCorrect ? "Correct!" : "Incorrect"}
                </span>

                {activeQuestion.context && <span className = "prompt-context">
                    Meaning: {activeQuestion.context}
                </span>}

                {!answerIsCorrect && <CorrectAnswerDisplay
                    answer = {activeQuestion.answer}
                    response = {quizResults[activeQuestionIndex].response}
                />}

                <Button className = "next-question-button" onClick = {nextQuestion}>
                    {isLastQuestion ? "FINISH" : "NEXT QUESTION"}
                </Button>
            </div>}
        </div>
    );
};

export default KanaQuiz;