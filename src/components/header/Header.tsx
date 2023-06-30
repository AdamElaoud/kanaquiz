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
        <header className = "header" style = {style} onClick = {onClick}>
            <span className = "logo">
                <Icon type = {FontAwesomeIconType.Torii} />
                Kana Quiz
            </span>

            {/* <ToggleSwitch onActivate = {() => console.log("darkmode activated!")}/> */}
        </header>
    );
};

export default Header;