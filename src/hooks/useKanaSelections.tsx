/* eslint-disable */
import { ReactNode } from "@/common/types";
import { UpdateKanaSelectionsFn } from "@/types";
import { createContext, useContext } from "react";

type KanaSelectionsContextType = {
    kanaSelections: string[],
    updateKanaSelections: UpdateKanaSelectionsFn
};

const KanaSelectionsContext = createContext<KanaSelectionsContextType>({} as KanaSelectionsContextType);

export const useKanaSelections = () => {
    const context = useContext(KanaSelectionsContext);

    if (!context)
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

export default useKanaSelections;