import useNotification from "@/common/hooks/useNotification";
import { CSSStyles, ReactForwardedRef, ReactInputOnChangeEvent, Size, TextInputState } from "@/common/types";
import { TEXT_INPUT_INVALID_ID } from "@/common/utils/constants";
import { buildClassNames, onEnterPress } from "@/common/utils/utils";
import { forwardRef, useRef, useState } from "react";

import "./TextInput.scss";

interface Props {
    className?: string,
    defaultValue?: string,
    disabled?: boolean,
    id?: string,
    name: string,
    onChange: (inputState: TextInputState) => void | string,
    showFlareOnInvalidInput?: boolean,
    size?: Size,
    style?: CSSStyles,
    title?: string,
    validator?: (value: string) => { valid: boolean, errorMsg: string }
};

const DEFAULT_DISABLED_SETTING = false;
const DEFAULT_INITIAL_VALUE = "";
const DEFAULT_SHOW_FLARE_ON_INVALID_INPUT = false;
const DEFAULT_SIZE = Size.Medium;

const TextInput = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) => {
    const {
        className,
        defaultValue = DEFAULT_INITIAL_VALUE,
        disabled = DEFAULT_DISABLED_SETTING,
        id,
        name,
        onChange,
        showFlareOnInvalidInput = DEFAULT_SHOW_FLARE_ON_INVALID_INPUT,
        size = DEFAULT_SIZE,
        style,
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

            const handledValue = onChange({ prevValue: value, newValue: input });

            setValue(handledValue || input);
        }
    };

    // blur to hide mobile keyboards on submission
    const hideKeyboard = () => inputRef.current?.blur();

    const classes = buildClassNames({ [className ?? ""]: className }, ["text-input", size]);

    return (
        <div className = {classes} id = {id} style = {style} ref = {ref}>
            {title && <span className = "text-input-title">{title}</span>}

            <label className = "visually-hidden" htmlFor = {`${name}-input`}>{`Text input for ${name}`}</label>
            <input
                name = {`${name}-input`}
                disabled = {disabled}
                ref = {inputRef}
                type = "text"
                role = "input"
                value = {value}
                onChange = {onInputChange}
                onKeyDown = {onEnterPress(hideKeyboard)}
            />
        </div>
    );
});

export default TextInput;