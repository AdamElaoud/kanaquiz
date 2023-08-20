import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { ReactNode } from "@/common/types";
import { SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";

import "./Section.scss";

interface Props {
    children: ReactNode | ReactNode[],
    title?: string,
};

const Section = (props: Props) : JSX.Element => {
    const { children, title } = props;

    const dynamicSummaryWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);

    return (
        <div className = "display-section" style = {dynamicSummaryWidth}>
            {title && <div className = "display-section-title">
                {title}
            </div>}
            <div className = "display-section-items">
                {children}
            </div>
        </div>
    );
};

export default Section;