/* eslint-disable */
import { CustomIconType, FontAwesomeIconType, StepConfig } from "@/common/types";
import KanaQuiz from "@/pages/KanaQuiz";
import KanaSelection from "@/pages/KanaSelection";
import QuizRecap from "@/pages/QuizRecap";
import QuizSelection from "@/pages/QuizSelection";
import QuizSummary from "@/pages/QuizSummary";
import { PageMapType, PageType } from "@/types";

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
        iconType: FontAwesomeIconType.ClipboardQuestion,
        ID: PageType.QuizSelect,
        title: "Quiz"
    },
    {
        iconType: CustomIconType.Kana,
        ID: PageType.KanaSelect,
        title: "Kana"
    },
    {
        iconType: FontAwesomeIconType.Play,
        ID: PageType.QuizSummary,
        title: "Go!"
    },
];

export const PAGES: PageMapType = {
    KanaSelection: () => <KanaSelection />,
    QuizSelection: () => <QuizSelection />,
    KanaQuiz: () => <KanaQuiz />,
    QuizSummary: () => <QuizSummary />,
    QuizRecap: () => <QuizRecap />
};

export const ENGLISH_DELIMITERS = [" ", ",", ", "];
export const JAPANESE_DELIMITERS = ["　", "、"];

// export const QUIZ_TYPE_ICONS = {
//     [QuizTopic.MultipleChoice]: FontAwesomeIconType.NumberList,
//     [QuizTopic.MultipleChoiceReverse]: FontAwesomeIconType.NumberList,
//     [QuizTopic.WriteTheAnswer]: FontAwesomeIconType.Pencil,
//     [QuizTopic.WriteTheAnswerX3]: FontAwesomeIconType.Pencil,
// };

// export const QUIZ_TYPE_TITLES = {
//     [QuizTopic.MultipleChoice]: "Multiple Choice\nen ➜ jp",
//     [QuizTopic.MultipleChoiceReverse]: "Multiple Choice\njp ➜ en",
//     [QuizTopic.WriteTheAnswer]: "Write the Answer",
//     [QuizTopic.WriteTheAnswerX3]: "Write the Answer x3",
// };

// export const QUIZ_TYPE_DESCRIPTIONS = {
//     [QuizTopic.MultipleChoice]: "Choose the matching romaji for the kana",
//     [QuizTopic.MultipleChoiceReverse]: "Choose the matching kana for the romaji",
//     [QuizTopic.WriteTheAnswer]: "Write the matching romaji for the kana",
//     [QuizTopic.WriteTheAnswerX3]: "Write the matching romaji for 3 kana",
// };

// export const QUIZ_TYPE_COLOR_CLASSNAMES = {
//     [QuizTopic.MultipleChoice]: 'crimson',
//     [QuizTopic.MultipleChoiceReverse]: 'lightskyblue',
//     [QuizTopic.WriteTheAnswer]: 'lightgreen',
//     [QuizTopic.WriteTheAnswerX3]: 'gold',
// };