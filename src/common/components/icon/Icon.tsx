import { CustomIconMap, FontAwesomeIconMap } from "@/common/components/icon/IconTypes";
import { CSSStyles, IconType, isCustomIconType, isFontAwesomeIconType, ReactDivOnClickEvent, ReactForwardedRef, ReactKeyboardEvent, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

import "./Icon.scss";

interface Props {
    className?: string,
    id?: string,
    onClick?: (event: ReactDivOnClickEvent) => void,
    onKeyDown?: (event: ReactKeyboardEvent) => void,
    size?: Size,
    style?: CSSStyles,
    tabIndex?: number,
    type: IconType
};

const DEFAULT_ICON_SIZE = Size.Medium;

const Icon = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) : JSX.Element => {
    const { className, id, onClick, onKeyDown, size = DEFAULT_ICON_SIZE, style, tabIndex, type } = props;
    
    const classes = buildClassNames({ [className ?? ""]: className }, ["icon", size]);

    if (isFontAwesomeIconType(type)) {
        const fontAwesomeIconType = FontAwesomeIconMap[type];

        return (
            <div id = {id} ref = {ref} className = {classes} onClick = {onClick} onKeyDown = {onKeyDown} style = {style} tabIndex = {tabIndex}>
                <FontAwesomeIcon icon = {fontAwesomeIconType} />
            </div>
        );
        
    } else if (isCustomIconType(type)) {
        const { isImage, src, text } = CustomIconMap[type];

        const content = isImage ? <img src = {src} alt = {text}/> : text

        return (
            <div id = {id} ref = {ref} className = {classes} onClick = {onClick} onKeyDown = {onKeyDown} style = {style} tabIndex = {tabIndex}>
                {content}
            </div>
        );

    } else {
        throw "Invalid Icon type supplied!";
    }

});

export default Icon;