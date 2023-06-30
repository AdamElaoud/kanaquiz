import "./QuizSelection.scss";
import { QuizDirection, QuizFormat, QuizSelectionData, QuizTopic } from "@/types";
import useQuizSelections from "@/hooks/useQuizSelections";
import { MAXIMUM_QUESTION_AMOUNT, MINIMUM_QUESTION_AMOUNT, SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import { Icon, NumberInput, ToggleButton } from "@/common/components";
import { CustomIconType, InputState, Side, Size, ItemConfig, ToggleButtonConfig, ReactFormOnSubmitEvent } from "@/common/types";
import SelectionSection from "@/components/quiz-selection-section/SelectionSection";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import DirectionToggle from "@/components/direction-toggle/DirectionToggle";

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
                <SelectionSection title = "Topic">
                    <ToggleButton buttons = {topicToggleButtons} defaultActiveSide = {defaultTopicSide}/>
                </SelectionSection>
                <SelectionSection title = "Direction" helpTooltip = "blank">
                    <DirectionToggle 
                        key = {`direction-selection-${quizSelections.topic}`}
                        content = {directionToggleButtons}
                        defaultPointDirection = {wordsIsSelectedTopic ? Side.Left : defaultDirection}
                        disabled = {wordsIsSelectedTopic}
                        onToggle = {onDirectionChange}
                    />
                </SelectionSection>
                <SelectionSection title = "Answer" helpTooltip = "blank">
                    <ToggleButton
                        key = {`format-selection-${quizSelections.topic}`}
                        buttons = {formatToggleButtons}
                        defaultActiveSide = {wordsIsSelectedTopic ? Side.Left : defaultFormatSide}
                        disabled = {wordsIsSelectedTopic}
                    />
                </SelectionSection>
                <SelectionSection title = "Questions">
                    <NumberInput
                        defaultValue={quizSelections.amount}
                        max = {MAXIMUM_QUESTION_AMOUNT}
                        min = {MINIMUM_QUESTION_AMOUNT}
                        name = "question-amount"
                        onChange = {({ newValue }: InputState) =>
                            updateQuizSelections({ ...quizSelections, amount: newValue })}
                        size = {Size.Large}
                    />
                </SelectionSection>
            </form>
        </div>
    );
};

export default QuizSelection;