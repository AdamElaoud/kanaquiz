import { CustomIconMap, FontAwesomeIconMap } from "@/common/components/icon/IconTypes";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

// potential future color theming
export enum Theme {
    Light = "light",
    Dark = "dark"
};

export enum Size {
    Small = "sm",
    Medium = "md",
    Large = "lg"
};

export enum Mode {
    Kana = 0,
    Romaji = 1,
    ID = 2
};

export type ReactButtonOnClick = React.MouseEventHandler<HTMLButtonElement>;
export type ReactButtonOnClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ReactNode = React.ReactNode;
export type ReactElement = React.ReactElement;
export type ReactFragment = React.ReactFragment;
export type ReactInputOnChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ReactFormOnSubmitEvent = React.FormEvent<HTMLFormElement>;
export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type CharsToGroups = {
    [key: string]: string[]
};

export type GroupsToChars = {
    [key: string]: string[][]
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