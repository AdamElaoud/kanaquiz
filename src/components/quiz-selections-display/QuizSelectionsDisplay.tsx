import { StepDisplay } from "@/common/components";
import "./QuizSelectionsDisplay.scss";
import { StepConfig } from "@/common/types";
import useQuizSelections from "@/hooks/useQuizSelections";
import { QUIZ_TYPE_ICONS, QUIZ_TYPE_MINI_TITLES } from "@/utils/constants";

const QuizSelectionsDisplay = () : JSX.Element => {
    const { quizSelections } = useQuizSelections();

    const steps: StepConfig[] = quizSelections.map(quizType => ({
        iconType: QUIZ_TYPE_ICONS[quizType],
        ID: quizType,
        title: QUIZ_TYPE_MINI_TITLES[quizType]
    }));

    const showSteps = quizSelections.length > 0;

    return (
        <div className = "quiz-selections-display">
            {showSteps && <StepDisplay steps = {steps} displayFlagAtEnd = {true} />}
            {!showSteps && "You must select at least 1 quiz type!"}
        </div>
    );
};

export default QuizSelectionsDisplay;