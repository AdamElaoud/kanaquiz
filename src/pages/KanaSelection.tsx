import { TabSet, Tab, Searchbar } from "@/common/components";
import useKanaDictionary from "@/hooks/useKanaDictionary";
import { Mode } from "@/types";
import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import { KanaSelectionsContextProvider } from "@/hooks/useKanaSelections";
import useLocalStorage from "@/common/hooks/useLocalStorage";
import "./KanaSelection.scss";
import { ENGLISH_DELIMITERS, JAPANESE_DELIMITERS, SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";



const KanaSelection = () : JSX.Element => {
    const [kanaSelections, setKanaSelections] = useLocalStorage<string[]>("kana-selections", []);
    const { hiragana, katakana, lookalikes, search } = useKanaDictionary();
    const dynamicSearchBarWidth = useDynamicWidth(
        SCREEN_PARTIAL_FILL_WIDTH,
        50,
        SCREEN_FILL_WIDTH,
        90
    );

    const hiraganaGroups = Object.values(hiragana.groupsToChars);
    const katakanaGroups = Object.values(katakana.groupsToChars);
    const lookalikesGroups = Object.values(lookalikes.groupsToChars);

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

    return (
        <KanaSelectionsContextProvider value = {{ kanaSelections, updateKanaSelections }}>
            <div className = "kana-selection-page">
                <Searchbar
                    searchFn = {searchFn}
                    delimiters = {[...ENGLISH_DELIMITERS, ...JAPANESE_DELIMITERS]}
                    placeholder = "Search for Kana"
                    style = {dynamicSearchBarWidth}
                />

                <TabSet className = "selection-tabset">
                    <Tab title = "ひ Hiragana" tabID = {0}>
                        {hiraganaGroups.map(group =>
                            // key is first Kana in group
                            <KanaButtonRow key = {group[0][Mode.Kana]} row = {group}/>
                        )}
                    </Tab>
                    <Tab title = "カ Katakana" tabID = {1}>
                        {katakanaGroups.map(group =>
                            // key is first Kana in group
                            <KanaButtonRow key = {group[0][Mode.Kana]} row = {group}/>
                        )}
                    </Tab>
                    <Tab title = "Look-Alikes" tabID = {2}>
                        {lookalikesGroups.map(group =>
                            // key is first Kana in group
                            <KanaButtonRow key = {group[0][Mode.Kana]} row = {group}/>
                        )}
                    </Tab>
                </TabSet>
            </div>
        </KanaSelectionsContextProvider>
    );
};

export default KanaSelection;