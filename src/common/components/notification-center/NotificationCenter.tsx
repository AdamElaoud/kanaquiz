import { Icon } from "@/common/components";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { FontAwesomeIconType, Size } from "@/common/types";
import { SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import { CloseButtonProps, ToastContainer, ToastContainerProps } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import "./NotificationCenter.scss";

const ToastCloseButton = ({ closeToast }: CloseButtonProps) : JSX.Element => {
    return <Icon type = {FontAwesomeIconType.X} onClick = {closeToast} size = {Size.Large} />;
};

const NotificationCenter = (props: ToastContainerProps) : JSX.Element => {
    const dynamicWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);

    return (
        <ToastContainer
            autoClose = {5000}
            closeButton = {ToastCloseButton}
            closeOnClick
            draggable
            draggablePercent = {35}
            hideProgressBar = {false}
            limit = {4}
            newestOnTop = {false}
            pauseOnFocusLoss
            pauseOnHover
            position = "top-center"
            rtl = {false}
            style = {dynamicWidth}
            theme = "colored"
            {...props}
        />
    );
};

export default NotificationCenter;