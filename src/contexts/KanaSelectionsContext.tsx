/* eslint-disable */
import { ReactNode } from "@/common/types";
import { UpdateKanaSelectionsFn } from "@/types";
import { createContext } from "react";

type KanaSelectionsContextType = {
    kanaSelections: string[],
    updateKanaSelections: UpdateKanaSelectionsFn
};

export const KanaSelectionsContext = createContext<KanaSelectionsContextType>({} as KanaSelectionsContextType);

interface Props {
    children: ReactNode,
    value: KanaSelectionsContextType
};

export const KanaSelectionsProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <KanaSelectionsContext.Provider value = {value}>
            {children}
        </KanaSelectionsContext.Provider>
    );
};

export default KanaSelectionsProvider;