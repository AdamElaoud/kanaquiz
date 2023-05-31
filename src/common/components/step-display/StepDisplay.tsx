import { ReactNode, StepConfig } from "@/common/types";
import { Step } from "..";
import "./StepDisplay.scss"

interface Props {
    activeStepIndex: number,
    steps: StepConfig[]
};

const StepDisplay = (props: Props) : JSX.Element => {
    const { activeStepIndex, steps } = props;

    const stepDisplay = steps.reduce((stepDisplay: ReactNode[], step, index) => {
        const { iconType, ID, title } = step;

        const active = index === activeStepIndex;
        const complete = index < activeStepIndex;

        const stepProps = {
            active,
            complete,
            iconType,
            key: ID,
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

    return (
        <div className = "step-display">
            {stepDisplay}
        </div>
    );
};

export default StepDisplay;