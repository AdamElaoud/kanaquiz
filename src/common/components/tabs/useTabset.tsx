import { TabSetContext } from "@/common/components/tabs/TabSet";
import { useContext } from "react";

const useTabSet = () => {
    const context = useContext(TabSetContext);

    if (!context)
        throw "useTabSet must be used within a TabSet!";

    return context;
};

export default useTabSet;