import QuestionBreakdown from "@/components/question-result/QuestionBreakdown";
import { QuestionResult } from "@/types";
import { useLocation } from "react-router-dom";

import "./QuizRecap.scss";

const QuizRecap = () : JSX.Element => {
    const { state } = useLocation();
    const { quizResults }: { quizResults: QuestionResult[] } = state;

    console.log('quizResults :>> ', quizResults);

    return (
        <div className = "quiz-recap-page">
            {quizResults.map((result, index) => <QuestionBreakdown key = {`${prompt}-${index}`} {...result}/>)}
        </div>
    );
};

export default QuizRecap;