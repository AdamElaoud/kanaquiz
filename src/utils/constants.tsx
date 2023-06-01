import { CustomIconType, FontAwesomeIconType, StepConfig } from "@/common/types";
import KanaQuiz from "@/pages/KanaQuiz";
import KanaSelection from "@/pages/KanaSelection";
import QuizRecap from "@/pages/QuizRecap";
import QuizSelection from "@/pages/QuizSelection";
import QuizSummary from "@/pages/QuizSummary";
import { PageMapType, PageType, QuizType } from "@/types";

// eslint-disable-next-line
export const PAGE_STEPS: StepConfig[] = [
    {
        iconType: CustomIconType.Hiragana,
        ID: PageType.KanaSelect,
        text: "Select the Kana for your quiz!",
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

// eslint-disable-next-line
export const PAGES: PageMapType = {
    KanaSelection: <KanaSelection />,
    QuizSelection: <QuizSelection />,
    KanaQuiz: <KanaQuiz />,
    QuizSummary: <QuizSummary />,
    QuizRecap: <QuizRecap />
};

// eslint-disable-next-line
export const ENGLISH_DELIMITERS = [" ", ",", ", "];
// eslint-disable-next-line
export const JAPANESE_DELIMITERS = ["　", "、"];

// eslint-disable-next-line
export const QUIZ_TYPE_ICONS = {
    [QuizType.MultipleChoice]: FontAwesomeIconType.NumberList,
    [QuizType.MultipleChoiceReverse]: FontAwesomeIconType.NumberList,
    [QuizType.WriteTheAnswer]: FontAwesomeIconType.Pencil,
    [QuizType.WriteTheAnswerX3]: FontAwesomeIconType.Pencil,
};

// eslint-disable-next-line
export const QUIZ_TYPE_TITLES = {
    [QuizType.MultipleChoice]: "Multiple Choice",
    [QuizType.MultipleChoiceReverse]: "Multiple Choice - Reverse",
    [QuizType.WriteTheAnswer]: "Write the Answer",
    [QuizType.WriteTheAnswerX3]: "Write the Answer x3",
};

// eslint-disable-next-line
export const QUIZ_TYPE_MINI_TITLES = {
    [QuizType.MultipleChoice]: "Choice",
    [QuizType.MultipleChoiceReverse]: "Choice Reverse",
    [QuizType.WriteTheAnswer]: "Write",
    [QuizType.WriteTheAnswerX3]: "Write x3",
};

// eslint-disable-next-line
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