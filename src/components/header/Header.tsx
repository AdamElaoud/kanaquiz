import { Icon } from "@/common/components";
import "./Header.scss";
import { CSSStyles, FontAwesomeIconType } from "@/common/types";

interface Props {
    style?: CSSStyles
};

const Header = (props: Props) : JSX.Element => {
    const { style } = props;

    return (
        <div className = "header" style = {style}>
            <span className = "logo">
                <Icon type = {FontAwesomeIconType.Torii} />
                Kana Quiz
            </span>

            {/* <ToggleSwitch onActivate = {() => console.log("darkmode activated!")}/> */}
        </div>
    );
};

export default Header;