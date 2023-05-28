import { ReactFormOnSubmitEvent, ReactInputOnChangeEvent, ReactNode } from "@/types";
import { useState } from "react";
import "./Searchbar.scss";
import "../../../styles/_index.scss";

interface Props {
    delimiters?: string[],
    placeholder?: string,
    searchFn: (rawSearch: string, queries: string[]) => ReactNode[]
};

const DEFAULT_DELIMITER = [" "];

const Searchbar = (props: Props) : JSX.Element => {
    const { delimiters = DEFAULT_DELIMITER, placeholder = "", searchFn } = props;
    
    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<ReactNode[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);

    const onSearchChange = (event: ReactInputOnChangeEvent) => {
        const rawSearch = event.target.value;

        setSearchText(rawSearch);

        const queries = delimiters.reduce((queries: string[], delimiter: string) => {
            return [...queries, ...rawSearch.split(delimiter)];
        }, []);

        const results = searchFn(rawSearch, cleanQueries(queries, delimiters));

        setSearchResults(results);
        setShowResults(results.length > 0);
    };

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };

    const inputClasses = showResults ? "search-input showing-results" : "search-input";

    return (
        <div className = "search">
            <form className = "search-form" role = "search" onSubmit = {onSubmit}>
                <label className = "visually-hidden" htmlFor = "searchbar">Search for Kana</label>
                <input
                    className = {inputClasses}
                    name = "searchbar"
                    type = "search"
                    role = "search"
                    placeholder = {placeholder}
                    value = {searchText}
                    onChange = {onSearchChange}
                    onBlur = {() => setShowResults(false)}
                    onFocus = {() => setShowResults(searchResults.length > 0)}
                />
            </form>
            {showResults &&
                // container is necessary to add space between scrollbar and side of element
                <div className = "search-results-container">
                    <div className = "search-results">
                        {searchResults}
                    </div>
                </div>
            }
        </div>
    );
};

const buildRegexFromDelimiters = (delimiters: string[]) : RegExp => {
    const escapedDelimiters = delimiters.map(delimiter => delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return new RegExp(["^$"].concat(escapedDelimiters).join("|"));
};


const cleanQueries = (queries: string[], delimiters: string[]) => {
    const uniqueQueries = [...(new Set([...queries]))];

    const invalidQueryRegex = buildRegexFromDelimiters(delimiters);

    const cleanedQueries = uniqueQueries.filter(query => !query.match(invalidQueryRegex));

    return cleanedQueries;
};

export default Searchbar;