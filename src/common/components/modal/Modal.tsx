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
    
            if (clientX < left || clientX > right || clientY < top || clientY > bottom)
                modalRef.current?.close();
        }
    };

    useMouseClick(onMouseClick);

    useEffect(() => {
        if (open)
            modalRef.current?.showModal();
        else
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