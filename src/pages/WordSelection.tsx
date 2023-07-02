import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { ReactFormOnSubmitEvent } from "@/common/types";
import WordGroupSection from "@/components/word-group-section/WordGroupSection";
import useWordSelections from "@/hooks/useWordSelections";
import { SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";

import "./WordSelection.scss";

const WordSelection = () : JSX.Element => {
    const dynamicWordOptionsWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);
    const { wordSelections, updateWordSelections } = useWordSelections();

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };

    return (
        <div className = "word-selection-page">
            <div className = "call-to-action">
                Select the words you would like to practice!
            </div>

            <form className = "word-options" style = {dynamicWordOptionsWidth} onSubmit = {onSubmit}>
                <WordGroupSection
                    title = "Hiragana Words"
                    onActivate = {() => updateWordSelections({ ...wordSelections, allHiragana: true })}
                    onDeactivate = {() => updateWordSelections({ ...wordSelections, allHiragana: false })}
                    startDeactivated = {!wordSelections.allHiragana}
                />
                <WordGroupSection
                    title = "Katakana Words"
                    onActivate = {() => updateWordSelections({ ...wordSelections, allKatakana: true })}
                    onDeactivate = {() => updateWordSelections({ ...wordSelections, allKatakana: false })}
                    startDeactivated = {!wordSelections.allKatakana}
                />
            </form>
        </div>
    );
};

export default WordSelection;

