import { ReactInputOnChangeEvent } from "@/types";
import { useState } from "react";
import "./Searchbar.scss";

interface Props {
    delimiters?: string[],
    searchFn: (rawSearch: string, queries: string[]) => string[]
};

const DEFAULT_DELIMITER = [" "];

const Searchbar = (props: Props) : JSX.Element => {
    const { delimiters = DEFAULT_DELIMITER, searchFn } = props;
    
    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const onSearchChange = (event: ReactInputOnChangeEvent) => {
        const rawSearch = event.target.value;

        setSearchText(rawSearch);

        const queries = delimiters.reduce((queries: string[], delimiter: string) => {
            return [...queries, ...rawSearch.split(delimiter)];
        }, []);

        const uniqueSearchResults = new Set(searchFn(rawSearch, queries));
        setSearchResults([...uniqueSearchResults]);
    };

    return (
        <>
            <form className = "search-form" role = "search">
                <input className = "search-input" type = "search" name = "searchbar" value = {searchText} role = "search" onChange = {onSearchChange}/>
            </form>
            <div className = "search-results">
                {searchResults.join(", ")}
            </div>
        </>
    );
};

export default Searchbar;