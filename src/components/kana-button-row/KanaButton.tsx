import { Mode } from "@/types";
import { Button } from "@/common/components";
import "./KanaButton.scss";
import useKanaSelections from "@/hooks/useKanaSelections";

interface Props {
    letters: string[],
    mode: Mode,
};

const KanaButton = (props: Props) : JSX.Element => {
    const { letters, mode } = props;

    const { kanaSelections, updateKanaSelections } = useKanaSelections();

    const isSelected = letters.some(char => kanaSelections.includes(char));

    const classes = isSelected ? "kana-button is-selected" : "kana-button";

    return (
        <Button className = {classes} onClick = {() => updateKanaSelections([letters[Mode.ID]])}>
            {letters[mode]}
        </Button>
    );
};

export default KanaButton;