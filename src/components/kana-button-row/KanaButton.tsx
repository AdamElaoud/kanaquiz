import { Mode } from "@/types";
import Button from "../button/Button";
import "./KanaButton.scss";

interface Props {
    addSelection: (letter: string) => () => void,
    letters: string[],
    mode: Mode,
};

const KanaButton = (props: Props) : JSX.Element => {
    const { addSelection, letters, mode } = props;

    return (
        <Button className = "kana-button" onClick = {addSelection(letters[Mode.Romaji])}>
            {letters[mode]}
        </Button>
    );
};

export default KanaButton;