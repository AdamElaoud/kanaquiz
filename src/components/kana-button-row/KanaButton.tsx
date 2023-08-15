import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@/common/components";
import { buildClassNames } from "@/common/utils/utils";
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

    const classes = buildClassNames({
        [className ?? ""]: className,
        "disable-on-click": disableOnClick,
        "is-search-target": isSearchTarget,
        "is-selected": isSelected,
        "is-kana": mode === Mode.Kana
    }, ["kana-button"]);

    const onClick = () => {
        if (!disableOnClick)
            updateKanaSelections([letters[Mode.ID]]);
    };

    const oppositeMode = mode === Mode.Kana ? Mode.Romaji : Mode.Kana;

    return (
        <Tooltip holdDelay = {100} toggleOnClick = {false}>
            <TooltipTrigger tabIndex = {-1}>
                <Button className = {classes} onClick = {onClick}>
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