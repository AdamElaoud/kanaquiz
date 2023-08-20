import { Button, ButtonGroup } from "@/common/components";
import { buildClassNames } from "@/common/utils/utils";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import Section from "@/components/section/Section";
import SummaryItem from "@/components/summary-item/SummaryItem";
import WordSelectionDisplay from "@/components/word-selection-display/WordSelectionDisplay";
import useKanaSelections from "@/hooks/useKanaSelections";
import useMode from "@/hooks/useMode";
import useQuizSelections from "@/hooks/useQuizSelections";
import useWordSelections from "@/hooks/useWordSelections";
import { Mode, QuizTopic } from "@/types";
import { SUMMARY_DISPLAY } from "@/utils/constants";
import { getRowsFromSelections } from "@/utils/utils";

import "./QuizSummary.scss";

const KANA_BUTTON_ID = "kana-mode-button";
const ROMAJI_BUTTON_ID = "romaji-mode-button";

const QuizSummary = () : JSX.Element => {
    const { quizSelections } = useQuizSelections();
    const { kanaSelections } = useKanaSelections();
    const { wordSelections } = useWordSelections();
    const { mode, setMode } = useMode();

    const topicIsKana = quizSelections.topic === QuizTopic.Kana;
    const selectionGroupsToChars = getRowsFromSelections(kanaSelections);
    const selectionGroups = Object.values(selectionGroupsToChars);
    const selectionGroupIDs = Object.keys(selectionGroupsToChars);

    const defaultMode = mode === Mode.Kana ? KANA_BUTTON_ID : ROMAJI_BUTTON_ID;

    const topicSelectionItemsClasses = buildClassNames({ "topic-is-kana": topicIsKana}, ["topic-selections-items"]);

    return (
        <div className = "quiz-summary-page">
            <div className = "call-to-action">
                Review your selections
            </div>

            <Section title = "Quiz Selections">
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
            </Section>

            <Section title = {topicIsKana ? "Kana Selections" : "Word Selections"}>
                <div className = "topic-selections">
                    {topicIsKana && <ButtonGroup defaultActiveButton = {defaultMode}>
                        <Button id = {KANA_BUTTON_ID} onClick = {() => setMode(Mode.Kana)}>
                            Kana
                        </Button>
                        <Button id = {ROMAJI_BUTTON_ID} onClick = {() => setMode(Mode.Romaji)}>
                            Romaji
                        </Button>                        
                    </ButtonGroup>}
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
            </Section>
        </div>
    );
};

export default QuizSummary;