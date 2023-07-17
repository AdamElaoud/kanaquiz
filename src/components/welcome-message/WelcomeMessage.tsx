import { Button, Icon, TooltipText } from "@/common/components";
import { FontAwesomeIconType, PlainFn, ReactForwardedRef } from "@/common/types";
import { HIRAGANA_TOOLTIP, KATAKANA_TOOLTIP } from "@/utils/constants";
import { forwardRef } from "react";

import "./WelcomeMessage.scss";

interface Props {
    onComplete: PlainFn
};

const WelcomeMessage = forwardRef((props: Props, ref: ReactForwardedRef<HTMLButtonElement>) : JSX.Element => {
    const { onComplete } = props;

    return (
        <div className = "welcome-message-modal">
            <div className = "welcome-message-title">
                <Icon type = {FontAwesomeIconType.Torii} />
                Welcome to Kana Quiz!
            </div>

            <span>
                We help you master Japanese <TooltipText tooltip = {HIRAGANA_TOOLTIP()}>hiragana</TooltipText> and <TooltipText tooltip = {KATAKANA_TOOLTIP()}>katakana</TooltipText>.
            </span>

            <span>
                Quiz yourself on specific characters or words to improve your mastery.
            </span>

            <span className = "welcome-message-get-started">
                Let's get started!
            </span>

            <Button ref = {ref} className = "close-welcome-message-button" onClick = {onComplete}>
                Start a quiz!
            </Button>
        </div>
    );
});

export default WelcomeMessage;