import { CSSStyles, FontAwesomeIconType, Side, StepConfig, StepState } from "@/common/types";
import { useState } from "react";

import { Button, StepDisplay } from "..";

import "./StepWizard.scss";

interface Props {
    className?: string,
    displayFlagAtEnd?: boolean,
    onStepChange?: (stepState: StepState) => void,
    showCheckOnComplete?: boolean,
    startingStepID?: number | string,
    steps: StepConfig[],
    style: CSSStyles
};

const DEFAULT_STARTING_STEP_INDEX = 0;

const StepWizard = (props: Props) : JSX.Element => {
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

    let classes = "step-wizard";
    if (className) classes += ` ${className}`;

    const stepText = steps[activeStepIndex].text;

    return (
        <div className = {classes} style = {style}>
            <Button
                className = "back-button"
                onClick = {previousStep}
                iconType = {FontAwesomeIconType.AngleLeft}
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
                {stepText && <div className = "step-text">
                    {stepText}
                </div>}
            </div>

            <Button
                className = "next-button"
                onClick = {nextStep}
                iconType = {FontAwesomeIconType.AngleRight}
                iconSide = {Side.Right}
                disabled = {activeStepIndex === steps.length - 1}
            >
                Next
            </Button>
        </div>
    );
};

export default StepWizard;