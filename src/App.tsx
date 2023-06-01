import { StepCarousel } from '@/common/components';
import { ReactNode, StepState } from '@/common/types';
import { useState } from "react";
import '@/styles/App.scss';
import { PageType } from '@/types';
import useWindowSize from './common/hooks/useWindowSize';
import { PAGES, PAGE_STEPS } from './utils/constants';

const App = () : JSX.Element => {
    const [windowWidth] = useWindowSize();
    const [page, setPage] = useState<ReactNode>(PAGES[PageType.KanaSelect]);

    const onStepChange: StepState = ({ newStepID }) => {
        setPage(PAGES[newStepID as PageType]);
    };

    const variableWidth = { width: getWidth(windowWidth) };

    return (
        <div className = "app">
            <div className = "page" style = {variableWidth}>
                {page}
            </div>
            <StepCarousel
                className = "page-carousel"
                steps = {PAGE_STEPS}
                onStepChange = {onStepChange}
                showCheckOnComplete = {true}
                style = {variableWidth}
            />
        </div>
    );
};

const FILL_SCREEN_SIZE = 800; // pixel width at which contents will fill X% of the screen
const SCREEN_FILL_PERCENT = 100; // percentage contents should fill the screen for the above size
const FILL_PARTIAL_SCREEN_SIZE = 1440; // pixel width at which contents will fill only X% of the screen
const SCREEN_PARTIAL_FILL_PERCENT = 65; // percentage contents should fill the screen for the above size
const getWidth = (currentWidth: number) => {
    const max = FILL_PARTIAL_SCREEN_SIZE;
    const min = FILL_SCREEN_SIZE;

    if (currentWidth <= min) return `${SCREEN_FILL_PERCENT}%`;
    if (currentWidth >= max) return `${SCREEN_PARTIAL_FILL_PERCENT}%`;

    const range = max - min;
    const value = currentWidth - min;

    return `${(value / range * 100) + SCREEN_PARTIAL_FILL_PERCENT}%`
};

export default App
