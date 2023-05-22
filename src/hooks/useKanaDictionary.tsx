import { charsToGroups as hiraganaCharsToGroups, groupsToChars as hiraganaGroupsToChars } from "@/utils/hiragana";
import { charsToGroups as kataKanaCharsToGroups, groupsToChars as katakanaGroupsToChars } from "@/utils/katakana";

const useKanaDictionary = () => {
    const search = (character: string) => {
        console.log(`SEARCHING FOR ${character}`);
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
        search
    };
};

export default useKanaDictionary;