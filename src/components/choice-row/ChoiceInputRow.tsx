import { TextInput } from "@/common/components";
import { TextInputState } from "@/common/types";

interface Props {
    answers: string | string[],
    onChange: (inputState: TextInputState) => void
};

const ChoiceInputRow = (props: Props) : JSX.Element => {
    const { answers, onChange } = props;

    if (typeof answers === "string")
        return <TextInput name = {answers} onChange = {onChange}/>;

    return (
        <>{answers.map((answer, index) => <TextInput key = {`${answer}-${index}`} name = {answer} onChange = {onChange}/>)}</>
    );
};

export default ChoiceInputRow;