import { TextInput } from "@/common/components";
import { TextInputState } from "@/common/types";

interface Props {
    answers: string | string[],
    disabled: boolean,
    onChange: (inputState: TextInputState) => void,
    questionIndex: number
};

const ChoiceInputRow = (props: Props) : JSX.Element => {
    const { answers, disabled, onChange, questionIndex } = props;

    if (typeof answers === "string")
        return <TextInput key = {questionIndex} disabled = {disabled} name = {answers} onChange = {onChange}/>;

    return (
        <>{answers.map((answer, index) => <TextInput key = {`${questionIndex}-${answer}-${index}`} disabled = {disabled} name = {answer} onChange = {onChange}/>)}</>
    );
};

export default ChoiceInputRow;
