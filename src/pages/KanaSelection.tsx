import { Button, Toggle, TabSet, Tab, Searchbar } from "@/common/components";
import { FontAwesomeIconType, Size, ToggleButtonConfig } from "@/common/types";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { useState } from "react";
import { Mode } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import { ModeContextProvider } from "@/hooks/useMode";
import { SelectionsContextProvider } from "@/hooks/useSelections";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import "./KanaSelection.scss";

const ENGLISH_DELIMITERS = [" ", ",", ", "];
const JAPANESE_DELIMITERS = ["　", "、"];

const KanaSelection = () : JSX.Element => {
    const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
    const [selections, setSelections] = useLocalStorage<string[]>("selections", []);
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const { hiragana, katakana, search } = useKanaDictionary();

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);

    const updateSelections = (letters: string[], addOnly?: boolean) => {
        const updatedSelections = [...selections];

        letters.forEach(letter => {
            if (selections.includes(letter)) {
                if (!addOnly) {
                    const letterIndex = updatedSelections.findIndex(selection => selection === letter);
                    updatedSelections.splice(letterIndex, 1);
                }
    
            } else {
                updatedSelections.push(letter);
            }
        });

        setSelections(updatedSelections);
    };

    const searchFn = (_rawSearch: string, queries: string[]) => search(queries);

    const toggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { text: 'Show Kana', onClick: () => setMode(Mode.Kana) },
        { text: 'Show Romaji', onClick: () => setMode(Mode.Romaji) }
    ];

    return (
        <SelectionsContextProvider value = {{ selections, updateSelections }}>
            <ModeContextProvider value = {mode}>
                <div className = "selection-page">
                    <div className = "options-bar">
                        <Toggle buttons = {toggleButtons}/>
                        <Button iconType = {FontAwesomeIconType.Gear} iconSize = {Size.Medium} onClick = {() => console.log("settings!")} />
                    </div>

                    <Searchbar
                        searchFn = {searchFn}
                        delimiters = {[...ENGLISH_DELIMITERS, ...JAPANESE_DELIMITERS]}
                        placeholder = "Search for Kana"
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
                    </TabSet>
                </div>
            </ModeContextProvider>
        </SelectionsContextProvider>
    );
};

export default KanaSelection;