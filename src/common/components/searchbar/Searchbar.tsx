import useMouseClick from "@/common/hooks/useMouseClick";
import { CSSStyles, FontAwesomeIconType, MouseClickState, ReactFormOnSubmitEvent, ReactForwardedRef, ReactInputOnChangeEvent, ReactKeyboardEvent, ReactNode, Size } from "@/common/types";
import { buildClassNames } from "@/common/utils/utils";
import { useRef, useState } from "react";
import { forwardRef } from "react";

import "@/styles/_index.scss";

import { Button, Icon, Modal } from "..";

import "./Searchbar.scss";

interface Props {
    alwaysShowResults?: boolean,
    className?: string,
    delimiters?: string[],
    id?: string,
    nonBlurTargets?: HTMLElement[] | undefined,
    openInModal?: boolean,
    placeholder?: string,
    searchFn: (rawSearch: string, queries: string[]) => ReactNode[],
    showButtonText?: boolean,
    style?: CSSStyles
};

const DEFAULT_DELIMITERS = [" ", ","];
const DEFAULT_NEVER_CLOSE_RESULTS = false;
const DEFAULT_OPEN_IN_MODAL = false;
const DEFAULT_SHOW_BUTTON_TEXT = false;

const Searchbar = forwardRef((props: Props, ref?: ReactForwardedRef<HTMLDivElement>) : JSX.Element => {
    const {
        alwaysShowResults = DEFAULT_NEVER_CLOSE_RESULTS,
        className,
        delimiters = DEFAULT_DELIMITERS,
        id,
        nonBlurTargets,
        openInModal = DEFAULT_OPEN_IN_MODAL,
        placeholder = "",
        searchFn,
        showButtonText = DEFAULT_SHOW_BUTTON_TEXT,
        style
    } = props;
    
    const [searchText, setSearchText] = useState<string>("");
    const [searchResults, setSearchResults] = useState<ReactNode[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchResultsRef = useRef<HTMLDivElement>(null);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const onMouseClick = ({ nextClickTarget }: MouseClickState) => {
        if (!alwaysShowResults) {
            const hasResults = searchResults.length > 0;
            const searchInputIsTarget = searchInputRef.current?.contains(nextClickTarget) || searchInputRef.current === document.activeElement;
            const searchResultsIsTarget = searchResultsRef.current?.contains(nextClickTarget);
        
            let nonBlurTargetIsTarget = false;
            if (nonBlurTargets)
                nonBlurTargetIsTarget = nonBlurTargets.some(nonBlurTarget => nonBlurTarget.contains(nextClickTarget));
            
            setShowResults(showing => (searchInputIsTarget && hasResults) || searchResultsIsTarget || (nonBlurTargetIsTarget && showing));
        }
    };

    useMouseClick(onMouseClick);

    const onSearchChange = (event: ReactInputOnChangeEvent) => {
        const rawSearch = event.target.value;

        setSearchText(rawSearch);

        const queries = delimiters.reduce((queries: string[], delimiter: string) => {
            return [...queries, ...rawSearch.trim().split(delimiter)];
        }, []);

        const results = searchFn(rawSearch, cleanQueries(queries, delimiters));

        const hasResults = results.length > 0;
        if (hasResults || rawSearch !== "") {
            setShowResults(true);

            if (!hasResults && rawSearch !== "")
                setSearchResults([
                    <span className = "no-results" key = "no-results">
                        <Icon type = {FontAwesomeIconType.X}/>
                        No results found
                    </span>
                ]);
            else
                setSearchResults(results);

        } else {
            setShowResults(false);
            setSearchResults([]);
        }

    };

    const onSubmit = (event: ReactFormOnSubmitEvent) => {
        event.preventDefault();
    };

    const onInputKeyDown = (event: ReactKeyboardEvent) => {
        // prevent input from clearing content on Enter press
        if (event.key === "Enter" || event.key === "Escape")
            event.preventDefault();

        // blur to hide mobile keyboards on submission
        if (event.key === "Enter")
            searchInputRef.current?.blur();

        // if user presses escape in modal, close the modal
        if (event.key === "Escape") {
            if (!alwaysShowResults) {
                setShowResults(false);
                searchInputRef.current?.focus();
            }

            if (modalIsOpen)
                setModalIsOpen(false);
        }
    };

    const clearSearchbar = () => {
        setSearchText("");
        setSearchResults([]);
        setShowResults(false);
    };

    const formClasses = buildClassNames({ "showing-results": showResults }, ["search-form"]);
    const containerClasses = buildClassNames({ [className ?? ""]: className }, ["search"]);

    const search = (
        <div className = {containerClasses} id = {id} style = {style} ref = {ref}>
            <form className = {formClasses} role = "search" onSubmit = {onSubmit}>
                <Icon className = "search-icon" type = {FontAwesomeIconType.Search}/>
                <label className = "visually-hidden" htmlFor = "searchbar">Search for Kana</label>
                <input
                    className = "search-input"
                    name = "searchbar"
                    type = "search"
                    role = "search"
                    ref = {searchInputRef}
                    placeholder = {placeholder}
                    value = {searchText}
                    onChange = {onSearchChange}
                    onKeyDown = {onInputKeyDown}
                />
                <Button
                    onClick = {() => { clearSearchbar(); searchInputRef.current?.focus(); }}
                    className = "clear-search-button"
                    iconType = {FontAwesomeIconType.Delete}
                    iconSize = {Size.Small}
                />
            </form>

            {showResults &&
                <div // container is necessary to add space between scrollbar and side of element
                    className = "search-results-container"
                    ref = {searchResultsRef}
                    tabIndex = {-1} // tabIndex is required for a div to be focusable
                    style = {{ position: openInModal ? "static" : "absolute" }}
                >
                    <div className = "search-results">
                        {searchResults}
                    </div>
                </div>
            }
        </div>
    );

    if (openInModal) {
        return (
            <>
                <Button
                    className = "open-modal-button"
                    onClick = {() => setModalIsOpen(true)}
                    iconType = {FontAwesomeIconType.Search}
                    iconSize = {Size.Small}
                >
                    {showButtonText && "Search"}
                </Button>

                <Modal
                    key = {modalIsOpen ? "open" : "closed"}
                    initialFocusTarget = {searchInputRef}
                    onClose = {() => { setModalIsOpen(false); clearSearchbar(); }}
                    defaultOpen = {modalIsOpen}
                    style = {{ width: "90%" }}
                >
                    {search}
                </Modal>
            </>
        );
    }

    return search;
});

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