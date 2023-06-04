/* eslint-disable */
import { CustomIconType, FontAwesomeIconType, StepConfig } from "@/common/types";
import KanaQuiz from "@/pages/KanaQuiz";
import KanaSelection from "@/pages/KanaSelection";
import QuizRecap from "@/pages/QuizRecap";
import QuizSelection from "@/pages/QuizSelection";
import QuizSummary from "@/pages/QuizSummary";
import { PageMapType, PageType, QuizType } from "@/types";

// this value is expected to match the SCSS $sizeWidthThreshhold variable in _values.scss
export const SCREEN_WIDTH_THRESHHOLD = 600;
// this value is expected to match the SCSS $sizeHeightThreshhold variable in _values.scss
export const SCREEN_HEIGHT_THRESHHOLD = 950;

export const SCREEN_FILL_WIDTH = 950; // pixel width at which contents will fill X% of the screen
export const SCREEN_FILL_PERCENT = 100; // percentage contents should fill the screen for the above size
export const SCREEN_PARTIAL_FILL_WIDTH = 1440; // pixel width at which contents will fill only X% of the screen
export const SCREEN_PARTIAL_FILL_PERCENT = 65; // percentage contents should fill the screen for the above size

export const DEFAULT_QUESTION_AMOUNT = 10;
export const MINIMUM_QUESTION_AMOUNT = 1;
export const MAXIMUM_QUESTION_AMOUNT = 50;

export const PAGE_STEPS: StepConfig[] = [
    {
        iconType: CustomIconType.Hiragana,
        ID: PageType.KanaSelect,
        text: "Select Kana to practice!",
        title: "Kana"
    },
    {
        iconType: FontAwesomeIconType.ClipboardQuestion,
        ID: PageType.QuizSelect,
        text: "Select your quiz types!",
        title: "Quiz"
    },
    {
        iconType: FontAwesomeIconType.Play,
        ID: PageType.QuizSummary,
        text: "Quiz summary",
        title: "Go!"
    },
];

export const PAGES: PageMapType = {
    KanaSelection: <KanaSelection />,
    QuizSelection: <QuizSelection />,
    KanaQuiz: <KanaQuiz />,
    QuizSummary: <QuizSummary />,
    QuizRecap: <QuizRecap />
};

export const ENGLISH_DELIMITERS = [" ", ",", ", "];
export const JAPANESE_DELIMITERS = ["　", "、"];

export const QUIZ_TYPE_ICONS = {
    [QuizType.MultipleChoice]: FontAwesomeIconType.NumberList,
    [QuizType.MultipleChoiceReverse]: FontAwesomeIconType.NumberList,
    [QuizType.WriteTheAnswer]: FontAwesomeIconType.Pencil,
    [QuizType.WriteTheAnswerX3]: FontAwesomeIconType.Pencil,
};

export const QUIZ_TYPE_TITLES = {
    [QuizType.MultipleChoice]: "Multiple Choice",
    [QuizType.MultipleChoiceReverse]: "Multiple Choice - Reverse",
    [QuizType.WriteTheAnswer]: "Write the Answer",
    [QuizType.WriteTheAnswerX3]: "Write the Answer x3",
};

export const QUIZ_TYPE_MINI_TITLES = {
    [QuizType.MultipleChoice]: "Choice",
    [QuizType.MultipleChoiceReverse]: "Choice Reverse",
    [QuizType.WriteTheAnswer]: "Write",
    [QuizType.WriteTheAnswerX3]: "Write x3",
};

export const QUIZ_TYPE_DESCRIPTIONS = {
    [QuizType.MultipleChoice]: "Choose the matching romaji for the kana",
    [QuizType.MultipleChoiceReverse]: "Choose the matching kana for the romaji",
    [QuizType.WriteTheAnswer]: "Write the matching romaji for the kana",
    [QuizType.WriteTheAnswerX3]: "Write the matching romaji for 3 kana",
};

export const QUIZ_TYPE_COLOR_CLASSNAMES = {
    [QuizType.MultipleChoice]: 'crimson',
    [QuizType.MultipleChoiceReverse]: 'lightskyblue',
    [QuizType.WriteTheAnswer]: 'lightgreen',
    [QuizType.WriteTheAnswerX3]: 'gold',
};

export const QUIZ_TYPES = [
    { 
        key: 0,
        iconType: FontAwesomeIconType.NumberList,
        title: QUIZ_TYPE_TITLES[QuizType.MultipleChoice],
        quizType: QuizType.MultipleChoice
    },
    {
        key: 1,
        iconType: FontAwesomeIconType.NumberList,
        title: QUIZ_TYPE_TITLES[QuizType.MultipleChoiceReverse],
        quizType: QuizType.MultipleChoiceReverse
    },
    {
        key: 2,
        iconType: FontAwesomeIconType.Pencil,
        title: QUIZ_TYPE_TITLES[QuizType.WriteTheAnswer],
        quizType: QuizType.WriteTheAnswer
    },
    {
        key: 3,
        iconType: FontAwesomeIconType.Pencil,
        title: QUIZ_TYPE_TITLES[QuizType.WriteTheAnswerX3],
        quizType: QuizType.WriteTheAnswerX3
    }
];