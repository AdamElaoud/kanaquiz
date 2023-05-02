import Toggle, { ButtonConfig } from "../components/toggle/Toggle";
import "./Selection.scss";

const Selection = () : JSX.Element => {
    const toggleButtons: [ButtonConfig, ButtonConfig] = [
        { text: 'LEFT', onClick: () => null },
        { text: 'RIGHT', onClick: () => null }
    ];

    return (
        <div className = "selection-page">
            Selection
            <Toggle buttons = {toggleButtons}/>
        </div>
    );
};

export default Selection;