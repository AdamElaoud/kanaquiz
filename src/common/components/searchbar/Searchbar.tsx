import { CSSStyles, ReactFormOnSubmitEvent, ReactInputOnChangeEvent, ReactNode } from "@/common/types";
import { useState, useRef } from "react";
import "./Searchbar.scss";
import "@/styles/_index.scss";
import useMouseClick from "@/common/hooks/useMouseClick";

interface Props {
    delimiters?: string[],
    nonBlurTargets?: HTMLElement[] | undefined,
    placeholder?: string,
    searchFn: (rawSearch: string, queries: string[]) => ReactNode[],
    style?: CSSStyles
};

const DEFAULT_DELIMITER = [" "];

const Searchbar = (props: Props) : JSX.Element => {
    const {
        delimiters = DEFAULT_DELIMITER,
        nonBlurTargets,
        placeholder = "",
        searchFn,
        style
    } = props;
    
    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<ReactNode[]>([]);
    const searchResultsRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const clickTarget = useMouseClick();
    const showResults = useRef<boolean>(false);

    const onSearchChange = (event: ReactInputOnChangeEvent) => {
        const rawSearch = event.target.value;

        setSearchText(rawSearch);

        const queries = delimiters.reduce((queries: string[], delimiter: string) => {
            return [...queries, ...rawSearch.trim().split(delimiter)];
        }, []);

        const results = searchFn(rawSearch, cleanQueries(queries, delimiters));

        setSearchResults(results);
    };

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };

    const hasResults = searchResults.length > 0;
    const searchInputIsTarget = searchInputRef.current?.contains(clickTarget);
    const searchResultsIsTarget = searchResultsRef.current?.contains(clickTarget);

    let nonBlurTargetIsTarget = false;
    if (nonBlurTargets)
        nonBlurTargetIsTarget = nonBlurTargets.some(nonBlurTarget => nonBlurTarget.contains(clickTarget));
    
    showResults.current = (searchInputIsTarget && hasResults)
        || searchResultsIsTarget
        || (nonBlurTargetIsTarget && showResults.current);

    const inputClasses = showResults.current ? "search-input showing-results" : "search-input";

    return (
        <div className = "search" style = {style}>
            <form className = "search-form" role = "search" onSubmit = {onSubmit}>
                <label className = "visually-hidden" htmlFor = "searchbar">Search for Kana</label>
                <input
                    className = {inputClasses}
                    name = "searchbar"
                    type = "search"
                    role = "search"
                    ref = {searchInputRef}
                    placeholder = {placeholder}
                    value = {searchText}
                    onChange = {onSearchChange}
                />
            </form>
            {showResults.current &&
                // container is necessary to add space between scrollbar and side of element
                <div
                    className = "search-results-container"
                    ref = {searchResultsRef}
                    tabIndex = {-1} // tabIndex is required for a div to be focusable
                >
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