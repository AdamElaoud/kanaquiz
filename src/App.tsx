import { StepCarousel } from '@/common/components';
import { StepState } from '@/common/types';
import { useState, useLayoutEffect } from "react";
import '@/styles/App.scss';
import { Mode, PageType } from '@/types';
import { SCREEN_PARTIAL_FILL_WIDTH, SCREEN_FILL_WIDTH, PAGES, PAGE_STEPS, SCREEN_FILL_PERCENT, SCREEN_PARTIAL_FILL_PERCENT } from './utils/constants';
import useDynamicWidth from './common/hooks/useDynamicWidth';
import useWindowSize from './common/hooks/useWindowSize';
import { ModeContextProvider } from './hooks/useMode';
import Header from './components/header/Header';

const App = () : JSX.Element => {
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const [page, setPage] = useState<PageType>(PageType.QuizSelect);
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

    const onStepChange = ({ newStepID }: StepState) => {
        setPage(newStepID as PageType);
    };

    // window innerheight & innerwidth is used instead
    // of 100vw and 100vw to account for browser elements
    const appStyle = {
        height: windowHeight,
        width: windowWidth
    };

    return (
        <ModeContextProvider value = {{ mode, setMode }}>
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
        </ModeContextProvider>
    );
};

export default App
