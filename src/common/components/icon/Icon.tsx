import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomIconMap, FontAwesomeIconMap } from "./IconTypes";
import { CSSStyles, IconType, ReactKeyboardEvent, Size, isCustomIconType, isFontAwesomeIconType } from "@/common/types";
import "./Icon.scss";

interface Props {
    className?: string,
    onClick?: () => void,
    onKeyDown?: (event: ReactKeyboardEvent) => void,
    size?: Size,
    style?: CSSStyles,
    tabIndex?: number,
    type: IconType
};

const DEFAULT_ICON_SIZE = Size.Medium;

const Icon = (props: Props) : JSX.Element => {
    const { className, onClick, onKeyDown, size = DEFAULT_ICON_SIZE, style, tabIndex, type } = props;
    
    const classes = ["icon", size];
    if (className) classes.push(className);

    if (isFontAwesomeIconType(type)) {
        const fontAwesomeIconType = FontAwesomeIconMap[type];

        return (
            <div className = {classes.join(" ")} onClick = {onClick} onKeyDown = {onKeyDown} style = {style} tabIndex = {tabIndex}>
                <FontAwesomeIcon icon = {fontAwesomeIconType} />
            </div>
        );
        
    } else if (isCustomIconType(type)) {
        const { isImage, src, text } = CustomIconMap[type];

        const content = isImage ? <img src = {src} alt = {text}/> : text

        return (
            <div className = {classes.join(" ")} onClick = {onClick} onKeyDown = {onKeyDown} style = {style} tabIndex = {tabIndex}>
                {content}
            </div>
        );

    } else {
        throw "Invalid Icon type supplied!";
    }

};

export default Icon;