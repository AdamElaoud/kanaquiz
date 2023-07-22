import { SettingsContext } from "@/contexts/SettingsContext";
import { useContext } from "react";

const useSettings = () => {
    const context = useContext(SettingsContext);

    if (!context)
        throw "useSettings must be used within a SettingsContextProvider!";

    return context;
};

export default useSettings;