import { Button } from "@/common/components";
import { FontAwesomeIconType, Size } from "@/common/types";
import { Mode, UpdateKanaSelectionsFn } from "@/types";

import "./TabButtonRow.scss";

interface Props {
    groups: string[][];
    updateKanaSelections: UpdateKanaSelectionsFn;
};

const TabButtonRow = (props: Props): JSX.Element => {
    const { groups, updateKanaSelections } = props;

    return (
        <div className="tab-button-row">
            <Button
                className="select-all-button"
                iconType={FontAwesomeIconType.Check}
                iconSize={Size.Mini}
                onClick={() => updateKanaSelections(groups.map(letters => letters[Mode.ID]), true)}
            >
                Select All
            </Button>
            <Button
                className="clear-all-button"
                iconType={FontAwesomeIconType.Delete}
                iconSize={Size.Mini}
                onClick={() => updateKanaSelections(groups.map(letters => letters[Mode.ID]), false, true)}
            >
                Clear All
            </Button>
        </div>
    );
};

export default TabButtonRow;
