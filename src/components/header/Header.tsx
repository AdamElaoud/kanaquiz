import { Button } from "@/common/components";
import { CSSStyles, FontAwesomeIconType, PlainFn } from "@/common/types";

import "./Header.scss";

interface Props {
    onClick: PlainFn,
    openSettings: PlainFn
    style?: CSSStyles
};

const Header = (props: Props) : JSX.Element => {
    const { openSettings, onClick, style } = props;

    return (
        <header className = "header" style = {style}>
            <Button className = "logo" onClick = {onClick} iconType = {FontAwesomeIconType.Torii}>
                Kana Quiz
            </Button>

            <div className = "header-actions">
                <Button iconType = {FontAwesomeIconType.Gear} onClick = {openSettings}/>
            </div>
        </header>
    );
};

export default Header;