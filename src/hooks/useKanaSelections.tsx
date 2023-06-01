import { ReactNode } from "@/common/types";
import { createContext, useContext } from "react";

type KanaSelectionsContextType = {
    kanaSelections: string[],
    updateKanaSelections: (letter: string[], addOnly?: boolean) => void
};

const KanaSelectionsContext = createContext<KanaSelectionsContextType>({} as KanaSelectionsContextType);

// eslint-disable-next-line
export const useKanaSelections = () => {
    const context = useContext(KanaSelectionsContext);

    // need explicit check for undefined as [] is falsey
    if (context === undefined)
        throw "useKanaSelections must be used within a KanaSelectionsContextProvider!";

    return context;
};

interface Props {
    children: ReactNode,
    value: KanaSelectionsContextType
};

export const KanaSelectionsContextProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <KanaSelectionsContext.Provider value = {value}>
            {children}
        </KanaSelectionsContext.Provider>
    );
};

// eslint-disable-next-line
export default useKanaSelections;