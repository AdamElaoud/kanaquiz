import Button from "@/components/button/Button";
import Toggle, { ToggleButtonConfig } from "@/components/toggle/Toggle";
import TabSet from "@/components/tabs/TabSet";
import Tab from "@/components/tabs/Tab";
import "./Selection.scss";
import { Size } from "@/types";

const Selection = () : JSX.Element => {
    const toggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { text: 'Show Kana', onClick: () => console.log("Show Kana") },
        { text: 'Show Romaji', onClick: () => console.log("Show Romaji") }
    ];

    return (
        <div className = "selection-page">
            <div className = "options-bar">
                <Button icon = "search" onClick = {() => console.log("search!")} />
                <Toggle buttons = {toggleButtons}/>
                <Button icon = "gear" onClick = {() => console.log("settings!")} />
            </div>


            <TabSet className = "selection-tabset">
                <Tab title = "Hiragana" icon = "hiragana">
                    Hiragana Content
                </Tab>
                <Tab title = "Katakana" icon = "katakana">
                    Katakana Content
                </Tab>
            </TabSet>
        </div>
    );
};

export default Selection;