import { Icon } from "@/common/components";
import "./Header.scss";
import { CSSStyles, FontAwesomeIconType } from "@/common/types";

interface Props {
    onClick?: () => void,
    style?: CSSStyles
};

const Header = (props: Props) : JSX.Element => {
    const { onClick, style } = props;

    return (
        <header className = "header" style = {style}>
            <button className = "logo" tabIndex = {0} onClick = {onClick}>
                <Icon type = {FontAwesomeIconType.Torii} />
                Kana Quiz
            </button>

            {/* <ToggleSwitch onActivate = {() => console.log("darkmode activated!")}/> */}
        </header>
    );
};

export default Header;