import { TabSet, Tab, Searchbar, ToggleButton } from "@/common/components";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { Mode, TabID } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import "./KanaSelection.scss";
import { ENGLISH_DELIMITERS, JAPANESE_DELIMITERS, KANA_SELECTION_TAB_STORAGE_KEY, SCREEN_WIDTH_THRESHHOLD } from "@/utils/constants";
import { Side, TabState, ToggleButtonConfig } from "@/common/types";
import useMode from "@/hooks/useMode";
import { useRef } from "react";
import useWindowSize from "@/common/hooks/useWindowSize";

const KanaSelection = () : JSX.Element => {
    const [selectedTabID, setSelectedTabID] = useLocalStorage<number>(KANA_SELECTION_TAB_STORAGE_KEY, TabID.Hiragana);
    const [windowWidth] = useWindowSize();
    const { hiragana, katakana, lookalikes, search } = useKanaDictionary();
    const { mode, setMode } = useMode();
    const toggleRef = useRef<HTMLDivElement>(null);

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);
    const lookalikesGroups = Object.values(lookalikes.groupsToChars);
    
    const hiraganaGroupIDs = Object.keys(hiragana.groupsToChars);
    const katakanaGroupIDs = Object.keys(katakana.groupsToChars);
    const lookalikesGroupIDs = Object.keys(lookalikes.groupsToChars);

    const searchFn = (_rawSearch: string, queries: string[]) => search(queries);

    const onTabChange = ({ newTabID }: TabState) => {
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


            <TabSet className = "selection-tabset" onTabChange = {onTabChange} startingTabID = {selectedTabID}>
                <Tab title = "ひ Hiragana" tabID = {TabID.Hiragana}>
                    {hiraganaGroups.map((group, index) => {
                        const groupID = hiraganaGroupIDs[index];
                        return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                    })}
                </Tab>
                <Tab title = "カ Katakana" tabID = {TabID.Katakana}>
                    {katakanaGroups.map((group, index) => {
                        const groupID = katakanaGroupIDs[index];
                        return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                    })}
                </Tab>
                <Tab title = "Look-Alikes" tabID = {TabID.Lookalikes}>
                    {lookalikesGroups.map((group, index) => {
                        const groupID = lookalikesGroupIDs[index];
                        return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                    })}
                </Tab>
            </TabSet>
        </div>
    );
};

export default KanaSelection;