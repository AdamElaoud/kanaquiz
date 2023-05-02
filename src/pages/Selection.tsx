import Toggle, { ButtonConfig } from "../components/toggle/Toggle";
import "./Selection.scss";

const Selection = () : JSX.Element => {
    const leftButton: ButtonConfig = {
        text: 'LEFT',
        onClick: () => null
    };

    const rightButton: ButtonConfig = {
        text: 'RIGHT',
        onClick: () => null
    };
    
    const toggleButtons = [leftButton, rightButton];

    return (
        <div className = "selection-page">
            Selection
            <Toggle buttons = {toggleButtons}/>
        </div>
    );
};

export default Selection;