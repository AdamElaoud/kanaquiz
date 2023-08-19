// import { StrictMode } from 'react';
import App from '@/App';
import { ErrorPage } from '@/common/components';
import KanaQuiz from '@/pages/KanaQuiz';
import KanaSelection from '@/pages/KanaSelection';
import QuizRecap from '@/pages/QuizRecap';
import QuizSelection from '@/pages/QuizSelection';
import QuizSummary from '@/pages/QuizSummary';
import WordSelection from '@/pages/WordSelection';
import { PageRoute, QuizSelectionData, QuizTopic, WordSelectionData } from '@/types';
import { KANA_SELECTION_STORAGE_KEY, QUIZ_SELECTION_STORAGE_KEY, WORD_SELECTION_STORAGE_KEY } from '@/utils/constants';
import { createRoot } from 'react-dom/client';
import { createHashRouter, redirect, RouterProvider } from 'react-router-dom';

// Hash router is required here because we don't have control over the server
// due to hosting being provided by github pages
const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage homepagePath = {PageRoute.QuizSelect}/>,
        children: [
            {
                index: true,
                element: <QuizSelection />
            },
            {
                path: PageRoute.KanaSelect,
                loader: () => {
                    const data = localStorage.getItem(QUIZ_SELECTION_STORAGE_KEY);

                    if (!data) return redirect(PageRoute.QuizSelect);

                    const quizSelections = JSON.parse(data) as QuizSelectionData;
                    // this condition check MUST match the logic in the corresponding
                    // step wizard "blockNextStep" attribute
                    if (quizSelections.amount === "") return redirect(PageRoute.QuizSelect);

                    return null;
                },
                element: <KanaSelection />
            },
            {
                path: PageRoute.WordSelect,
                loader: () => {
                    const data = localStorage.getItem(QUIZ_SELECTION_STORAGE_KEY);

                    if (!data) return redirect(PageRoute.QuizSelect);

                    const quizSelections = JSON.parse(data) as QuizSelectionData;
                    // this condition check MUST match the logic in the corresponding
                    // step wizard "blockNextStep" attribute
                    if (quizSelections.amount === "") return redirect(PageRoute.QuizSelect);

                    return null;
                },
                element: <WordSelection />
            },
            {
                path: PageRoute.QuizSummary,
                loader: () => {
                    const quizData = localStorage.getItem(QUIZ_SELECTION_STORAGE_KEY);

                    if (!quizData) return redirect(PageRoute.QuizSelect);

                    const quizSelections = JSON.parse(quizData) as QuizSelectionData;
                    const kanaIsSelectedTopic = quizSelections.topic === QuizTopic.Kana;

                    if (kanaIsSelectedTopic) {
                        const kanaData = localStorage.getItem(KANA_SELECTION_STORAGE_KEY);

                        if (!kanaData) return redirect(PageRoute.KanaSelect);
                        
                        const kanaSelections = JSON.parse(kanaData) as string[];

                        // this condition check MUST match the logic in the corresponding
                        // step wizard "blockNextStep" attribute
                        if (kanaSelections.length < 3) return redirect(PageRoute.KanaSelect);

                    } else {
                        const wordData = localStorage.getItem(WORD_SELECTION_STORAGE_KEY);

                        if (!wordData) return redirect(PageRoute.WordSelect);
                        
                        const wordSelections = JSON.parse(wordData) as WordSelectionData;

                        // this condition check MUST match the logic in the corresponding
                        // step wizard "blockNextStep" attribute
                        if (!wordSelections.allHiragana && !wordSelections.allKatakana) return redirect(PageRoute.WordSelect);
                    }

                    return null;
                },
                element: <QuizSummary />
            },
            {
                path: PageRoute.KanaQuiz,
                loader: () => redirect(PageRoute.QuizSelect),
                element: <KanaQuiz />
            },
            {
                path: PageRoute.QuizRecap,
                loader: () => redirect(PageRoute.QuizSelect),
                element: <QuizRecap />
            },
        ]
    }
]);

createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router = {router} />
);
