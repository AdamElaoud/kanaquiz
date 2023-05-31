import { CustomIconMapType, FontAwesomeIconMapType, } from "@/common/types";
import {
    faCheck,
    faChevronLeft,
    faChevronRight,
    faClipboardQuestion,
    faFlagCheckered,
    faGear,
    faMagnifyingGlass,
    faPlay,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

export const FontAwesomeIconMap: FontAwesomeIconMapType = {
    "arrowLeft": faChevronLeft,
    "arrowRight": faChevronRight,
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