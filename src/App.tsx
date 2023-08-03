import { ErrorBoundary, Modal, NotificationCenter, StepWizard } from '@/common/components';
import useDynamicWidth from '@/common/hooks/useDynamicWidth';
import useLocalStorage from '@/common/hooks/useLocalStorage';
import useNotification from '@/common/hooks/useNotification';
import useWindowSize from '@/common/hooks/useWindowSize';
import { CustomIconType, FontAwesomeIconType, StepConfig, StepState } from '@/common/types';
import { isMobileDevice } from '@/common/utils/utils';
import Header from '@/components/header/Header';
import Settings from '@/components/settings/Settings';
import WelcomeMessage from '@/components/welcome-message/WelcomeMessage';
import KanaSelectionsProvider from '@/contexts/KanaSelectionsContext';
import ModeProvider from '@/contexts/ModeContext';
import QuizSelectionsProvider from '@/contexts/QuizSelectionsContext';
import SettingsProvider from '@/contexts/SettingsContext';
import WordSelectionsProvider from '@/contexts/WordSelectionsContext';
import { Mode, PageRoute, QuizDirection, QuizFormat, QuizSelectionData, QuizTopic, SettingsData, WordSelectionData } from '@/types';
import {
    DEFAULT_QUESTION_AMOUNT,
    KANA_SELECTION_STORAGE_KEY,
    NOT_ENOUGH_KANA,
    NOT_ENOUGH_QUESTIONS,
    NOT_ENOUGH_WORDS,
    ORIENTATION_WARNING,
    ORIENTATION_WARNING_ID,
    QUIZ_SELECTION_STORAGE_KEY,
    SCREEN_FILL_PERCENT,
    SCREEN_FILL_WIDTH,
    SCREEN_PARTIAL_FILL_PERCENT,
    SCREEN_PARTIAL_FILL_WIDTH,
    SETTINGS_KEY,
    SHOWN_WELCOME_MESSAGE_KEY,
    WORD_SELECTION_STORAGE_KEY
} from '@/utils/constants';
import { useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import '@/styles/App.scss';

const App = () : JSX.Element => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const pageRef = useRef<HTMLDivElement>(null);
    const closeModalButtonRef = useRef<HTMLButtonElement>(null);
    const settingOptionRef = useRef<HTMLButtonElement>(null);
    const [wizardKey, resetWizard] = useState<boolean>(false);
    const [pageKey, resetPage] = useState<boolean>(false);
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [settings, setSettings] = useLocalStorage<SettingsData>(SETTINGS_KEY, {
        autoFocusNextInput: true,
        showDefinitions: true,
        showRotationWarning: true
    }, { listenGlobal: true });
    const [shownWelcomeMessage, setShownWelcomeMessage] = useLocalStorage<boolean>(SHOWN_WELCOME_MESSAGE_KEY, false);
    const [kanaSelections, setKanaSelections] = useLocalStorage<string[]>(KANA_SELECTION_STORAGE_KEY, [], { listenGlobal: true });
    const [quizSelections, setQuizSelections] = useLocalStorage<QuizSelectionData>(QUIZ_SELECTION_STORAGE_KEY, {
        amount: DEFAULT_QUESTION_AMOUNT,
        direction: QuizDirection.JPtoEN,
        format: QuizFormat.MultipleChoice,
        topic: QuizTopic.Kana
    }, { listenGlobal: true });
    const [wordSelections, setWordSelections] = useLocalStorage<WordSelectionData>(WORD_SELECTION_STORAGE_KEY, {
        allHiragana: true,
        allKatakana: true
    }, { listenGlobal: true });
    const [windowWidth, windowHeight] = useWindowSize();
    const dynamicWidth = useDynamicWidth(
        SCREEN_PARTIAL_FILL_WIDTH,
        SCREEN_PARTIAL_FILL_PERCENT,
        SCREEN_FILL_WIDTH,
        SCREEN_FILL_PERCENT
    );
    const { warning, dismissOne } = useNotification();

    useLayoutEffect(() => {
        const isRotationWarningEnabled = settings.showRotationWarning && isMobileDevice();

        if (isRotationWarningEnabled && screen.orientation.type.includes("portrait"))
            dismissOne(ORIENTATION_WARNING_ID);
            
        if (isRotationWarningEnabled && screen.orientation.type.includes("landscape"))
            warning(ORIENTATION_WARNING, { autoClose: false, toastId: ORIENTATION_WARNING_ID });

    // a render is triggered on rotation due to the useWindowSize and useDynamicWidth hooks
    // this recalculation is desired only when the value of the screen orientation type has changed
    // eslint-disable-next-line
    }, [screen.orientation.type]);

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

    const onComplete = () => setShownWelcomeMessage(true);

    const onStepChange = ({ newStepID }: StepState) => {
        navigate(newStepID as string)
        pageRef.current?.scroll(0, 0);
    };

    const kanaIsSelectedTopic = quizSelections.topic === QuizTopic.Kana;

    const pageSteps: StepConfig[] = [
        {
            iconType: FontAwesomeIconType.Pencil,
            ID: PageRoute.QuizSelect,
            title: "Quiz",
            blockNextStep: () => quizSelections.amount === "",
            nextStepBlockedError: () => NOT_ENOUGH_QUESTIONS
        },
        {
            iconType: kanaIsSelectedTopic ? CustomIconType.Kana : FontAwesomeIconType.Book,
            ID: kanaIsSelectedTopic ? PageRoute.KanaSelect : PageRoute.WordSelect,
            title: kanaIsSelectedTopic ? "Kana" : "Words",
            blockNextStep: () => kanaIsSelectedTopic && kanaSelections.length < 3
                || !kanaIsSelectedTopic && (!wordSelections.allHiragana && !wordSelections.allKatakana),
            nextStepBlockedError: () => kanaIsSelectedTopic ? NOT_ENOUGH_KANA : NOT_ENOUGH_WORDS
        },
        {
            iconType: FontAwesomeIconType.ClipboardQuestion,
            ID: PageRoute.QuizSummary,
            title: "Review"
        },
    ];

    const wizardCompleteConfig = {
        text: "START",
        onComplete: () => navigate(PageRoute.KanaQuiz)
    };

    const isInQuiz = pathname === PageRoute.KanaQuiz || pathname === PageRoute.QuizRecap;

    const pageClasses = ["page"];
    if (isInQuiz) pageClasses.push("is-in-quiz");

    // window innerheight & innerwidth is used instead
    // of 100vw and 100vw to account for browser elements
    const appStyle = {
        height: windowHeight,
        width: windowWidth
    };

    return (
        <ErrorBoundary>
            <NotificationCenter />

            <Modal
                key = {`welcome-${shownWelcomeMessage}`}
                defaultOpen = {!shownWelcomeMessage}
                hideCloseButton = {true}
                onClose = {onComplete}
                initialFocusTarget = {closeModalButtonRef}
            >
                <WelcomeMessage ref = {closeModalButtonRef} onComplete = {onComplete}/>
            </Modal>

            <Modal
                key = {`settings-${showSettings}`}
                defaultOpen = {showSettings}
                onClose = {() => setShowSettings(false)}
                initialFocusTarget = {settingOptionRef}
            >
                <Settings
                    ref = {settingOptionRef}
                    settings = {settings}
                    setSettings = {setSettings}
                    isInQuiz = {isInQuiz}
                    onClearStorage = {() => { resetPage(state => !state); setShowSettings(false); }}
                />
            </Modal>

            <SettingsProvider value = {settings}>
                <ModeProvider value = {{ mode, setMode }}>
                    <KanaSelectionsProvider value = {{ kanaSelections, updateKanaSelections }}>
                        <QuizSelectionsProvider value = {{ quizSelections, updateQuizSelections }}>
                            <WordSelectionsProvider value = {{ wordSelections, updateWordSelections }}>
                                <div className = "app" style = {appStyle}>
                                    <Header
                                        style = {dynamicWidth}
                                        onClick = {() => { navigate(PageRoute.QuizSelect); resetWizard(state => !state); }}
                                        openSettings = {() => setShowSettings(true)}
                                    />

                                    <div key = {`page-${pageKey}`} ref = {pageRef} className = {pageClasses.join(" ")} style = {dynamicWidth}>
                                        <Outlet />
                                    </div>
                                    
                                    {!isInQuiz && <StepWizard
                                        key = {`wizard-${wizardKey}`}
                                        className = "page-wizard"
                                        completeConfig = {wizardCompleteConfig}
                                        steps = {pageSteps}
                                        onStepChange = {onStepChange}
                                        showCheckOnComplete = {true}
                                        style = {dynamicWidth}
                                        startingStepID = {pageSteps[0].ID}
                                    />}
                                </div>
                            </WordSelectionsProvider>
                        </QuizSelectionsProvider>
                    </KanaSelectionsProvider>
                </ModeProvider>
            </SettingsProvider>
        </ErrorBoundary>
    );
};

export default App
