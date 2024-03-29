import useNotification from "@/common/hooks/useNotification";
import { BasicID, CSSStyles, FontAwesomeIconType, PlainFn, ReactForwardedRef, Side, StepConfig, StepState } from "@/common/types";
import { DEFAULT_STEP_WIZARD_NEXT_STEP_BLOCKED, STEP_WIZARD_NEXT_STEP_BLOCKED_ID } from "@/common/utils/constants";
import { buildClassNames } from "@/common/utils/utils";
import { forwardRef, useState } from "react";

import { Button, StepDisplay } from "..";

import "./StepWizard.scss";

interface Props {
    className?: string,
    completeConfig: {
        text?: string,
        onComplete: PlainFn
    },
    displayFlagAtEnd?: boolean,
    id?: string,
    onStepChange?: (stepState: StepState) => void,
    showCheckOnComplete?: boolean,
    startingStepID?: BasicID,
    steps: StepConfig[],
    style?: CSSStyles
};

const DEFAULT_STARTING_STEP_INDEX = 0;

const StepWizard = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) : JSX.Element => {
    const {
        className,
        completeConfig,
        displayFlagAtEnd,
        id,
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

    const nextButtonClasses = buildClassNames({
        "blocked-by-condition": nextStepIsDisabledFromCondition
    }, ["next-button"]);

    const stepWizardClasses = buildClassNames({ className }, ["step-wizard"]);

    const stepText = steps[activeStepIndex].text;

    const isOnFirstStep = activeStepIndex === 0;
    const isOnLastStep = activeStepIndex === steps.length - 1;

    return (
        <div className = {stepWizardClasses} id = {id} style = {style} ref = {ref}>
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
                className = {nextButtonClasses}
                onClick = {isOnLastStep ? completeConfig.onComplete : goToNextStep}
                iconType = {FontAwesomeIconType.AngleRight}
                iconSide = {Side.Right}
            >
                {isOnLastStep && completeConfig.text ? completeConfig.text : "NEXT"}
            </Button>
        </div>
    );
});

export default StepWizard;