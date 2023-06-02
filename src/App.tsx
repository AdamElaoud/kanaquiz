import { StepCarousel } from '@/common/components';
import { ReactNode, StepState } from '@/common/types';
import { useState } from "react";
import '@/styles/App.scss';
import { PageType } from '@/types';
import useWindowSize from './common/hooks/useWindowSize';
import { SCREEN_PARTIAL_FILL_SIZE, SCREEN_FILL_SIZE, PAGES, PAGE_STEPS, SCREEN_FILL_PERCENT, SCREEN_PARTIAL_FILL_PERCENT } from './utils/constants';

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

const getWidth = (currentWidth: number) => {
    const max = SCREEN_PARTIAL_FILL_SIZE;
    const min = SCREEN_FILL_SIZE;

    if (currentWidth <= min) return `${SCREEN_FILL_PERCENT}%`;
    if (currentWidth >= max) return `${SCREEN_PARTIAL_FILL_PERCENT}%`;

    const range = max - min;
    const value = currentWidth - min;

    const percentage = value / range * (SCREEN_FILL_PERCENT - SCREEN_PARTIAL_FILL_PERCENT);

    return `${SCREEN_FILL_PERCENT - percentage}%`
};

export default App
