import { Button, Icon, Toggle } from "@/common/components";
import "./Header.scss";
import { FontAwesomeIconType, Side, Size, ToggleButtonConfig } from "@/common/types";
import { Mode } from "@/types";
import useMode from "@/hooks/useMode";

interface Props {
    showToggle: boolean
};

const Header = (props: Props) : JSX.Element => {
    const { showToggle } = props;
    
    const { mode, setMode } = useMode();

    const toggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { text: 'Show Kana', onClick: () => setMode(Mode.Kana) },
        { text: 'Show Romaji', onClick: () => setMode(Mode.Romaji) }
    ];

    const defaultActiveSide = mode === Mode.Kana ? Side.Left : Side.Right;

    return (
        <div className = "header">
            <Icon className = "logo" type = {FontAwesomeIconType.Torii} />
            {showToggle && <Toggle buttons = {toggleButtons} defaultActiveSide = {defaultActiveSide}/>}
            <Button
                iconType = {FontAwesomeIconType.Gear}
                iconSize = {Size.Medium}
                onClick = {() => console.log("settings!")}
            />
        </div>
    );
};

export default Header;