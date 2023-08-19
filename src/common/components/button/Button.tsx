import { Icon } from "@/common/components";
import useButtonGroup from "@/common/components/button-group/useButtonGroup";
import { CSSStyles, IconType, PlainFn, ReactForwardedRef, ReactNode, Side, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { forwardRef } from "react";

import "./Button.scss";

interface Props {
    children?: ReactNode,
    className?: string,
    disabled?: boolean,
    iconType?: IconType,
    iconSide?: Side,
    iconSize?: Size,
    id?: string,
    onClick: PlainFn,
    style?: CSSStyles
};

const DEFAULT_ICON_SIDE = Side.Left;
const DEFAULT_DISABLED_SETTING = false;

const Button = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLButtonElement>) : JSX.Element => {
    const {
        children,
        className,
        disabled = DEFAULT_DISABLED_SETTING,
        iconType,
        iconSide = DEFAULT_ICON_SIDE,
        iconSize,
        id,
        onClick: customOnClick,
        style
    } = props;

    const { getButtonGroupClasses, buttonGroupIsDisabled, isInButtonGroup, makeActive } = useButtonGroup();

    if (isInButtonGroup && !id)
        throw "Buttons must be given a unique 'id' when used within a ButtonGroup!";

    const onClick = () => {
        if (isInButtonGroup && id) makeActive(id);
        if (customOnClick) customOnClick();
    };

    const classes = buildClassNames({
        className,
        [getButtonGroupClasses(id ?? null)]: isInButtonGroup
    }, ["button"]);

    const displayIcon = iconType && <Icon size = {iconSize} type = {iconType} />;

    return (
        <button id = {id} ref = {ref} className = {classes} disabled = {disabled || buttonGroupIsDisabled} onClick = {onClick} style = {style}>
            {iconSide === Side.Left && displayIcon}
            {children}
            {iconSide === Side.Right && displayIcon}
        </button>
    );
});

export default Button;