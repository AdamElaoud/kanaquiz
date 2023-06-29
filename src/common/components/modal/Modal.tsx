import useWindowSize from "@/common/hooks/useWindowSize";
import "./Modal.scss";
import { CSSStyles, FontAwesomeIconType, MouseClickState, ReactNode, ReactRef } from "@/common/types";
import useMouseClick from "@/common/hooks/useMouseClick";
import { useRef } from "react";
import { Button } from "..";

interface Props {
    children: ReactNode,
    defaultOpen?: boolean,
    initialFocusTarget?: ReactRef<HTMLElement>,
    onClose?: () => void,
    style?: CSSStyles
};

const DEFAULT_OPEN = false;

const Modal = (props: Props) : JSX.Element => {
    const { children, defaultOpen = DEFAULT_OPEN, initialFocusTarget, onClose, style } = props;

    const modalRef = useRef<HTMLDialogElement>(null);
    const [, windowHeight] = useWindowSize();
    
    const onMouseClick = ({ event }: MouseClickState) => {
        const isOpen = modalRef.current?.hasAttribute("open");
        if (isOpen && modalRef.current && modalRef.current.style.height !== "0px") {
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

    const isClosed = !modalRef.current?.hasAttribute("open");
    if (defaultOpen && isClosed) {
        modalRef.current?.showModal();

        if (initialFocusTarget)
            initialFocusTarget.current?.focus();

    }

    const defaultStyle = {
        // the modal's height is set to 0px when it is closed to provide a clear indication of
        // the actual space the modal takes up on the screen. This setup is used by the
        // onMouseClick function to restrict checks to only when the modal is visible on the screen
        height: defaultOpen ? "fit-content" : "0px",
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