import Button from "@/components/common/button/Button";
import Toggle, { ToggleButtonConfig } from "@/components/toggle/Toggle";
import TabSet from "@/components/common/tabs/TabSet";
import Tab from "@/components/common/tabs/Tab";
import "./Selection.scss";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { useState } from "react";
import { Mode } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";

const Selection = () : JSX.Element => {
    const [selections, setSelections] = useState<string[]>([]);
    const [mode, setMode] = useState<Mode>(Mode.Kana);
    const { hiragana, katakana } = useKanaDictionary();

    const hiraganaButtonRowChars = Object.values(hiragana.groupsToChars);
    const katakanaButtonRowChars = Object.values(katakana.groupsToChars);

    const addSelection = (letter: string) => () => {
        if (selections.includes(letter)) {
            console.log("REMOVING SELECTION");
            const letterIndex = selections.findIndex(selection => selection === letter);
            const updatedSelections = selections;

            updatedSelections.splice(letterIndex, 1);

            setSelections(updatedSelections);

        } else {
            console.log("ADDING SELECTION");
            setSelections(currentSelections => [...currentSelections, letter]);
        }
    };

    console.log('selections :>> ', selections);

    const toggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { text: 'Show Kana', onClick: () => setMode(Mode.Kana) },
        { text: 'Show Romaji', onClick: () => setMode(Mode.Romaji) }
    ];

    return (
        <div className = "selection-page">
            <div className = "options-bar">
                <Button icon = "search" onClick = {() => console.log("search!")} />
                <Toggle buttons = {toggleButtons}/>
                <Button icon = "gear" onClick = {() => console.log("settings!")} />
            </div>


            <TabSet className = "selection-tabset">
                <Tab title = "ひ Hiragana">
                    {hiraganaButtonRowChars.map(row =>
                        <KanaButtonRow addSelection = {addSelection} key = {row[0][Mode.Kana]} mode = {mode} row = {row}/>
                    )}
                </Tab>
                <Tab title = "カ Katakana">
                    {katakanaButtonRowChars.map(row =>
                        <KanaButtonRow addSelection = {addSelection} key = {row[0][Mode.Kana]} mode = {mode} row = {row}/>
                    )}
                </Tab>
            </TabSet>
        </div>
    );
};

export default Selection;