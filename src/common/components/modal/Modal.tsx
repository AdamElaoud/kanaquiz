import useWindowSize from "@/common/hooks/useWindowSize";
import { CSSStyles, FontAwesomeIconType, PlainFn, ReactMouseEvent, ReactNode, ReactRef } from "@/common/types";
import { useRef } from "react";

import { Button } from "..";

import "./Modal.scss";

interface Props {
    children: ReactNode,
    defaultOpen?: boolean,
    hideCloseButton?: boolean,
    initialFocusTarget?: ReactRef<HTMLElement>,
    onClose?: PlainFn,
    style?: CSSStyles
};

const DEFAULT_OPEN = false;

const Modal = (props: Props) : JSX.Element => {
    const { children, defaultOpen = DEFAULT_OPEN, hideCloseButton, initialFocusTarget, onClose, style } = props;

    const modalRef = useRef<HTMLDialogElement>(null);
    const [, windowHeight] = useWindowSize();

    const onClick = (event: ReactMouseEvent) => {
        const isOpen = modalRef.current?.hasAttribute("open");
        
        if (isOpen && modalRef.current) {
            const modalContentBounds = modalRef.current?.getBoundingClientRect();
    
            const { clientX, clientY } = event;
            const { top, right, bottom, left } = modalContentBounds;
            
            const clickedOutsideModal = clientX < left || clientX > right || clientY < top || clientY > bottom
    
            if (clickedOutsideModal)
                modalRef.current?.close();
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
            onClose = {onClose}
            onClick = {onClick}
        >
            {!hideCloseButton && <Button className = "close-modal-button" onClick = {() => modalRef.current?.close()} iconType = {FontAwesomeIconType.X} />}
            {children}
        </dialog>
    );

};

export default Modal;