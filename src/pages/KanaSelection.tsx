import { TabSet, Tab, Searchbar } from "@/common/components";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { TabID } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import { KanaSelectionsContextProvider } from "@/hooks/useKanaSelections";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import "./KanaSelection.scss";
import { ENGLISH_DELIMITERS, JAPANESE_DELIMITERS, SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { TabState } from "@/common/types";



const KanaSelection = () : JSX.Element => {
    const [selectedTabID, setSelectedTabID] = useLocalStorage<number>("kana-selections-tab", TabID.Hiragana);
    const [kanaSelections, setKanaSelections] = useLocalStorage<string[]>("kana-selections", []);
    const { hiragana, katakana, lookalikes, search } = useKanaDictionary();
    const dynamicSearchBarWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 50, SCREEN_FILL_WIDTH, 90);

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);
    const lookalikesGroups = Object.values(lookalikes.groupsToChars);
    
    const hiraganaGroupIDs = Object.keys(hiragana.groupsToChars);
    const katakanaGroupIDs = Object.keys(katakana.groupsToChars);
    const lookalikesGroupIDs = Object.keys(lookalikes.groupsToChars);

    const updateKanaSelections = (letters: string[], addOnly?: boolean) => {
        const updatedSelections = [...kanaSelections];

        letters.forEach(letter => {
            if (kanaSelections.includes(letter)) {
                if (!addOnly) {
                    const letterIndex = updatedSelections.findIndex(selection => selection === letter);
                    updatedSelections.splice(letterIndex, 1);
                }
    
            } else {
                updatedSelections.push(letter);
            }
        });

        setKanaSelections(updatedSelections);
    };

    const searchFn = (_rawSearch: string, queries: string[]) => search(queries);

    const onTabChange: TabState = ({ newTabID }) => {
        setSelectedTabID(newTabID);
    };

    return (
        <KanaSelectionsContextProvider value = {{ kanaSelections, updateKanaSelections }}>
            <div className = "kana-selection-page">
                <Searchbar
                    searchFn = {searchFn}
                    delimiters = {[...ENGLISH_DELIMITERS, ...JAPANESE_DELIMITERS]}
                    placeholder = "Search for Kana"
                    style = {dynamicSearchBarWidth}
                />

                <TabSet className = "selection-tabset" onTabChange = {onTabChange} startingTabID = {selectedTabID}>
                    <Tab title = "ひ Hiragana" tabID = {TabID.Hiragana}>
                        {hiraganaGroups.map((group, index) => {
                            const groupID = hiraganaGroupIDs[index];
                            return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                        })}
                    </Tab>
                    <Tab title = "カ Katakana" tabID = {TabID.Katakana}>
                        {katakanaGroups.map((group, index) => {
                            const groupID = katakanaGroupIDs[index];
                            return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                        })}
                    </Tab>
                    <Tab title = "Look-Alikes" tabID = {TabID.Lookalikes}>
                        {lookalikesGroups.map((group, index) => {
                            const groupID = lookalikesGroupIDs[index];
                            return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID}/>
                        })}
                    </Tab>
                </TabSet>
            </div>
        </KanaSelectionsContextProvider>
    );
};

export default KanaSelection;