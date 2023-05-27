import { Mode } from "@/types";
import Button from "../common/button/Button";
import "./KanaButton.scss";

interface Props {
    addSelection: (letter: string) => () => void,
    letters: string[],
    mode: Mode,
};

const KanaButton = (props: Props) : JSX.Element => {
    const { addSelection, letters, mode } = props;

    // add logic to handle removing h_ / k_ from romaji in dictionary?
    return (
        <Button className = "kana-button" onClick = {addSelection(letters[Mode.ID])}>
            {letters[mode]}
        </Button>
    );
};

export default KanaButton;