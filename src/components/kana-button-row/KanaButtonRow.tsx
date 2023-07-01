import { Button } from "@/common/components";
import { FontAwesomeIconType, Size } from "@/common/types";
import useKanaSelections from "@/hooks/useKanaSelections";
import { KanaButtonProps, Mode } from "@/types";

import KanaButton from "./KanaButton";

import "./KanaButtonRow.scss";

interface Props {
    row: string[][],
    groupID: string,
    searchQueries?: string[]
};

const KanaButtonRow = (props: Props) : JSX.Element => {
    const { row, groupID, searchQueries } = props;
    
    const { kanaSelections, updateKanaSelections } = useKanaSelections();

    const selectEntireRow = () => {
        const allLetters = row.map(letters => letters[Mode.ID]);

        const allSelected = row.every(letters => kanaSelections.includes(letters[Mode.ID]));

        updateKanaSelections(allLetters, !allSelected);
    };

    return (
        <div className = "button-row">
            <Button
                className = 'select-all-button'
                onClick = {selectEntireRow}
                iconType = {FontAwesomeIconType.AngleRight}
                iconSize = {Size.Small}
            />

            {row.map(letters => {
                const baseKey = `${letters[Mode.ID]}-${groupID}`;
                const key = searchQueries ? `search-result-${baseKey}` : baseKey;

                const kanaButtonProps: Pick<KanaButtonProps, keyof KanaButtonProps> & { key: string } = {
                    key,
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