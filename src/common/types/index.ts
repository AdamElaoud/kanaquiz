import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CustomIconMap, FontAwesomeIconMap } from "../components/icon/IconTypes";

export enum Size {
    Mini = "mini",
    Small = "sm",
    Medium = "md",
    Large = "lg"
};

export enum Side {
    Left = 'left',
    Right = 'right'
};

export enum Direction {
    Up = 1,
    Down = -1
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
export type ReactRef<T> = React.RefObject<T>;

export type WindowSize = [width: number, height: number];

export interface ToggleButtonConfig {
    className?: string,
    content: string | ReactElement,
    onClick: ReactButtonOnClick
};

export type StepState = { prevStepID: number | string, prevStepTitle: number | string, newStepID: number | string, newStepTitle: number | string };

export type TabState = { prevTabID: number, prevTabTitle: string, newTabID: number, newTabTitle: string };

export type InputState = { prevValue: number, newValue: number };

export interface StepConfig {
    className?: string,
    iconType?: IconType
    // NOTE: stepIDs should be unique and NOT generated from array index
    ID: number | string,
    text?: string,
    title: number | string,
};

export enum CustomIconType {
    Blank = "blank",
    JPFlag = "jpFlag",
    Kana = "kana",
    USFlag = "usFlag",
};
export type CustomIconMapType = {
    [key in CustomIconType]: {
        isImage: boolean,
        src?: string,
        text: string
    };
};

export enum FontAwesomeIconType {
    ArrowLeft = "arrowLeft",
    ArrowRight = "arrowRight",
    ClipboardQuestion = "clipboardQuestion",
    Check = "check",
    Dojo = "dojo",
    Down = "down",
    FlagCheckered = "flagCheckered",
    Gear = "gear",
    NumberList = "numberList",
    Pencil = "pencil",
    Play = "play",
    Search = "search",
    Question = "question",
    Torii = "torii",
    Up = "up",
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