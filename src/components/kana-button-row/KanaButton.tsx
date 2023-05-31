import { Mode } from "@/types";
import { Button } from "@/common/components";
import "./KanaButton.scss";
import useSelections from "@/hooks/useSelections";

interface Props {
    letters: string[],
    mode: Mode,
};

const KanaButton = (props: Props) : JSX.Element => {
    const { letters, mode } = props;

    const { selections, updateSelections } = useSelections();

    const isSelected = letters.some(char => selections.includes(char));

    const classes = isSelected ? "kana-button is-selected" : "kana-button";

    return (
        <Button className = {classes} onClick = {() => updateSelections([letters[Mode.ID]])}>
            {letters[mode]}
        </Button>
    );
};

export default KanaButton;