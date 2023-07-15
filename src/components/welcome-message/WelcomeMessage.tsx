import { Button, Icon } from "@/common/components";
import { FontAwesomeIconType, PlainFn } from "@/common/types";

import "./WelcomeMessage.scss";

interface Props {
    onComplete: PlainFn
};

const WelcomeMessage = (props: Props) : JSX.Element => {
    const { onComplete } = props;

    return (
        <div className = "welcome-message-modal">
            <div className = "welcome-message-title">
                <Icon type = {FontAwesomeIconType.Torii} />
                Welcome to Kana Quiz!
            </div>

            <span>
                We help you master Japanese hiragana and katakana.
            </span>

            <span>
                Quiz yourself on specific characters or words to improve your mastery.
            </span>

            <span className = "welcome-message-get-started">
                Let's get started!
            </span>

            <Button className = "close-welcome-message-button" onClick = {onComplete}>
                Start a quiz!
            </Button>
        </div>
    );
};

export default WelcomeMessage;