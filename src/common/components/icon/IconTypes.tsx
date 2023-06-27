import { CustomIconMapType, FontAwesomeIconMapType, } from "@/common/types";
import {
    faAngleLeft,
    faAngleRight,
    faBook,
    faCaretDown,
    faCaretUp,
    faCheck,
    faClipboardQuestion,
    faTrash,
    faFlagCheckered,
    faGear,
    faListOl,
    faMagnifyingGlass,
    faPencil,
    faPlay,
    faQuestion,
    faToriiGate,
    faVihara,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

export const FontAwesomeIconMap: FontAwesomeIconMapType = {
    "arrowLeft": faAngleLeft,
    "arrowRight": faAngleRight,
    "book": faBook,
    "check": faCheck,
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