import { CSSStyles, FontAwesomeIconType, ReactForwardedRef, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { forwardRef } from "react";

import { Icon } from "..";

import "./LinkText.scss";

interface Props {
    children: string,
    className?: string,
    id?: string,
    link: string,
    style?: CSSStyles
};

const LinkText = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLSpanElement>) : JSX.Element => {
    const { children, className, id, link, style } = props;

    const classes = buildClassNames({ className }, ["link-text"]);

    return (
        <span className = {classes} id = {id} style = {style} ref = {ref}>
            <a href = {link} target = "_blank">
                {children}
            </a>
            <Icon type = {FontAwesomeIconType.OpenLink} size = {Size.Small}/>
        </span>
    );
});

export default LinkText;