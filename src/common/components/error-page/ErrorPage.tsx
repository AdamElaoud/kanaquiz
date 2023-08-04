import { Button, Icon, NotificationCenter } from "@/common/components";
import { FontAwesomeIconType } from "@/common/types";
import { useNavigate, useRouteError } from "react-router-dom";

import "./ErrorPage.scss";
import useNotification from "@/common/hooks/useNotification";
import { COPY_FAIL, COPY_FAIL_ID, COPY_SUCCESS, COPY_SUCCESS_ID } from "@/common/utils/constants";

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
            await navigator.clipboard.writeText(JSON.stringify(routeError));
            success(COPY_SUCCESS, { toastId: COPY_SUCCESS_ID });

        } catch (err) {
            error(COPY_FAIL, { toastId: COPY_FAIL_ID });
        }
    };

    return (
        <>
            <NotificationCenter />
            <div className = "error-page">
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
                <Button
                    className = "stack-trace-button"
                    iconType = {FontAwesomeIconType.Copy}
                    onClick = {copyErrorToClipboard}
                >
                    Stack Trace
                </Button>
            </div>
        </>
    );
};

export default ErrorPage;