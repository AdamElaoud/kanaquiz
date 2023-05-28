import Button from "@/components/common/button/Button";
import Toggle, { ToggleButtonConfig } from "@/components/common/toggle/Toggle";
import TabSet from "@/components/common/tabs/TabSet";
import Tab from "@/components/common/tabs/Tab";
import "./Selection.scss";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { useState } from "react";
import { Mode, Size } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import Searchbar from "@/components/common/searchbar/Searchbar";
import { ModeContextProvider } from "@/hooks/useMode";

const ENGLISH_DELIMITERS = [" ", ",", ", "];
const JAPANESE_DELIMITERS = ["　", "、"];

const Selection = () : JSX.Element => {
    const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
    const [selections, setSelections] = useState<string[]>([]);
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const { hiragana, katakana, search } = useKanaDictionary();

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);

    const addSelection = (letter: string) => () => {
        if (selections.includes(letter)) {
            const letterIndex = selections.findIndex(selection => selection === letter);
            const updatedSelections = selections;

            updatedSelections.splice(letterIndex, 1);

            setSelections(updatedSelections);

        } else {
            setSelections(currentSelections => [...currentSelections, letter]);
        }
    };

    const searchFn = (_rawSearch: string, queries: string[]) => search(queries, addSelection);

    const toggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { text: 'Show Kana', onClick: () => setMode(Mode.Kana) },
        { text: 'Show Romaji', onClick: () => setMode(Mode.Romaji) }
    ];

    return (
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
                            <KanaButtonRow addSelection = {addSelection} key = {group[0][Mode.Kana]} row = {group}/>
                        )}
                    </Tab>
                    <Tab title = "カ Katakana" tabIndex = {1}>
                        {katakanaGroups.map(group =>
                            // key is first Kana in group
                            <KanaButtonRow addSelection = {addSelection} key = {group[0][Mode.Kana]} row = {group}/>
                        )}
                    </Tab>
                </TabSet>
            </div>
        </ModeContextProvider>
    );
};

export default Selection;