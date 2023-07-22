import { ToggleSwitch } from "@/common/components";
import { PlainFn, ReactForwardedRef } from "@/common/types";
import { forwardRef } from "react";

import "./SettingOption.scss";

interface Props {
    onDisable: PlainFn,
    onEnable: PlainFn,
    startDeactivated: boolean,
    title: string
};

const SettingOption = forwardRef((props: Props, ref: ReactForwardedRef<HTMLButtonElement>) : JSX.Element => {
    const { onDisable, onEnable, startDeactivated, title } = props;

    return (
        <div className = "setting-option">
            <span>
                {title}
            </span>
            <ToggleSwitch ref = {ref} onActivate = {onEnable} onDeactivate = {onDisable} startDeactivated = {startDeactivated}/>
        </div>
    );
});

export default SettingOption