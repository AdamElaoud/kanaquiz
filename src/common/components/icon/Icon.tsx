import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomIconMap, FontAwesomeIconMap } from "./IconTypes";
import { CSSStyles, IconType, Size, isCustomIconType, isFontAwesomeIconType } from "@/common/types";
import "./Icon.scss";

interface Props {
    className?: string,
    onClick?: () => void,
    size?: Size,
    style?: CSSStyles,
    type: IconType
};

const DEFAULT_ICON_SIZE = Size.Medium;

const Icon = (props: Props) : JSX.Element => {
    const { className, onClick, size = DEFAULT_ICON_SIZE, style, type } = props;
    
    const classes = ["icon", size];
    if (className) classes.push(className);

    if (isFontAwesomeIconType(type)) {
        const fontAwesomeIconType = FontAwesomeIconMap[type];

        return (
            <span className = {classes.join(" ")} onClick = {onClick} style = {style}>
                <FontAwesomeIcon icon = {fontAwesomeIconType} />
            </span>
        );
        
    } else if (isCustomIconType(type)) {
        const { isImage, src, text } = CustomIconMap[type];

        const content = isImage ? <img src = {src} alt = {text}/> : text

        return (
            <div className = {classes.join(" ")} onClick = {onClick} style = {style}>
                {content}
            </div>
        );

    } else {
        throw "Invalid Icon type supplied!";
    }

};

export default Icon;