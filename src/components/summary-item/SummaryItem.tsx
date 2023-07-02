import { ReactElement } from "@/common/types";

import "./SummaryItem.scss";

interface Props {
    children: string | number | ReactElement,
    title: string
};

const SummaryItem = (props: Props) : JSX.Element => {
    const { children, title } = props;

    return (
        <div className = "summary-item">
            <span className = "summary-item-title">{title}</span>
            <span className = "summary-item-content">{children}</span>
        </div>
    );
};

export default SummaryItem;