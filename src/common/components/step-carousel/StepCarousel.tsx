import { CSSStyles, FontAwesomeIconType, Side, StepConfig, StepState } from "@/common/types";
import "./StepCarousel.scss";
import { Button, StepDisplay } from "..";
import { useState } from "react";

interface Props {
    className?: string,
    displayFlagAtEnd?: boolean,
    onStepChange?: StepState,
    showCheckOnComplete?: boolean,
    startingStepID?: number,
    steps: StepConfig[],
    style: CSSStyles
};

const DEFAULT_STARTING_STEP_INDEX = 0;

const StepCarousel = (props: Props) : JSX.Element => {
    const { className, displayFlagAtEnd, onStepChange, showCheckOnComplete, steps, startingStepID = steps[0].ID, style } = props;

    const [activeStepIndex, setActiveStepIndex] = useState<number>(() => {
        return steps.findIndex(step => step.ID === startingStepID) || DEFAULT_STARTING_STEP_INDEX;
    });

    const nextStep = () => {
        if (onStepChange) {
            const activeStep = steps[activeStepIndex];
            const nextStep = steps[activeStepIndex + 1];

            onStepChange({
                prevStepID: activeStep.ID, 
                prevStepTitle: activeStep.title,
                newStepID: nextStep.ID,
                newStepTitle: nextStep.title
            });
        }

        setActiveStepIndex(currentStepIndex => currentStepIndex + 1);
    };

    const previousStep = () => {
        if (onStepChange) {
            const activeStep = steps[activeStepIndex];
            const nextStep = steps[activeStepIndex - 1];

            onStepChange({
                prevStepID: activeStep.ID, 
                prevStepTitle: activeStep.title,
                newStepID: nextStep.ID,
                newStepTitle: nextStep.title
            });
        }

        setActiveStepIndex(currentStepIndex => currentStepIndex - 1);
    };

    let classes = "step-carousel";
    if (className) classes += ` ${className}`;

    return (
        <div className = {classes} style = {style}>
            <Button
                className = "back-button"
                onClick = {previousStep}
                iconType = {FontAwesomeIconType.ArrowLeft}
                disabled = {activeStepIndex === 0}
            >
                Back
            </Button>

            <div className = "steps-content">
                <StepDisplay
                    steps = {steps}
                    activeStepIndex = {activeStepIndex}
                    displayFlagAtEnd = {displayFlagAtEnd}
                    showCheckOnComplete = {showCheckOnComplete}
                />
                <div className = "step-text">
                    {steps[activeStepIndex].text}
                </div>
            </div>

            <Button
                className = "next-button"
                onClick = {nextStep}
                iconType = {FontAwesomeIconType.ArrowRight}
                iconSide = {Side.Right}
                disabled = {activeStepIndex === steps.length - 1}
            >
                Next
            </Button>
        </div>
    );
};

export default StepCarousel;