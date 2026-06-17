import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = 'emergency' as const

export const emergencyJa: Sentence[] = [
  makeSentence({ id: 151, language: lang, category: cat, target: '助けてください。', pronunciation: 'Tasukete kudasai.', helper: 'たすけて ください', meaning: '請幫幫我', usage: '遇到困難或危險時求助', keywords: ['助けて', 'tasukete', 'help'] }),
  makeSentence({ id: 152, language: lang, category: cat, target: '道に迷いました。', pronunciation: 'Michi ni mayoimashita.', helper: 'みちに まよいました', meaning: '我迷路了', usage: '找不到路時向路人求助', keywords: ['道に迷', 'みち', 'mayoimashita', 'lost'] }),
  makeSentence({ id: 153, language: lang, category: cat, target: '体調が悪いです。', pronunciation: 'Taichou ga warui desu.', helper: 'たいちょうが わるい です', meaning: '我身體不舒服', usage: '身體不適時說明狀況', keywords: ['体調', 'たいちょう', 'taichou', 'warui'] }),
  makeSentence({ id: 154, language: lang, category: cat, target: '救急車を呼んでください。', pronunciation: 'Kyuukyuusha wo yonde kudasai.', helper: 'きゅうきゅうしゃを よんで ください', meaning: '請叫救護車', usage: '嚴重受傷或急病時', keywords: ['救急車', 'きゅうきゅうしゃ', 'ambulance'] }),
  makeSentence({ id: 155, language: lang, category: cat, target: '警察を呼んでください。', pronunciation: 'Keisatsu wo yonde kudasai.', helper: 'けいさつを よんで ください', meaning: '請叫警察', usage: '遭遇竊盜或危險時', keywords: ['警察', 'けいさつ', 'keisatsu', 'police'] }),
  makeSentence({ id: 156, language: lang, category: cat, target: '財布をなくしました。', pronunciation: 'Saifu wo nakushimashita.', helper: 'さいふを なくしました', meaning: '我遺失了錢包', usage: '錢包遺失向警察或櫃檯求助', keywords: ['財布', 'saifu', 'wallet', 'nakushimashita'] }),
  makeSentence({ id: 157, language: lang, category: cat, target: 'パスポートをなくしました。', pronunciation: 'Pasupooto wo nakushimashita.', helper: 'パスポートを なくしました', meaning: '我遺失了護照', usage: '護照遺失，緊急求助', keywords: ['パスポート', 'pasupoto', 'passport', 'lost'] }),
  makeSentence({ id: 158, language: lang, category: cat, target: '携帯をなくしました。', pronunciation: 'Keitai wo nakushimashita.', helper: 'けいたいを なくしました', meaning: '我手機弄丟了', usage: '手機遺失時說明', keywords: ['携帯', 'keitai', 'phone', 'lost'] }),
  makeSentence({ id: 159, language: lang, category: cat, target: '携帯の電池が切れました。', pronunciation: 'Keitai no denchi ga kiremashita.', helper: 'けいたいの でんちが きれました', meaning: '我手機沒電了', usage: '需要充電或借電話時', keywords: ['電池', 'denchi', 'battery', 'kiremashita'] }),
  makeSentence({ id: 160, language: lang, category: cat, target: '医者に診てもらいたいです。', pronunciation: 'Isha ni mite moraitai desu.', helper: 'いしゃに みて もらいたい です', meaning: '我想看醫生', usage: '身體不舒服需要醫療', keywords: ['医者', 'isha', 'doctor'] }),
  makeSentence({ id: 161, language: lang, category: cat, target: 'アレルギーが出ました。', pronunciation: 'Arerugii ga demashita.', helper: 'アレルギーが でました', meaning: '我過敏了', usage: '食物或藥物過敏緊急狀況', keywords: ['アレルギー', 'arerugii', 'allergy'] }),
  makeSentence({ id: 162, language: lang, category: cat, target: '一番近い病院はどこですか。', pronunciation: 'Ichiban chikai byouin wa doko desu ka.', helper: 'いちばん ちかい びょういんは どこ ですか', meaning: '最近的醫院在哪？', usage: '需要就醫時找醫院', keywords: ['病院', 'びょういん', 'byouin', 'hospital'] }),
  makeSentence({ id: 163, language: lang, category: cat, target: 'ホテルに連絡してください。', pronunciation: 'Hoteru ni renraku shite kudasai.', helper: 'ホテルに れんらく してください', meaning: '請聯絡我的飯店', usage: '緊急時請人幫忙打給飯店', keywords: ['ホテル', 'hoteru', 'hotel', 'renraku'] }),
  makeSentence({ id: 164, language: lang, category: cat, target: 'かばんを盗まれました。', pronunciation: 'Kaban wo nusumaremashita.', helper: 'かばんを ぬすまれました', meaning: '我的包包被偷了', usage: '遭遇竊盜向警察報案', keywords: ['盗まれ', 'nusumare', 'stolen', 'kaban'] }),
  makeSentence({ id: 165, language: lang, category: cat, target: '火事です。119番に電話してください。', pronunciation: 'Kaji desu. Hyaku-juu-kyuu-ban ni denwa shite kudasai.', helper: 'かじ です。119ばんに でんわ してください', meaning: '失火了，請打 119', usage: '火災緊急狀況（日本）', keywords: ['火事', 'kaji', '119', 'fire'] }),
  makeSentence({ id: 166, language: lang, category: cat, target: '電話を借りられますか。', pronunciation: 'Denwa wo kariraremasu ka.', helper: 'でんわを かりられますか', meaning: '可以借電話嗎？', usage: '自己手機沒電或遺失時', keywords: ['電話', 'denwa', 'phone', 'kariraremasu'] }),
  makeSentence({ id: 167, language: lang, category: cat, target: '緊急の電話番号は何番ですか。', pronunciation: 'Kinkyuu no denwa bangou wa nan-ban desu ka.', helper: 'きんきゅうの でんばんごうは なんばん ですか', meaning: '緊急電話是幾號？', usage: '不知道當地急救電話時', keywords: ['緊急', 'kinkyuu', 'emergency', '電話番号'] }),
]
