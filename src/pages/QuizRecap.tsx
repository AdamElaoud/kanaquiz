import { Button, ButtonGroup, Icon } from "@/common/components";
import { FontAwesomeIconType, Size, TimeUnits } from "@/common/types";
import { calcMS, prettifyTime } from "@/common/utils/utils";
import QuestionBreakdown from "@/components/question-result/QuestionBreakdown";
import Section from "@/components/section/Section";
import { PageRoute, QuestionResult } from "@/types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./QuizRecap.scss";

enum Filter {
    Both = "both",
    Correct = "correct",
    Incorrect = "incorrect"
};

const QuizRecap = () : JSX.Element => {
    const [filter, setFilter] = useState<Filter>(Filter.Both);
    const navigate = useNavigate();
    const { state } = useLocation();
    const { quizResults }: { quizResults: QuestionResult[] } = state;

    const { totalTime, totalCorrect, totalIncorrect } = quizResults.reduce((data, quizResult) => {
        const { correct, time } = quizResult;

        if (correct) data.totalCorrect += 1;
        else data.totalIncorrect += 1;

        data.totalTime += calcMS(time);

        return data;

    }, { totalTime: 0, totalCorrect: 0, totalIncorrect: 0});

    const filteredQuizResults = quizResults.filter(quizResult => {
        if (filter === Filter.Correct) return quizResult.correct === true;
        if (filter === Filter.Incorrect) return quizResult.correct === false;

        return quizResult;
    })

    return (
        <div className = "quiz-recap-page">
            <div className = "call-to-action">
                Here's how you did
            </div>

            <div className = "stats-section">
                <span className = "stat-number">
                    <Icon className = "correct" type = {FontAwesomeIconType.Check} size = {Size.Mini} />
                    {totalCorrect}
                </span>
                <span className = "stat-number">
                    <Icon className = "incorrect" type = {FontAwesomeIconType.X} size = {Size.Mini} />
                    {totalIncorrect}
                </span>
                <span className = "stat-number">
                    <Icon className = "time" type = {FontAwesomeIconType.Stopwatch} size = {Size.Mini} />
                    {prettifyTime(totalTime, true, new Set<TimeUnits>([TimeUnits.Ms]))}
                </span>
            </div>

            <Section title = "Breakdown">
                <ButtonGroup defaultActiveButton = {Filter.Both}>
                    <Button id = {Filter.Correct} onClick = {() => setFilter(Filter.Correct)}>
                        Correct
                    </Button>
                    <Button id = {Filter.Both} onClick = {() => setFilter(Filter.Both)}>
                        Both
                    </Button>
                    <Button id = {Filter.Incorrect} onClick = {() => setFilter(Filter.Incorrect)}>
                        Incorrect
                    </Button>
                </ButtonGroup>
                <div className = "breakdown-container">
                    {filteredQuizResults.map((result, index) => <QuestionBreakdown key = {`${prompt}-${index}`} {...result}/>)}
                    {filter === Filter.Correct && totalCorrect === 0 && <span className = "empty-text">
                        Don't worry, practice makes perfect!
                    </span>}
                    {filter === Filter.Incorrect && totalIncorrect === 0 && <span className = "empty-text">
                        Nothing to see here, well done!
                    </span>}
                </div>
            </Section>

            <div className = "action-buttons">
                <Button onClick = {() => navigate(PageRoute.KanaQuiz)}>
                    GO AGAIN!
                </Button>
                <Button className = "new-quiz-button" onClick = {() => navigate(PageRoute.QuizSelect)}>
                    NEW QUIZ
                </Button>
            </div>
        </div>
    );
};

export default QuizRecap;