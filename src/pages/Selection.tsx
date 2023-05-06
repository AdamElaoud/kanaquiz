import Button from "@/components/button/Button";
import Toggle, { ToggleButtonConfig } from "@/components/toggle/Toggle";
import "./Selection.scss";

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
        </div>
    );
};

export default Selection;