import { Button, Tooltip } from "@/common/components";
import useKanaSelections from "@/hooks/useKanaSelections";
import useMode from "@/hooks/useMode";
import { KanaButtonProps, Mode } from "@/types";

import "./KanaButton.scss";

const DEFAULT_DISABLE_ON_CLICK = false;

const KanaButton = (props: KanaButtonProps) : JSX.Element => {
    const {
        className,
        disableOnClick = DEFAULT_DISABLE_ON_CLICK,
        id,
        isSearchTarget,
        letters 
    } = props;

    const { kanaSelections, updateKanaSelections } = useKanaSelections();
    const { mode } = useMode();

    const isSelected = letters.some(char => kanaSelections.includes(char));

    const classes = ["kana-button"];
    if (isSelected) classes.push("is-selected");
    if (className) classes.push(className);
    if (mode === Mode.Kana) classes.push("is-kana");
    if (isSearchTarget) classes.push("is-search-target");
    if (disableOnClick) classes.push("disable-on-click");

    const onClick = () => {
        if (!disableOnClick)
            updateKanaSelections([letters[Mode.ID]]);
    };

    const oppositeMode = mode === Mode.Kana ? Mode.Romaji : Mode.Kana;

    return (
        <>
            <Button id = {id} className = {classes.join(" ")} onClick = {onClick}>
                {letters[mode]}
            </Button>
            <Tooltip anchorSelector = {`#${id}`} delayShow = {500}>
                {letters[oppositeMode]}
            </Tooltip>
        </>
    );
};

export default KanaButton;