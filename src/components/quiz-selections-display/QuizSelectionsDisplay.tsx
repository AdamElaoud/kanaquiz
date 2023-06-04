import { StepDisplay } from "@/common/components";
import "./QuizSelectionsDisplay.scss";
import { StepConfig } from "@/common/types";
import useQuizSelections from "@/hooks/useQuizSelections";
import { QUIZ_TYPE_COLOR_CLASSNAMES, QUIZ_TYPE_ICONS } from "@/utils/constants";

const QuizSelectionsDisplay = () : JSX.Element => {
    const { quizSelections } = useQuizSelections();

    const steps: StepConfig[] = quizSelections.map(selection => ({
        className: QUIZ_TYPE_COLOR_CLASSNAMES[selection.type],
        iconType: QUIZ_TYPE_ICONS[selection.type],
        ID: selection.type,
        title: selection.amount
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