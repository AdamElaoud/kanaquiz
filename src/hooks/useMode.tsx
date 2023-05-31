import { ReactNode } from "@/common/types";
import { Mode } from "@/types";
import { createContext, useContext } from "react";

const ModeContext = createContext<Mode>(Mode.Kana);

// eslint-disable-next-line
export const useMode = () => {
    const context = useContext(ModeContext);

    // need explicit check for undefined as Mode.Kana = 0, which is falsey
    if (context === undefined)
        throw "useMode must be used within a ModeContextProvider!";

    return context;
};

interface Props {
    children: ReactNode,
    value: Mode
};

export const ModeContextProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <ModeContext.Provider value = {value}>
            {children}
        </ModeContext.Provider>
    );
};

// eslint-disable-next-line
export default useMode;