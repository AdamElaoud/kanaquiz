import { useLocation, useMatches } from "react-router-dom";

import "./ErrorPage.scss";

const ErrorPage = () : JSX.Element => {
    const { hash, key, pathname, search, state } = useLocation();
    const matches = useMatches();

    return (
        <div className = "error-page">
            <div>Hash: {hash}</div>
            <div>Pathname: {pathname}</div>
            <div>Key: {key}</div>
            <div>Search: {search}</div>
            <div>State: {state}</div>
            {matches.map(match => {
                const { id, pathname } = match;

                return (
                    <>
                        <div>----------</div>
                        <div>Match {id}</div>
                        <div>Pathname: {pathname}</div>
                    </>
                );
            })}
        </div>
    );
};

export default ErrorPage;