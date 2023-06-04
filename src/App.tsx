import { StepCarousel } from '@/common/components';
import { ReactNode, StepState } from '@/common/types';
import { useLayoutEffect, useState } from "react";
import '@/styles/App.scss';
import { Mode, PageType } from '@/types';
import { SCREEN_PARTIAL_FILL_WIDTH, SCREEN_FILL_WIDTH, PAGES, PAGE_STEPS, SCREEN_FILL_PERCENT, SCREEN_PARTIAL_FILL_PERCENT } from './utils/constants';
import useDynamicWidth from './common/hooks/useDynamicWidth';
import useWindowSize from './common/hooks/useWindowSize';
import { ModeContextProvider } from './hooks/useMode';
import Header from './components/header/Header';

const App = () : JSX.Element => {
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const [page, setPage] = useState<ReactNode>(PAGES[PageType.KanaSelect]);
    const [windowWidth, windowHeight] = useWindowSize();
    const dynamicWidth = useDynamicWidth(
        SCREEN_PARTIAL_FILL_WIDTH,
        SCREEN_PARTIAL_FILL_PERCENT,
        SCREEN_FILL_WIDTH,
        SCREEN_FILL_PERCENT
    );

    useLayoutEffect(() => {
        const lockOrientation = async () => {
            try {
                const locked = await screen.orientation.lock("portrait") as unknown;
                const status = locked ? "has been DISABLED" : "will remain ENABLED";
                console.log(`Looks like you're probably on a mobile device. Screen rotation ${status}.`);

            } catch (error) {
                console.log("Looks like you're not using a mobile device. Screen rotation will remain ENABLED.");
            }
        };

        // typically screen.orientation.lock is only supported on
        // mobile browsers, but this check is just to be safe
        if (windowWidth < windowHeight)
            lockOrientation();

    }, [windowHeight, windowWidth]);

    const onStepChange: StepState = ({ newStepID }) => {
        setPage(PAGES[newStepID as PageType]);
    };

    // window innerheight & innerwidth is used instead of 100vw and 100vw to account for browser elements
    const appStyle = {
        height: windowHeight,
        width: windowWidth
    };

    return (
        <ModeContextProvider value = {{ mode, setMode }}>
            <div className = "app" style = {appStyle}>
                <Header showToggle = {page === PAGES[PageType.KanaSelect]} style = {dynamicWidth}/>
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
        </ModeContextProvider>
    );
};

export default App
