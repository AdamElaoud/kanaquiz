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

    const onSearchChange = (event: ReactInputOnChangeEvent) => {
        const rawSearch = event.target.value;

        setSearchText(rawSearch);

        const queries = delimiters.reduce((queries: string[], delimiter: string) => {
            return [...queries, ...rawSearch.split(delimiter)];
        }, []);

        setSearchResults(searchFn(rawSearch, queries));
    };

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };

    return (
        <>
            <form className = "search-form" role = "search" onSubmit = {onSubmit}>
                <label className = "visually-hidden" htmlFor = "searchbar">Search for Kana</label>
                <input
                    className = "search-input"
                    name = "searchbar"
                    type = "search"
                    role = "search"
                    placeholder = {placeholder}
                    value = {searchText}
                    onChange = {onSearchChange}
                />
            </form>
            <div className = "search-results">
                {searchResults}
            </div>
        </>
    );
};

export default Searchbar;