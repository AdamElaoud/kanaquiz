import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomIconMap, FontAwesomeIconMap } from "./IconTypes";
import { CustomIconType, FontAwesomeIconType, Size, isCustomIconType, isFontAwesomeIconType } from "@/types";
import "./Icon.scss";

interface Props {
    className?: string,
    size?: Size,
    type: FontAwesomeIconType | CustomIconType
};

const Icon = (props: Props) => {
    const { className, type, size } = props;
    
    const classes = ["icon"];
    if (size) classes.push(size);
    if (className) classes.push(className);

    if (isFontAwesomeIconType(type)) {
        const fontAwesomeIconType = FontAwesomeIconMap[type];

        return (
          <FontAwesomeIcon className = {classes.join(" ")} icon = {fontAwesomeIconType} />
        );
        
    } else if (isCustomIconType(type)) {
        const customIconType = CustomIconMap[type];

        return customIconType;

    } else {
        throw "Invalid Icon type supplied!";
    }

};

export default Icon;