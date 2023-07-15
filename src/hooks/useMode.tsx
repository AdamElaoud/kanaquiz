import { ModeContext } from "@/contexts/ModeContext";
import { useContext } from "react";

const useMode = () => {
    const context = useContext(ModeContext);

    if (!context)
        throw "useMode must be used within a ModeContextProvider!";

    return context;
};

export default useMode;