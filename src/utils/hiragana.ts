import { CharsToGroups, GroupsToChars } from "@/types";

export const groupsToChars: GroupsToChars = {
    "h_base": [ ["あ", "a", "h_a"], ["い", "i", "h_i"], ["う", "u", "h_u"], ["え", "e", "h_e"], ["お", "o", "h_o"] ],
    "h_k": [ ["か", "ka", "h_ka"], ["き", "ki", "h_ki"], ["く", "ku", "h_ku"], ["け", "ke", "h_ke"], ["こ", "ko", "h_ko"] ],
    "h_s": [ ["さ", "sa", "h_sa"], ["し", "shi", "h_shi"], ["す", "su", "h_su"], ["せ", "se", "h_se"], ["そ", "so", "h_so"] ],
    "h_t": [ ["た", "ta", "h_ta"], ["ち", "chi", "h_chi"], ["つ", "tsu", "h_tsu"], ["て", "te", "h_te"], ["と", "to", "h_to"] ],
    "h_n": [ ["な", "na", "h_na"], ["に", "ni", "h_ni"], ["ぬ", "nu", "h_nu"], ["ね", "ne", "h_ne"], ["の", "no", "h_no"] ],
    "h_h": [ ["は", "ha", "h_ha"], ["ひ", "hi", "h_hi"], ["ふ", "fu", "h_fu"], ["へ", "he", "h_he"], ["ほ", "ho", "h_ho"] ],
    "h_m": [ ["ま", "ma", "h_ma"], ["み", "mi", "h_mi"], ["む", "mu", "h_mu"], ["め", "me", "h_me"], ["も", "mo", "h_mo"] ],
    "h_y": [ ["や", "ya", "h_ya"], ["ゆ", "yu", "h_yu"], ["よ", "yo", "h_yo"] ],
    "h_r": [ ["ら", "ra", "h_ra"], ["り", "ri", "h_ri"], ["る", "ru", "h_ru"], ["れ", "re", "h_re"], ["ろ", "ro", "h_ro"] ],
    "h_w": [ ["わ", "wa", "h_wa"], ["を", "wo", "h_wo"], ["ん", "n", "h_n"] ],
    "h_g": [ ["が", "ga", "h_ga"], ["ぎ", "gi", "h_gi"], ["ぐ", "gu", "h_gu"], ["げ", "ge", "h_ge"], ["ご", "go", "h_go"] ],
    "h_z": [ ["ざ", "za", "h_za"], ["じ", "ji", "h_ji"], ["ず", "zu", "h_zu"], ["ぜ", "ze", "h_ze"], ["ぞ", "zo", "h_zo"] ],
    "h_d": [ ["だ", "da", "h_da"], ["ぢ", "dji", "h_dji"], ["づ", "dzu", "h_dzu"], ["で", "de", "h_de"], ["ど", "do", "h_do"] ],
    "h_b": [ ["ば", "ba", "h_ba"], ["び", "bi", "h_bi"], ["ぶ", "bu", "h_bu"], ["べ", "be", "h_be"], ["ぼ", "bo", "h_bo"] ],
    "h_p": [ ["ぱ", "pa", "h_pa"], ["ぴ", "pi", "h_pi"], ["ぷ", "pu", "h_pu"], ["ぺ", "pe", "h_pe"], ["ぽ", "po", "h_po"] ],
    "h_ky": [ ["きゃ", "kya", "h_kya"], ["きゅ", "kyu", "h_kyu"], ["きょ", "kyo", "h_kyo"] ],
    "h_sy": [ ["しゃ", "sha", "h_sha"], ["しゅ", "shu", "h_shu"], ["しょ", "sho", "h_sho"] ],
    "h_ty": [ ["ちゃ", "cha", "h_cha"], ["ちゅ", "chu", "h_chu"], ["ちょ", "cho", "h_cho"] ],
    "h_ny": [ ["にゃ", "nya", "h_nya"], ["にゅ", "nyu", "h_nyu"], ["にょ", "nyo", "h_nyo"] ],
    "h_hy": [ ["ひゃ", "hya", "h_hya"], ["ひゅ", "hyu", "h_hyu"], ["ひょ", "hyo", "h_hyo"] ],
    "h_my": [ ["みゃ", "mya", "h_mya"], ["みゅ", "myu", "h_myu"], ["みょ", "myo", "h_myo"] ],
    "h_ry": [ ["りゃ", "rya", "h_rya"], ["りゅ", "ryu", "h_ryu"], ["りょ", "ryo", "h_ryo"] ],
    "h_gy": [ ["ぎゃ", "gya", "h_gya"], ["ぎゅ", "gyu", "h_gyu"], ["ぎょ", "gyo", "h_gyo"] ],
    "h_jy": [ ["じゃ", "ja", "h_ja"], ["じゅ", "ju", "h_ju"], ["じょ", "jo", "h_jo"] ],
    "h_by": [ ["びゃ", "bya", "h_bya"], ["びゅ", "byu", "h_byu"], ["びょ", "byo", "h_byo"] ],
    "h_py": [ ["ぴゃ", "pya", "h_pya"], ["ぴゅ", "pyu", "h_pyu"], ["ぴょ", "pyo", "h_pyo"] ]
};

