/* eslint-disable */
import { ReactNode, ReactSetState } from "@/common/types";
import { Mode } from "@/types";
import { createContext, useContext } from "react";

type ModeContextType = {
    mode: Mode,
    setMode: ReactSetState<Mode>
};

const ModeContext = createContext<ModeContextType>({} as ModeContextType);

export const useMode = () => {
    const context = useContext(ModeContext);

    if (!context)
        throw "useMode must be used within a ModeContextProvider!";

    return context;
};

interface Props {
    children: ReactNode,
    value: ModeContextType
};

export const ModeContextProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <ModeContext.Provider value = {value}>
            {children}
        </ModeContext.Provider>
    );
};

export default useMode;