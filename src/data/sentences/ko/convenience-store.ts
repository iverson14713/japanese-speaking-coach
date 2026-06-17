import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = 'convenience-store' as const

export const convenienceStoreKo: Sentence[] = [
  makeSentence({ id: 312, language: lang, category: cat, target: '이걸로 주세요.', pronunciation: 'igeollo juseyo', helper: 'i-geol-lo ju-se-yo', meaning: '我要這個', usage: '結帳時指著商品說', keywords: ['이걸로', 'igeollo', 'juseyo'] }),
  makeSentence({ id: 313, language: lang, category: cat, target: '데워 주세요.', pronunciation: 'dewo juseyo', helper: 'de-wo ju-se-yo', meaning: '請幫我加熱', usage: '買便當或熟食請店員加熱', keywords: ['데워', 'dewo', 'heat', 'warm'] }),
  makeSentence({ id: 314, language: lang, category: cat, target: '아이스로 주세요.', pronunciation: 'aiseuro juseyo', helper: 'a-i-seu-ro ju-se-yo', meaning: '我要冰的', usage: '買飲料時指定要冰的', keywords: ['아이스', 'aiseu', 'iced', 'cold'] }),
  makeSentence({ id: 315, language: lang, category: cat, target: '따뜻하게 주세요.', pronunciation: 'ttatteuthage juseyo', helper: 'tta-tteu-tha-ge ju-se-yo', meaning: '我要熱的', usage: '買飲料或咖啡指定溫度', keywords: ['따뜻', 'ttatteut', 'hot', 'warm'] }),
  makeSentence({ id: 316, language: lang, category: cat, target: '봉투 필요 없어요.', pronunciation: 'bongtu piryo eopseoyo', helper: 'bong-tu pi-ryo eop-seo-yo', meaning: '不需要袋子', usage: '店員問要不要袋子時', keywords: ['봉투', 'bongtu', 'bag', 'eopseoyo'] }),
  makeSentence({ id: 317, language: lang, category: cat, target: '카드로 결제할 수 있어요?', pronunciation: 'kadeuro gyeoljehal su isseoyo?', helper: 'ka-deu-ro gyeol-je-hal su i-sseo-yo', meaning: '可以刷卡嗎？', usage: '結帳前確認能否刷卡', keywords: ['카드', 'kadeu', 'card'] }),
  makeSentence({ id: 318, language: lang, category: cat, target: '영수증 주세요.', pronunciation: 'yeongsujeung juseyo', helper: 'yeong-su-jeung ju-se-yo', meaning: '請給我收據', usage: '結帳後需要收據時', keywords: ['영수증', 'yeongsujeung', 'receipt'] }),
  makeSentence({ id: 319, language: lang, category: cat, target: '화장실 어디예요?', pronunciation: 'hwajangsil eodiyeyo?', helper: 'hwa-jang-sil eo-di-ye-yo', meaning: '廁所在哪裡？', usage: '在便利商店找廁所', keywords: ['화장실', 'hwajangsil', 'restroom'] }),
  makeSentence({ id: 320, language: lang, category: cat, target: '근처에 ATM 있어요?', pronunciation: 'geuncheoe ATM isseoyo?', helper: 'geun-cheo-e ATM i-sseo-yo', meaning: '附近有 ATM 嗎？', usage: '需要提領現金時', keywords: ['atm', 'ATM', 'geuncheo'] }),
  makeSentence({ id: 321, language: lang, category: cat, target: '생수 있어요?', pronunciation: 'saengsu isseoyo?', helper: 'saeng-su i-sseo-yo', meaning: '有瓶裝水嗎？', usage: '找特定商品時', keywords: ['생수', 'saengsu', 'water', 'bottled'] }),
  makeSentence({ id: 322, language: lang, category: cat, target: '과자 어디에 있어요?', pronunciation: 'gwaja eodie isseoyo?', helper: 'gwa-ja eo-di-e i-sseo-yo', meaning: '零食在哪裡？', usage: '在店裡找商品區', keywords: ['과자', 'gwaja', 'snacks'] }),
  makeSentence({ id: 323, language: lang, category: cat, target: '전자레인지 있어요?', pronunciation: 'jeonjareinji isseoyo?', helper: 'jeon-ja-re-in-ji i-sseo-yo', meaning: '有微波爐嗎？', usage: '想自己加熱食物時', keywords: ['전자레인지', 'jeonjareinji', 'microwave'] }),
  makeSentence({ id: 324, language: lang, category: cat, target: '젓가락 주세요.', pronunciation: 'jeotgarak juseyo', helper: 'jeot-ga-rak ju-se-yo', meaning: '請給我筷子', usage: '買便當需要餐具時', keywords: ['젓가락', 'jeotgarak', 'chopsticks'] }),
  makeSentence({ id: 325, language: lang, category: cat, target: '충전기 있어요?', pronunciation: 'chungjeongi isseoyo?', helper: 'chung-jeon-gi i-sseo-yo', meaning: '有充電器嗎？', usage: '手機沒電急需充電', keywords: ['충전기', 'chungjeongi', 'charger'] }),
  makeSentence({ id: 326, language: lang, category: cat, target: '몇 시까지 해요?', pronunciation: 'myeot sikkaji haeyo?', helper: 'myeot si-kka-ji hae-yo', meaning: '開到幾點？', usage: '快關門時確認營業時間', keywords: ['몇 시', 'myeot si', 'close', 'kaji'] }),
  makeSentence({ id: 327, language: lang, category: cat, target: '부가세 포함이에요?', pronunciation: 'bugase pohamieyo?', helper: 'bu-ga-se po-ham-i-e-yo', meaning: '有含稅嗎？', usage: '確認標價是否含稅', keywords: ['부가세', 'bugase', 'tax', 'poham'] }),
  makeSentence({ id: 328, language: lang, category: cat, target: 'SIM 카드 팔아요?', pronunciation: 'SIM kadeu parayo?', helper: 'SIM ka-deu pa-ra-yo', meaning: '有賣 SIM 卡嗎？', usage: '台灣旅客到韓國常需網卡', keywords: ['sim', 'SIM', 'kadeu', 'card'] }),
]
