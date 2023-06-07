import { CustomIconMapType, FontAwesomeIconMapType, } from "@/common/types";
import {
    faAngleLeft,
    faAngleRight,
    faCheck,
    faClipboardQuestion,
    faFlagCheckered,
    faGear,
    faListOl,
    faMagnifyingGlass,
    faPencil,
    faPlay,
    faQuestion,
    faToriiGate,
    faVihara,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

export const FontAwesomeIconMap: FontAwesomeIconMapType = {
    "arrowLeft": faAngleLeft,
    "arrowRight": faAngleRight,
    "check": faCheck,
    "clipboardQuestion": faClipboardQuestion,
    "dojo": faVihara,
    "flagCheckered": faFlagCheckered,
    "gear": faGear,
    "numberList": faListOl,
    "pencil": faPencil,
    "play": faPlay,
    "search": faMagnifyingGlass,
    "question": faQuestion,
    "torii": faToriiGate,
    "x": faXmark,
};

export const CustomIconMap: CustomIconMapType = {
    "hiragana": "ひ",
    "katakana": "カ",
    "blank": ""
};