import { KanaSelectionsContext } from "@/contexts/KanaSelectionsContext";
import { useContext } from "react";

const useKanaSelections = () => {
    const context = useContext(KanaSelectionsContext);

    if (!context)
        throw "useKanaSelections must be used within a KanaSelectionsContextProvider!";

    return context;
};

export default useKanaSelections;