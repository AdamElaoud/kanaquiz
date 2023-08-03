import { Button, HelpTooltip } from "@/common/components";
import useNotification from "@/common/hooks/useNotification";
import { PlainFn, ReactFormOnSubmitEvent, ReactForwardedRef, ReactSetState } from "@/common/types";
import { isMobileDevice } from "@/common/utils/utils";
import SettingOption from "@/components/setting-option/SettingOption";
import { SettingsData } from "@/types";
import { CANNOT_CLEAR_STORED_DATA_TOOLTIP, CLEAR_STORED_DATA_TOOLTIP, GLOBAL_KEY, LOCAL_STORAGE_EVENT_NAME, STORAGE_CLEARED, STORAGE_CLEARED_ID } from "@/utils/constants";
import { forwardRef } from "react";

import "./Settings.scss";

interface Props {
    isInQuiz: boolean,
    onClearStorage: PlainFn,
    settings: SettingsData,
    setSettings: ReactSetState<SettingsData>
};

const Settings = forwardRef((props: Props, ref: ReactForwardedRef<HTMLButtonElement>) : JSX.Element => {
    const { isInQuiz, onClearStorage, settings, setSettings } = props;

    const { success } = useNotification();

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };

    const clearStorage = () => {
        localStorage.clear()
        success(STORAGE_CLEARED, { toastId: STORAGE_CLEARED_ID, autoClose: 3000 });
        document.body.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT_NAME, { detail: GLOBAL_KEY }));
        onClearStorage();
    };

    // Note: this check for existence is required for browsers that do not support the
    // ScreenOrientation API *cough cough Safari*
    const browserSupportsScreenOrientation = screen.orientation;
    const isRotationWarningEnabled = browserSupportsScreenOrientation && isMobileDevice();

    return (
        <form className = "settings-modal" onSubmit = {onSubmit}>
            <div className = "settings-title">
                SETTINGS
            </div>

            <div className = "setting-options">
                <SettingOption
                    ref = {ref}
                    title = "Auto focus next input"
                    onEnable = {() => setSettings(currentSettings => ({ ...currentSettings, autoFocusNextInput: true }))}
                    onDisable = {() => setSettings(currentSettings => ({ ...currentSettings, autoFocusNextInput: false }))}
                    startDeactivated = {settings.autoFocusNextInput === false}
                />
                <SettingOption
                    title = "Show word definitions"
                    onEnable = {() => setSettings(currentSettings => ({ ...currentSettings, showDefinitions: true }))}
                    onDisable = {() => setSettings(currentSettings => ({ ...currentSettings, showDefinitions: false }))}
                    startDeactivated = {settings.showDefinitions === false}
                />
                {isRotationWarningEnabled && <SettingOption
                    title = "Show rotation warning"
                    onEnable = {() => setSettings(currentSettings => ({ ...currentSettings, showRotationWarning: true }))}
                    onDisable = {() => setSettings(currentSettings => ({ ...currentSettings, showRotationWarning: false }))}
                    startDeactivated = {settings.showRotationWarning === false}
                />}
                
                <div className = "clear-storage">
                    <Button className = "clear-storage-button" onClick = {clearStorage} disabled = {isInQuiz}>
                        Clear All Data
                    </Button>
                    <HelpTooltip tooltip = {isInQuiz ? CANNOT_CLEAR_STORED_DATA_TOOLTIP : CLEAR_STORED_DATA_TOOLTIP}/>
                </div>
            </div>
        </form>
    );
});

export default Settings