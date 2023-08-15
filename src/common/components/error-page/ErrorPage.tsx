import { Button, Icon, NotificationCenter } from "@/common/components";
import useNotification from "@/common/hooks/useNotification";
import { FontAwesomeIconType } from "@/common/types";
import { COPY_FAIL, COPY_FAIL_ID, COPY_SUCCESS, COPY_SUCCESS_ID } from "@/common/utils/constants";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

import "./ErrorPage.scss";

interface Props {
    homepagePath: string
};

const ErrorPage = (props: Props) : JSX.Element => {
    const { homepagePath } = props;

    const navigate = useNavigate();
    const routeError = useRouteError();
    const { success, error } = useNotification();

    const copyErrorToClipboard = async () => {
        try {
            let log: string;

            if (routeError instanceof Error) {
                const { cause, message, name, stack } = routeError;
                log = JSON.stringify({ cause, message, name, stack });

            } else if (isRouteErrorResponse(routeError)) {
                const { data, error, internal, status, statusText } = routeError;
                log = JSON.stringify({ data, error, internal, status, statusText });

            } else {
                log = routeError ? routeError.toString() : "Route Error is undefined or null";
            }
                    
            await navigator.clipboard.writeText(log);
            success(COPY_SUCCESS, { toastId: COPY_SUCCESS_ID });

        } catch (err) {
            error(COPY_FAIL, { toastId: COPY_FAIL_ID });
        }
    };

    return (
        <div className = "error-page">
            <NotificationCenter />

            <div className = "error-page-content">
                <Icon className = "error-page-icon" type = {FontAwesomeIconType.Error}/>
                <div className = "error-page-title">
                    Oops! Something went wrong
                </div>
                <div className = "error-page-description">
                    <span>We couldn't load the page you were looking for.</span>
                    <span>Don't worry, we're on it.</span>
                </div>
                <div className = "error-page-actions">
                    <Button onClick = {() => location.reload()}>
                        Reload
                    </Button>
                    <Button className = "home-button" onClick = {() => navigate(homepagePath)}>
                        Home
                    </Button>
                </div>
            </div>

            <Button
                className = "log-button"
                iconType = {FontAwesomeIconType.Copy}
                onClick = {copyErrorToClipboard}
            >
                Log
            </Button>
        </div>
    );
};

export default ErrorPage;