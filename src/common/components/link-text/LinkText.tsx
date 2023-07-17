import { FontAwesomeIconType, Size } from "@/common/types";
import { Icon } from "..";

import "./LinkText.scss";

interface Props {
    children: string,
    link: string
};

const LinkText = (props: Props) : JSX.Element => {
    const { children, link } = props;

    return (
        <span className = "link-text">
            <a href = {link} target = "_blank">
                {children}
            </a>
            <Icon type = {FontAwesomeIconType.OpenLink} size = {Size.Small}/>
        </span>
    );
};

export default LinkText;