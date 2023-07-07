import useNotification from "@/common/hooks/useNotification";
import { Direction, FontAwesomeIconType, IconType, NumberInputState, ReactInputOnChangeEvent, Size } from "@/common/types";
import { NUMBER_INPUT_MAXIMUM, NUMBER_INPUT_MAXIMUM_ID, NUMBER_INPUT_MINIMUM, NUMBER_INPUT_MINIMUM_ID } from "@/common/utils/constants";
import { onEnterPress } from "@/common/utils/utils";
import { useRef, useState } from "react";

import { Icon } from "..";

import "./NumberInput.scss";

interface Props {
    buttonIcons?: [downIcon: IconType, upIcon: IconType],
    defaultValue?: number,
    max?: number,
    min?: number,
    name: string,
    onChange: (inputState: NumberInputState) => void | number,
    showButtons?: boolean,
    showFlareOnInvalidInput?: boolean,
    size?: Size,
    title?: string
};

const DEFAULT_BUTTON_ICONS: [IconType, IconType] = [FontAwesomeIconType.Down, FontAwesomeIconType.Up]
const DEFAULT_INITIAL_VALUE = 1;
const DEFAULT_SHOW_BUTTONS = true;
const DEFAULT_SHOW_FLARE_ON_INVALID_INPUT = false;
const DEFAULT_SIZE = Size.Medium;

const NumberInput = (props: Props) => {
    const {
        buttonIcons = DEFAULT_BUTTON_ICONS,
        defaultValue = DEFAULT_INITIAL_VALUE,
        max,
        min,
        name,
        onChange,
        showButtons = DEFAULT_SHOW_BUTTONS,
        showFlareOnInvalidInput = DEFAULT_SHOW_FLARE_ON_INVALID_INPUT,
        size = DEFAULT_SIZE,
        title
    } = props;

    const [value, setValue] = useState<number>(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const { error } = useNotification();

    const onInputChange = (event: ReactInputOnChangeEvent) => {
        const input = parseInt(event.target.value);

        if (input !== value) {
            if (min && input < min) {
                if (showFlareOnInvalidInput)
                    error(NUMBER_INPUT_MINIMUM(min), { toastId: NUMBER_INPUT_MINIMUM_ID });

                return;
            }
            
            if (max && input > max) {
                if (showFlareOnInvalidInput)
                    error(NUMBER_INPUT_MAXIMUM(max), { toastId: NUMBER_INPUT_MAXIMUM_ID });
                
                return;
            }

            const handledValue = onChange({ prevValue: value, newValue: input || min || defaultValue|| 0 });
            setValue(handledValue || input);
        }
    };

    const onClickButton = (direction: Direction) => () => {
        const newValue = value + direction;

        if (min && newValue < min) {
            if (showFlareOnInvalidInput)
                    error(NUMBER_INPUT_MINIMUM(min), { toastId: NUMBER_INPUT_MINIMUM_ID });

            return;
        };

        if (max && newValue > max) {
            if (showFlareOnInvalidInput)
                error(NUMBER_INPUT_MAXIMUM(max), { toastId: NUMBER_INPUT_MAXIMUM_ID });
            
            return;
        }

        const handledValue = onChange({ prevValue: value, newValue });
        setValue(prevValue => handledValue || (prevValue + direction));
    };

    // blur to hide mobile keyboards on submission
    const hideKeyboard = () => inputRef.current?.blur();

    return (
        <div className = {`number-input ${size}`}>
            {title && <span className = "number-input-title">{title}</span>}

            <div className = "number-input-content">
                {showButtons && <Icon type = {buttonIcons[0]} onClick = {onClickButton(Direction.Down)} size = {size}/>}

                <label className = "visually-hidden" htmlFor = {`${name}-input`}>{`Number input for ${name}`}</label>
                <input
                    name = {`${name}-input`}
                    ref = {inputRef}
                    type = "number"
                    min = {min}
                    max = {max}
                    role = "input"
                    value = {value}
                    onChange = {onInputChange}
                    onKeyDown = {onEnterPress(hideKeyboard)}
                />
                
                {showButtons && <Icon type = {buttonIcons[1]} onClick = {onClickButton(Direction.Up)} size = {size}/>}
            </div>
        </div>
    );
};

export default NumberInput;