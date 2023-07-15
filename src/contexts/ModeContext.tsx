import { ReactNode, ReactSetState } from "@/common/types";
import { Mode } from "@/types";
import { createContext } from "react";

type ModeContextType = {
    mode: Mode,
    setMode: ReactSetState<Mode>
};

export const ModeContext = createContext<ModeContextType>({} as ModeContextType);

interface Props {
    children: ReactNode,
    value: ModeContextType
};

const ModeProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <ModeContext.Provider value = {value}>
            {children}
        </ModeContext.Provider>
    );
};

export default ModeProvider;