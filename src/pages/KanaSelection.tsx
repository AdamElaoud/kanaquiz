import { Button, ButtonGroup, Searchbar, TabContent, TabHeaders, TabSet } from "@/common/components";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import useWindowSize from "@/common/hooks/useWindowSize";
import { TabConfig, TabState } from "@/common/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import TabButtonRow from "@/components/tab-button-row/TabButtonRow";
import TitleWithBadge from "@/components/title-with-badge/TitleWithBadge";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import useKanaSelections from "@/hooks/useKanaSelections";
import useMode from "@/hooks/useMode";
import { Mode, TabID } from "@/types";
import { ENGLISH_DELIMITERS, JAPANESE_DELIMITERS, KANA_SELECTION_TAB_STORAGE_KEY, SCREEN_WIDTH_THRESHHOLD } from "@/utils/constants";
import { useMemo, useRef } from "react";

import "./KanaSelection.scss";

const KANA_BUTTON_ID = "kana-mode-button";
const ROMAJI_BUTTON_ID = "romaji-mode-button";

const KanaSelection = () : JSX.Element => {
    const [selectedTabID, setSelectedTabID] = useLocalStorage<number>(KANA_SELECTION_TAB_STORAGE_KEY, TabID.Hiragana);
    const [windowWidth] = useWindowSize();
    const { hiragana, katakana, lookalikes, search } = useKanaDictionary();
    const { kanaSelections, updateKanaSelections } = useKanaSelections();
    const { mode, setMode } = useMode();
    const toggleRef = useRef<HTMLDivElement>(null);

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);
    const lookalikesGroups = Object.values(lookalikes.groupsToChars);
    
    const hiraganaGroupIDs = Object.keys(hiragana.groupsToChars);
    const katakanaGroupIDs = Object.keys(katakana.groupsToChars);
    const lookalikesGroupIDs = Object.keys(lookalikes.groupsToChars);

    const hiraganaChars = new Set(hiraganaGroups.flat().map(letter => letter[Mode.ID]));
    const hiraganaCount = kanaSelections.reduce((count, selection) => {
        if (hiraganaChars.has(selection)) return count + 1;
        return count;
    }, 0);

    const katakanaChars = new Set(katakanaGroups.flat().map(letter => letter[Mode.ID]));
    const katakanaCount = kanaSelections.reduce((count, selection) => {
        if (katakanaChars.has(selection)) return count + 1;
        return count;
    }, 0);

    const lookalikesChars = new Set(lookalikesGroups.flat().map(letter => letter[Mode.ID]));
    const lookalikesCount = kanaSelections.reduce((count, selection) => {
        if (lookalikesChars.has(selection)) return count + 1;
        return count;
    }, 0);

    const searchFn = (_rawSearch: string, queries: string[]) => search(queries);

    const onTabChange = ({ newTabIndex: newTabID }: TabState) => {
        setSelectedTabID(newTabID);
    };

    const pageTabs: TabConfig[] = useMemo(() => [
        {
            title: () => <TitleWithBadge title = "Hiragana" count = {hiraganaCount}/>,
            ID: TabID.Hiragana,
            content: () => <>
                <TabButtonRow groups = {hiraganaGroups.flat()} updateKanaSelections = {updateKanaSelections}/>
                {hiraganaGroups.map((group, index) => {
                    const groupID = hiraganaGroupIDs[index];
                    return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                })}
            </>
        },
        {
            title: () => <TitleWithBadge title = "Katakana" count = {katakanaCount}/>,
            ID: TabID.Katakana,
            content: () => <>
                <TabButtonRow groups = {katakanaGroups.flat()} updateKanaSelections = {updateKanaSelections}/>
                {katakanaGroups.map((group, index) => {
                    const groupID = katakanaGroupIDs[index];
                    return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                })}
            </>
        },
        {
            title: () => <TitleWithBadge title = "Similar" count = {lookalikesCount}/>,
            ID: TabID.Lookalikes,
            content: () => <>
                <TabButtonRow groups = {lookalikesGroups.flat()} updateKanaSelections = {updateKanaSelections}/>
                {lookalikesGroups.map((group, index) => {
                    const groupID = lookalikesGroupIDs[index];
                    return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                })}
            </>
        },
    ], [
        hiraganaCount,
        hiraganaGroupIDs,
        hiraganaGroups,
        katakanaCount,
        katakanaGroupIDs,
        katakanaGroups,
        lookalikesCount,
        lookalikesGroupIDs,
        lookalikesGroups,
        updateKanaSelections
    ]);

    const defaultMode = mode === Mode.Kana ? KANA_BUTTON_ID : ROMAJI_BUTTON_ID;

    const inMobileDeviceThreshhold = windowWidth < SCREEN_WIDTH_THRESHHOLD;

    return (
        <div className = "kana-selection-page">
            <div className = "call-to-action">
                Select the Kana you would like to practice!
            </div>

            <div className = "actions-bar">
                <Searchbar
                    searchFn = {searchFn}
                    delimiters = {[...ENGLISH_DELIMITERS, ...JAPANESE_DELIMITERS]}
                    placeholder = "Search for Kana"
                    nonBlurTargets = {toggleRef.current ? [toggleRef.current] : []}
                    openInModal = {inMobileDeviceThreshhold}
                    showButtonText = {inMobileDeviceThreshhold}
                    alwaysShowResults = {inMobileDeviceThreshhold}
                />

                {/* <ToggleButton ref = {toggleRef} buttons = {displayModeToggleButtons} defaultActiveSide = {defaultActiveSide}/> */}
                <ButtonGroup defaultActiveButton = {defaultMode}>
                    <Button id = {KANA_BUTTON_ID} onClick = {() => setMode(Mode.Kana)}>
                        Kana
                    </Button>
                    <Button id = {ROMAJI_BUTTON_ID} onClick = {() => setMode(Mode.Romaji)}>
                        Romaji
                    </Button>
                </ButtonGroup>
            </div>

            <TabSet
                className = "kana-selection-tabset"
                tabs = {pageTabs}
                onTabChange = {onTabChange}
                startingTabID = {selectedTabID}
            >
                <TabHeaders />
                <TabContent />
            </TabSet>
        </div>
    );
};

export default KanaSelection;