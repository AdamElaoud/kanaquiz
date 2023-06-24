import "./QuizSelection.scss";
import { QuizDirection, QuizFormat, QuizSelectionData, QuizTopic } from "@/types";
import { QuizSelectionsContextProvider } from "@/hooks/useQuizSelections";
import { DEFAULT_QUESTION_AMOUNT, MAXIMUM_QUESTION_AMOUNT, MINIMUM_QUESTION_AMOUNT, SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import { Icon, NumberInput } from "@/common/components";
import { CustomIconType, InputState, Side, Size, ToggleButtonConfig } from "@/common/types";
import QuizSelectionSection from "@/components/quiz-selection-section/QuizSelectionSection";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";

const QuizSelection = () : JSX.Element => {
    const dynamicQuizOptionsWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);
    const [quizSelections, setQuizSelections] = useLocalStorage<QuizSelectionData>("quiz-selections", {
        amount: DEFAULT_QUESTION_AMOUNT,
        direction: QuizDirection.JPtoEN,
        format: QuizFormat.MultipleChoice,
        topic: QuizTopic.Kana
    });
    
    const updateQuizSelections = (quizSelectionData: QuizSelectionData) => {
        setQuizSelections(quizSelectionData);
    };

    const updateQuizSelectionField = (fieldName: keyof QuizSelectionData, fieldData: QuizDirection | QuizFormat | QuizTopic) => {
        setQuizSelections(currentSelections => ({ ...currentSelections, [fieldName]: fieldData }))
    };
    
    const { direction, format, topic } = quizSelections;

    const defaultDirectionSide = direction === QuizDirection.ENtoJP ? Side.Left : Side.Right;
    const defaultFormatSide = format === QuizFormat.WriteTheAnswer ? Side.Left : Side.Right;
    const defaultTopicSide = topic === QuizTopic.Kana ? Side.Left : Side.Right;

    const topicToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { content: "Kana", onClick: () => updateQuizSelectionField("topic", QuizTopic.Kana) },
        { content: "Words", onClick: () => updateQuizSelectionField("topic", QuizTopic.Words) }
    ];

    const directionToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        {
            content: <DirectionIndicator direction = {QuizDirection.ENtoJP}/>,
            onClick: () => updateQuizSelectionField("direction", QuizDirection.ENtoJP)
        },
        {
            content: <DirectionIndicator direction = {QuizDirection.JPtoEN}/>,
            onClick: () => updateQuizSelectionField("direction", QuizDirection.JPtoEN)
        }
    ];

    const formatToggleButtons: [ToggleButtonConfig, ToggleButtonConfig] = [
        { content: "Write", onClick: () => updateQuizSelectionField("format", QuizFormat.WriteTheAnswer) },
        { content: "Choice", onClick: () => updateQuizSelectionField("format", QuizFormat.MultipleChoice) }
    ];

    return (
        <QuizSelectionsContextProvider value = {{ quizSelections, updateQuizSelections }}>
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
                        title = "Direction"
                        buttons = {directionToggleButtons}
                        defaultActiveSide = {defaultDirectionSide}
                        helpTooltip = "blank"
                    />
                    <QuizSelectionSection
                        title = "Format"
                        buttons = {formatToggleButtons}
                        defaultActiveSide = {defaultFormatSide}
                        helpTooltip = "blank" 
                    />
                </div>

                <NumberInput
                    defaultValue={quizSelections.amount}
                    max = {MAXIMUM_QUESTION_AMOUNT}
                    min = {MINIMUM_QUESTION_AMOUNT}
                    name = "question-amount"
                    onChange = {({ newValue }: InputState) =>
                        setQuizSelections(currentSelections => ({ ...currentSelections, amount: newValue }))}
                    title = "Question Amount"
                    size = {Size.Large}
                />
            </div>
        </QuizSelectionsContextProvider>
    );
};

export default QuizSelection;

interface DirectionIndicatorProps {
    direction: QuizDirection
};

const DirectionIndicator = ({ direction }: DirectionIndicatorProps) => {
    const usFlagIcon = <Icon type = {CustomIconType.USFlag} />;
    const jpFlagIcon = <Icon type = {CustomIconType.JPFlag} />

    const leftIcon = direction === QuizDirection.ENtoJP ? usFlagIcon : jpFlagIcon;
    const rightIcon = direction === QuizDirection.ENtoJP ? jpFlagIcon : usFlagIcon;
    
    return (
        <span className = "direction-indicator">
            {leftIcon} ➜ {rightIcon}
        </span>
    );
};