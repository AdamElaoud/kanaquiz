import { StepCarousel } from '@/common/components';
import { CustomIconType, FontAwesomeIconType, ReactNode, StepConfig, StepState } from '@/common/types';
import KanaSelection from '@/pages/KanaSelection';
import { useState } from "react";
import '@/styles/App.scss';
import { PageMapType, PageType } from '@/types';
import QuizSelection from '@/pages/QuizSelection';
import KanaQuiz from '@/pages/KanaQuiz';
import QuizSummary from '@/pages/QuizSummary';
import QuizRecap from './pages/QuizRecap';

const steps: StepConfig[] = [
    {
        iconType: CustomIconType.Hiragana,
        ID: PageType.KanaSelect,
        text: "Select the Kana for your quiz!",
        title: "Kana"
    },
    {
        iconType: FontAwesomeIconType.ClipboardQuestion,
        ID: PageType.QuizSelect,
        text: "Select your quiz types!",
        title: "Quiz"
    },
    {
        iconType: FontAwesomeIconType.Play,
        ID: PageType.QuizSummary,
        title: "Go!"
    },
];

const PAGES: PageMapType = {
    KanaSelection: <KanaSelection />,
    QuizSelection: <QuizSelection />,
    KanaQuiz: <KanaQuiz />,
    QuizSummary: <QuizSummary />,
    QuizRecap: <QuizRecap />
};

const App = () : JSX.Element => {
    const [page, setPage] = useState<ReactNode>(PAGES[PageType.KanaSelect]);

    const onStepChange: StepState = ({ newStepID }) => {
        setPage(PAGES[newStepID as PageType]);
    };

    return (
        <div className = "app">
            <div className = "page">
                {page}
            </div>
            <StepCarousel className = "page-carousel" steps = {steps} onStepChange = {onStepChange} showCheckOnComplete = {true}/>
        </div>
    );
};

export default App
