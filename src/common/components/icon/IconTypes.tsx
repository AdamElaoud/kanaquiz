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
    faClipboardQuestion,
    faFlagCheckered,
    faGear,
    faListOl,
    faMagnifyingGlass,
    faPencil,
    faPlay,
    faQuestion,
    faToriiGate,
    faTrash,
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
    "clipboardQuestion": faClipboardQuestion,
    "delete": faTrash,
    "dojo": faVihara,
    "down": faCaretDown,
    "flagCheckered": faFlagCheckered,
    "gear": faGear,
    "numberList": faListOl,
    "pencil": faPencil,
    "play": faPlay,
    "search": faMagnifyingGlass,
    "question": faQuestion,
    "torii": faToriiGate,
    "up": faCaretUp,
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