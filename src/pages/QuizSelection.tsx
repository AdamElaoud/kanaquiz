import "./QuizSelection.scss";
import { QuizDirection, QuizFormat, QuizSelectionData, QuizTopic } from "@/types";
import useQuizSelections from "@/hooks/useQuizSelections";
import { MAXIMUM_QUESTION_AMOUNT, MINIMUM_QUESTION_AMOUNT, SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import { Icon, NumberInput } from "@/common/components";
import { CustomIconType, InputState, Side, Size, ToggleButtonConfig } from "@/common/types";
import QuizSelectionSection from "@/components/quiz-selection-section/QuizSelectionSection";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";

const QuizSelection = () : JSX.Element => {
    const dynamicQuizOptionsWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);
    const { quizSelections, updateQuizSelections } = useQuizSelections();

    const updateQuizSelectionField = (fieldName: keyof QuizSelectionData, fieldData: QuizDirection | QuizFormat | QuizTopic) => {
        updateQuizSelections({ ...quizSelections, [fieldName]: fieldData })
    };
    
    const { direction, format, topic } = quizSelections;

    const defaultDirectionSide = direction === QuizDirection.ENtoJP ? Side.Left : Side.Right;
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

    const directionToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        {
            content: <Icon type = {CustomIconType.USFlag} size = {Size.Small}/>,
            onClick: () => updateQuizSelectionField("direction", QuizDirection.ENtoJP)
        },
        {
            content: <Icon type = {CustomIconType.JPFlag} size = {Size.Small}/>,
            onClick: () => updateQuizSelectionField("direction", QuizDirection.JPtoEN)
        }
    ];

    const formatToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { content: "Write", onClick: () => updateQuizSelectionField("format", QuizFormat.WriteTheAnswer) },
        { content: "Choice", onClick: () => updateQuizSelectionField("format", QuizFormat.MultipleChoice) }
    ];

    const wordsIsSelectedTopic = quizSelections.topic === QuizTopic.Words;

    return (
        <div className = "quiz-selection-page">
            <div className = "welcome-message">
                <span className = "welcome-title" >Welcome to Kana Quiz!</span>
                <span className = "call-to-action">Please select how you would like to study</span>
            </div>
            
            <div className = "quiz-options" style = {dynamicQuizOptionsWidth}>
                <QuizSelectionSection
                    title = "Topic"
                    buttons = {topicToggleButtons}
                    defaultActiveSide = {defaultTopicSide}
                />
                <QuizSelectionSection
                    title = "Prompt"
                    buttons = {directionToggleButtons}
                    defaultActiveSide = {defaultDirectionSide}
                    helpTooltip = "blank"
                    disabled = {wordsIsSelectedTopic}
                    activeButton = {wordsIsSelectedTopic ? Side.Right : undefined}
                />
                <QuizSelectionSection
                    title = "Format"
                    buttons = {formatToggleButtons}
                    defaultActiveSide = {defaultFormatSide}
                    helpTooltip = "blank"
                    disabled = {wordsIsSelectedTopic}
                    activeButton = {wordsIsSelectedTopic ? Side.Left : undefined}
                />
            </div>

            <NumberInput
                defaultValue={quizSelections.amount}
                max = {MAXIMUM_QUESTION_AMOUNT}
                min = {MINIMUM_QUESTION_AMOUNT}
                name = "question-amount"
                onChange = {({ newValue }: InputState) =>
                    updateQuizSelections({ ...quizSelections, amount: newValue })}
                title = "Question Amount"
                size = {Size.Large}
            />
        </div>
    );
};

export default QuizSelection;