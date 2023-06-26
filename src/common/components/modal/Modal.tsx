import useWindowSize from "@/common/hooks/useWindowSize";
import "./Modal.scss";
import { CSSStyles, MouseClickState, ReactNode } from "@/common/types";
import useMouseClick from "@/common/hooks/useMouseClick";
import { useRef, useEffect } from "react";

interface Props {
    children: ReactNode,
    onClose?: () => void,
    open: boolean,
    style?: CSSStyles
};

const Modal = (props: Props) : JSX.Element => {
    const { children, open, onClose, style } = props;

    const modalRef = useRef<HTMLDialogElement>(null);
    const [, windowHeight] = useWindowSize();
    
    const onMouseClick = ({ event }: MouseClickState) => {
        if (modalRef.current && open) {
            const modalContentBounds = modalRef.current?.getBoundingClientRect();
    
            const { clientX, clientY } = event;
            const { top, right, bottom, left } = modalContentBounds;

            // when a button is "clicked" via the Enter key, the corresponding MouseEvent
            // that is fired attributes its clientX and clientY to be 0 which will
            // cause this condition to fail prompting the modal to instantly close
            const wasOpenedViaKeyboard = clientX === 0 && clientY === 0;
            const clickedOutsideModal = clientX < left || clientX > right || clientY < top || clientY > bottom
    
            if (!wasOpenedViaKeyboard && clickedOutsideModal) {
                modalRef.current?.close();
            }
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
        if (open)
            modalRef.current?.showModal();
        else if (!isClosed)
            modalRef.current?.close();

    }, [open]);

    const positionStyle = {
        marginTop: `${windowHeight * 0.15}px`,
    };

    return (
        <dialog ref = {modalRef} className = "modal" style = {{ ...positionStyle, ...style }} onClose = {onClose}>
            {children}
        </dialog>
    );

};

export default Modal;