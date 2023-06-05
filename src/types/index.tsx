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

export enum QuizType {
    MultipleChoice = "multiple-choice",
    MultipleChoiceReverse = "multiple-choice-reverse",
    WriteTheAnswer = "write-the-answer",
    WriteTheAnswerX3 = "write-the-answer-x3",
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
    [key in PageType]: ReactNode;
};

export type CharsToGroups = {
    [key: string]: string[]
};

export type GroupsToChars = {
    [key: string]: string[][]
};

export type QuizSelectionData = {
    type: QuizType,
    amount: number
};

export interface KanaButtonProps {
    className?: string,
    isSearchTarget?: boolean,
    letters: string[]
};