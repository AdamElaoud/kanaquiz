import { ReactNode } from "@/common/types";

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
    KanaSelect = "KanaSelection",
    QuizSelect = "QuizSelection",
    KanaQuiz = "KanaQuiz",
    QuizSummary = "QuizSummary",
    QuizRecap = "QuizRecap"
};

export enum TabID {
    Hiragana = 0,
    Katakana = 1,
    Lookalikes = 2
};

export type PageMapType = {
    [key in PageType]: () => ReactNode;
};

export type CharsToGroups = {
    [key: string]: string[]
};

export type GroupsToChars = {
    [key: string]: string[][]
};

export type QuizSelectionData = {
    amount: number,
    direction: QuizDirection,
    format: QuizFormat,
    topic: QuizTopic
};

export interface KanaButtonProps {
    className?: string,
    isSearchTarget?: boolean,
    letters: string[]
};