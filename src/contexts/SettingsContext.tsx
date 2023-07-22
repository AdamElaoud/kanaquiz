import { ReactNode } from "@/common/types";
import { SettingsData } from "@/types";
import { createContext } from "react";

export const SettingsContext = createContext<SettingsData>({} as SettingsData);

interface Props {
    children: ReactNode,
    value: SettingsData
};

const SettingsProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <SettingsContext.Provider value = {value}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsProvider;