import { WordSelectionsContext } from "@/contexts/WordSelectionsContext";
import { useContext } from "react";

const useWordSelections = () => {
    const context = useContext(WordSelectionsContext);

    if (!context)
        throw "useWordSelections must be used within a WordSelectionsContextProvider!";

    return context;
};

export default useWordSelections;