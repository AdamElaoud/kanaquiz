import { FontAwesomeIconType, ReactNode, StepConfig } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";

import { Icon, Step } from "..";

import "./StepDisplay.scss"

interface Props {
    activeStepIndex?: number,
    displayFlagAtEnd?: boolean,
    showCheckOnComplete?: boolean,
    steps: StepConfig[]
};

const StepDisplay = (props: Props) : JSX.Element => {
    const { activeStepIndex, displayFlagAtEnd, showCheckOnComplete, steps } = props;

    const stepDisplay = steps.reduce((stepDisplay: ReactNode[], step, index) => {
        const { className, iconType, ID, title } = step;

        // need explicit check for undefined as 0 is falsey
        const active = activeStepIndex !== undefined ? index === activeStepIndex : false;
        const complete = activeStepIndex !== undefined ? index < activeStepIndex : false;

        const stepProps = {
            active,
            className,
            complete,
            iconType,
            key: ID,
            showCheckOnComplete,
            title
        };

        if (index !== 0) {
            const barClasses = buildClassNames({ active, complete }, ["bar"]);

            stepDisplay.push(<div className = {barClasses} key = {`${ID}-bar`}/>);
        }

        stepDisplay.push(<Step {...stepProps}/>);

        return stepDisplay;
    }, []);

    if (displayFlagAtEnd) {
        stepDisplay.push(<div className = "bar" key = "flag-bar"/>);
        stepDisplay.push(
            <div className = "flag-step" key = "flag">
                <Icon type = {FontAwesomeIconType.FlagCheckered} />
            </div>
        );
    }

    return (
        <div className = "step-display">
            {stepDisplay}
        </div>
    );
};

export default StepDisplay;