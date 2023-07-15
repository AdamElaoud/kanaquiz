import { QuizSelectionsContext } from "@/contexts/QuizSelectionsContext";
import { useContext } from "react";

const useQuizSelections = () => {
    const context = useContext(QuizSelectionsContext);

    if (!context)
        throw "useQuizSelections must be used within a QuizSelectionsContextProvider!";

    return context;
};

export default useQuizSelections;