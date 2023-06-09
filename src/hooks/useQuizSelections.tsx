/* eslint-disable */
import { ReactNode } from "@/common/types";
import { QuizSelectionData } from "@/types";
import { createContext, useContext } from "react";

type QuizSelectionsContextType = {
    quizSelections: QuizSelectionData,
    updateQuizSelections: (quizSelectionData: QuizSelectionData) => void
};

const QuizSelectionsContext = createContext<QuizSelectionsContextType>({} as QuizSelectionsContextType);

export const useQuizSelections = () => {
    const context = useContext(QuizSelectionsContext);

    if (!context)
        throw "useQuizSelections must be used within a QuizSelectionsContextProvider!";

    return context;
};

interface Props {
    children: ReactNode,
    value: QuizSelectionsContextType
};

export const QuizSelectionsContextProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <QuizSelectionsContext.Provider value = {value}>
            {children}
        </QuizSelectionsContext.Provider>
    );
};

export default useQuizSelections;