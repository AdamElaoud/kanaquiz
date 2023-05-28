import { Mode } from "@/types";
import KanaButton from "./KanaButton";
import Button from "../common/button/Button";
import "./KanaButtonRow.scss";
import useMode from "@/hooks/useMode";

interface Props {
    addSelection: (letter: string) => () => void,
    row: string[][]
};

const KanaButtonRow = (props: Props) : JSX.Element => {
    const { addSelection, row } = props;

    const mode = useMode();

    return (
        <div className = "button-row">
            <Button className = 'select-all-button' onClick = {() => console.log("SELECT ALL")}>
                All
            </Button>

            {row.map(letters => {
                const kanaButtonProps = { addSelection, key: letters[Mode.Kana], letters, mode };
                return <KanaButton {...kanaButtonProps} />;
            })}
        </div>
    );
};

export default KanaButtonRow;