import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = 'convenience-store' as const

export const convenienceStoreJa: Sentence[] = [
  makeSentence({ id: 112, language: lang, category: cat, target: 'これをください。', pronunciation: 'Kore wo kudasai.', helper: 'これを ください', meaning: '我要這個', usage: '結帳時指著商品說', keywords: ['これ', 'kore', 'kudasai'] }),
  makeSentence({ id: 113, language: lang, category: cat, target: '温めてください。', pronunciation: 'Atatamete kudasai.', helper: 'あたためて ください', meaning: '請幫我加熱', usage: '買便當或熟食請店員加熱', keywords: ['温めて', 'atatamete', 'heat'] }),
  makeSentence({ id: 114, language: lang, category: cat, target: 'アイスでお願いします。', pronunciation: 'Aisu de onegaishimasu.', helper: 'アイスで おねがいします', meaning: '我要冰的', usage: '買飲料時指定要冰的', keywords: ['アイス', 'aisu', 'iced', 'cold'] }),
  makeSentence({ id: 115, language: lang, category: cat, target: 'ホットでお願いします。', pronunciation: 'Hotto de onegaishimasu.', helper: 'ホットで おねがいします', meaning: '我要熱的', usage: '買飲料或咖啡指定溫度', keywords: ['ホット', 'hotto', 'hot'] }),
  makeSentence({ id: 116, language: lang, category: cat, target: '袋はいりません。', pronunciation: 'Fukuro wa irimasen.', helper: 'ふくろは いりません', meaning: '不需要袋子', usage: '店員問要不要袋子時', keywords: ['袋', 'ふくろ', 'fukuro', 'irimasen'] }),
  makeSentence({ id: 117, language: lang, category: cat, target: 'カードで払えますか。', pronunciation: 'Kaado de haraemasu ka.', helper: 'カードで はらえますか', meaning: '可以刷卡嗎？', usage: '結帳前確認能否刷卡', keywords: ['カード', 'card', 'haraemasu'] }),
  makeSentence({ id: 118, language: lang, category: cat, target: 'レシートをください。', pronunciation: 'Reshiito wo kudasai.', helper: 'レシートを ください', meaning: '請給我收據', usage: '結帳後需要收據時', keywords: ['レシート', 'reshiito', 'receipt'] }),
  makeSentence({ id: 119, language: lang, category: cat, target: 'トイレはどこですか。', pronunciation: 'Toire wa doko desu ka.', helper: 'トイレは どこ ですか', meaning: '廁所在哪裡？', usage: '在便利商店找廁所', keywords: ['トイレ', 'toire', 'restroom'] }),
  makeSentence({ id: 120, language: lang, category: cat, target: '近くにATMはありますか。', pronunciation: 'Chikaku ni ATM wa arimasu ka.', helper: 'ちかくに ATMは ありますか', meaning: '附近有 ATM 嗎？', usage: '需要提領現金時', keywords: ['atm', 'ATM', 'chikaku'] }),
  makeSentence({ id: 121, language: lang, category: cat, target: 'ペットボトルの水はありますか。', pronunciation: 'Petto botoru no mizu wa arimasu ka.', helper: 'ペットボトルの みずは ありますか', meaning: '有瓶裝水嗎？', usage: '找特定商品時', keywords: ['水', 'みず', 'mizu', 'water'] }),
  makeSentence({ id: 122, language: lang, category: cat, target: 'お菓子はどこにありますか。', pronunciation: 'Okashi wa doko ni arimasu ka.', helper: 'おかしは どこに ありますか', meaning: '零食在哪裡？', usage: '在店裡找商品區', keywords: ['お菓子', 'おかし', 'okashi', 'snacks'] }),
  makeSentence({ id: 123, language: lang, category: cat, target: '電子レンジはありますか。', pronunciation: 'Denshi renji wa arimasu ka.', helper: 'でんしレンジは ありますか', meaning: '有微波爐嗎？', usage: '想自己加熱食物時', keywords: ['電子レンジ', 'renji', 'microwave'] }),
  makeSentence({ id: 124, language: lang, category: cat, target: 'お箸をください。', pronunciation: 'O-hashi wo kudasai.', helper: 'おはしを ください', meaning: '請給我筷子', usage: '買便當需要餐具時', keywords: ['お箸', 'おはし', 'ohashi', 'chopsticks'] }),
  makeSentence({ id: 125, language: lang, category: cat, target: '充電器はありますか。', pronunciation: 'Juudenshi wa arimasu ka.', helper: 'じゅうでんきは ありますか', meaning: '有充電器嗎？', usage: '手機沒電急需充電', keywords: ['充電器', 'じゅうでんき', 'juudenki', 'charger'] }),
  makeSentence({ id: 126, language: lang, category: cat, target: '何時まで開いていますか。', pronunciation: 'Nan-ji made aite imasu ka.', helper: 'なんじまで あいて いますか', meaning: '開到幾點？', usage: '快關門時確認營業時間', keywords: ['何時', 'nanji', '開いて', 'aite'] }),
  makeSentence({ id: 127, language: lang, category: cat, target: '税込みですか。', pronunciation: 'Zeikomi desu ka.', helper: 'ぜいこみ ですか', meaning: '有含稅嗎？', usage: '確認標價是否含稅', keywords: ['税込み', 'ぜいこみ', 'zeikomi', 'tax'] }),
  makeSentence({ id: 128, language: lang, category: cat, target: 'SIMカードは売っていますか。', pronunciation: 'SIM kaado wa utte imasu ka.', helper: 'SIMカードは うって いますか', meaning: '有賣 SIM 卡嗎？', usage: '台灣旅客到日本常需網卡', keywords: ['sim', 'SIM', 'sim card', 'kaado'] }),
]
