import { ButtonGroupContext } from "@/common/components/button-group/ButtonGroup";
import { useContext } from "react";

const useButtonGroup = () => {
    const context = useContext(ButtonGroupContext);
    return context;
};

export default useButtonGroup;