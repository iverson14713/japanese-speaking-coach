import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'en' as const
const cat = 'convenience-store' as const

export const convenienceStoreEn: Sentence[] = [
  makeSentence({
    id: 212, language: lang, category: cat, target: "I'll take this, please.", pronunciation: "I'll take this, please.", meaning: '我要這個', usage: '結帳時指著商品說',
    keywords: ['take this', 'please'],
    words: [{ word: "I'll take this", meaning: '我要這個' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: "I'll take this", pronunciation: "I'll take this", chinese: '我要這個' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 213, language: lang, category: cat, target: "I'd like it hot.", pronunciation: "I'd like it hot.", meaning: '我要熱的', usage: '買飲料或湯品指定溫度',
    keywords: ['hot', 'like it hot'],
    words: [{ word: "I'd like", meaning: '我想要' }, { word: 'it hot', meaning: '熱的' }],
    chunks: [{ text: "I'd like", pronunciation: "I'd like", chinese: '我想要' }, { text: 'it hot', pronunciation: 'it hot', chinese: '熱的' }],
  }),
  makeSentence({
    id: 214, language: lang, category: cat, target: "I'd like it cold.", pronunciation: "I'd like it cold.", meaning: '我要冰的', usage: '買飲料時指定要冰的',
    keywords: ['cold', 'like it cold', 'iced'],
    words: [{ word: "I'd like", meaning: '我想要' }, { word: 'it cold', meaning: '冰的' }],
    chunks: [{ text: "I'd like", pronunciation: "I'd like", chinese: '我想要' }, { text: 'it cold', pronunciation: 'it cold', chinese: '冰的' }],
  }),
  makeSentence({
    id: 215, language: lang, category: cat, target: 'Could you heat this up?', pronunciation: 'Could you heat this up?', meaning: '請幫我加熱', usage: '買便當或熟食請店員加熱',
    keywords: ['heat this', 'heat up'],
    words: [{ word: 'Could you', meaning: '可以請你' }, { word: 'heat this up', meaning: '加熱這個' }],
    chunks: [{ text: 'Could you', pronunciation: 'Could you', chinese: '可以請你' }, { text: 'heat this up', pronunciation: 'heat this up', chinese: '加熱這個' }],
  }),
  makeSentence({
    id: 216, language: lang, category: cat, target: "I don't need a bag.", pronunciation: "I don't need a bag.", meaning: '不需要袋子', usage: '店員問要不要袋子時',
    keywords: ["don't need", 'no bag', 'bag'],
    words: [{ word: "I don't need", meaning: '我不需要' }, { word: 'a bag', meaning: '袋子' }],
    chunks: [{ text: "I don't need", pronunciation: "I don't need", chinese: '我不需要' }, { text: 'a bag', pronunciation: 'a bag', chinese: '袋子' }],
  }),
  makeSentence({
    id: 217, language: lang, category: cat, target: 'Can I pay by card?', pronunciation: 'Can I pay by card?', meaning: '可以刷卡嗎？', usage: '結帳前確認能否刷卡',
    keywords: ['pay by card', 'card'],
    words: [{ word: 'Can I pay', meaning: '我可以付' }, { word: 'by card', meaning: '用卡片' }],
    chunks: [{ text: 'Can I pay', pronunciation: 'Can I pay', chinese: '我可以付' }, { text: 'by card', pronunciation: 'by card', chinese: '用卡片' }],
  }),
  makeSentence({
    id: 218, language: lang, category: cat, target: 'Receipt, please.', pronunciation: 'Receipt, please.', meaning: '請給我收據', usage: '結帳後需要收據時',
    keywords: ['receipt'],
    words: [{ word: 'Receipt', meaning: '收據' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Receipt', pronunciation: 'Receipt', chinese: '收據' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 219, language: lang, category: cat, target: 'Where is the restroom?', pronunciation: 'Where is the restroom?', meaning: '廁所在哪裡？', usage: '在便利商店找廁所',
    keywords: ['restroom', 'bathroom', 'where is'],
    words: [{ word: 'Where is', meaning: '在哪裡' }, { word: 'the restroom', meaning: '廁所' }],
    chunks: [{ text: 'Where is', pronunciation: 'Where is', chinese: '在哪裡' }, { text: 'the restroom', pronunciation: 'the restroom', chinese: '廁所' }],
  }),
  makeSentence({
    id: 220, language: lang, category: cat, target: 'Is there an ATM nearby?', pronunciation: 'Is there an ATM nearby?', meaning: '附近有 ATM 嗎？', usage: '需要提領現金時',
    keywords: ['atm', 'atm nearby'],
    words: [{ word: 'Is there an ATM', meaning: '有 ATM 嗎' }, { word: 'nearby', meaning: '附近' }],
    chunks: [{ text: 'Is there an ATM', pronunciation: 'Is there an ATM', chinese: '有 ATM 嗎' }, { text: 'nearby', pronunciation: 'nearby', chinese: '附近' }],
  }),
  makeSentence({
    id: 221, language: lang, category: cat, target: 'Do you have bottled water?', pronunciation: 'Do you have bottled water?', meaning: '有瓶裝水嗎？', usage: '找特定商品時',
    keywords: ['bottled water', 'water'],
    words: [{ word: 'Do you have', meaning: '你有' }, { word: 'bottled water', meaning: '瓶裝水嗎' }],
    chunks: [{ text: 'Do you have', pronunciation: 'Do you have', chinese: '你有' }, { text: 'bottled water', pronunciation: 'bottled water', chinese: '瓶裝水嗎' }],
  }),
  makeSentence({
    id: 222, language: lang, category: cat, target: 'Where can I find snacks?', pronunciation: 'Where can I find snacks?', meaning: '零食在哪裡？', usage: '在店裡找商品區',
    keywords: ['find snacks', 'snacks', 'where'],
    words: [{ word: 'Where can I find', meaning: '我在哪可以找到' }, { word: 'snacks', meaning: '零食' }],
    chunks: [{ text: 'Where can I find', pronunciation: 'Where can I find', chinese: '我在哪可以找到' }, { text: 'snacks', pronunciation: 'snacks', chinese: '零食' }],
  }),
  makeSentence({
    id: 223, language: lang, category: cat, target: 'Is there a microwave?', pronunciation: 'Is there a microwave?', meaning: '有微波爐嗎？', usage: '想自己加熱食物時',
    keywords: ['microwave'],
    words: [{ word: 'Is there', meaning: '有' }, { word: 'a microwave', meaning: '微波爐嗎' }],
    chunks: [{ text: 'Is there', pronunciation: 'Is there', chinese: '有' }, { text: 'a microwave', pronunciation: 'a microwave', chinese: '微波爐嗎' }],
  }),
  makeSentence({
    id: 224, language: lang, category: cat, target: 'Chopsticks, please.', pronunciation: 'Chopsticks, please.', meaning: '請給我筷子', usage: '買便當需要餐具時',
    keywords: ['chopsticks'],
    words: [{ word: 'Chopsticks', meaning: '筷子' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Chopsticks', pronunciation: 'Chopsticks', chinese: '筷子' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 225, language: lang, category: cat, target: 'Do you have phone chargers?', pronunciation: 'Do you have phone chargers?', meaning: '有手機充電線嗎？', usage: '手機沒電急需充電',
    keywords: ['phone charger', 'chargers', 'charger'],
    words: [{ word: 'Do you have', meaning: '你有' }, { word: 'phone chargers', meaning: '手機充電線嗎' }],
    chunks: [{ text: 'Do you have', pronunciation: 'Do you have', chinese: '你有' }, { text: 'phone chargers', pronunciation: 'phone chargers', chinese: '手機充電線嗎' }],
  }),
  makeSentence({
    id: 226, language: lang, category: cat, target: 'What time do you close?', pronunciation: 'What time do you close?', meaning: '幾點打烊？', usage: '快關門時確認營業時間',
    keywords: ['what time', 'close', 'closing'],
    words: [{ word: 'What time do you', meaning: '你幾點' }, { word: 'close', meaning: '打烊' }],
    chunks: [{ text: 'What time do you', pronunciation: 'What time do you', chinese: '你幾點' }, { text: 'close', pronunciation: 'close', chinese: '打烊' }],
  }),
  makeSentence({
    id: 227, language: lang, category: cat, target: 'Is tax included?', pronunciation: 'Is tax included?', meaning: '有含稅嗎？', usage: '確認標價是否含稅',
    keywords: ['tax included', 'tax'],
    words: [{ word: 'Is tax', meaning: '稅' }, { word: 'included', meaning: '有含嗎' }],
    chunks: [{ text: 'Is tax', pronunciation: 'Is tax', chinese: '稅' }, { text: 'included', pronunciation: 'included', chinese: '有含嗎' }],
  }),
  makeSentence({
    id: 228, language: lang, category: cat, target: 'Do you sell SIM cards?', pronunciation: 'Do you sell SIM cards?', meaning: '有賣 SIM 卡嗎？', usage: '台灣旅客出國常需網卡',
    keywords: ['sim card', 'sim cards'],
    words: [{ word: 'Do you sell', meaning: '你有賣' }, { word: 'SIM cards', meaning: 'SIM 卡嗎' }],
    chunks: [{ text: 'Do you sell', pronunciation: 'Do you sell', chinese: '你有賣' }, { text: 'SIM cards', pronunciation: 'SIM cards', chinese: 'SIM 卡嗎' }],
  }),
]
