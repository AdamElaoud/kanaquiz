import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CustomIconMap, FontAwesomeIconMap } from "../components/icon/IconTypes";

export enum Size {
    Small = "sm",
    Medium = "md",
    Large = "lg"
};

export enum Side {
    Left = 'left',
    Right = 'right'
};

export type ReactButtonOnClick = React.MouseEventHandler<HTMLButtonElement>;
export type ReactButtonOnClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ReactNode = React.ReactNode;
export type ReactElement = React.ReactElement;
export type ReactFragment = React.ReactFragment;
export type ReactInputOnChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ReactFormOnSubmitEvent = React.FormEvent<HTMLFormElement>;
export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ToggleButtonConfig {
    className?: string,
    onClick: ReactButtonOnClick,
    text: string
};

export type CustomIconType = keyof CustomIconMapType;
export type CustomIconMapType = {
    "hiragana": string;
    "katakana": string;
};

export type FontAwesomeIconType = keyof FontAwesomeIconMapType;
export type FontAwesomeIconMapType = {
    "check": IconDefinition;
    "flagCheckered": IconDefinition;
    "gear": IconDefinition;
    "search": IconDefinition;
    "x": IconDefinition;
};

export type IconType = FontAwesomeIconType | CustomIconType;

export const isFontAwesomeIconType = (type: FontAwesomeIconType | CustomIconType): type is FontAwesomeIconType => {
    return type in FontAwesomeIconMap;
};

export const isCustomIconType = (type: FontAwesomeIconType | CustomIconType): type is CustomIconType => {
    return type in CustomIconMap;
};