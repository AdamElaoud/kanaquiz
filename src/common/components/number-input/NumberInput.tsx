import useNotification from "@/common/hooks/useNotification";
import { CSSStyles, Direction, FontAwesomeIconType, IconType, NumberInputState, ReactForwardedRef, ReactInputOnChangeEvent, Size } from "@/common/types";
import { NUMBER_INPUT_MAXIMUM, NUMBER_INPUT_MAXIMUM_ID, NUMBER_INPUT_MINIMUM, NUMBER_INPUT_MINIMUM_ID } from "@/common/utils/constants";
import { buildClassNames, onEnterPress } from "@/common/utils/utils";
import { useRef, useState } from "react";
import { forwardRef } from "react";

import { Icon } from "..";

import "./NumberInput.scss";

interface Props {
    buttonIcons?: [downIcon: IconType, upIcon: IconType],
    className?: string,
    defaultValue?: number | "",
    disabled?: false,
    id?: string,
    max?: number,
    min?: number,
    name: string,
    onChange: (inputState: NumberInputState) => void | number,
    showButtons?: boolean,
    showFlareOnInvalidInput?: boolean,
    size?: Size,
    style?: CSSStyles,
    title?: string
};

const DEFAULT_BUTTON_ICONS: [IconType, IconType] = [FontAwesomeIconType.Down, FontAwesomeIconType.Up]
const DEFAULT_DISABLED_SETTING = false;
const DEFAULT_INITIAL_VALUE = 1;
const DEFAULT_SHOW_BUTTONS = true;
const DEFAULT_SHOW_FLARE_ON_INVALID_INPUT = false;
const DEFAULT_SIZE = Size.Medium;

const NumberInput = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) => {
    const {
        buttonIcons = DEFAULT_BUTTON_ICONS,
        className,
        defaultValue = DEFAULT_INITIAL_VALUE,
        disabled = DEFAULT_DISABLED_SETTING,
        id,
        max,
        min,
        name,
        onChange,
        showButtons = DEFAULT_SHOW_BUTTONS,
        showFlareOnInvalidInput = DEFAULT_SHOW_FLARE_ON_INVALID_INPUT,
        size = DEFAULT_SIZE,
        style,
        title
    } = props;

    const [value, setValue] = useState<number | "">(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const { error } = useNotification();

    const onInputChange = (event: ReactInputOnChangeEvent) => {
        const input = parseInt(event.target.value);

        if (input !== value) {
            if (min && !isNaN(input) && input < min) {
                if (showFlareOnInvalidInput)
                    error(NUMBER_INPUT_MINIMUM(min), { toastId: NUMBER_INPUT_MINIMUM_ID });

                return;
            }
            
            if (max && !isNaN(input) && input > max) {
                if (showFlareOnInvalidInput)
                    error(NUMBER_INPUT_MAXIMUM(max), { toastId: NUMBER_INPUT_MAXIMUM_ID });
                
                return;
            }

            const handledValue = onChange({ prevValue: value, newValue: input || "" });
            setValue(handledValue || input || "");
        }
    };

    const onClickButton = (direction: Direction) => () => {
        const newValue = value === "" ? direction : value + direction;

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
        setValue(prevValue => handledValue || (prevValue === "" ? direction : prevValue + direction));
    };

    // blur to hide mobile keyboards on submission
    const hideKeyboard = () => inputRef.current?.blur();

    const classes = buildClassNames({ [className ?? ""]: className }, ["number-input", size]);

    return (
        <div className = {classes} id = {id} style = {style} ref = {ref}>
            {title && <span className = "number-input-title">{title}</span>}

            <div className = "number-input-content">
                {showButtons && <Icon
                    tabIndex = {0}
                    type = {buttonIcons[0]}
                    onClick = {onClickButton(Direction.Down)}
                    onKeyDown = {onEnterPress(onClickButton(Direction.Down))}
                    size = {size}
                />}

                <label className = "visually-hidden" htmlFor = {`${name}-input`}>{`Number input for ${name}`}</label>
                <input
                    name = {`${name}-input`}
                    disabled = {disabled}
                    ref = {inputRef}
                    type = "number"
                    min = {min}
                    max = {max}
                    role = "input"
                    value = {value}
                    onChange = {onInputChange}
                    onKeyDown = {onEnterPress(hideKeyboard)}
                />
                
                {showButtons && <Icon
                    tabIndex = {0} 
                    type = {buttonIcons[1]}
                    onClick = {onClickButton(Direction.Up)}
                    onKeyDown = {onEnterPress(onClickButton(Direction.Up))}
                    size = {size}
                />}
            </div>
        </div>
    );
});

export default NumberInput;