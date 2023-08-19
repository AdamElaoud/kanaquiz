import { Button, ButtonGroup, Icon, NumberInput } from "@/common/components";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { CustomIconType, ItemConfig, NumberInputState, ReactFormOnSubmitEvent, Side, Size } from "@/common/types";
import DirectionToggle from "@/components/direction-toggle/DirectionToggle";
import QuizSelectionSection from "@/components/quiz-selection-section/QuizSelectionSection";
import useQuizSelections from "@/hooks/useQuizSelections";
import { QuizDirection, QuizFormat, QuizSelectionData, QuizTopic } from "@/types";
import {
    DIRECTION_TOOLTIP,
    FORMAT_TOOLTIP,
    MAXIMUM_QUESTION_AMOUNT,
    MINIMUM_QUESTION_AMOUNT,
    SCREEN_FILL_WIDTH,
    SCREEN_PARTIAL_FILL_WIDTH
} from "@/utils/constants";

import "./QuizSelection.scss";

const KANA_TOPIC_BUTTON_ID = "kana-topic-button";
const WORDS_TOPIC_BUTTON_ID = "words-topic-button";
const WRITE_FORMAT_BUTTON_ID = "write-format-button";
const CHOOSE_FORMAT_BUTTON_ID = "choose-format-button";

const QuizSelection = () : JSX.Element => {
    const dynamicQuizOptionsWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);
    const { quizSelections, updateQuizSelections } = useQuizSelections();

    const updateQuizSelectionField = (fieldName: keyof QuizSelectionData, fieldData: QuizDirection | QuizFormat | QuizTopic) => {
        updateQuizSelections({ ...quizSelections, [fieldName]: fieldData })
    };

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };
    
    const { amount, direction, format, topic } = quizSelections;

    const defaultDirection = direction === QuizDirection.ENtoJP ? Side.Right : Side.Left;
    const defaultFormat = format === QuizFormat.WriteTheAnswer ? WRITE_FORMAT_BUTTON_ID : CHOOSE_FORMAT_BUTTON_ID;
    const defaultTopic = topic === QuizTopic.Kana ? KANA_TOPIC_BUTTON_ID : WORDS_TOPIC_BUTTON_ID;

    const directionToggleButtons: [ItemConfig, ItemConfig] = [
        { content: <Icon type = {CustomIconType.USFlag} /> }, 
        { content: <Icon type = {CustomIconType.JPFlag} /> }
    ];

    const onDirectionChange = (newDirection: Side) => {
        if (newDirection === Side.Left)
            updateQuizSelectionField("direction", QuizDirection.JPtoEN);
        else
            updateQuizSelectionField("direction", QuizDirection.ENtoJP)
    };

    const wordsIsSelectedTopic = topic === QuizTopic.Words;

    return (
        <div className = "quiz-selection-page">
            <div className = "welcome-message">
                <span className = "welcome-title" >Welcome to Kana Quiz!</span>
                <span className = "call-to-action">Please select how you would like to study</span>
            </div>
            
            <form className = "quiz-options" style = {dynamicQuizOptionsWidth} onSubmit = {onSubmit}>
                <QuizSelectionSection title = "Topic">
                    <ButtonGroup defaultActiveButton = {defaultTopic}>
                        <Button id = {KANA_TOPIC_BUTTON_ID} onClick = {() => updateQuizSelectionField("topic", QuizTopic.Kana)}>
                            Kana
                        </Button>
                        <Button id = {WORDS_TOPIC_BUTTON_ID} onClick = {() => updateQuizSelections({
                            ...quizSelections,
                            topic: QuizTopic.Words,
                            direction: QuizDirection.JPtoEN,
                            format: QuizFormat.WriteTheAnswer 
                        })}>
                            Words
                        </Button>
                    </ButtonGroup>
                </QuizSelectionSection>

                <QuizSelectionSection title = "Translate" helpTooltip = {DIRECTION_TOOLTIP}>
                    <DirectionToggle 
                        key = {`direction-selection-${topic}`}
                        content = {directionToggleButtons}
                        defaultPointDirection = {wordsIsSelectedTopic ? Side.Left : defaultDirection}
                        disabled = {wordsIsSelectedTopic}
                        onToggle = {onDirectionChange}
                    />
                </QuizSelectionSection>

                <QuizSelectionSection title = "Answer" helpTooltip = {FORMAT_TOOLTIP}>
                    <ButtonGroup defaultActiveButton = {defaultFormat} key = {`format-selection-${topic}`} disabled = {wordsIsSelectedTopic}>
                        <Button id = {WRITE_FORMAT_BUTTON_ID} onClick = {() => updateQuizSelectionField("format", QuizFormat.WriteTheAnswer)}>
                            Write
                        </Button>
                        <Button id = {CHOOSE_FORMAT_BUTTON_ID} onClick = {() => updateQuizSelectionField("format", QuizFormat.MultipleChoice)}>
                            Choose
                        </Button>
                    </ButtonGroup>
                </QuizSelectionSection>

                <QuizSelectionSection title = "Questions">
                    <NumberInput
                        defaultValue = {amount}
                        max = {MAXIMUM_QUESTION_AMOUNT}
                        min = {MINIMUM_QUESTION_AMOUNT}
                        name = "question-amount"
                        onChange = {({ newValue }: NumberInputState) =>
                            updateQuizSelections({ ...quizSelections, amount: newValue })}
                        size = {Size.Large}
                        showFlareOnInvalidInput = {true}
                    />
                </QuizSelectionSection>
            </form>
        </div>
    );
};

export default QuizSelection;