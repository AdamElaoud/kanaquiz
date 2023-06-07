import "./QuizSelection.scss";
import QuizTypeCard from "@/components/quiz-type/QuizTypeCard";
import { QuizSelectionData, QuizType } from "@/types";
import { QuizSelectionsContextProvider } from "@/hooks/useQuizSelections";
import QuizSelectionsDisplay from "@/components/quiz-selections-display/QuizSelectionsDisplay";
import { DEFAULT_QUESTION_AMOUNT, QUIZ_TYPES } from "@/utils/constants";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import { ToggleSwitch } from "@/common/components";

const QuizSelection = () : JSX.Element => {
    const [quizSelections, setQuizSelections] = useLocalStorage<QuizSelectionData[]>("quiz-selections", [{
        type: QuizType.MultipleChoice,
        amount: DEFAULT_QUESTION_AMOUNT
    }]);

    const updateQuizSelections = (quizType: QuizType, amount: number) => {
        const updatedSelections = [...quizSelections];

        const quizSelection = quizSelections.find(selection => selection.type === quizType);

        if (quizSelection) {
            const quizSelectionIndex = updatedSelections.findIndex(selection => selection.type === quizType);

            if (quizSelection.amount !== amount)
                updatedSelections[quizSelectionIndex].amount = amount;
            else
                updatedSelections.splice(quizSelectionIndex, 1);

        } else {
            updatedSelections.push({ type: quizType, amount });
        }

        setQuizSelections(updatedSelections);
    };

    return (
        <QuizSelectionsContextProvider value = {{ quizSelections, updateQuizSelections }}>
            <div className = "quiz-selection-page">
                <div className = "quiz-types" >
                    {QUIZ_TYPES.map(quizType => <QuizTypeCard {...quizType}/>)}
                </div>

                <div className = "quiz-selection-status">
                    <ToggleSwitch onEnable = {() => console.log("enabled!")}/>
                    <QuizSelectionsDisplay />
                </div>
            </div>
        </QuizSelectionsContextProvider>
    );
};

export default QuizSelection;