export const charsToGroups: CharsToGroups = {
    "あ": ["h_base"], "a": ["h_base"],
    "い": ["h_base"], "i": ["h_base"],
    "う": ["h_base"], "u": ["h_base"],
    "え": ["h_base"], "e": ["h_base"],
    "お": ["h_base"], "o": ["h_base"],
    "か": ["h_k"], "ka": ["h_k"],
    "き": ["h_k"], "ki": ["h_k"],
    "く": ["h_k"], "ku": ["h_k"],
    "け": ["h_k"], "ke": ["h_k"],
    "こ": ["h_k"], "ko": ["h_k"],
    "さ": ["h_s"], "sa": ["h_s"],
    "し": ["h_s"], "shi": ["h_s"],
    "す": ["h_s"], "su": ["h_s"],
    "せ": ["h_s"], "se": ["h_s"],
    "そ": ["h_s"], "so": ["h_s"],
    "た": ["h_t"], "ta": ["h_t"],
    "ち": ["h_t"], "chi": ["h_t"],
    "つ": ["h_t"], "tsu": ["h_t"],
    "て": ["h_t"], "te": ["h_t"],
    "と": ["h_t"], "to": ["h_t"],
    "な": ["h_n"], "na": ["h_n"],
    "に": ["h_n"], "ni": ["h_n"],
    "ぬ": ["h_n"], "nu": ["h_n"],
    "ね": ["h_n"], "ne": ["h_n"],
    "の": ["h_n"], "no": ["h_n"],
    "は": ["h_h"], "ha": ["h_h"],
    "ひ": ["h_h"], "hi": ["h_h"],
    "ふ": ["h_h"], "fu": ["h_h"],
    "へ": ["h_h"], "he": ["h_h"],
    "ほ": ["h_h"], "ho": ["h_h"],
    "ま": ["h_m"], "ma": ["h_m"],
    "み": ["h_m"], "mi": ["h_m"],
    "む": ["h_m"], "mu": ["h_m"],
    "め": ["h_m"], "me": ["h_m"],
    "も": ["h_m"], "mo": ["h_m"],
    "や": ["h_y"], "ya": ["h_y"],
    "ゆ": ["h_y"], "yu": ["h_y"],
    "よ": ["h_y"], "yo": ["h_y"],
    "ら": ["h_r"], "ra": ["h_r"],
    "り": ["h_r"], "ri": ["h_r"],
    "る": ["h_r"], "ru": ["h_r"],
    "れ": ["h_r"], "re": ["h_r"],
    "ろ": ["h_r"], "ro": ["h_r"],
    "わ": ["h_w"], "wa": ["h_w"],
    "を": ["h_w"], "wo": ["h_w"],
    "ん": ["h_w"], "n": ["h_w"],
    "が": ["h_g"], "ga": ["h_g"],
    "ぎ": ["h_g"], "gi": ["h_g"],
    "ぐ": ["h_g"], "gu": ["h_g"],
    "げ": ["h_g"], "ge": ["h_g"],
    "ご": ["h_g"], "go": ["h_g"],
    "ざ": ["h_z"], "za": ["h_z"],
    "じ": ["h_z"], "ji": ["h_z"],
    "ず": ["h_z"], "zu": ["h_z"],
    "ぜ": ["h_z"], "ze": ["h_z"],
    "ぞ": ["h_z"], "zo": ["h_z"],
    "だ": ["h_d"], "da": ["h_d"],
    "ぢ": ["h_d"], "dji": ["h_d"],
    "づ": ["h_d"], "dzu": ["h_d"],
    "で": ["h_d"], "de": ["h_d"],
    "ど": ["h_d"], "do": ["h_d"],
    "ば": ["h_b"], "ba": ["h_b"],
    "び": ["h_b"], "bi": ["h_b"],
    "ぶ": ["h_b"], "bu": ["h_b"],
    "べ": ["h_b"], "be": ["h_b"],
    "ぼ": ["h_b"], "bo": ["h_b"],
    "ぱ": ["h_p"], "pa": ["h_p"],
    "ぴ": ["h_p"], "pi": ["h_p"],
    "ぷ": ["h_p"], "pu": ["h_p"],
    "ぺ": ["h_p"], "pe": ["h_p"],
    "ぽ": ["h_p"], "po": ["h_p"],
    "きゃ": ["h_ky"], "kya": ["h_ky"],
    "きゅ": ["h_ky"], "kyu": ["h_ky"],
    "きょ": ["h_ky"], "kyo": ["h_ky"],
    "しゃ": ["h_sy"], "sha": ["h_sy"],
    "しゅ": ["h_sy"], "shu": ["h_sy"],
    "しょ": ["h_sy"], "sho": ["h_sy"],
    "ちゃ": ["h_ty"], "cha": ["h_ty"],
    "ちゅ": ["h_ty"], "chu": ["h_ty"],
    "ちょ": ["h_ty"], "cho": ["h_ty"],
    "にゃ": ["h_ny"], "nya": ["h_ny"],
    "にゅ": ["h_ny"], "nyu": ["h_ny"],
    "にょ": ["h_ny"], "nyo": ["h_ny"],
    "ひゃ": ["h_hy"], "hya": ["h_hy"],
    "ひゅ": ["h_hy"], "hyu": ["h_hy"],
    "ひょ": ["h_hy"], "hyo": ["h_hy"],
    "みゃ": ["h_my"], "mya": ["h_my"],
    "みゅ": ["h_my"], "myu": ["h_my"],
    "みょ": ["h_my"], "myo": ["h_my"],
    "りゃ": ["h_ry"], "rya": ["h_ry"],
    "りゅ": ["h_ry"], "ryu": ["h_ry"],
    "りょ": ["h_ry"], "ryo": ["h_ry"],
    "ぎゃ": ["h_gy"], "gya": ["h_gy"],
    "ぎゅ": ["h_gy"], "gyu": ["h_gy"],
    "ぎょ": ["h_gy"], "gyo": ["h_gy"],
    "じゃ": ["h_jy"], "ja": ["h_jy"],
    "じゅ": ["h_jy"], "ju": ["h_jy"],
    "じょ": ["h_jy"], "jo": ["h_jy"],
    "びゃ": ["h_by"], "bya": ["h_by"],
    "びゅ": ["h_by"], "byu": ["h_by"],
    "びょ": ["h_by"], "byo": ["h_by"],
    "ぴゃ": ["h_py"], "pya": ["h_py"],
    "ぴゅ": ["h_py"], "pyu": ["h_py"],
    "ぴょ": ["h_py"], "pyo": ["h_py"]
};