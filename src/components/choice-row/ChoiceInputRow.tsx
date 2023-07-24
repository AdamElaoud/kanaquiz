import { TextInput } from "@/common/components";
import { TextInputState } from "@/common/types";

interface Props {
    answers: string | string[],
    disabled: boolean,
    onChange: (inputState: TextInputState) => void
};

const ChoiceInputRow = (props: Props) : JSX.Element => {
    const { answers, disabled, onChange } = props;

    if (typeof answers === "string")
        return <TextInput disabled = {disabled} name = {answers} onChange = {onChange}/>;

    return (
        <>{answers.map((answer, index) => <TextInput key = {`${answer}-${index}`} disabled = {disabled} name = {answer} onChange = {onChange}/>)}</>
    );
};

export default ChoiceInputRow;