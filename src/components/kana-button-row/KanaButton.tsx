import { Button, Tooltip } from "@/common/components";
import TooltipContent from "@/common/components/tooltip/TooltipContent";
import TooltipTrigger from "@/common/components/tooltip/TooltipTrigger";
import useKanaSelections from "@/hooks/useKanaSelections";
import useMode from "@/hooks/useMode";
import { KanaButtonProps, Mode } from "@/types";

import "./KanaButton.scss";

const DEFAULT_DISABLE_ON_CLICK = false;

const KanaButton = (props: KanaButtonProps) : JSX.Element => {
    const {
        className,
        disableOnClick = DEFAULT_DISABLE_ON_CLICK,
        isSearchTarget,
        letters 
    } = props;

    const { kanaSelections, updateKanaSelections } = useKanaSelections();
    const { mode } = useMode();

    const isSelected = letters.some(char => kanaSelections.includes(char));

    const classes = ["kana-button"];
    if (className) classes.push(className);
    if (disableOnClick) classes.push("disable-on-click");
    if (isSearchTarget) classes.push("is-search-target");
    if (isSelected) classes.push("is-selected");
    if (mode === Mode.Kana) classes.push("is-kana");

    const onClick = () => {
        if (!disableOnClick)
            updateKanaSelections([letters[Mode.ID]]);
    };

    const oppositeMode = mode === Mode.Kana ? Mode.Romaji : Mode.Kana;

    return (
        <Tooltip holdDelay = {250} toggleOnClick = {false}>
            <TooltipTrigger tabIndex = {-1}>
                <Button className = {classes.join(" ")} onClick = {onClick}>
                    {letters[mode]}
                </Button>
            </TooltipTrigger>
            
            <TooltipContent>
                {letters[oppositeMode]}
            </TooltipContent>
        </Tooltip>
    );
};

export default KanaButton;