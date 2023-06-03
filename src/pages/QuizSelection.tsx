import "./QuizSelection.scss";
import QuizTypeCard from "@/components/quiz-type/QuizTypeCard";
import { useState } from "react";
import { QuizType } from "@/types";
import { QuizSelectionsContextProvider } from "@/hooks/useQuizSelections";
import QuizSelectionsDisplay from "@/components/quiz-selections-display/QuizSelectionsDisplay";
import { QUIZ_TYPES } from "@/utils/constants";

const QuizSelection = () : JSX.Element => {
    const [quizSelections, setQuizSelections] = useState<QuizType[]>([QuizType.MultipleChoice]);

    const updateQuizSelections = (quizType: QuizType) => {
        const updatedSelections = [...quizSelections];

        if (quizSelections.includes(quizType)) {
            const quizTypeIndex = updatedSelections.findIndex(selection => selection === quizType);
            updatedSelections.splice(quizTypeIndex, 1);

        } else {
            updatedSelections.push(quizType);
        }

        setQuizSelections(updatedSelections);
    };

    return (
        <QuizSelectionsContextProvider value = {{ quizSelections, updateQuizSelections }}>
            <div className = "quiz-selection-page">
                <div className = "quiz-types">
                    {QUIZ_TYPES.map(quizType => <QuizTypeCard {...quizType}/>)}
                </div>

                <QuizSelectionsDisplay />
            </div>
        </QuizSelectionsContextProvider>
    );
};

export default QuizSelection;