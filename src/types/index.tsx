import { ReactElement, ReactNode } from "@/common/types";

// potential future color theming
export enum Theme {
    Light = "light",
    Dark = "dark"
};

export enum Mode {
    Kana = 0,
    Romaji = 1,
    ID = 2
};

export enum QuizTopic {
    Kana = "Kana",
    Words = "Words"
};

export enum QuizDirection {
    ENtoJP = "EN-to-JP",
    JPtoEN = "JP-to-EN"
};

export enum QuizFormat {
    MultipleChoice = "Multiple-Choice",
    WriteTheAnswer = "Write-the-Answer",
};

export enum PageType {
    KanaQuiz = "KanaQuiz",
    KanaSelect = "KanaSelection",
    QuizRecap = "QuizRecap",
    QuizSelect = "QuizSelection",
    QuizSummary = "QuizSummary",
    WordSelection = "WordSelection"
};

export enum TabID {
    Hiragana = 0,
    Katakana = 1,
    Lookalikes = 2
};

export type PageMapType = {
    [key in PageType]: () => ReactNode;
};

export type SummaryMapType = 
    Record<QuizTopic, string> &
    Record<QuizDirection, () => ReactElement> &
    Record<QuizFormat, () => ReactElement>;

export type CharsToGroups = {
    [key: string]: string[]
};

export type GroupsToChars = {
    [key: string]: [string, string, string][]
};

export type Word = {
    definition: string,
    kana: string,
    type: "hiragana" | "katakana"
};

export type HiraganaWord = Word & { type: "hiragana" };

export type KatakanaWord = Word & { type: "katakana" };

export type QuizSelectionData = {
    amount: number,
    direction: QuizDirection,
    format: QuizFormat,
    topic: QuizTopic
};

export type WordSelectionData = {
    allHiragana: boolean,
    allKatakana: boolean
};

export interface KanaButtonProps {
    className?: string,
    disableOnClick?: boolean,
    isSearchTarget?: boolean,
    letters: [string, string, string]
};

export type UpdateKanaSelectionsFn = (letters: string[], addOnly?: boolean, deleteOnly?: boolean) => void;