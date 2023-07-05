import useNotification from "@/common/hooks/useNotification";
import { ReactInputOnChangeEvent, Size, TextInputState } from "@/common/types";
import { onEnterPress } from "@/common/utils/utils";
import { TEXT_INPUT_INVALID_ID } from "@/common/utils/constants";
import { useRef, useState } from "react";

import "./TextInput.scss";

interface Props {
    defaultValue?: string,
    name: string,
    onChange?: (inputState: TextInputState) => void,
    showFlareOnInvalidInput?: boolean,
    size?: Size,
    title?: string,
    validator?: (value: string) => { valid: boolean, errorMsg: string }
};

const DEFAULT_INITIAL_VALUE = "";
const DEFAULT_SHOW_FLARE_ON_INVALID_INPUT = false;
const DEFAULT_SIZE = Size.Medium;

const TextInput = (props: Props) => {
    const {
        defaultValue = DEFAULT_INITIAL_VALUE,
        name,
        onChange,
        showFlareOnInvalidInput = DEFAULT_SHOW_FLARE_ON_INVALID_INPUT,
        size = DEFAULT_SIZE,
        title,
        validator
    } = props;

    const [value, setValue] = useState<string>(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const { error } = useNotification();

    const onInputChange = (event: ReactInputOnChangeEvent) => {
        const input = event.target.value;

        if (input !== value) {
            if (validator) {
                const { valid, errorMsg } = validator(input);

                if (!valid && showFlareOnInvalidInput)
                    error(errorMsg, { toastId: TEXT_INPUT_INVALID_ID })

                return;
            }

            if (onChange)
                onChange({ prevValue: value, newValue: input });

            setValue(input);
        }
    };

    // blur to hide mobile keyboards on submission
    const hideKeyboard = () => inputRef.current?.blur();

    return (
        <div className = {`text-input ${size}`}>
            {title && <span className = "text-input-title">{title}</span>}

            <label className = "visually-hidden" htmlFor = {`${name}-input`}>{`Text input for ${name}`}</label>
            <input
                name = {`${name}-input`}
                ref = {inputRef}
                type = "text"
                role = "input"
                value = {value}
                onChange = {onInputChange}
                onKeyDown = {onEnterPress(hideKeyboard)}
            />
        </div>
    );
};

export default TextInput;