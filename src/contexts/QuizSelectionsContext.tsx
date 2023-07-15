/* eslint-disable */
import { ReactNode } from "@/common/types";
import { QuizSelectionData } from "@/types";
import { createContext } from "react";

type QuizSelectionsContextType = {
    quizSelections: QuizSelectionData,
    updateQuizSelections: (quizSelectionData: QuizSelectionData) => void
};

export const QuizSelectionsContext = createContext<QuizSelectionsContextType>({} as QuizSelectionsContextType);

interface Props {
    children: ReactNode,
    value: QuizSelectionsContextType
};

export const QuizSelectionsProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <QuizSelectionsContext.Provider value = {value}>
            {children}
        </QuizSelectionsContext.Provider>
    );
};

export default QuizSelectionsProvider;