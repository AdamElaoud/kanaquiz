/* eslint-disable */
import { Icon, LinkText } from "@/common/components";
import { CustomIconType, FontAwesomeIconType, Size } from "@/common/types";
import KanaQuiz from "@/pages/KanaQuiz";
import KanaSelection from "@/pages/KanaSelection";
import QuizRecap from "@/pages/QuizRecap";
import QuizSelection from "@/pages/QuizSelection";
import QuizSummary from "@/pages/QuizSummary";
import WordSelection from "@/pages/WordSelection";
import { PageMapType, QuizDirection, QuizFormat, QuizTopic, SummaryMapType } from "@/types";

// this value is expected to match the SCSS $sizeWidthThreshhold variable in _values.scss
export const SCREEN_WIDTH_THRESHHOLD = 600;
// this value is expected to match the SCSS $sizeHeightThreshhold variable in _values.scss
export const SCREEN_HEIGHT_THRESHHOLD = 950;
// this value is expected to match the SCSS $landscapeMobileHeightThreshhold variable in _values.scss
export const LANDSCAPE_MOBILE_SCREEN_HEIGHT_THRESHHOLD = 550;

export const SCREEN_FILL_WIDTH = 950; // pixel width at which contents will fill X% of the screen
export const SCREEN_FILL_PERCENT = 100; // percentage contents should fill the screen for the above size
export const SCREEN_PARTIAL_FILL_WIDTH = 1440; // pixel width at which contents will fill only X% of the screen
export const SCREEN_PARTIAL_FILL_PERCENT = 65; // percentage contents should fill the screen for the above size

export const DEFAULT_QUESTION_AMOUNT = 20;
export const MINIMUM_QUESTION_AMOUNT = 1;
export const MAXIMUM_QUESTION_AMOUNT = 50;

export const PAGES: PageMapType = {
    KanaQuiz: () => <KanaQuiz />,
    KanaSelection: () => <KanaSelection />,
    QuizRecap: () => <QuizRecap />,
    QuizSelection: () => <QuizSelection />,
    QuizSummary: () => <QuizSummary />,
    WordSelection: () => <WordSelection />
};

export const SUMMARY_DISPLAY: SummaryMapType = {
    [QuizTopic.Kana]: () => 
        <>
            <Icon type = {CustomIconType.Kana} />
            Kana
        </>,
    [QuizTopic.Words]: () => 
        <>
            <Icon type = {FontAwesomeIconType.Book} />
            Words
        </>,
    [QuizDirection.ENtoJP]: () => 
        <>
            <Icon type = {CustomIconType.USFlag} />
            <Icon size = {Size.Large} type = {FontAwesomeIconType.CircleArrowRight} />
            <Icon type = {CustomIconType.JPFlag} />
        </>,
    [QuizDirection.JPtoEN]: () => 
        <>
            <Icon type = {CustomIconType.JPFlag} />
            <Icon size = {Size.Large} type = {FontAwesomeIconType.CircleArrowRight} />
            <Icon type = {CustomIconType.USFlag} />
        </>,
    [QuizFormat.MultipleChoice]: () => 
        <>
            <Icon type = {FontAwesomeIconType.Tap} />
            Choose
        </>,
    [QuizFormat.WriteTheAnswer]: () => 
        <>
            <Icon type = {FontAwesomeIconType.Keyboard} />
            Write
        </>
};

export const ENGLISH_DELIMITERS = [" ", ",", ", "];
export const JAPANESE_DELIMITERS = ["　", "、"];

export const KANA_SELECTION_STORAGE_KEY = "kana-selections";
export const QUIZ_SELECTION_STORAGE_KEY = "quiz-selections";
export const WORD_SELECTION_STORAGE_KEY = "word-selections";
export const KANA_SELECTION_TAB_STORAGE_KEY = "kana-selections-tab";
export const SHOWN_WELCOME_MESSAGE_KEY = "shown-welcome-message";
export const SETTINGS_KEY = "settings";

export const LOCAL_STORAGE_EVENT_NAME = "storage";
export const GLOBAL_KEY = "global";

export const ORIENTATION_WARNING = "This app was designed to be used in portrait mode. Please rotate your device for the best experience.";
export const ORIENTATION_WARNING_ID = "orientation-warning";

export const NOT_ENOUGH_KANA = "You must select at least 3 Kana to continue.";
export const NOT_ENOUGH_WORDS = "You must select at least 1 word group to continue.";
export const NOT_ENOUGH_QUESTIONS = "You must set a question amount to continue.";

export const STORAGE_CLEARED = "All data successfully cleared!"
export const STORAGE_CLEARED_ID = "storage-cleared";

export const DIRECTION_TOOLTIP = 'when studying words, translation direction is locked to "Japanese to English"';
export const FORMAT_TOOLTIP = 'when studying words, answer format is locked to "Write"';
export const CLEAR_STORED_DATA_TOOLTIP = "Kana Quiz stores small amounts of data on your device. We keep track of things like your last quiz preferences for your convenience.";

export const HIRAGANA_TOOLTIP = () => <span>" ひ ら が な " <LinkText link = "https://en.wikipedia.org/wiki/Hiragana">learn more</LinkText></span>

//"[ひらがな] A phonetic lettering syllabary that is part of the Japanese writing system."
export const KATAKANA_TOOLTIP = () => <span>" カ タ カ ナ " <LinkText link = "https://en.wikipedia.org/wiki/Katakana">learn more</LinkText></span>