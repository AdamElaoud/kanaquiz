import useNotification from "@/common/hooks/useNotification";
import { BasicID, CSSStyles, FontAwesomeIconType, PlainFn, Side, StepConfig, StepState } from "@/common/types";
import { DEFAULT_STEP_WIZARD_NEXT_STEP_BLOCKED, STEP_WIZARD_NEXT_STEP_BLOCKED_ID } from "@/common/utils/constants";
import { useState } from "react";

import { Button, StepDisplay } from "..";

import "./StepWizard.scss";

interface Props {
    className?: string,
    displayFlagAtEnd?: boolean,
    completeConfig: {
        text?: string,
        onComplete: PlainFn
    },
    onStepChange?: (stepState: StepState) => void,
    showCheckOnComplete?: boolean,
    startingStepID?: BasicID,
    steps: StepConfig[],
    style: CSSStyles
};

const DEFAULT_STARTING_STEP_INDEX = 0;

const StepWizard = (props: Props) : JSX.Element => {
    const {
        className,
        completeConfig,
        displayFlagAtEnd,
        onStepChange,
        showCheckOnComplete,
        steps,
        startingStepID,
        style
    } = props;

    const [activeStepIndex, setActiveStepIndex] = useState<number>(() => {
        const stepIndex = steps.findIndex(step => step.ID === startingStepID);

        return stepIndex === -1 ? DEFAULT_STARTING_STEP_INDEX : stepIndex;
    });
    const { error } = useNotification();

    const activeStep = steps[activeStepIndex];
    const nextStep = steps[activeStepIndex + 1];
    const nextStepIsDisabledFromCondition = activeStep.blockNextStep ? activeStep.blockNextStep({
        prevStepID: activeStep.ID, 
        prevStepTitle: activeStep.title,
        newStepID: nextStep?.ID,
        newStepTitle: nextStep?.title
    }) : false;

    const goToNextStep = () => {
        if (nextStepIsDisabledFromCondition) {
            const errorMsg = activeStep.nextStepBlockedError?.() || DEFAULT_STEP_WIZARD_NEXT_STEP_BLOCKED
            error(errorMsg, { toastId: STEP_WIZARD_NEXT_STEP_BLOCKED_ID });
            return;
        }

        if (onStepChange) {
            const activeStep = steps[activeStepIndex];
            const nextStep = steps[activeStepIndex + 1];

            onStepChange({
                prevStepID: activeStep.ID, 
                prevStepTitle: activeStep.title,
                newStepID: nextStep?.ID,
                newStepTitle: nextStep?.title
            });
        }

        setActiveStepIndex(currentStepIndex => currentStepIndex + 1);
    };

    const goToPreviousStep = () => {
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

    const nextButtonClasses = ["next-button"];
    if (nextStepIsDisabledFromCondition) nextButtonClasses.push("blocked-by-condition");

    const stepWizardClasses = ["step-wizard"];
    if (className) stepWizardClasses.push(className);

    const stepText = steps[activeStepIndex].text;

    const isOnFirstStep = activeStepIndex === 0;
    const isOnLastStep = activeStepIndex === steps.length - 1;

    return (
        <div className = {stepWizardClasses.join(" ")} style = {style}>
            {!isOnFirstStep && <Button
                className = "back-button"
                onClick = {goToPreviousStep}
                iconType = {FontAwesomeIconType.AngleLeft}
            >
                BACK
            </Button>}

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
                className = {nextButtonClasses.join(" ")}
                onClick = {isOnLastStep ? completeConfig.onComplete : goToNextStep}
                iconType = {FontAwesomeIconType.AngleRight}
                iconSide = {Side.Right}
            >
                {isOnLastStep && completeConfig.text ? completeConfig.text : "NEXT"}
            </Button>
        </div>
    );
};

export default StepWizard;