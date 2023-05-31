import { StepCarousel } from '@/common/components';
import { CustomIconType, FontAwesomeIconType, ReactNode, StepConfig, StepState } from '@/common/types';
import KanaSelection from '@/pages/KanaSelection';
import { useState } from "react";
import '@/styles/App.scss';
import { PageID, PageMapType, PageType } from '@/types';
import QuizSelection from '@/pages/QuizSelection';
import KanaQuiz from '@/pages/KanaQuiz';
import QuizSummary from '@/pages/QuizSummary';

const steps: StepConfig[] = [
    {
        iconType: CustomIconType.Hiragana,
        ID: PageID.KanaSelect,
        text: "Select the Kana for your quiz!",
        title: "Kana"
    },
    {
        iconType: FontAwesomeIconType.ClipboardQuestion,
        ID: PageID.QuizSelect,
        text: "Select the type for your quiz!",
        title: "Quiz"
    },
    {
        iconType: FontAwesomeIconType.Play,
        ID: PageID.KanaQuiz,
        title: "Go!"
    },
];

const PAGES: PageMapType = {
    KanaSelection: <KanaSelection />,
    QuizSelection: <QuizSelection />,
    KanaQuiz: <KanaQuiz />,
    QuizSummary: <QuizSummary />
};

const App = () : JSX.Element => {
    const [page, setPage] = useState<ReactNode>(PAGES[PageType.KanaSelect]);

    const onStepChange: StepState = ({ newStepID }) => {
        switch (newStepID) {
            case PageID.KanaSelect:
                setPage(PAGES[PageType.KanaSelect]);
                break;
            case PageID.QuizSelect:
                setPage(PAGES[PageType.QuizSelect]);
                break;
            case PageID.KanaQuiz:
                setPage(PAGES[PageType.KanaQuiz]);
                break;
            default:
                throw "Invalid step ID! Step IDs should be a PageID that maps to a PageType!";
        }
    };

    return (
        <div className = "app">
            <div className = "page">
                {page}
            </div>
            <StepCarousel className = "page-carousel" steps = {steps} onStepChange = {onStepChange}/>
        </div>
    );
};

export default App
