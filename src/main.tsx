// import { StrictMode } from 'react';
import App from '@/App';
import KanaQuiz from '@/pages/KanaQuiz';
import KanaSelection from '@/pages/KanaSelection';
import QuizRecap from '@/pages/QuizRecap';
import QuizSelection from '@/pages/QuizSelection';
import QuizSummary from '@/pages/QuizSummary';
import WordSelection from '@/pages/WordSelection';
import { PageRoute } from '@/types';
import { createRoot } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

// This app is functionally a large guided Step Wizard. As such,
// it does not make sense to allow the user to jump to particular
// pages via the URL, effectively skipping steps. As such, Memory
// Router is being used instead of Browser router to avoid
// putting paths into the URL
const router = createMemoryRouter([
    {
        path: "/",
        element: <App />,
        errorElement: "404 coming soon",
        children: [
            {
                index: true,
                element: <QuizSelection />
            },
            {
                path: PageRoute.KanaSelect,
                element: <KanaSelection />
            },
            {
                path: PageRoute.WordSelect,
                element: <WordSelection />
            },
            {
                path: PageRoute.QuizSummary,
                element: <QuizSummary />
            },
            {
                path: PageRoute.KanaQuiz,
                element: <KanaQuiz />
            },
            {
                path: PageRoute.QuizRecap,
                element: <QuizRecap />
            },
        ]
    }
]);

createRoot(document.getElementById('root') as HTMLElement).render(
    <RouterProvider router = {router} />
);
