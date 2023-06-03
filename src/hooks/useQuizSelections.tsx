/* eslint-disable */
import { ReactNode } from "@/common/types";
import { QuizType } from "@/types";
import { createContext, useContext } from "react";

type QuizSelectionsContextType = {
    quizSelections: QuizType[],
    updateQuizSelections: (quizType: QuizType) => void
};

const QuizSelectionsContext = createContext<QuizSelectionsContextType>({} as QuizSelectionsContextType);

export const useQuizSelections = () => {
    const context = useContext(QuizSelectionsContext);

    // need explicit check for undefined as [] is falsey
    if (context === undefined)
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