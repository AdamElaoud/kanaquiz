import { KanaButtonProps, Mode } from "@/types";
import { Button } from "@/common/components";
import "./KanaButton.scss";
import useKanaSelections from "@/hooks/useKanaSelections";

const KanaButton = (props: KanaButtonProps) : JSX.Element => {
    const { className, letters, mode } = props;

    const { kanaSelections, updateKanaSelections } = useKanaSelections();

    const isSelected = letters.some(char => kanaSelections.includes(char));

    const classes = ["kana-button"];
    if (isSelected) classes.push("is-selected");
    if (className) classes.push(className);

    return (
        <Button className = {classes.join(" ")} onClick = {() => updateKanaSelections([letters[Mode.ID]])}>
            {letters[mode]}
        </Button>
    );
};

export default KanaButton;