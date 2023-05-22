import { Mode } from "@/types";
import KanaButton from "./KanaButton";
import Button from "../button/Button";
import "./KanaButtonRow.scss";

interface Props {
    addSelection: (letter: string) => () => void,
    mode: Mode,
    row: string[][]
};

const KanaButtonRow = (props: Props) : JSX.Element => {
    const { addSelection, mode, row } = props;

    return (
        <div className = "button-row">
            <Button className = 'select-all-button' onClick = {() => console.log("SELECT ALL")}>
                ALL
            </Button>

            {row.map(letters => {
                const kanaButtonProps = { addSelection, key: letters[Mode.Kana], letters, mode };
                return <KanaButton {...kanaButtonProps} />;
            })}
        </div>
    );
};

export default KanaButtonRow;