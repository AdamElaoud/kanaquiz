import { Button } from "@/common/components";
import { Toggle } from "@/common/components";
import { ToggleButtonConfig } from "@/common/components/toggle/Toggle";
import { TabSet } from "@/common/components";
import { Tab } from "@/common/components";
import "./Selection.scss";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { useState } from "react";
import { Mode, Size } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import { Searchbar } from "@/common/components";
import { ModeContextProvider } from "@/hooks/useMode";
import { SelectionsContextProvider } from "@/hooks/useSelections";
import useLocalStorage from "@/common/hooks/useLocalStorage";

const ENGLISH_DELIMITERS = [" ", ",", ", "];
const JAPANESE_DELIMITERS = ["　", "、"];

const Selection = () : JSX.Element => {
    const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
    const [selections, setSelections] = useLocalStorage<string[]>("selections", []);
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const { hiragana, katakana, search } = useKanaDictionary();

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);

    const updateSelections = (letter: string) => () => {
        if (selections.includes(letter)) {
            const letterIndex = selections.findIndex(selection => selection === letter);
            const updatedSelections = [...selections];

            updatedSelections.splice(letterIndex, 1);

            setSelections(updatedSelections);

        } else {
            setSelections(currentSelections => [...currentSelections, letter]);
        }
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
                        <Button icon = "search" iconSize = {Size.Medium} onClick = {() => setShowSearchbar(prevState => !prevState)} />
                        <Toggle buttons = {toggleButtons}/>
                        <Button icon = "gear" iconSize = {Size.Medium} onClick = {() => console.log("settings!")} />
                    </div>

                    {showSearchbar && 
                        <Searchbar
                            searchFn = {searchFn}
                            delimiters = {[...ENGLISH_DELIMITERS, ...JAPANESE_DELIMITERS]}
                            placeholder = "Search for Kana"
                        />
                    }

                    <TabSet className = "selection-tabset">
                        <Tab title = "ひ Hiragana" tabIndex = {0}>
                            {hiraganaGroups.map(group =>
                                // key is first Kana in group
                                <KanaButtonRow key = {group[0][Mode.Kana]} row = {group}/>
                            )}
                        </Tab>
                        <Tab title = "カ Katakana" tabIndex = {1}>
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

export default Selection;