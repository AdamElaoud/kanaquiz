import { Button, Toggle, TabSet, Tab, Searchbar } from "@/common/components";
import { FontAwesomeIconType, Size, ToggleButtonConfig } from "@/common/types";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { useState } from "react";
import { Mode } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import { ModeContextProvider } from "@/hooks/useMode";
import { KanaSelectionsContextProvider } from "@/hooks/useKanaSelections";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import "./KanaSelection.scss";
import { ENGLISH_DELIMITERS, JAPANESE_DELIMITERS, SCREEN_FILL_SIZE, SCREEN_PARTIAL_FILL_SIZE } from "@/utils/constants";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";

const KanaSelection = () : JSX.Element => {
    const [kanaSelections, setKanaSelections] = useLocalStorage<string[]>("kana-selections", []);
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const { hiragana, katakana, lookalikes, search } = useKanaDictionary();
    const dynamicSearchBarWidth = useDynamicWidth(
        SCREEN_PARTIAL_FILL_SIZE,
        50,
        SCREEN_FILL_SIZE,
        90
    );

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);
    const lookalikesGroups = Object.values(lookalikes.groupsToChars);

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

    const toggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { text: 'Show Kana', onClick: () => setMode(Mode.Kana) },
        { text: 'Show Romaji', onClick: () => setMode(Mode.Romaji) }
    ];

    return (
        <KanaSelectionsContextProvider value = {{ kanaSelections, updateKanaSelections }}>
            <ModeContextProvider value = {mode}>
                <div className = "kana-selection-page">
                    <div className = "options-bar">
                        <Toggle buttons = {toggleButtons}/>
                        <Button iconType = {FontAwesomeIconType.Gear} iconSize = {Size.Medium} onClick = {() => console.log("settings!")} />
                    </div>

                    <Searchbar
                        searchFn = {searchFn}
                        delimiters = {[...ENGLISH_DELIMITERS, ...JAPANESE_DELIMITERS]}
                        placeholder = "Search for Kana"
                        style = {dynamicSearchBarWidth}
                    />

                    <TabSet className = "selection-tabset">
                        <Tab title = "ひ Hiragana" tabID = {0}>
                            {hiraganaGroups.map(group =>
                                // key is first Kana in group
                                <KanaButtonRow key = {group[0][Mode.Kana]} row = {group}/>
                            )}
                        </Tab>
                        <Tab title = "カ Katakana" tabID = {1}>
                            {katakanaGroups.map(group =>
                                // key is first Kana in group
                                <KanaButtonRow key = {group[0][Mode.Kana]} row = {group}/>
                            )}
                        </Tab>
                        <Tab title = "Look-Alikes" tabID = {2}>
                            {lookalikesGroups.map(group =>
                                // key is first Kana in group
                                <KanaButtonRow key = {group[0][Mode.Kana]} row = {group}/>
                            )}
                        </Tab>
                    </TabSet>
                </div>
            </ModeContextProvider>
        </KanaSelectionsContextProvider>
    );
};

export default KanaSelection;