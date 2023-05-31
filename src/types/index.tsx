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

export enum PageType {
    KanaSelect = "KanaSelection",
    QuizSelect = "QuizSelection",
    KanaQuiz = "KanaQuiz",
    QuizSummary = "QuizSummary",
};

export enum PageID {
    KanaSelect = 0,
    QuizSelect = 1,
    KanaQuiz = 2
};

export type PageMapType = {
    [key in PageType]: ReactNode;
};

export type CharsToGroups = {
    [key: string]: string[]
};

export type GroupsToChars = {
    [key: string]: string[][]
};