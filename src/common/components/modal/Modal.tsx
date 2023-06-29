import useWindowSize from "@/common/hooks/useWindowSize";
import "./Modal.scss";
import { CSSStyles, FontAwesomeIconType, MouseClickState, ReactNode, ReactRef } from "@/common/types";
import useMouseClick from "@/common/hooks/useMouseClick";
import { useRef, useEffect } from "react";
import { Button } from "..";

interface Props {
    children: ReactNode,
    initialFocusTarget?: ReactRef<HTMLElement>,
    onClose?: () => void,
    open: boolean,
    style?: CSSStyles
};

const Modal = (props: Props) : JSX.Element => {
    const { children, initialFocusTarget, open, onClose, style } = props;

    const modalRef = useRef<HTMLDialogElement>(null);
    const [, windowHeight] = useWindowSize();
    
    const onMouseClick = ({ event }: MouseClickState) => {
        if (open && modalRef.current && modalRef.current.style.height !== "0px") {
            const modalContentBounds = modalRef.current?.getBoundingClientRect();
    
            const { clientX, clientY } = event;
            const { top, right, bottom, left } = modalContentBounds;

            // when a button is "clicked" via the Enter key, the corresponding MouseEvent
            // that is fired attributes its clientX and clientY to be 0 which will
            // cause this condition to fail prompting the modal to instantly close
            const wasOpenedViaKeyboard = clientX === 0 && clientY === 0;
            const clickedOutsideModal = clientX < left || clientX > right || clientY < top || clientY > bottom
    
            if (!wasOpenedViaKeyboard && clickedOutsideModal)
                modalRef.current?.close();
        }
    };

    useMouseClick(onMouseClick);

    useEffect(() => {
        const isClosed = !modalRef.current?.hasAttribute("open");

        // due to the fact that the modal can close via the "onMouseClick" function
        // or via the default "close on Escape" behavior, the manager of the "open"
        // prop must sync itself with the modal state via the onClose prop. However,
        // this results in a followup update to the "open" prop which will trigger
        // this useEffect and may unecessarily call the showModal() or close() functions
        // if they have already been called
        if (open && isClosed) {
            modalRef.current?.showModal();

            if (initialFocusTarget)
                initialFocusTarget.current?.focus();

        } else if (!isClosed) {
            modalRef.current?.close();
        }

    }, [initialFocusTarget, open]);

    const defaultStyle = {
        // the modal's height is set to 0px when it is closed to provide a clear indication of
        // the actual space the modal takes up on the screen. This setup is used by the
        // onMouseClick function to restrict checks to only when the modal is visible on the screen
        height: open ? "fit-content" : "0px",
        marginTop: `${windowHeight * 0.15}px`,
    };

    return (
        <dialog ref = {modalRef} className = "modal" style = {{ ...defaultStyle, ...style }} onClose = {onClose}>
            <Button className = "close-modal-button" onClick = {() => modalRef.current?.close()} iconType = {FontAwesomeIconType.X} />
            {children}
        </dialog>
    );

};

export default Modal;