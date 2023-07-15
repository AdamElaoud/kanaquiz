import { Icon } from "@/common/components";
import { FontAwesomeIconType, NotificationFn, Size } from "@/common/types";
import { useCallback } from "react";
import { Id, toast, UpdateOptions } from "react-toastify";

const useNotification = () => {
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