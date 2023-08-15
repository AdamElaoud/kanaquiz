import { ToggleButton } from "@/common/components";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { Side, ToggleButtonConfig } from "@/common/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import SummaryItem from "@/components/summary-item/SummaryItem";
import WordSelectionDisplay from "@/components/word-selection-display/WordSelectionDisplay";
import useKanaSelections from "@/hooks/useKanaSelections";
import useMode from "@/hooks/useMode";
import useQuizSelections from "@/hooks/useQuizSelections";
import useWordSelections from "@/hooks/useWordSelections";
import { Mode, QuizTopic } from "@/types";
import { SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH, SUMMARY_DISPLAY } from "@/utils/constants";
import { getRowsFromSelections } from "@/utils/utils";

import "./QuizSummary.scss";
import { buildClassNames } from "@/common/utils/utils";

const QuizSummary = () : JSX.Element => {
    const dynamicSummaryWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);
    const { quizSelections } = useQuizSelections();
    const { kanaSelections } = useKanaSelections();
    const { wordSelections } = useWordSelections();
    const { mode, setMode } = useMode();

    const topicIsKana = quizSelections.topic === QuizTopic.Kana;
    const selectionGroupsToChars = getRowsFromSelections(kanaSelections);
    const selectionGroups = Object.values(selectionGroupsToChars);
    const selectionGroupIDs = Object.keys(selectionGroupsToChars);

    const displayModeToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { content: 'Kana', onClick: () => setMode(Mode.Kana) },
        { content: 'Romaji', onClick: () => setMode(Mode.Romaji) }
    ];

    const defaultActiveSide = mode === Mode.Kana ? Side.Left : Side.Right;

    const topicSelectionItemsClasses = buildClassNames({ "topic-is-kana": topicIsKana}, ["topic-selections-items"]);

    return (
        <div className = "quiz-summary-page">
            <div className = "call-to-action">
                Review your selections
            </div>

            <div className = "selections-summary" style = {dynamicSummaryWidth}>
                <div className = "summary-title">
                    Quiz Selections
                </div>
                <div className = "summary-items">
                    <SummaryItem title = "Topic">
                        {SUMMARY_DISPLAY[quizSelections.topic]()}
                    </SummaryItem>
                    <SummaryItem title = "Translate">
                        {SUMMARY_DISPLAY[quizSelections.direction]()}
                    </SummaryItem>
                    <SummaryItem title = "Answer">
                        {SUMMARY_DISPLAY[quizSelections.format]()}
                    </SummaryItem>
                    <SummaryItem title = "Questions">
                        {quizSelections.amount}
                    </SummaryItem>
                </div>
            </div>

            <div className = "selections-summary"  style = {dynamicSummaryWidth}>
                <div className = "summary-title">
                    {topicIsKana ? "Kana Selections" : "Word Selections"}
                </div>

                <div className = "topic-selections">
                    {topicIsKana && <ToggleButton buttons = {displayModeToggleButtons} defaultActiveSide = {defaultActiveSide}/>}
                    <div className = {topicSelectionItemsClasses}>
                        {topicIsKana && <div className = "kana-selections-container">
                            {/* // container is necessary to add space between scrollbar and side of element */}
                            {selectionGroups.map((group, index) => {
                                const groupID = selectionGroupIDs[index];
                                return <KanaButtonRow
                                    key = {groupID}
                                    disableOnClick = {true}
                                    row = {group}
                                    groupID = {groupID}
                                    hideSelectAllButton = {true}
                                />;
                            })}

                        </div>}
                        {!topicIsKana && <>
                            <WordSelectionDisplay isChecked = {wordSelections.allHiragana} title = "Hiragana Words"/>
                            <WordSelectionDisplay isChecked = {wordSelections.allKatakana} title = "Katakana Words"/>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizSummary;