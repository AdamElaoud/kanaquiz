import { Icon, NumberInput, ToggleButton } from "@/common/components";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { CustomIconType, NumberInputState, ItemConfig, ReactFormOnSubmitEvent, Side, Size, ToggleButtonConfig } from "@/common/types";
import DirectionToggle from "@/components/direction-toggle/DirectionToggle";
import QuizSelectionSection from "@/components/quiz-selection-section/QuizSelectionSection";
import useQuizSelections from "@/hooks/useQuizSelections";
import { QuizDirection, QuizFormat, QuizSelectionData, QuizTopic } from "@/types";
import { MAXIMUM_QUESTION_AMOUNT, MINIMUM_QUESTION_AMOUNT, SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";

import "./QuizSelection.scss";

const QuizSelection = () : JSX.Element => {
    const dynamicQuizOptionsWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);
    const { quizSelections, updateQuizSelections } = useQuizSelections();

    const updateQuizSelectionField = (fieldName: keyof QuizSelectionData, fieldData: QuizDirection | QuizFormat | QuizTopic) => {
        updateQuizSelections({ ...quizSelections, [fieldName]: fieldData })
    };

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };
    
    const { direction, format, topic } = quizSelections;

    const defaultDirection = direction === QuizDirection.ENtoJP ? Side.Right : Side.Left;
    const defaultFormatSide = format === QuizFormat.WriteTheAnswer ? Side.Left : Side.Right;
    const defaultTopicSide = topic === QuizTopic.Kana ? Side.Left : Side.Right;

    const topicToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { content: "Kana", onClick: () => updateQuizSelectionField("topic", QuizTopic.Kana) },
        {
            content: "Words",
            onClick: () => updateQuizSelections({
                ...quizSelections,
                topic: QuizTopic.Words,
                direction: QuizDirection.JPtoEN,
                format: QuizFormat.WriteTheAnswer 
            })
        }
    ];

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

    const formatToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { content: "Write", onClick: () => updateQuizSelectionField("format", QuizFormat.WriteTheAnswer) },
        { content: "Choose", onClick: () => updateQuizSelectionField("format", QuizFormat.MultipleChoice) }
    ];

    const wordsIsSelectedTopic = quizSelections.topic === QuizTopic.Words;

    return (
        <div className = "quiz-selection-page">
            <div className = "welcome-message">
                <span className = "welcome-title" >Welcome to Kana Quiz!</span>
                <span className = "call-to-action">Please select how you would like to study</span>
            </div>
            
            <form className = "quiz-options" style = {dynamicQuizOptionsWidth} onSubmit = {onSubmit}>
                <QuizSelectionSection title = "Topic">
                    <ToggleButton buttons = {topicToggleButtons} defaultActiveSide = {defaultTopicSide}/>
                </QuizSelectionSection>
                <QuizSelectionSection title = "Translate" helpTooltip = "blank">
                    <DirectionToggle 
                        key = {`direction-selection-${quizSelections.topic}`}
                        content = {directionToggleButtons}
                        defaultPointDirection = {wordsIsSelectedTopic ? Side.Left : defaultDirection}
                        disabled = {wordsIsSelectedTopic}
                        onToggle = {onDirectionChange}
                    />
                </QuizSelectionSection>
                <QuizSelectionSection title = "Answer" helpTooltip = "blank">
                    <ToggleButton
                        key = {`format-selection-${quizSelections.topic}`}
                        buttons = {formatToggleButtons}
                        defaultActiveSide = {wordsIsSelectedTopic ? Side.Left : defaultFormatSide}
                        disabled = {wordsIsSelectedTopic}
                    />
                </QuizSelectionSection>
                <QuizSelectionSection title = "Questions">
                    <NumberInput
                        defaultValue={quizSelections.amount}
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