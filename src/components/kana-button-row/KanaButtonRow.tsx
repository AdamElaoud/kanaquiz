import { Mode } from "@/types";
import KanaButton from "./KanaButton";
import { Button } from "@/common/components";
import "./KanaButtonRow.scss";
import useMode from "@/hooks/useMode";
import useSelections from "@/hooks/useSelections";
import { FontAwesomeIconType } from "@/common/types";

interface Props {
    row: string[][]
};

const KanaButtonRow = (props: Props) : JSX.Element => {
    const { row } = props;
    
    const mode = useMode();
    const { updateSelections } = useSelections();

    const selectEntireRow = () => {
        const allLetters = row.map(letters => letters[Mode.ID]);
        updateSelections(allLetters);
    };

    return (
        <div className = "button-row">
            <Button className = 'select-all-button' onClick = {selectEntireRow} iconType = {FontAwesomeIconType.ArrowRight} />

            {row.map(letters => {
                const kanaButtonProps = { key: letters[Mode.Kana], letters, mode };
                return <KanaButton {...kanaButtonProps} />;
            })}
        </div>
    );
};

export default KanaButtonRow;