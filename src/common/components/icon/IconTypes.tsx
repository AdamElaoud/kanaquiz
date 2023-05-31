import { CustomIconMapType, FontAwesomeIconMapType, } from "@/common/types";
import {
    faAngleLeft,
    faAngleRight,
    faCheck,
    faClipboardQuestion,
    faFlagCheckered,
    faGear,
    faMagnifyingGlass,
    faPlay,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

export const FontAwesomeIconMap: FontAwesomeIconMapType = {
    "arrowLeft": faAngleLeft,
    "arrowRight": faAngleRight,
    "check": faCheck,
    "clipboardQuestion": faClipboardQuestion,
    "flagCheckered": faFlagCheckered,
    "gear": faGear,
    "play": faPlay,
    "search": faMagnifyingGlass,
    "x": faXmark,
};

export const CustomIconMap: CustomIconMapType = {
    "hiragana": "ひ",
    "katakana": "カ",
    "blank": ""
};