import { Mode } from "@/types";
import KanaButton from "./KanaButton";
import { Button } from "@/common/components";
import "./KanaButtonRow.scss";
import useMode from "@/hooks/useMode";

interface Props {
    row: string[][]
};

const KanaButtonRow = (props: Props) : JSX.Element => {
    const { row } = props;
    
    const mode = useMode();

    return (
        <div className = "button-row">
            <Button className = 'select-all-button' onClick = {() => console.log("SELECT ALL")}>
                All
            </Button>

            {row.map(letters => {
                const kanaButtonProps = { key: letters[Mode.Kana], letters, mode };
                return <KanaButton {...kanaButtonProps} />;
            })}
        </div>
    );
};

export default KanaButtonRow;