import { useLocation, useMatches, useRouteError } from "react-router-dom";

import "./ErrorPage.scss";

type ErrorResponse = {
    data?: string,
    error?: {
        message?: string,
        stack?: string
    },
    internal?: boolean,
    status?: number,
    statusText?: string
};

const ErrorPage = () : JSX.Element => {
    const { hash, key, pathname, search, state } = useLocation();
    const matches = useMatches();
    const routeError = useRouteError();

    const { data, error, internal, status, statusText } = routeError as ErrorResponse;

    return (
        <div className = "error-page">
            <div>Stack: {error?.stack}</div>
            <div>----------</div>
            <div>Error: {error?.message}</div>
            <div>Data: {data}</div>
            <div>Internal: {internal}</div>
            <div>Status: {status}</div>
            <div>Status Text: {statusText}</div>
            <div>----------</div>
            <div>Hash: {hash}</div>
            <div>Path Name: {pathname}</div>
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