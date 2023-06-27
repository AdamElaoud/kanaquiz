import { StepCarousel } from '@/common/components';
import { CustomIconType, FontAwesomeIconType, StepConfig, StepState } from '@/common/types';
import { useState, useLayoutEffect } from "react";
import '@/styles/App.scss';
import { Mode, PageType, QuizDirection, QuizFormat, QuizSelectionData, QuizTopic } from '@/types';
import { SCREEN_PARTIAL_FILL_WIDTH, SCREEN_FILL_WIDTH, PAGES, SCREEN_FILL_PERCENT, SCREEN_PARTIAL_FILL_PERCENT, QUIZ_SELECTION_STORAGE_KEY, DEFAULT_QUESTION_AMOUNT, KANA_SELECTION_STORAGE_KEY } from './utils/constants';
import useDynamicWidth from './common/hooks/useDynamicWidth';
import useWindowSize from './common/hooks/useWindowSize';
import { ModeContextProvider } from './hooks/useMode';
import Header from './components/header/Header';
import useLocalStorage from './common/hooks/useLocalStorage';
import { QuizSelectionsContextProvider } from './hooks/useQuizSelections';
import { KanaSelectionsContextProvider } from './hooks/useKanaSelections';

const App = () : JSX.Element => {
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const [page, setPage] = useState<PageType>(PageType.QuizSelect);
    const [kanaSelections, setKanaSelections] = useLocalStorage<string[]>(KANA_SELECTION_STORAGE_KEY, []);
    const [quizSelections, setQuizSelections] = useLocalStorage<QuizSelectionData>(QUIZ_SELECTION_STORAGE_KEY, {
        amount: DEFAULT_QUESTION_AMOUNT,
        direction: QuizDirection.JPtoEN,
        format: QuizFormat.MultipleChoice,
        topic: QuizTopic.Kana
    });
    const [windowWidth, windowHeight] = useWindowSize();
    const dynamicWidth = useDynamicWidth(
        SCREEN_PARTIAL_FILL_WIDTH,
        SCREEN_PARTIAL_FILL_PERCENT,
        SCREEN_FILL_WIDTH,
        SCREEN_FILL_PERCENT
    );
    
    useLayoutEffect(() => {
        // check orientation, if landscape, show notification flare to change to portrait

    }, []);

    const updateKanaSelections = (letters: string[], addOnly?: boolean) => {
        const updatedSelections = [...kanaSelections];

        letters.forEach(letter => {
            if (kanaSelections.includes(letter)) {
                if (!addOnly) {
                    const letterIndex = updatedSelections.findIndex(selection => selection === letter);
                    updatedSelections.splice(letterIndex, 1);
                }
    
            } else {
                updatedSelections.push(letter);
            }
        });

        setKanaSelections(updatedSelections);
    };

    const updateQuizSelections = (quizSelectionData: QuizSelectionData) => {
        setQuizSelections(quizSelectionData);
    };

    const onStepChange = ({ newStepID }: StepState) => {
        setPage(newStepID as PageType);
    };

    const kanaIsSelectedTopic = quizSelections.topic === QuizTopic.Kana;

    const PAGE_STEPS: StepConfig[] = [
        {
            iconType: FontAwesomeIconType.Pencil,
            ID: PageType.QuizSelect,
            title: "Quiz"
        },
        {
            iconType: kanaIsSelectedTopic ? CustomIconType.Kana : FontAwesomeIconType.Book,
            ID: kanaIsSelectedTopic ? PageType.KanaSelect : PageType.WordSelect,
            title: kanaIsSelectedTopic ? "Kana" : "Words"
        },
        {
            iconType: FontAwesomeIconType.ClipboardQuestion,
            ID: PageType.QuizSummary,
            title: "Review"
        },
    ];

    // window innerheight & innerwidth is used instead
    // of 100vw and 100vw to account for browser elements
    const appStyle = {
        height: windowHeight,
        width: windowWidth
    };

    return (
        <ModeContextProvider value = {{ mode, setMode }}>
            <KanaSelectionsContextProvider value = {{ kanaSelections, updateKanaSelections }}>
                <QuizSelectionsContextProvider value = {{ quizSelections, updateQuizSelections }}>
                    <div className = "app" style = {appStyle}>
                        <Header style = {dynamicWidth}/>

                        <div className = "page" style = {dynamicWidth}>
                            {PAGES[page]()}
                        </div>
                        
                        <StepCarousel
                            className = "page-carousel"
                            steps = {PAGE_STEPS}
                            onStepChange = {onStepChange}
                            showCheckOnComplete = {true}
                            style = {dynamicWidth}
                        />
                    </div>
                </QuizSelectionsContextProvider>
            </KanaSelectionsContextProvider>
        </ModeContextProvider>
    );
};

export default App
