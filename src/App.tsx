import { StepCarousel } from '@/common/components';
import { ReactNode, StepState } from '@/common/types';
import { useState } from "react";
import '@/styles/App.scss';
import { PageType } from '@/types';
import { SCREEN_PARTIAL_FILL_SIZE, SCREEN_FILL_SIZE, PAGES, PAGE_STEPS, SCREEN_FILL_PERCENT, SCREEN_PARTIAL_FILL_PERCENT } from './utils/constants';
import useDynamicWidth from './common/hooks/useDynamicWidth';
import useWindowSize from './common/hooks/useWindowSize';

const App = () : JSX.Element => {
    const [page, setPage] = useState<ReactNode>(PAGES[PageType.KanaSelect]);
    const [windowWidth, windowHeight] = useWindowSize();
    const dynamicWidth = useDynamicWidth(
        SCREEN_PARTIAL_FILL_SIZE,
        SCREEN_PARTIAL_FILL_PERCENT,
        SCREEN_FILL_SIZE,
        SCREEN_FILL_PERCENT
    );

    const onStepChange: StepState = ({ newStepID }) => {
        setPage(PAGES[newStepID as PageType]);
    };

    // window.innerheight / width is used instead of 100vw and 100vw to account for browser elements
    const appStyle = {
        height: windowHeight,
        width: windowWidth
    };

    return (
        <div className = "app" style = {appStyle}>
            <div className = "page" style = {dynamicWidth}>
                {page}
            </div>
            <StepCarousel
                className = "page-carousel"
                steps = {PAGE_STEPS}
                onStepChange = {onStepChange}
                showCheckOnComplete = {true}
                style = {dynamicWidth}
            />
        </div>
    );
};

export default App
