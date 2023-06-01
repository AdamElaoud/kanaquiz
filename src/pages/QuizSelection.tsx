import { FontAwesomeIconType, Size } from "@/common/types";
import { Button } from "@/common/components";
import "./QuizSelection.scss";

const QuizSelection = () : JSX.Element => {
    return (
        <div className = "quiz-selection-page">
            <div className = "options-bar">
                <Button iconType = {FontAwesomeIconType.Gear} iconSize = {Size.Medium} onClick = {() => console.log("settings!")} />
            </div>

            
        </div>
    );
};

export default QuizSelection;