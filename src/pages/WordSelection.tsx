import { ToggleSwitch } from "@/common/components";
import "./WordSelection.scss";
import useWordSelections from "@/hooks/useWordSelections";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import { ReactFormOnSubmitEvent } from "@/common/types";

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
                />
                <WordGroupSection
                    title = "Katakana Words"
                    onActivate = {() => updateWordSelections({ ...wordSelections, allKatakana: true })}
                    onDeactivate = {() => updateWordSelections({ ...wordSelections, allKatakana: false })}
                />
            </form>
        </div>
    );
};

export default WordSelection;

interface WordGroupSectionProps {
    onActivate: () => void,
    onDeactivate: () => void,
    title: string
};

const WordGroupSection = (props: WordGroupSectionProps) : JSX.Element => {
    const { onActivate, onDeactivate, title } = props;

    return (
        <div className = "word-group-section" >
            <ToggleSwitch
                onActivate = {onActivate}
                onDeactivate = {onDeactivate}
            />
            <span className = "word-group-title">
                {title}
            </span>
        </div>
    );
};