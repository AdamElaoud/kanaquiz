// import { StrictMode } from 'react';
import App from '@/App';
import { ErrorPage } from '@/common/components';
import KanaQuiz from '@/pages/KanaQuiz';
import KanaSelection from '@/pages/KanaSelection';
import QuizRecap from '@/pages/QuizRecap';
import QuizSelection from '@/pages/QuizSelection';
import QuizSummary from '@/pages/QuizSummary';
import WordSelection from '@/pages/WordSelection';
import { PageRoute } from '@/types';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
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
