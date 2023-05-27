import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomIconMap, FontAwesomeIconMap } from "./IconTypes";
import { IconType, Size, isCustomIconType, isFontAwesomeIconType } from "@/types";
import "./Icon.scss";

interface Props {
    className?: string,
    size?: Size,
    type: IconType
};

const DEFAULT_ICON_SIZE = Size.Medium;

const Icon = (props: Props) : JSX.Element => {
    const { className, type, size } = props;
    
    const classes = ["icon"];
    if (size) classes.push(size);
    else classes.push(DEFAULT_ICON_SIZE);
    if (className) classes.push(className);

    if (isFontAwesomeIconType(type)) {
        const fontAwesomeIconType = FontAwesomeIconMap[type];

        return (
          <FontAwesomeIcon className = {classes.join(" ")} icon = {fontAwesomeIconType} />
        );
        
    } else if (isCustomIconType(type)) {
        const customIconType = CustomIconMap[type];

        return (
            <div className = {classes.join(" ")}>
                {customIconType}
            </div>
        );

    } else {
        throw "Invalid Icon type supplied!";
    }

};

export default Icon;