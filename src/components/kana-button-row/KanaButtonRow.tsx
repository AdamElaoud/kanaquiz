import { KanaButtonProps, Mode } from "@/types";
import KanaButton from "./KanaButton";
import { Button } from "@/common/components";
import "./KanaButtonRow.scss";
import useMode from "@/hooks/useMode";
import useKanaSelections from "@/hooks/useKanaSelections";
import { FontAwesomeIconType } from "@/common/types";

interface Props {
    row: string[][]
};

const KanaButtonRow = (props: Props) : JSX.Element => {
    const { row } = props;
    
    const mode = useMode();
    const { updateKanaSelections } = useKanaSelections();

    const selectEntireRow = () => {
        const allLetters = row.map(letters => letters[Mode.ID]);
        updateKanaSelections(allLetters);
    };

    return (
        <div className = "button-row">
            <Button className = 'select-all-button' onClick = {selectEntireRow} iconType = {FontAwesomeIconType.ArrowRight} />

            {row.map(letters => {
                const kanaButtonProps: Pick<KanaButtonProps, keyof KanaButtonProps> & { key: string } = {
                    key: letters[Mode.Kana],
                    letters,
                    mode
                };
                
                if (letters[Mode.Kana].length > 1)
                    kanaButtonProps.className = "wide-button";

                return <KanaButton {...kanaButtonProps} />;
            })}
        </div>
    );
};

export default KanaButtonRow;