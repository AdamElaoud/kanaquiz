import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import { Mode } from "@/types";
import { charsToGroups as hiraganaCharsToGroups, groupsToChars as hiraganaGroupsToChars } from "@/utils/hiragana";
import { charsToGroups as kataKanaCharsToGroups, groupsToChars as katakanaGroupsToChars } from "@/utils/katakana";
import { groupsToChars as lookalikeGroupsToChars } from "@/utils/lookalikes";

const useKanaDictionary = () => {
    const search = (queries: string[]) => {
        const hiraganaSearchResults = queries.reduce((searchResults: string[], query: string) => {
            const groups: string[] = hiraganaCharsToGroups[query];

            if (groups)
                searchResults.push(...groups);

            return searchResults;
        }, []);

        const katakanaSearchResults = queries.reduce((searchResults: string[], query: string) => {
            const groups: string[] = kataKanaCharsToGroups[query];

            if (groups)
                searchResults.push(...groups);

            return searchResults;
        }, []);

        const uniqueSearchResults = [...(new Set([...hiraganaSearchResults, ...katakanaSearchResults]))];

        const allKanaGroups = { ...hiraganaGroupsToChars, ...katakanaGroupsToChars, ...lookalikeGroupsToChars };

        const kanaGroups = uniqueSearchResults.map(result => allKanaGroups[result]);

        return kanaGroups.map(group =>
            // key is first Kana in group
            <KanaButtonRow key = {group[0][Mode.Kana]} row = {group}/>
        );
    };

    return {
        hiragana: {
            groupsToChars: hiraganaGroupsToChars,
            charsToGroups: hiraganaCharsToGroups
        },
        katakana: {
            groupsToChars: katakanaGroupsToChars,
            charsToGroups: kataKanaCharsToGroups
        },
        lookalikes: {
            groupsToChars: lookalikeGroupsToChars
        },
        search
    };
};

export default useKanaDictionary;