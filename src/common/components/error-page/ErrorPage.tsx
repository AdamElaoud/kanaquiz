import { useLocation } from "react-router-dom";

import "./ErrorPage.scss";

const ErrorPage = () : JSX.Element => {
    const { hash, key, pathname, search, state } = useLocation();

    return (
        <div className = "error-page">
            <div>Hash: {hash}</div>
            <div>Pathname: {pathname}</div>
            <div>Key: {key}</div>
            <div>Search: {search}</div>
            <div>State: {state}</div>
        </div>
    );
};

export default ErrorPage;