import { CustomIconMapType, FontAwesomeIconMapType, } from "@/common/types";
import {
    faAngleLeft,
    faAngleRight,
    faArrowLeft,
    faArrowRight,
    faBook,
    faCaretDown,
    faCaretUp,
    faCheck,
    faCircleArrowLeft,
    faCircleArrowRight,
    faCircleCheck,
    faCircleExclamation,
    faCircleInfo,
    faClipboardQuestion,
    faCopy,
    faFlagCheckered,
    faGear,
    faHandPointer,
    faKeyboard,
    faListOl,
    faMagnifyingGlass,
    faPencil,
    faPlay,
    faQuestion,
    faStopwatch,
    faToriiGate,
    faTrash,
    faTriangleExclamation,
    faUpRightFromSquare,
    faVihara,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const FontAwesomeIconMap: FontAwesomeIconMapType = {
    "angleLeft": faAngleLeft,
    "angleRight": faAngleRight,
    "arrowLeft": faArrowLeft,
    "arrowRight": faArrowRight,
    "book": faBook,
    "check": faCheck,
    "circleArrowLeft": faCircleArrowLeft,
    "circleArrowRight": faCircleArrowRight,
    "circleCheck": faCircleCheck,
    "copy": faCopy,
    "error": faCircleExclamation,
    "info": faCircleInfo,
    "clipboardQuestion": faClipboardQuestion,
    "delete": faTrash,
    "dojo": faVihara,
    "down": faCaretDown,
    "flagCheckered": faFlagCheckered,
    "gear": faGear,
    "keyboard": faKeyboard,
    "numberList": faListOl,
    "openLink": faUpRightFromSquare,
    "pencil": faPencil,
    "play": faPlay,
    "search": faMagnifyingGlass,
    "stopwatch": faStopwatch,
    "question": faQuestion,
    "tap": faHandPointer,
    "torii": faToriiGate,
    "up": faCaretUp,
    "warning": faTriangleExclamation,
    "x": faXmark,
};

export const CustomIconMap: CustomIconMapType = {
    blank: {
        isImage: false,
        text: ""
    },
    kana: {
        isImage: false,
        text: "ひ"
    },
    jpFlag: {
        isImage: true,
        src: "icon-images/japan.png",
        text: "Japanese"
    },
    usFlag: {
        isImage: true,
        src: "icon-images/united-states.png",
        text: "English"
    },
};