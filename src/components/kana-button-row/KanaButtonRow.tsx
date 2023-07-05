import { Button } from "@/common/components";
import { FontAwesomeIconType, Size } from "@/common/types";
import KanaButton from "@/components/kana-button-row/KanaButton";
import useKanaSelections from "@/hooks/useKanaSelections";
import { KanaButtonProps, KanaLetters, Mode } from "@/types";

import "./KanaButtonRow.scss";

interface Props {
    disableOnClick?: boolean,
    hideSelectAllButton?: boolean,
    groupID: string,
    row: KanaLetters[],
    searchQueries?: string[]
};

const DEFAULT_DISABLE_ON_CLICK = false;
const DEFAULT_HIDE_SELECT_ALL_BUTTON = false;

const KanaButtonRow = (props: Props) : JSX.Element => {
    const {
        disableOnClick = DEFAULT_DISABLE_ON_CLICK,
        hideSelectAllButton = DEFAULT_HIDE_SELECT_ALL_BUTTON,
        groupID,
        row,
        searchQueries
    } = props;
    
    const { kanaSelections, updateKanaSelections } = useKanaSelections();

    const selectEntireRow = () => {
        const allLetters = row.map(letters => letters[Mode.ID]);

        const allSelected = row.every(letters => kanaSelections.includes(letters[Mode.ID]));

        updateKanaSelections(allLetters, !allSelected);
    };

    return (
        <div className = "button-row">
            {!hideSelectAllButton && <Button
                className = 'select-all-button'
                onClick = {selectEntireRow}
                iconType = {FontAwesomeIconType.AngleRight}
                iconSize = {Size.Small}
            />}

            {row.map(letters => {
                const baseKey = `${letters[Mode.ID]}-${groupID}`;
                const key = searchQueries ? `search-result-${baseKey}` : baseKey;

                const kanaButtonProps: Pick<KanaButtonProps, keyof KanaButtonProps> & { key: string } = {
                    key,
                    disableOnClick,
                    isSearchTarget: searchQueries?.includes(letters[Mode.Kana]) || searchQueries?.includes(letters[Mode.Romaji]),
                    letters
                };

                if (letters[Mode.Kana].length > 1)
                    kanaButtonProps.className = "wide-button";

                return <KanaButton {...kanaButtonProps} />;
            })}
        </div>
    );
};

export default KanaButtonRow;