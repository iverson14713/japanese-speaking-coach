import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'en' as const
const cat = 'hotel' as const

export const hotelEn: Sentence[] = [
  makeSentence({
    id: 163, language: lang, category: cat, target: "I'd like to check in.", pronunciation: "I'd like to check in.", meaning: '我要辦理入住', usage: '到飯店櫃檯時',
    keywords: ['check in', 'checkin'],
    words: [{ word: "I'd like to", meaning: '我想要' }, { word: 'check in', meaning: '辦理入住' }],
    chunks: [{ text: "I'd like to", pronunciation: "I'd like to", chinese: '我想要' }, { text: 'check in', pronunciation: 'check in', chinese: '辦理入住' }],
  }),
  makeSentence({
    id: 164, language: lang, category: cat, target: 'I have a reservation.', pronunciation: 'I have a reservation.', meaning: '我有預約', usage: '到櫃檯說明已訂房',
    keywords: ['reservation', 'have a reservation'],
    words: [{ word: 'I have', meaning: '我有' }, { word: 'a reservation', meaning: '預約' }],
    chunks: [{ text: 'I have', pronunciation: 'I have', chinese: '我有' }, { text: 'a reservation', pronunciation: 'a reservation', chinese: '預約' }],
  }),
  makeSentence({
    id: 165, language: lang, category: cat, target: 'The reservation is under Wayne Lin.', pronunciation: 'The reservation is under Wayne Lin.', meaning: '預約名字是 Wayne Lin', usage: '報訂房姓名，可換成你的名字',
    keywords: ['reservation under', 'under wayne', 'name'],
    words: [{ word: 'The reservation is under', meaning: '預約名字是' }, { word: 'Wayne Lin', meaning: 'Wayne Lin' }],
    chunks: [{ text: 'The reservation is under', pronunciation: 'The reservation is under', chinese: '預約名字是' }, { text: 'Wayne Lin', pronunciation: 'Wayne Lin', chinese: 'Wayne Lin' }],
  }),
  makeSentence({
    id: 166, language: lang, category: cat, target: "Here's my passport.", pronunciation: "Here's my passport.", meaning: '這是我的護照', usage: '入住時櫃檯要求證件',
    keywords: ['passport', 'my passport'],
    words: [{ word: "Here's my", meaning: '這是我的' }, { word: 'passport', meaning: '護照' }],
    chunks: [{ text: "Here's my", pronunciation: "Here's my", chinese: '這是我的' }, { text: 'passport', pronunciation: 'passport', chinese: '護照' }],
  }),
  makeSentence({
    id: 167, language: lang, category: cat, target: 'Can I check in early?', pronunciation: 'Can I check in early?', meaning: '可以提早入住嗎？', usage: '提早到飯店想先進房',
    keywords: ['check in early', 'early check in'],
    words: [{ word: 'Can I check in', meaning: '我可以入住' }, { word: 'early', meaning: '提早' }],
    chunks: [{ text: 'Can I check in', pronunciation: 'Can I check in', chinese: '我可以入住' }, { text: 'early', pronunciation: 'early', chinese: '提早' }],
  }),
  makeSentence({
    id: 168, language: lang, category: cat, target: 'Can I have a late checkout?', pronunciation: 'Can I have a late checkout?', meaning: '可以晚一點退房嗎？', usage: '想延後退房時間',
    keywords: ['late checkout', 'checkout'],
    words: [{ word: 'Can I have', meaning: '我可以' }, { word: 'a late checkout', meaning: '晚一點退房' }],
    chunks: [{ text: 'Can I have', pronunciation: 'Can I have', chinese: '我可以' }, { text: 'a late checkout', pronunciation: 'a late checkout', chinese: '晚一點退房' }],
  }),
  makeSentence({
    id: 169, language: lang, category: cat, target: 'Can I leave my luggage here?', pronunciation: 'Can I leave my luggage here?', meaning: '可以寄放行李嗎？', usage: '入住前或退房後寄行李',
    keywords: ['luggage', 'leave my luggage'],
    words: [{ word: 'Can I leave', meaning: '我可以留下' }, { word: 'my luggage here', meaning: '行李在這裡' }],
    chunks: [{ text: 'Can I leave', pronunciation: 'Can I leave', chinese: '我可以留下' }, { text: 'my luggage here', pronunciation: 'my luggage here', chinese: '行李' }],
  }),
  makeSentence({
    id: 170, language: lang, category: cat, target: "I'd like to check out.", pronunciation: "I'd like to check out.", meaning: '我要退房', usage: '離開飯店辦理退房',
    keywords: ['check out', 'checkout'],
    words: [{ word: "I'd like to", meaning: '我想要' }, { word: 'check out', meaning: '退房' }],
    chunks: [{ text: "I'd like to", pronunciation: "I'd like to", chinese: '我想要' }, { text: 'check out', pronunciation: 'check out', chinese: '退房' }],
  }),
  makeSentence({
    id: 171, language: lang, category: cat, target: 'My room is not clean.', pronunciation: 'My room is not clean.', meaning: '我的房間沒有打掃乾淨', usage: '房間清潔有問題時',
    keywords: ['not clean', 'room not clean'],
    words: [{ word: 'My room', meaning: '我的房間' }, { word: 'is not clean', meaning: '沒有打掃乾淨' }],
    chunks: [{ text: 'My room', pronunciation: 'My room', chinese: '我的房間' }, { text: 'is not clean', pronunciation: 'is not clean', chinese: '沒有打掃乾淨' }],
  }),
  makeSentence({
    id: 172, language: lang, category: cat, target: 'The air conditioning is broken.', pronunciation: 'The air conditioning is broken.', meaning: '冷氣壞了', usage: '房間設備故障時',
    keywords: ['air conditioning', 'broken', 'ac'],
    words: [{ word: 'The air conditioning', meaning: '冷氣' }, { word: 'is broken', meaning: '壞了' }],
    chunks: [{ text: 'The air conditioning', pronunciation: 'The air conditioning', chinese: '冷氣' }, { text: 'is broken', pronunciation: 'is broken', chinese: '壞了' }],
  }),
  makeSentence({
    id: 173, language: lang, category: cat, target: "There's no hot water.", pronunciation: "There's no hot water.", meaning: '沒有熱水', usage: '洗澡沒熱水時向櫃檯反映',
    keywords: ['no hot water', 'hot water'],
    words: [{ word: "There's no", meaning: '沒有' }, { word: 'hot water', meaning: '熱水' }],
    chunks: [{ text: "There's no", pronunciation: "There's no", chinese: '沒有' }, { text: 'hot water', pronunciation: 'hot water', chinese: '熱水' }],
  }),
  makeSentence({
    id: 174, language: lang, category: cat, target: 'What is the Wi-Fi password?', pronunciation: 'What is the Wi-Fi password?', meaning: 'Wi-Fi 密碼是什麼？', usage: '入住後連網路',
    keywords: ['wi-fi', 'wifi', 'password'],
    words: [{ word: 'What is the', meaning: '什麼是' }, { word: 'Wi-Fi password', meaning: 'Wi-Fi 密碼' }],
    chunks: [{ text: 'What is the', pronunciation: 'What is the', chinese: '什麼是' }, { text: 'Wi-Fi password', pronunciation: 'Wi-Fi password', chinese: 'Wi-Fi 密碼' }],
  }),
  makeSentence({
    id: 175, language: lang, category: cat, target: 'Can I have an extra pillow?', pronunciation: 'Can I have an extra pillow?', meaning: '可以多一個枕頭嗎？', usage: '需要更多寢具時',
    keywords: ['extra pillow', 'pillow'],
    words: [{ word: 'Can I have', meaning: '我可以要' }, { word: 'an extra pillow', meaning: '多一個枕頭' }],
    chunks: [{ text: 'Can I have', pronunciation: 'Can I have', chinese: '我可以要' }, { text: 'an extra pillow', pronunciation: 'an extra pillow', chinese: '多一個枕頭' }],
  }),
  makeSentence({
    id: 176, language: lang, category: cat, target: 'Can I have extra towels?', pronunciation: 'Can I have extra towels?', meaning: '可以多幾條毛巾嗎？', usage: '毛巾不夠用時',
    keywords: ['extra towels', 'towels'],
    words: [{ word: 'Can I have', meaning: '我可以要' }, { word: 'extra towels', meaning: '多幾條毛巾' }],
    chunks: [{ text: 'Can I have', pronunciation: 'Can I have', chinese: '我可以要' }, { text: 'extra towels', pronunciation: 'extra towels', chinese: '多幾條毛巾' }],
  }),
  makeSentence({
    id: 177, language: lang, category: cat, target: 'Can I have a wake-up call at seven?', pronunciation: 'Can I have a wake-up call at seven?', meaning: '可以七點叫醒我嗎？', usage: '請飯店早上電話叫醒',
    keywords: ['wake-up call', 'wake up call', 'seven'],
    words: [{ word: 'Can I have a wake-up call', meaning: '可以叫醒我' }, { word: 'at seven', meaning: '七點' }],
    chunks: [{ text: 'Can I have a wake-up call', pronunciation: 'Can I have a wake-up call', chinese: '可以叫醒我' }, { text: 'at seven', pronunciation: 'at seven', chinese: '七點' }],
  }),
  makeSentence({
    id: 178, language: lang, category: cat, target: 'I lost my room key.', pronunciation: 'I lost my room key.', meaning: '我把房卡弄丟了', usage: '房卡遺失向櫃檯求助',
    keywords: ['room key', 'lost my key', 'lost key'],
    words: [{ word: 'I lost', meaning: '我弄丟了' }, { word: 'my room key', meaning: '我的房卡' }],
    chunks: [{ text: 'I lost', pronunciation: 'I lost', chinese: '我弄丟了' }, { text: 'my room key', pronunciation: 'my room key', chinese: '我的房卡' }],
  }),
  makeSentence({
    id: 179, language: lang, category: cat, target: 'Where is the elevator?', pronunciation: 'Where is the elevator?', meaning: '電梯在哪裡？', usage: '在大廳找電梯',
    keywords: ['elevator', 'where is elevator'],
    words: [{ word: 'Where is', meaning: '在哪裡' }, { word: 'the elevator', meaning: '電梯' }],
    chunks: [{ text: 'Where is', pronunciation: 'Where is', chinese: '在哪裡' }, { text: 'the elevator', pronunciation: 'the elevator', chinese: '電梯' }],
  }),
  makeSentence({
    id: 180, language: lang, category: cat, target: 'Is breakfast included?', pronunciation: 'Is breakfast included?', meaning: '有含早餐嗎？', usage: '確認訂房是否含早餐',
    keywords: ['breakfast included', 'breakfast'],
    words: [{ word: 'Is breakfast', meaning: '早餐' }, { word: 'included', meaning: '有含嗎' }],
    chunks: [{ text: 'Is breakfast', pronunciation: 'Is breakfast', chinese: '早餐' }, { text: 'included', pronunciation: 'included', chinese: '有含嗎' }],
  }),
  makeSentence({
    id: 181, language: lang, category: cat, target: 'Do you have a power adapter?', pronunciation: 'Do you have a power adapter?', meaning: '有轉接頭嗎？', usage: '台灣插頭不合時借用',
    keywords: ['power adapter', 'adapter'],
    words: [{ word: 'Do you have', meaning: '你有' }, { word: 'a power adapter', meaning: '轉接頭嗎' }],
    chunks: [{ text: 'Do you have', pronunciation: 'Do you have', chinese: '你有' }, { text: 'a power adapter', pronunciation: 'a power adapter', chinese: '轉接頭嗎' }],
  }),
  makeSentence({
    id: 182, language: lang, category: cat, target: 'What time is checkout?', pronunciation: 'What time is checkout?', meaning: '幾點退房？', usage: '確認退房時間',
    keywords: ['checkout', 'check out', 'what time'],
    words: [{ word: 'What time is', meaning: '幾點是' }, { word: 'checkout', meaning: '退房' }],
    chunks: [{ text: 'What time is', pronunciation: 'What time is', chinese: '幾點是' }, { text: 'checkout', pronunciation: 'checkout', chinese: '退房' }],
  }),
  makeSentence({
    id: 183, language: lang, category: cat, target: 'The Wi-Fi is not working.', pronunciation: 'The Wi-Fi is not working.', meaning: 'Wi-Fi 不能用', usage: '網路連不上時',
    keywords: ['wi-fi not working', 'wifi not working'],
    words: [{ word: 'The Wi-Fi', meaning: 'Wi-Fi' }, { word: 'is not working', meaning: '不能用' }],
    chunks: [{ text: 'The Wi-Fi', pronunciation: 'The Wi-Fi', chinese: 'Wi-Fi' }, { text: 'is not working', pronunciation: 'is not working', chinese: '不能用' }],
  }),
  makeSentence({
    id: 184, language: lang, category: cat, target: "I'd like to extend my stay.", pronunciation: "I'd like to extend my stay.", meaning: '我想多住幾天', usage: '想延長住宿時',
    keywords: ['extend my stay', 'extend stay'],
    words: [{ word: "I'd like to extend", meaning: '我想延長' }, { word: 'my stay', meaning: '我的住宿' }],
    chunks: [{ text: "I'd like to extend", pronunciation: "I'd like to extend", chinese: '我想延長' }, { text: 'my stay', pronunciation: 'my stay', chinese: '我的住宿' }],
  }),
]
