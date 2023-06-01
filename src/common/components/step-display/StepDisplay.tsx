import { FontAwesomeIconType, ReactNode, StepConfig } from "@/common/types";
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
        const { iconType, ID, title } = step;

        // need explicit check for undefined as 0 is falsey
        const active = activeStepIndex !== undefined ? index === activeStepIndex : false;
        const complete = activeStepIndex !== undefined ? index < activeStepIndex : false;

        const stepProps = {
            active,
            complete,
            iconType,
            key: ID,
            showCheckOnComplete,
            title
        };

        if (index !== 0) {
            const barClasses = ["bar"];
            if (active) barClasses.push("active");
            if (complete) barClasses.push("complete");

            stepDisplay.push(<div className = {barClasses.join(" ")} key = {`${ID}-bar`}></div>);
        }

        stepDisplay.push(<Step {...stepProps}/>);

        return stepDisplay;
    }, []);

    if (displayFlagAtEnd) {
        stepDisplay.push(<div className = "bar" key = "flag-bar"></div>);
        stepDisplay.push(
            <div className = "flag-step">
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