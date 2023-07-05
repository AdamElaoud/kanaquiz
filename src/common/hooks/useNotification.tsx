/* eslint-disable */
import { Icon } from "@/common/components";
import useDynamicWidth from "@/common/hooks/useDynamicWidth";
import { FontAwesomeIconType, NotificationFn, Size } from "@/common/types";
import { SCREEN_FILL_WIDTH, SCREEN_PARTIAL_FILL_WIDTH } from "@/utils/constants";
import { useCallback } from "react";
import { CloseButtonProps, Id, toast, ToastContainer, ToastContainerProps, UpdateOptions } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

import "./NotificationCenter.scss";

const ToastCloseButton = ({ closeToast }: CloseButtonProps) : JSX.Element => {
    return <Icon type = {FontAwesomeIconType.X} onClick = {closeToast} size = {Size.Large} />;
};

export const NotificationCenter = (props: ToastContainerProps) : JSX.Element => {
    const dynamicWidth = useDynamicWidth(SCREEN_PARTIAL_FILL_WIDTH, 33, SCREEN_FILL_WIDTH, 90);

    return (
        <ToastContainer
            autoClose = {2000}
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

export const useNotification = () => {
    const notify: NotificationFn = useCallback((content, options) : Id  => toast(content, options), []);

    const error: NotificationFn = useCallback((content, options) : Id  => toast.error(content, {
        icon: () => <Icon type = {FontAwesomeIconType.Error} size = {Size.Large}/>,
        ...options
    }), []);
    
    const info: NotificationFn = useCallback((content, options) : Id  => toast.info(content, {
        icon: () => <Icon type = {FontAwesomeIconType.Info} size = {Size.Large}/>,
        ...options
    }), []);
    
    const success: NotificationFn = useCallback((content, options) : Id  => toast.success(content, {
        icon: () => <Icon type = {FontAwesomeIconType.CircleCheck} size = {Size.Large}/>,
        ...options
    }), []);
    
    const warning: NotificationFn = useCallback((content, options) : Id  => toast.warn(content, {
        icon: () => <Icon type = {FontAwesomeIconType.Warning} size = {Size.Large}/>,
        ...options
    }), []);
    

    const update = (id: Id, options?: UpdateOptions) => toast.update(id, options);
    const dismissOne = (id: Id) => toast.dismiss(id);
    const dismissAll = () => toast.dismiss();
    const isActive = (id: Id) => toast.isActive(id);

    return {
        dismissAll,
        dismissOne,
        error,
        info,
        isActive,
        notify,
        success,
        update,
        warning
    };
};

export default useNotification;