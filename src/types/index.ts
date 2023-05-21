import { CustomIconMap, FontAwesomeIconMap } from "@/components/icon/IconTypes";
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

export type ReactButtonOnClick = React.MouseEventHandler<HTMLButtonElement>;
export type ReactButtonOnClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ReactChildren = React.ReactNode;
export type ReactElement = React.ReactElement;
export type ReactFragment = React.ReactFragment;

export type CustomIconType = keyof CustomIconMapType;
export type CustomIconMapType = {
    "hiragana": ReactElement;
    "katakana": ReactElement;
};

export type FontAwesomeIconType = keyof FontAwesomeIconMapType;
export type FontAwesomeIconMapType = {
    "check": IconDefinition;
    "flagCheckered": IconDefinition;
    "gear": IconDefinition;
    "search": IconDefinition;
    "x": IconDefinition;
};

export const isFontAwesomeIconType = (type: FontAwesomeIconType | CustomIconType): type is FontAwesomeIconType => {
    return type in FontAwesomeIconMap;
};

export const isCustomIconType = (type: FontAwesomeIconType | CustomIconType): type is CustomIconType => {
    return type in CustomIconMap;
};