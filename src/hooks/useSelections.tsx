import { ReactNode } from "@/common/types";
import { createContext, useContext } from "react";

type SelectionsContextType = {
    selections: string[],
    updateSelections: (letter: string[], addOnly?: boolean) => void
};

const SelectionsContext = createContext<SelectionsContextType>({} as SelectionsContextType);

// eslint-disable-next-line
export const useSelections = () => {
    const context = useContext(SelectionsContext);

    // need explicit check for undefined as [] is falsey
    if (context === undefined)
        throw "useSelections must be used within a SelectionsContextProvider!";

    return context;
};

interface Props {
    children: ReactNode,
    value: SelectionsContextType
};

export const SelectionsContextProvider = (props: Props) => {
    const { children, value } = props;

    return (
        <SelectionsContext.Provider value = {value}>
            {children}
        </SelectionsContext.Provider>
    );
};

// eslint-disable-next-line
export default useSelections;