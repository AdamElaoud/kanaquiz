import Button from "@/components/button/Button";
import Toggle, { ToggleButtonConfig } from "@/components/toggle/Toggle";
import "./Selection.scss";
import TabSet from "@/components/tabs/TabSet";
import Tab from "@/components/tabs/Tab";

const Selection = () : JSX.Element => {
    const toggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { text: 'LEFT', onClick: () => console.log("LEFT") },
        { text: 'RIGHT', onClick: () => console.log("RIGHT") }
    ];

    return (
        <div className = "selection-page">
            Selection
            <Toggle buttons = {toggleButtons}/>
            <Button onClick = {() => console.log("clicked!")}>
                Test
            </Button>
            <TabSet>
                <Tab title = "hai" icon = "search">
                    Tab #1 Content
                </Tab>
                <Tab>
                    Tab #2 Content
                </Tab>
            </TabSet>
        </div>
    );
};

export default Selection;