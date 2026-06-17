import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'en' as const
const cat = 'emergency' as const

export const emergencyEn: Sentence[] = [
  makeSentence({
    id: 251, language: lang, category: cat, target: 'Please help me.', pronunciation: 'Please help me.', meaning: '請幫幫我', usage: '遇到困難或危險時求助',
    keywords: ['help me', 'help'],
    words: [{ word: 'Please', meaning: '請' }, { word: 'help me', meaning: '幫幫我' }],
    chunks: [{ text: 'Please', pronunciation: 'Please', chinese: '請' }, { text: 'help me', pronunciation: 'help me', chinese: '幫幫我' }],
  }),
  makeSentence({
    id: 252, language: lang, category: cat, target: "I'm lost.", pronunciation: "I'm lost.", meaning: '我迷路了', usage: '找不到路時向路人求助',
    keywords: ['lost', "i'm lost"],
    words: [{ word: "I'm", meaning: '我' }, { word: 'lost', meaning: '迷路了' }],
    chunks: [{ text: "I'm", pronunciation: "I'm", chinese: '我' }, { text: 'lost', pronunciation: 'lost', chinese: '迷路了' }],
  }),
  makeSentence({
    id: 253, language: lang, category: cat, target: "I don't feel well.", pronunciation: "I don't feel well.", meaning: '我不舒服', usage: '身體不適時說明狀況',
    keywords: ["don't feel well", 'feel well', 'not well'],
    words: [{ word: "I don't feel", meaning: '我覺得' }, { word: 'well', meaning: '不舒服' }],
    chunks: [{ text: "I don't feel", pronunciation: "I don't feel", chinese: '我覺得' }, { text: 'well', pronunciation: 'well', chinese: '不舒服' }],
  }),
  makeSentence({
    id: 254, language: lang, category: cat, target: 'Please call an ambulance.', pronunciation: 'Please call an ambulance.', meaning: '請叫救護車', usage: '嚴重受傷或急病時',
    keywords: ['ambulance', 'call an ambulance'],
    words: [{ word: 'Please call', meaning: '請叫' }, { word: 'an ambulance', meaning: '救護車' }],
    chunks: [{ text: 'Please call', pronunciation: 'Please call', chinese: '請叫' }, { text: 'an ambulance', pronunciation: 'an ambulance', chinese: '救護車' }],
  }),
  makeSentence({
    id: 255, language: lang, category: cat, target: 'Please call the police.', pronunciation: 'Please call the police.', meaning: '請叫警察', usage: '遭遇竊盜或危險時',
    keywords: ['police', 'call the police'],
    words: [{ word: 'Please call', meaning: '請叫' }, { word: 'the police', meaning: '警察' }],
    chunks: [{ text: 'Please call', pronunciation: 'Please call', chinese: '請叫' }, { text: 'the police', pronunciation: 'the police', chinese: '警察' }],
  }),
  makeSentence({
    id: 256, language: lang, category: cat, target: 'I lost my wallet.', pronunciation: 'I lost my wallet.', meaning: '我遺失了錢包', usage: '錢包遺失向警察或櫃檯求助',
    keywords: ['lost my wallet', 'wallet', 'lost'],
    words: [{ word: 'I lost', meaning: '我遺失了' }, { word: 'my wallet', meaning: '我的錢包' }],
    chunks: [{ text: 'I lost', pronunciation: 'I lost', chinese: '我遺失了' }, { text: 'my wallet', pronunciation: 'my wallet', chinese: '我的錢包' }],
  }),
  makeSentence({
    id: 257, language: lang, category: cat, target: 'I lost my passport.', pronunciation: 'I lost my passport.', meaning: '我遺失了護照', usage: '護照遺失，緊急求助',
    keywords: ['lost my passport', 'passport', 'lost passport'],
    words: [{ word: 'I lost', meaning: '我遺失了' }, { word: 'my passport', meaning: '我的護照' }],
    chunks: [{ text: 'I lost', pronunciation: 'I lost', chinese: '我遺失了' }, { text: 'my passport', pronunciation: 'my passport', chinese: '我的護照' }],
  }),
  makeSentence({
    id: 258, language: lang, category: cat, target: 'I lost my phone.', pronunciation: 'I lost my phone.', meaning: '我手機弄丟了', usage: '手機遺失時說明',
    keywords: ['lost my phone', 'phone', 'lost phone'],
    words: [{ word: 'I lost', meaning: '我弄丟了' }, { word: 'my phone', meaning: '我的手機' }],
    chunks: [{ text: 'I lost', pronunciation: 'I lost', chinese: '我弄丟了' }, { text: 'my phone', pronunciation: 'my phone', chinese: '我的手機' }],
  }),
  makeSentence({
    id: 259, language: lang, category: cat, target: 'My phone is dead.', pronunciation: 'My phone is dead.', meaning: '我手機沒電了', usage: '需要充電或借電話時',
    keywords: ['phone is dead', 'dead', 'no battery'],
    words: [{ word: 'My phone', meaning: '我的手機' }, { word: 'is dead', meaning: '沒電了' }],
    chunks: [{ text: 'My phone', pronunciation: 'My phone', chinese: '我的手機' }, { text: 'is dead', pronunciation: 'is dead', chinese: '沒電了' }],
  }),
  makeSentence({
    id: 260, language: lang, category: cat, target: 'I need a doctor.', pronunciation: 'I need a doctor.', meaning: '我需要看醫生', usage: '身體不舒服需要醫療',
    keywords: ['need a doctor', 'doctor'],
    words: [{ word: 'I need', meaning: '我需要' }, { word: 'a doctor', meaning: '醫生' }],
    chunks: [{ text: 'I need', pronunciation: 'I need', chinese: '我需要' }, { text: 'a doctor', pronunciation: 'a doctor', chinese: '醫生' }],
  }),
  makeSentence({
    id: 261, language: lang, category: cat, target: "I'm having an allergic reaction.", pronunciation: "I'm having an allergic reaction.", meaning: '我過敏了', usage: '食物或藥物過敏緊急狀況',
    keywords: ['allergic reaction', 'allergic'],
    words: [{ word: "I'm having", meaning: '我正在' }, { word: 'an allergic reaction', meaning: '過敏反應' }],
    chunks: [{ text: "I'm having", pronunciation: "I'm having", chinese: '我正在' }, { text: 'an allergic reaction', pronunciation: 'an allergic reaction', chinese: '過敏反應' }],
  }),
  makeSentence({
    id: 262, language: lang, category: cat, target: 'Where is the nearest hospital?', pronunciation: 'Where is the nearest hospital?', meaning: '最近的醫院在哪？', usage: '需要就醫時找醫院',
    keywords: ['hospital', 'nearest hospital'],
    words: [{ word: 'Where is the nearest', meaning: '最近的在哪' }, { word: 'hospital', meaning: '醫院' }],
    chunks: [{ text: 'Where is the nearest', pronunciation: 'Where is the nearest', chinese: '最近的在哪' }, { text: 'hospital', pronunciation: 'hospital', chinese: '醫院' }],
  }),
  makeSentence({
    id: 263, language: lang, category: cat, target: 'Please contact my hotel.', pronunciation: 'Please contact my hotel.', meaning: '請聯絡我的飯店', usage: '緊急時請人幫忙打給飯店',
    keywords: ['contact my hotel', 'hotel'],
    words: [{ word: 'Please contact', meaning: '請聯絡' }, { word: 'my hotel', meaning: '我的飯店' }],
    chunks: [{ text: 'Please contact', pronunciation: 'Please contact', chinese: '請聯絡' }, { text: 'my hotel', pronunciation: 'my hotel', chinese: '我的飯店' }],
  }),
  makeSentence({
    id: 264, language: lang, category: cat, target: 'Someone stole my bag.', pronunciation: 'Someone stole my bag.', meaning: '有人偷了我的包包', usage: '遭遇竊盜向警察報案',
    keywords: ['stole my bag', 'stole', 'stolen'],
    words: [{ word: 'Someone stole', meaning: '有人偷了' }, { word: 'my bag', meaning: '我的包包' }],
    chunks: [{ text: 'Someone stole', pronunciation: 'Someone stole', chinese: '有人偷了' }, { text: 'my bag', pronunciation: 'my bag', chinese: '我的包包' }],
  }),
  makeSentence({
    id: 265, language: lang, category: cat, target: 'Fire! Call 911!', pronunciation: 'Fire! Call 911!', meaning: '失火了！快叫 911！', usage: '火災緊急狀況（美國），其他國家號碼不同',
    keywords: ['fire', '911', 'call 911'],
    words: [{ word: 'Fire', meaning: '失火' }, { word: 'Call 911', meaning: '叫 911' }],
    chunks: [{ text: 'Fire', pronunciation: 'Fire', chinese: '失火' }, { text: 'Call 911', pronunciation: 'Call 911', chinese: '叫 911' }],
  }),
  makeSentence({
    id: 266, language: lang, category: cat, target: 'Can I use your phone?', pronunciation: 'Can I use your phone?', meaning: '可以借你的手機嗎？', usage: '自己手機沒電或遺失時',
    keywords: ['use your phone', 'borrow phone'],
    words: [{ word: 'Can I use', meaning: '我可以用' }, { word: 'your phone', meaning: '你的手機嗎' }],
    chunks: [{ text: 'Can I use', pronunciation: 'Can I use', chinese: '我可以用' }, { text: 'your phone', pronunciation: 'your phone', chinese: '你的手機嗎' }],
  }),
  makeSentence({
    id: 267, language: lang, category: cat, target: 'What is the emergency number?', pronunciation: 'What is the emergency number?', meaning: '緊急電話是多少？', usage: '不知道當地急救電話時',
    keywords: ['emergency number', 'emergency'],
    words: [{ word: 'What is the', meaning: '什麼是' }, { word: 'emergency number', meaning: '緊急電話' }],
    chunks: [{ text: 'What is the', pronunciation: 'What is the', chinese: '什麼是' }, { text: 'emergency number', pronunciation: 'emergency number', chinese: '緊急電話' }],
  }),
]
