import { Button } from "@/common/components";
import { CSSStyles, FontAwesomeIconType } from "@/common/types";

import "./Header.scss";

interface Props {
    onClick: () => void,
    style?: CSSStyles
};

const Header = (props: Props) : JSX.Element => {
    const { onClick, style } = props;

    return (
        <header className = "header" style = {style}>
            <Button className = "logo" onClick = {onClick} iconType = {FontAwesomeIconType.Torii}>
                Kana Quiz
            </Button>

            {/* <ToggleSwitch onActivate = {() => console.log("darkmode activated!")}/> */}
        </header>
    );
};

export default Header;