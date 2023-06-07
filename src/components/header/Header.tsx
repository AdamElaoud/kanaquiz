import { Button, Icon } from "@/common/components";
import "./Header.scss";
import { CSSStyles, FontAwesomeIconType, Size } from "@/common/types";

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

            <Button
                iconType = {FontAwesomeIconType.Gear}
                iconSize = {Size.Medium}
                onClick = {() => console.log("settings!")}
            />
        </div>
    );
};

export default Header;