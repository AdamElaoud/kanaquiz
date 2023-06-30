/* eslint-disable */
import { ReactNode } from "@/common/types";
import { WordSelectionData } from "@/types";
import { createContext, useContext } from "react";

type WordSelectionsContextType = {
    wordSelections: WordSelectionData,
    updateWordSelections: (wordSelectionData: WordSelectionData) => void
};

const WordSelectionsContext = createContext<WordSelectionsContextType>({} as WordSelectionsContextType);

export const useWordSelections = () => {
    const context = useContext(WordSelectionsContext);

    if (!context)
        throw "useWordSelections must be used within a WordSelectionsContextProvider!";

    return context;
};

interface Props {
    children: ReactNode,
    value: WordSelectionsContextType
};

export const WordSelectionsContextProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <WordSelectionsContext.Provider value = {value}>
            {children}
        </WordSelectionsContext.Provider>
    );
};

export default useWordSelections;