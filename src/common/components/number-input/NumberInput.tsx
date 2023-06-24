import { Direction, FontAwesomeIconType, IconType, InputState, ReactInputOnChangeEvent, Size } from "@/common/types";
import "./NumberInput.scss";
import { useState } from "react";
import { Icon } from "..";

interface Props {
    buttonIcons?: [downIcon: IconType, upIcon: IconType],
    defaultValue?: number,
    max?: number,
    min?: number,
    name: string,
    onChange: (inputState: InputState) => void,
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

    const onInputChange = (event: ReactInputOnChangeEvent) => {
        const input = parseInt(event.target.value);

        if (input !== value) {
            if (min && input < min) {
                if (showFlareOnInvalidInput) console.log("value too low warning flare!");

                return;
            }
            
            if (max && input > max) {
                if (showFlareOnInvalidInput) console.log("value too high warning flare!");
                
                return;
            }

            onChange({ prevValue: value, newValue: input });
            setValue(input);
        }
    };

    const onClickButton = (direction: Direction) => () => {
        const newValue = value + direction;

        if (min && newValue < min) return;
        if (max && newValue > max) return;

        onChange({ prevValue: value, newValue });
        setValue(prevValue => prevValue + direction);
    };

    return (
        <div className = {`number-input ${size}`}>
            {title && <span className = "number-input-title">{title}</span>}

            <div className = "number-input-content">
                {showButtons && <Icon type = {buttonIcons[0]} onClick = {onClickButton(Direction.Down)} size = {size}/>}

                <label className = "visually-hidden" htmlFor = {`${name}-input`}>Amount of questions for {name}</label>
                <input
                    name = {`${name}-input`}
                    type = "number"
                    min = {min}
                    max = {max}
                    role = "input"
                    value = {value}
                    onChange = {onInputChange}
                />
                
                {showButtons && <Icon type = {buttonIcons[1]} onClick = {onClickButton(Direction.Up)} size = {size}/>}
            </div>
        </div>
    );
};

export default NumberInput;