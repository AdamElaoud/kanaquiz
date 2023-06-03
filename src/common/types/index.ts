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
export type CSSStyles = React.CSSProperties;

export type WindowSize = [width: number, height: number];

export interface ToggleButtonConfig {
    className?: string,
    onClick: ReactButtonOnClick,
    text: string
};

export type StepState = (stepState: { prevStepID?: number | string, prevStepTitle?: string, newStepID?: number | string, newStepTitle?: string }) => void;

export type TabState = (tabState: { prevTabID?: number, prevTabTitle?: string, newTabID?: number, newTabTitle?: string }) => void;

export interface StepConfig {
    iconType?: IconType
    // NOTE: stepIDs should be unique and NOT generated from array index
    ID: number | string,
    text?: string,
    title: string,
};

export enum CustomIconType {
    Blank = "blank",
    Hiragana = "hiragana",
    Katakana = "katakana"
};
export type CustomIconMapType = {
    [key in CustomIconType]: string;
};

export enum FontAwesomeIconType {
    ArrowLeft = "arrowLeft",
    ArrowRight = "arrowRight",
    ClipboardQuestion = "clipboardQuestion",
    Check = "check",
    Dojo = "dojo",
    FlagCheckered = "flagCheckered",
    Gear = "gear",
    NumberList = "numberList",
    Pencil = "pencil",
    Play = "play",
    Search = "search",
    Torii = "torii",
    X = "x"
};
export type FontAwesomeIconMapType = {
    [key in FontAwesomeIconType]: IconDefinition;
};

export type IconType = FontAwesomeIconType | CustomIconType;

export const isFontAwesomeIconType = (type: FontAwesomeIconType | CustomIconType): type is FontAwesomeIconType => {
    return type in FontAwesomeIconMap;
};

export const isCustomIconType = (type: FontAwesomeIconType | CustomIconType): type is CustomIconType => {
    return type in CustomIconMap;
};