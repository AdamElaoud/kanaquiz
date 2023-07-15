import { StepWizard } from '@/common/components';
import useDynamicWidth from '@/common/hooks/useDynamicWidth';
import useLocalStorage from '@/common/hooks/useLocalStorage';
import useNotification, { NotificationCenter } from '@/common/hooks/useNotification';
import useWindowSize from '@/common/hooks/useWindowSize';
import { CustomIconType, FontAwesomeIconType, StepConfig, StepState } from '@/common/types';
import { isMobileDevice } from '@/common/utils/utils';
import Header from '@/components/header/Header';
import { KanaSelectionsContextProvider } from '@/hooks/useKanaSelections';
import { ModeContextProvider } from '@/hooks/useMode';
import { QuizSelectionsContextProvider } from '@/hooks/useQuizSelections';
import { WordSelectionsContextProvider } from '@/hooks/useWordSelections';
import { Mode, PageType, QuizDirection, QuizFormat, QuizSelectionData, QuizTopic, WordSelectionData } from '@/types';
import { DEFAULT_QUESTION_AMOUNT, KANA_SELECTION_STORAGE_KEY, NOT_ENOUGH_KANA, NOT_ENOUGH_WORDS, ORIENTATION_ERROR, ORIENTATION_ERROR_ID, PAGES, QUIZ_SELECTION_STORAGE_KEY, SCREEN_FILL_PERCENT, SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_PERCENT, SCREEN_PARTIAL_FILL_WIDTH, WORD_SELECTION_STORAGE_KEY } from '@/utils/constants';
import { useLayoutEffect, useState } from "react";

import '@/styles/App.scss';

const App = () : JSX.Element => {
    const [carouselKey, resetCarousel] = useState<boolean>(false);
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const [page, setPage] = useState<PageType>(PageType.QuizSelect);
    const [kanaSelections, setKanaSelections] = useLocalStorage<string[]>(KANA_SELECTION_STORAGE_KEY, []);
    const [quizSelections, setQuizSelections] = useLocalStorage<QuizSelectionData>(QUIZ_SELECTION_STORAGE_KEY, {
        amount: DEFAULT_QUESTION_AMOUNT,
        direction: QuizDirection.JPtoEN,
        format: QuizFormat.MultipleChoice,
        topic: QuizTopic.Kana
    });
    const [wordSelections, setWordSelections] = useLocalStorage<WordSelectionData>(WORD_SELECTION_STORAGE_KEY, {
        allHiragana: true,
        allKatakana: true
    });
    const [windowWidth, windowHeight] = useWindowSize();
    const dynamicWidth = useDynamicWidth(
        SCREEN_PARTIAL_FILL_WIDTH,
        SCREEN_PARTIAL_FILL_PERCENT,
        SCREEN_FILL_WIDTH,
        SCREEN_FILL_PERCENT
    );
    const { error, dismissOne } = useNotification();

    useLayoutEffect(() => {
        if (isMobileDevice() && screen.orientation.type.includes("landscape"))
            error(ORIENTATION_ERROR, { autoClose: false, closeButton: false, toastId: ORIENTATION_ERROR_ID });

        if (isMobileDevice() && screen.orientation.type.includes("portrait"))
            dismissOne(ORIENTATION_ERROR_ID);
    });

    const updateKanaSelections = (letters: string[], addOnly?: boolean, deleteOnly?: boolean) => {
        const updatedSelections = [...kanaSelections];

        letters.forEach(letter => {
            if (kanaSelections.includes(letter)) {
                if (!addOnly) {
                    const letterIndex = updatedSelections.findIndex(selection => selection === letter);
                    updatedSelections.splice(letterIndex, 1);
                }
    
            } else {
                if (!deleteOnly)
                    updatedSelections.push(letter);
            }
        });

        setKanaSelections(updatedSelections);
    };

    const updateQuizSelections = (quizSelectionData: QuizSelectionData) => {
        setQuizSelections(quizSelectionData);
    };

    const updateWordSelections = (wordSelectionData: WordSelectionData) => {
        setWordSelections(wordSelectionData);
    };

    const onStepChange = ({ newStepID }: StepState) => {
        setPage(newStepID as PageType);
    };

    const kanaIsSelectedTopic = quizSelections.topic === QuizTopic.Kana;

    const pageSteps: StepConfig[] = [
        {
            iconType: FontAwesomeIconType.Pencil,
            ID: PageType.QuizSelect,
            title: "Quiz"
        },
        {
            iconType: kanaIsSelectedTopic ? CustomIconType.Kana : FontAwesomeIconType.Book,
            ID: kanaIsSelectedTopic ? PageType.KanaSelect : PageType.WordSelection,
            title: kanaIsSelectedTopic ? "Kana" : "Words",
            blockNextStep: () => kanaIsSelectedTopic && kanaSelections.length < 3
                || !kanaIsSelectedTopic && (!wordSelections.allHiragana && !wordSelections.allKatakana),
            nextStepBlockedError: () => kanaIsSelectedTopic ? NOT_ENOUGH_KANA : NOT_ENOUGH_WORDS
        },
        {
            iconType: FontAwesomeIconType.ClipboardQuestion,
            ID: PageType.QuizSummary,
            title: "Review"
        },
    ];

    const wizardCompleteConfig = {
        text: "Start",
        onComplete: () => setPage(PageType.KanaQuiz)
    };

    const isInQuiz = page === PageType.KanaQuiz || page === PageType.QuizRecap;

    const pageClasses = ["page"];
    if (isInQuiz) pageClasses.push("is-in-quiz");

    // window innerheight & innerwidth is used instead
    // of 100vw and 100vw to account for browser elements
    const appStyle = {
        height: windowHeight,
        width: windowWidth
    };

    return (
        <>
            <NotificationCenter />
            <ModeContextProvider value = {{ mode, setMode }}>
                <KanaSelectionsContextProvider value = {{ kanaSelections, updateKanaSelections }}>
                    <QuizSelectionsContextProvider value = {{ quizSelections, updateQuizSelections }}>
                        <WordSelectionsContextProvider value = {{ wordSelections, updateWordSelections }}>
                            <div className = "app" style = {appStyle}>
                                <Header
                                    style = {dynamicWidth}
                                    onClick = {() => { setPage(PageType.QuizSelect); resetCarousel(state => !state); }}
                                />

                                <div className = {pageClasses.join(" ")} style = {dynamicWidth}>
                                    {PAGES[page]()}
                                </div>
                                
                                {!isInQuiz && <StepWizard
                                    key = {carouselKey.toString()}
                                    className = "page-wizard"
                                    completeConfig = {wizardCompleteConfig}
                                    steps = {pageSteps}
                                    onStepChange = {onStepChange}
                                    showCheckOnComplete = {true}
                                    style = {dynamicWidth}
                                    startingStepID = {pageSteps[0].ID}
                                />}
                            </div>
                        </WordSelectionsContextProvider>
                    </QuizSelectionsContextProvider>
                </KanaSelectionsContextProvider>
            </ModeContextProvider>
        </>
    );
};

export default App
