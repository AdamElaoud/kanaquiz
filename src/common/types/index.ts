import { CustomIconMap, FontAwesomeIconMap } from "@/common/components/icon/IconTypes";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Id, ToastContent, ToastOptions } from "react-toastify";

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
export type ReactDivOnClick = React.MouseEventHandler<HTMLDivElement>;
export type ReactDivOnClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;
export type ReactOnClickEvent = React.MouseEvent<HTMLElement, MouseEvent>;
export type ReactMouseEvent = React.MouseEvent;
export type ReactNode = React.ReactNode;
export type ReactElement = React.ReactElement;
export type ReactFragment = React.ReactFragment;
export type ReactInputOnChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type ReactFormOnSubmitEvent = React.FormEvent<HTMLFormElement>;
export type ReactKeyboardEvent = React.KeyboardEvent;
export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReactForwardedRef<T> = React.ForwardedRef<T>;
export type ReactMutableRef<T> = React.MutableRefObject<T>;
export type ReactRef<T> = React.RefObject<T>;

export type CSSStyles = React.CSSProperties;

export type HTMLEvent = keyof HTMLElementEventMap;
export type WindowEvent = keyof WindowEventMap;

export type WindowSize = [width: number, height: number];

export interface ItemConfig {
    className?: string,
    content: string | ReactElement,
    onClick?: PlainFn
};

export type ToggleButtonConfig = Pick<ItemConfig, "className" | "content"> & { onClick: PlainFn };

export type PlainFn = () => void;

export type GenericFn<T, V> = (...args: T[]) => V;

export type NotificationFn = (content: ToastContent, options?: ToastOptions) => Id;

export type StepState = { prevStepID: number | string, prevStepTitle: number | string, newStepID: number | string, newStepTitle: number | string };

export type TabState = { prevTabIndex: number, prevTabTitle: string, newTabIndex: number, newTabTitle: string };

export type NumberInputState = { prevValue: number, newValue: number };

export type TextInputState = { prevValue: string, newValue: string };

export type MouseClickState = { event: MouseEvent, previousClickTarget: HTMLElement | null, nextClickTarget: HTMLElement };

export interface EventSubscription {
    eventKeys: Set<string>,
    responseFn: (event: KeyboardEvent) => void
};

export interface StepConfig {
    className?: string,
    blockNextStep?: (stepState: StepState) => boolean,
    nextStepBlockedError?: () => string,
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
    AngleLeft = "angleLeft",
    AngleRight = "angleRight",
    ArrowLeft = "arrowLeft",
    ArrowRight = "arrowRight",
    Book = "book",
    ClipboardQuestion = "clipboardQuestion",
    Check = "check",
    CircleArrowLeft = "circleArrowLeft",
    CircleArrowRight = "circleArrowRight",
    CircleCheck = "circleCheck",
    Delete = "delete",
    Dojo = "dojo",
    Down = "down",
    Error = "error",
    FlagCheckered = "flagCheckered",
    Gear = "gear",
    Info = "info",
    Keyboard = "keyboard",
    NumberList = "numberList",
    Pencil = "pencil",
    Play = "play",
    Search = "search",
    Question = "question",
    Tap = "tap",
    Torii = "torii",
    Up = "up",
    Warning = "warning",
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