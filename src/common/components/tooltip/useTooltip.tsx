import { useContext } from "react";

import { TooltipContext } from "./Tooltip";

const useTooltip = () => {
    const context = useContext(TooltipContext);

    if (!context)
        throw "useTooltip must be used within a Tooltip!";

    return context;
};

export default useTooltip;