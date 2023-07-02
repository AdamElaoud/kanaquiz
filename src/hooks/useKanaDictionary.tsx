import KanaButtonRow from "@/components/kana-button-row/KanaButtonRow";
import { GroupsToChars } from "@/types";
import {
    charsToGroups as hiraganaCharsToGroups,
    groupsToChars as hiraganaGroupsToChars,
    groupIDs as hiraganaGroupIDs
} from "@/utils/hiragana";
import {
    charsToGroups as kataKanaCharsToGroups,
    groupsToChars as katakanaGroupsToChars,
    groupIDs as katakanaGroupIDs
} from "@/utils/katakana";
import { groupsToChars as lookalikeGroupsToChars } from "@/utils/lookalikes";

const useKanaDictionary = () => {
    const search = (queries: string[]) => {
        const normalizedQueries = queries.map(query => query.toLocaleLowerCase());

        const hiraganaSearchResults = normalizedQueries.reduce((searchResults: string[], query: string) => {
            const groups: string[] = hiraganaCharsToGroups[query];

            if (groups)
                searchResults.push(...groups);

            return searchResults;
        }, []);

        const katakanaSearchResults = normalizedQueries.reduce((searchResults: string[], query: string) => {
            const groups: string[] = kataKanaCharsToGroups[query];

            if (groups)
                searchResults.push(...groups);

            return searchResults;
        }, []);

        const uniqueSearchResults = [...(new Set([...hiraganaSearchResults, ...katakanaSearchResults]))];

        const allKanaGroups = { ...hiraganaGroupsToChars, ...katakanaGroupsToChars, ...lookalikeGroupsToChars };

        const kanaGroups = uniqueSearchResults.map(result => allKanaGroups[result]);

        return kanaGroups.map((group, index) => {
            const groupID = uniqueSearchResults[index];
            return <KanaButtonRow key = {groupID} row = {group} groupID = {groupID} searchQueries = {normalizedQueries}/>
        });
    };

    const getGroupAndLettersFromID = (ID: string) : { groupID: string, letters: [string, string, string] } => {
        let foundGroupID: string | undefined;
        let foundLetters: [string, string, string] | undefined;

        if (ID.includes("h_")) {
            hiraganaGroupIDs.some(groupID => {
                const group = hiraganaGroupsToChars[groupID];
                const letters = group.find(letters => letters.includes(ID));
                
                if (letters) {
                    foundGroupID = groupID;
                    foundLetters = letters;
                    return true;
                }

                return false;
            });
            
            if (!foundGroupID || !foundLetters)
                throw "invalid hiragana ID supplied!";

            return { groupID: foundGroupID, letters: foundLetters };
        }

        if (ID.includes("k_")) {
            katakanaGroupIDs.some(groupID => {
                const group = katakanaGroupsToChars[groupID];
                const letters = group.find(letters => letters.includes(ID));
                
                if (letters) {
                    foundGroupID = groupID;
                    foundLetters = letters;
                    return true;
                }

                return false;
            });
            
            if (!foundGroupID || !foundLetters)
                throw "invalid katakana ID supplied!";

            return { groupID: foundGroupID, letters: foundLetters };
        }

        throw "invalid ID supplied!";
    };

    const getRowsFromSelections = (selections: string[]) : GroupsToChars => {
        const rows: GroupsToChars = {};

        selections.forEach(selection => {
            const { groupID, letters } = getGroupAndLettersFromID(selection);

            const collectedLettersForGroup = rows[groupID];

            if (collectedLettersForGroup)
                rows[groupID] = [...collectedLettersForGroup, letters].sort();
            else
                rows[groupID] = [letters];
        });

        return rows;
    };

    return {
        hiragana: {
            groupsToChars: hiraganaGroupsToChars,
            groupIDs: hiraganaGroupIDs,
            charsToGroups: hiraganaCharsToGroups
        },
        katakana: {
            groupsToChars: katakanaGroupsToChars,
            groupIDs: katakanaGroupIDs,
            charsToGroups: kataKanaCharsToGroups
        },
        lookalikes: {
            groupsToChars: lookalikeGroupsToChars
        },
        getRowsFromSelections,
        search
    };
};

export default useKanaDictionary;