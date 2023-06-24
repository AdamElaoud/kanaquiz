import { TabSet, Tab, Searchbar, ToggleButton } from "@/common/components";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { Mode, TabID } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import { KanaSelectionsContextProvider } from "@/hooks/useKanaSelections";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import "./KanaSelection.scss";
import { ENGLISH_DELIMITERS, JAPANESE_DELIMITERS } from "@/utils/constants";
import { Side, TabState, ToggleButtonConfig } from "@/common/types";
import useMode from "@/hooks/useMode";
import { useRef } from "react";

const KanaSelection = () : JSX.Element => {
    const [selectedTabID, setSelectedTabID] = useLocalStorage<number>("kana-selections-tab", TabID.Hiragana);
    const [kanaSelections, setKanaSelections] = useLocalStorage<string[]>("kana-selections", []);
    const { hiragana, katakana, lookalikes, search } = useKanaDictionary();
    const { mode, setMode } = useMode();
    const toggleRef = useRef<HTMLDivElement>(null);

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);
    const lookalikesGroups = Object.values(lookalikes.groupsToChars);
    
    const hiraganaGroupIDs = Object.keys(hiragana.groupsToChars);
    const katakanaGroupIDs = Object.keys(katakana.groupsToChars);
    const lookalikesGroupIDs = Object.keys(lookalikes.groupsToChars);

    const updateKanaSelections = (letters: string[], addOnly?: boolean) => {
        const updatedSelections = [...kanaSelections];

        letters.forEach(letter => {
            if (kanaSelections.includes(letter)) {
                if (!addOnly) {
                    const letterIndex = updatedSelections.findIndex(selection => selection === letter);
                    updatedSelections.splice(letterIndex, 1);
                }
    
            } else {
                updatedSelections.push(letter);
            }
        });

        setKanaSelections(updatedSelections);
    };

    const searchFn = (_rawSearch: string, queries: string[]) => search(queries);

    const onTabChange = ({ newTabID }: TabState) => {
        setSelectedTabID(newTabID);
    };

    const displayModeToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { content: 'Kana', onClick: () => setMode(Mode.Kana) },
        { content: 'Romaji', onClick: () => setMode(Mode.Romaji) }
    ];

    const defaultActiveSide = mode === Mode.Kana ? Side.Left : Side.Right;

    return (
        <KanaSelectionsContextProvider value = {{ kanaSelections, updateKanaSelections }}>
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
        </KanaSelectionsContextProvider>
    );
};

export default KanaSelection;