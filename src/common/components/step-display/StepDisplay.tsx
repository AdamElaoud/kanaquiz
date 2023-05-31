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

        const stepProps = {
            active: index === activeStepIndex,
            complete: index < activeStepIndex,
            iconType,
            key: ID,
            title
        };

        stepDisplay.push(<Step {...stepProps}/>);

        if (index !== steps.length - 1)
            stepDisplay.push(<div className = "bar" key = {`${ID}-bar`}></div>);

        return stepDisplay;
    }, []);

    return (
        <div className = "step-display">
            {stepDisplay}
        </div>
    );
};

export default StepDisplay;