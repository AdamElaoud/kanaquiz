import { Searchbar, Tab, TabSet, ToggleButton } from "@/common/components";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import useWindowSize from "@/common/hooks/useWindowSize";
import { Side, TabState, ToggleButtonConfig } from "@/common/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import TabButtonRow from "@/components/tab-button-row/TabButtonRow";
import TitleWithBadge from "@/components/title-with-badge/TitleWithBadge";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import useKanaSelections from "@/hooks/useKanaSelections";
import useMode from "@/hooks/useMode";
import { Mode, TabID } from "@/types";
import {
    ENGLISH_DELIMITERS,
    JAPANESE_DELIMITERS,
    KANA_SELECTION_TAB_STORAGE_KEY,
    SCREEN_WIDTH_THRESHHOLD
} from "@/utils/constants";
import { useRef } from "react";

import "./KanaSelection.scss";

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

    const displayModeToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { content: 'Kana', onClick: () => setMode(Mode.Kana) },
        { content: 'Romaji', onClick: () => setMode(Mode.Romaji) }
    ];

    const defaultActiveSide = mode === Mode.Kana ? Side.Left : Side.Right;

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

                <ToggleButton ref = {toggleRef} buttons = {displayModeToggleButtons} defaultActiveSide = {defaultActiveSide}/>
            </div>


            <TabSet className = "kana-selection-tabset" onTabChange = {onTabChange} startingTabID = {selectedTabID}>
                <Tab title = {<TitleWithBadge title = "Hiragana" count = {hiraganaCount}/>} tabID = {TabID.Hiragana}>
                    <>
                        <TabButtonRow groups = {hiraganaGroups.flat()} updateKanaSelections = {updateKanaSelections}/>
                        {hiraganaGroups.map((group, index) => {
                            const groupID = hiraganaGroupIDs[index];
                            return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                        })}
                    </>
                </Tab>
                <Tab title = {<TitleWithBadge title = "Katakana" count = {katakanaCount}/>} tabID = {TabID.Katakana}>
                    <>
                        <TabButtonRow groups = {katakanaGroups.flat()} updateKanaSelections = {updateKanaSelections}/>
                        {katakanaGroups.map((group, index) => {
                            const groupID = katakanaGroupIDs[index];
                            return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                        })}
                    </>
                </Tab>
                <Tab title = {<TitleWithBadge title = "Similar" count = {lookalikesCount}/>} tabID = {TabID.Lookalikes}>
                    <>
                        <TabButtonRow groups = {lookalikesGroups.flat()} updateKanaSelections = {updateKanaSelections}/>
                        {lookalikesGroups.map((group, index) => {
                            const groupID = lookalikesGroupIDs[index];
                            return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                        })}
                    </>
                </Tab>
            </TabSet>
        </div>
    );
};

export default KanaSelection;