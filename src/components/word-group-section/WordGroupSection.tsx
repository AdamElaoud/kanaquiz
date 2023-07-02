import { ToggleSwitch } from "@/common/components";

import "./WordGroupSection.scss";

interface Props {
    onActivate: () => void;
    onDeactivate: () => void;
    startDeactivated: boolean,
    title: string;
};

const WordGroupSection = (props: Props): JSX.Element => {
    const { onActivate, onDeactivate, startDeactivated, title } = props;

    return (
        <div className="word-group-section">
            <ToggleSwitch
                onActivate={onActivate}
                onDeactivate={onDeactivate}
                startDeactivated = {startDeactivated}
            />
            <span className="word-group-title">
                {title}
            </span>
        </div>
    );
};

export default WordGroupSection;