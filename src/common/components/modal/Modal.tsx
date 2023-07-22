import useWindowSize from "@/common/hooks/useWindowSize";
import { CloseMethod, CSSStyles, FontAwesomeIconType, ReactMouseEvent, ReactNode, ReactRef } from "@/common/types";
import { useRef } from "react";

import { Button } from "..";

import "./Modal.scss";

interface Props {
    children: ReactNode,
    defaultOpen?: boolean,
    hideCloseButton?: boolean,
    initialFocusTarget?: ReactRef<HTMLElement>,
    onClose?: (closeMethod: CloseMethod | null) => void,
    style?: CSSStyles
};

const DEFAULT_OPEN = false;

const Modal = (props: Props) : JSX.Element => {
    const { children, defaultOpen = DEFAULT_OPEN, hideCloseButton, initialFocusTarget, onClose, style } = props;

    const closeMethod = useRef<CloseMethod | null>(null);
    const modalRef = useRef<HTMLDialogElement>(null);
    const [, windowHeight] = useWindowSize();

    const onClick = (event: ReactMouseEvent) => {
        const isOpen = modalRef.current?.hasAttribute("open");
        
        if (isOpen && modalRef.current) {
            const modalContentBounds = modalRef.current?.getBoundingClientRect();
    
            const { clientX, clientY } = event;
            const { top, right, bottom, left } = modalContentBounds;
            
            // when a button is "clicked" via the Enter key, the corresponding MouseEvent
            // that is fired attributes its clientX and clientY to be 0 which will
            // cause this condition to fail, prompting the modal to instantly close
            const wasOpenedViaKeyboard = clientX === 0 && clientY === 0;
            const clickedOutsideModal = clientX < left || clientX > right || clientY < top || clientY > bottom;

            if (!wasOpenedViaKeyboard && clickedOutsideModal) {
                closeMethod.current = CloseMethod.ClickBackdrop;
                modalRef.current?.close();
            }
        }
    };

    const isClosed = !modalRef.current?.hasAttribute("open");
    if (defaultOpen && isClosed) {
        modalRef.current?.showModal();

        if (initialFocusTarget)
            initialFocusTarget.current?.focus();
    }

    const defaultStyle = {
        marginTop: `${windowHeight * 0.15}px`,
    };

    return (
        <dialog
            ref = {modalRef}
            className = "modal"
            style = {{ ...defaultStyle, ...style }}
            onClose = {(...args) => { console.log(...args); if (onClose) onClose(closeMethod.current); }}
            onClick = {onClick}
            onCancel = {(...args) => { console.log(...args); if (onClose) onClose(CloseMethod.Escape); }}
        >
            {!hideCloseButton && <Button
                className = "close-modal-button"
                onClick = {() => { closeMethod.current = CloseMethod.XButton; modalRef.current?.close() }}
                iconType = {FontAwesomeIconType.X}
            />}
            {children}
        </dialog>
    );

};

export default Modal;