import {
    GroupsToChars,
    KanaLetters,
    Mode,
    Question,
    QuizDirection,
    QuizFormat,
    QuizSelectionData,
    QuizTopic,
    Word,
    WordSelectionData
} from "@/types";
import {
    groupIDs as hiraganaGroupIDs,
    groupsToChars as hiraganaGroupsToChars
} from "@/utils/hiragana";
import {
    groupIDs as katakanaGroupIDs,
    groupsToChars as katakanaGroupsToChars
} from "@/utils/katakana";
import { allWords, hiraganaWords, katakanaWords } from "@/utils/words";

export const getGroupAndLettersInTargetGroupFromID = (
    ID: string,
    IDGroupToSearch: string[],
    groupToCharsToSearch: GroupsToChars
) : { groupID: string, letters: KanaLetters } => {
    let foundGroupID: string | undefined;
    let foundLetters: KanaLetters | undefined;

    IDGroupToSearch.some(groupID => {
        const group = groupToCharsToSearch[groupID];
        const letters = group.find(letters => letters.includes(ID));
        
        if (letters) {
            foundGroupID = groupID;
            foundLetters = letters;
            return true;
        }

        return false;
    });
    
    if (!foundGroupID || !foundLetters)
        throw "invalid ID supplied!";

    return { groupID: foundGroupID, letters: foundLetters };
};

export const getGroupAndLettersFromID = (ID: string) : { groupID: string, letters: KanaLetters } => {
    if (ID.includes("h_"))
        return getGroupAndLettersInTargetGroupFromID(ID, hiraganaGroupIDs, hiraganaGroupsToChars);

    if (ID.includes("k_"))
        return getGroupAndLettersInTargetGroupFromID(ID, katakanaGroupIDs, katakanaGroupsToChars);

    throw "invalid ID supplied!";
};

export const getRowsFromSelections = (selections: string[]) : GroupsToChars => {
    const rows: GroupsToChars = {};

    selections.forEach(selection => {
        const { groupID, letters } = getGroupAndLettersFromID(selection);

        const collectedLettersForGroup = rows[groupID];

        if (collectedLettersForGroup)
            rows[groupID] = [...collectedLettersForGroup, letters];
        else
            rows[groupID] = [letters];
    });

    return rows;
};

export const generateQuestions = (
    { amount, direction, format, topic }: QuizSelectionData,
    kanaSelections: string[],
    { allHiragana, allKatakana }: WordSelectionData
) : Question[] => {
    if (topic === QuizTopic.Kana) {
        const isJPtoEN = direction === QuizDirection.JPtoEN;
        const isMultChoice = format === QuizFormat.MultipleChoice;

        const responseMode = isJPtoEN ? Mode.Romaji : Mode.Kana;
        const detailsMode = isJPtoEN ? Mode.Kana : Mode.Romaji;
        const promptMode = isJPtoEN ? Mode.Kana : Mode.Romaji;

        const selectionLetters: KanaLetters[] = kanaSelections.map(selection => {
            const { letters } = getGroupAndLettersFromID(selection);

            return letters;
        });

        // this casting is protected by the step wizard. The user will not be 
        // allowed to reach this point unless a valid quiz question amount
        // number was supplied
        const prompts: KanaLetters[] = getSeveralRandomElementsFromArray(selectionLetters, amount as number);

        return prompts.map(prompt => ({
            answer: prompt[responseMode],
            answerDetails: prompt[detailsMode],
            prompt: prompt[promptMode],
            ...(isMultChoice && {
                choices: generateChoicesForPrompt(prompt, selectionLetters, responseMode) 
            })
        }));
    }

    if (topic === QuizTopic.Words) {
        const selectionWords = allHiragana && allKatakana 
            ? allWords
            : allHiragana
                ? hiraganaWords
                : katakanaWords;

        // this casting is protected by the step wizard. The user will not be 
        // allowed to reach this point unless a valid quiz question amount
        // number was supplied
        const prompts: Word[] = getSeveralRandomElementsFromArray(selectionWords, amount as number);

        return prompts.map(prompt => ({
            answer: prompt.romaji,
            answerDetails: prompt.kana,
            prompt: prompt.kana.join(""),
            context: prompt.definition
        }));
    }

    throw "invalid quiz topic supplied!";
};

export const generateChoicesForPrompt = (promptLetters: KanaLetters, selectionLetters: KanaLetters[], responseMode: Mode) : KanaLetters => {
    const correctAnswer = promptLetters[responseMode];
    const choices = [correctAnswer];

    const randomChoiceOneLetters = getRandomElementFromArray(
        selectionLetters,
        (randomLetters) => !randomLetters.includes(correctAnswer)
    );
    const randomChoiceOne = randomChoiceOneLetters[responseMode];
    choices.push(randomChoiceOne);


    const randomChoiceTwoLetters = getRandomElementFromArray(
        selectionLetters,
        (randomLetters) => !randomLetters.includes(correctAnswer) && !randomLetters.includes(randomChoiceOne)
    );
    const randomChoiceTwo = randomChoiceTwoLetters[responseMode];
    choices.push(randomChoiceTwo);

    return shuffleArray(choices) as [string, string, string];
};

export const getRandomInt = (min = 0, max = 100) : number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomElementFromArray = <T>(array: T[], valid?: (randomElement: T) => boolean) : T => {
    const randomIndex = getRandomInt(0, array.length - 1);
    const randomElement = array[randomIndex];

    if (valid && !valid(randomElement))
        return getRandomElementFromArray(array, valid);

    return randomElement;
};

export const getSeveralRandomElementsFromArray = <T>(array: T[], amount: number) : T[] => {
    const randomElements: T[] = [];
    for (let i = 0; i < amount; i++) {
        const randomSelection = getRandomElementFromArray(array);
        randomElements.push(randomSelection);
    }

    return randomElements;
};

// implementation of Dustenfield shuffle algorithm
// this function shuffles the array in-place
export const shuffleArray = <T>(array: T[]) : T[] => {
    for (let i = array.length - 1; i > 0; i--) {

        // generate random index between 0 and i, inclusive
        const randomIndex = Math.floor(Math.random() * (i + 1));

        // swap array[i] amd array[randomIndex]
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }

    return array;
};