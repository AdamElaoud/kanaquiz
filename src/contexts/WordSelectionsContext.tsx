/* eslint-disable */
import { ReactNode } from "@/common/types";
import { WordSelectionData } from "@/types";
import { createContext } from "react";

type WordSelectionsContextType = {
    wordSelections: WordSelectionData,
    updateWordSelections: (wordSelectionData: WordSelectionData) => void
};

export const WordSelectionsContext = createContext<WordSelectionsContextType>({} as WordSelectionsContextType);

interface Props {
    children: ReactNode,
    value: WordSelectionsContextType
};

export const WordSelectionsProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <WordSelectionsContext.Provider value = {value}>
            {children}
        </WordSelectionsContext.Provider>
    );
};

export default WordSelectionsProvider;