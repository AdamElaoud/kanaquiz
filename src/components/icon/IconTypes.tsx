import { CustomIconMapType, FontAwesomeIconMapType, } from "@/types";
import {
    faCheck,
    faFlagCheckered,
    faGear,
    faMagnifyingGlass,
    faXmark
} from "@fortawesome/free-solid-svg-icons";

export const FontAwesomeIconMap: FontAwesomeIconMapType = {
    "check": faCheck,
    "flagCheckered": faFlagCheckered,
    "gear": faGear,
    "search": faMagnifyingGlass,
    "x": faXmark,
};

export const CustomIconMap: CustomIconMapType = {
    "hiragana": <div></div>,
    "katakana": <div></div>,
};