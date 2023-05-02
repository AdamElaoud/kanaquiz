import Toggle, { ButtonConfig } from "../components/toggle/Toggle";
import "./Selection.scss";

const Selection = () : JSX.Element => {
    const toggleButtons: [ButtonConfig, ButtonConfig] = [
        { text: 'LEFT', onClick: () => console.log("LEFT") },
        { text: 'RIGHT', onClick: () => console.log("RIGHT") }
    ];

    return (
        <div className = "selection-page">
            Selection
            <Toggle buttons = {toggleButtons}/>
        </div>
    );
};

export default Selection;