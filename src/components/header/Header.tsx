import { Button } from "@/common/components";
import { CSSStyles, FontAwesomeIconType, PlainFn } from "@/common/types";

import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "@/types";

interface Props {
    isInQuiz: boolean,
    onClick: PlainFn,
    openSettings: PlainFn
    style?: CSSStyles
};

const Header = (props: Props) : JSX.Element => {
    const { isInQuiz, openSettings, onClick, style } = props;

    const navigate = useNavigate();

    return (
        <header className = "header" style = {style}>
            <Button className = "logo" onClick = {onClick} iconType = {FontAwesomeIconType.Torii}>
                Kana Quiz
            </Button>

            <div className = "header-actions">
                {isInQuiz && <Button iconType = {FontAwesomeIconType.X} onClick = {() => navigate(PageRoute.QuizSelect)}/>}
                <Button className = "settings-button" iconType = {FontAwesomeIconType.Gear} onClick = {openSettings}/>
            </div>
        </header>
    );
};

export default Header;