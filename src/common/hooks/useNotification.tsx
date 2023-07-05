/* eslint-disable */
import { NotificationFn } from "@/common/types";
import { useCallback } from "react";
import { Id, toast, ToastContainer, ToastContainerProps } from "react-toastify";

export const NotificationCenter = (props: ToastContainerProps) : JSX.Element => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            limit={3}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            {...props}
        />
    );
};

const useNotification = () => {
    const notify: NotificationFn = useCallback((content, options) : Id  => toast(content, options), []);

    const error: NotificationFn = useCallback((content, options) : Id  => toast.error(content, options), []);

    const info: NotificationFn = useCallback((content, options) : Id  => toast.info(content, options), []);

    const success: NotificationFn = useCallback((content, options) : Id  => toast.success(content, options), []);

    const warning: NotificationFn = useCallback((content, options) : Id  => toast.warn(content, options), []);

    return { error, info, notify, success, warning };
};

export default useNotification;