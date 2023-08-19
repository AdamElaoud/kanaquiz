import { CSSStyles, Orientation, ReactForwardedRef, ReactNode } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { createContext, forwardRef, useState } from "react";

import "./ButtonGroup.scss";

type ButtonGroupContextType = {
    buttonGroupIsDisabled: boolean,
    getButtonGroupClasses: (id: string | null) => string,
    isInButtonGroup: boolean,
    makeActive: (id: string) => void
};

export const ButtonGroupContext = createContext<ButtonGroupContextType>({
    getButtonGroupClasses: () => "",
    buttonGroupIsDisabled: false,
    isInButtonGroup: false,
    makeActive: () => null
} as ButtonGroupContextType);

interface Props {
    children: ReactNode[],
    className?: string,
    defaultActiveButton: string,
    disabled?: boolean,
    id?: string,
    orientation?: Orientation,
    style?: CSSStyles
};

const DEFAULT_ORIENTATION = Orientation.Horizontal;
const DEFAULT_DISABLED = false;

const ButtonGroup = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) : JSX.Element => {
    const {
        children,
        className,
        defaultActiveButton,
        disabled = DEFAULT_DISABLED,
        id,
        orientation = DEFAULT_ORIENTATION,
        style } = props;

    const [activeButtonID, setActiveButtonID] = useState<string>(defaultActiveButton);

    const makeActive = (id: string) => setActiveButtonID(id);

    const getButtonGroupClasses = (id: string | null) => buildClassNames({ "is-active": id && id === activeButtonID });

    const value: ButtonGroupContextType = { 
        getButtonGroupClasses,
        buttonGroupIsDisabled: disabled,
        isInButtonGroup: true,
        makeActive
    };

    const classes = buildClassNames({
        className,
        disabled,
        "is-vertical": orientation === Orientation.Vertical
    }, ["button-group"]);

    return (
        <ButtonGroupContext.Provider value = {value}>
            <div className = {classes} id = {id} style = {style} ref = {ref}>
                {children}
            </div>
        </ButtonGroupContext.Provider>
    );
});

export default ButtonGroup;