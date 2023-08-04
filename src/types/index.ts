import { ReactElementFn } from "@/common/types";

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

export enum PageRoute {
    KanaQuiz = "/kana-quiz",
    KanaSelect = "/kana-selection",
    QuizRecap = "/quiz-recap",
    QuizSelect = "/", // index route
    QuizSummary = "/quiz-summary",
    WordSelect = "/word-selection"
};

export enum TabID {
    Hiragana = 0,
    Katakana = 1,
    Lookalikes = 2
};

export type SummaryMapType =  Record<QuizTopic | QuizDirection | QuizFormat, ReactElementFn>;

export type KanaLetters = [string, string, string];

export type CharsToGroups = {
    [key: string]: string[]
};

export type GroupsToChars = {
    [key: string]: KanaLetters[]
};

export type Word = {
    definition: string,
    kana: string[],
    romaji: string[],
    type: "hiragana" | "katakana"
};

export type HiraganaWord = Word & { type: "hiragana" };

export type KatakanaWord = Word & { type: "katakana" };

export type SettingsData = {
    autoFocusNextInput: boolean,
    showDefinitions: boolean,
    showRotationWarning: boolean
};

export type QuizSelectionData = {
    amount: number | "",
    direction: QuizDirection,
    format: QuizFormat,
    topic: QuizTopic
};

export type WordSelectionData = {
    allHiragana: boolean,
    allKatakana: boolean
};

export type Question = {
    answer: string | string[],
    answerDetails: string | string[],
    choices?: KanaLetters,
    prompt: string,
    context?: string
};

export type QuestionResult = Question & {
    correct: boolean,
    time: string
};

export interface KanaButtonProps {
    className?: string,
    disableOnClick?: boolean,
    id: string,
    isSearchTarget?: boolean,
    letters: KanaLetters
};

export type UpdateKanaSelectionsFn = (letters: string[], addOnly?: boolean, deleteOnly?: boolean) => void;