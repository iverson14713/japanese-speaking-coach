import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'en' as const
const cat = 'restaurant' as const

export const restaurantEn: Sentence[] = [
  makeSentence({
    id: 185, language: lang, category: cat, target: 'Table for two, please.', pronunciation: 'Table for two, please.', meaning: '兩位', usage: '進餐廳告訴店員人數',
    keywords: ['table for two', 'for two', 'two'],
    words: [{ word: 'Table for two', meaning: '兩位的桌子' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Table for two', pronunciation: 'Table for two', chinese: '兩位' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 186, language: lang, category: cat, target: 'I have a reservation.', pronunciation: 'I have a reservation.', meaning: '我有預約', usage: '有訂位時向接待說明',
    keywords: ['reservation', 'have a reservation'],
    words: [{ word: 'I have', meaning: '我有' }, { word: 'a reservation', meaning: '預約' }],
    chunks: [{ text: 'I have', pronunciation: 'I have', chinese: '我有' }, { text: 'a reservation', pronunciation: 'a reservation', chinese: '預約' }],
  }),
  makeSentence({
    id: 187, language: lang, category: cat, target: 'Do you have an English menu?', pronunciation: 'Do you have an English menu?', meaning: '有英文菜單嗎？', usage: '看不懂當地語言菜單時',
    keywords: ['english menu', 'menu'],
    words: [{ word: 'Do you have', meaning: '你有' }, { word: 'an English menu', meaning: '英文菜單' }],
    chunks: [{ text: 'Do you have', pronunciation: 'Do you have', chinese: '你有' }, { text: 'an English menu', pronunciation: 'an English menu', chinese: '英文菜單' }],
  }),
  makeSentence({
    id: 188, language: lang, category: cat, target: 'What do you recommend?', pronunciation: 'What do you recommend?', meaning: '有什麼推薦的？', usage: '不知道點什麼時問店員',
    keywords: ['recommend', 'what do you recommend'],
    words: [{ word: 'What do you', meaning: '你' }, { word: 'recommend', meaning: '推薦什麼' }],
    chunks: [{ text: 'What do you', pronunciation: 'What do you', chinese: '你' }, { text: 'recommend', pronunciation: 'recommend', chinese: '推薦什麼' }],
  }),
  makeSentence({
    id: 189, language: lang, category: cat, target: "I'll have this, please.", pronunciation: "I'll have this, please.", meaning: '我要這個', usage: '點菜時指著菜單或圖片',
    keywords: ['have this', 'please'],
    words: [{ word: "I'll have this", meaning: '我要這個' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: "I'll have this", pronunciation: "I'll have this", chinese: '我要這個' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 190, language: lang, category: cat, target: 'No spicy, please.', pronunciation: 'No spicy, please.', meaning: '不要辣', usage: '點餐時說明口味',
    keywords: ['no spicy', 'not spicy', 'spicy'],
    words: [{ word: 'No spicy', meaning: '不要辣' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'No spicy', pronunciation: 'No spicy', chinese: '不要辣' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 191, language: lang, category: cat, target: 'Not too spicy, please.', pronunciation: 'Not too spicy, please.', meaning: '不要太辣', usage: '可以接受微辣時',
    keywords: ['not too spicy', 'too spicy'],
    words: [{ word: 'Not too spicy', meaning: '不要太辣' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Not too spicy', pronunciation: 'Not too spicy', chinese: '不要太辣' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 192, language: lang, category: cat, target: "I'm allergic to peanuts.", pronunciation: "I'm allergic to peanuts.", meaning: '我對花生過敏', usage: '說明食物過敏，食材可替換',
    keywords: ['allergic', 'peanuts', 'allergy'],
    words: [{ word: "I'm allergic to", meaning: '我對…過敏' }, { word: 'peanuts', meaning: '花生' }],
    chunks: [{ text: "I'm allergic to", pronunciation: "I'm allergic to", chinese: '我對…過敏' }, { text: 'peanuts', pronunciation: 'peanuts', chinese: '花生' }],
  }),
  makeSentence({
    id: 193, language: lang, category: cat, target: "I'm allergic to shellfish.", pronunciation: "I'm allergic to shellfish.", meaning: '我對海鮮過敏', usage: '海鮮過敏時務必說明',
    keywords: ['allergic', 'shellfish', 'seafood'],
    words: [{ word: "I'm allergic to", meaning: '我對…過敏' }, { word: 'shellfish', meaning: '海鮮' }],
    chunks: [{ text: "I'm allergic to", pronunciation: "I'm allergic to", chinese: '我對…過敏' }, { text: 'shellfish', pronunciation: 'shellfish', chinese: '海鮮' }],
  }),
  makeSentence({
    id: 194, language: lang, category: cat, target: "I'm vegetarian.", pronunciation: "I'm vegetarian.", meaning: '我是素食者', usage: '點餐時說明飲食限制',
    keywords: ['vegetarian'],
    words: [{ word: "I'm", meaning: '我是' }, { word: 'vegetarian', meaning: '素食者' }],
    chunks: [{ text: "I'm", pronunciation: "I'm", chinese: '我是' }, { text: 'vegetarian', pronunciation: 'vegetarian', chinese: '素食者' }],
  }),
  makeSentence({
    id: 195, language: lang, category: cat, target: 'Water, please.', pronunciation: 'Water, please.', meaning: '請給我水', usage: '點水或要水喝',
    keywords: ['water', 'water please'],
    words: [{ word: 'Water', meaning: '水' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Water', pronunciation: 'Water', chinese: '水' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 196, language: lang, category: cat, target: 'Could I get a refill?', pronunciation: 'Could I get a refill?', meaning: '可以再加嗎？', usage: '飲料喝完想續杯',
    keywords: ['refill', 'get a refill'],
    words: [{ word: 'Could I get', meaning: '我可以要' }, { word: 'a refill', meaning: '再加一杯' }],
    chunks: [{ text: 'Could I get', pronunciation: 'Could I get', chinese: '我可以要' }, { text: 'a refill', pronunciation: 'a refill', chinese: '再加一杯' }],
  }),
  makeSentence({
    id: 197, language: lang, category: cat, target: 'Check, please.', pronunciation: 'Check, please.', meaning: '可以結帳嗎？', usage: '用餐完畢請店員結帳（美式）',
    keywords: ['check', 'check please'],
    words: [{ word: 'Check', meaning: '帳單' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Check', pronunciation: 'Check', chinese: '帳單' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 198, language: lang, category: cat, target: 'Can we split the bill?', pronunciation: 'Can we split the bill?', meaning: '可以分開付嗎？', usage: '跟朋友各自付帳',
    keywords: ['split the bill', 'split bill'],
    words: [{ word: 'Can we split', meaning: '我們可以分' }, { word: 'the bill', meaning: '帳單' }],
    chunks: [{ text: 'Can we split', pronunciation: 'Can we split', chinese: '我們可以分' }, { text: 'the bill', pronunciation: 'the bill', chinese: '帳單' }],
  }),
  makeSentence({
    id: 199, language: lang, category: cat, target: 'Can I get this to go?', pronunciation: 'Can I get this to go?', meaning: '可以外帶嗎？', usage: '想把餐點帶走',
    keywords: ['to go', 'takeout', 'take away'],
    words: [{ word: 'Can I get this', meaning: '我可以把這個' }, { word: 'to go', meaning: '外帶' }],
    chunks: [{ text: 'Can I get this', pronunciation: 'Can I get this', chinese: '我可以把這個' }, { text: 'to go', pronunciation: 'to go', chinese: '外帶' }],
  }),
  makeSentence({
    id: 200, language: lang, category: cat, target: 'Is service included?', pronunciation: 'Is service included?', meaning: '有含服務費嗎？', usage: '確認帳單是否含服務費',
    keywords: ['service included', 'service charge'],
    words: [{ word: 'Is service', meaning: '服務費' }, { word: 'included', meaning: '有含嗎' }],
    chunks: [{ text: 'Is service', pronunciation: 'Is service', chinese: '服務費' }, { text: 'included', pronunciation: 'included', chinese: '有含嗎' }],
  }),
  makeSentence({
    id: 201, language: lang, category: cat, target: 'Same as hers, please.', pronunciation: 'Same as hers, please.', meaning: '跟她一樣', usage: '跟同伴點相同餐點',
    keywords: ['same as', 'same as hers'],
    words: [{ word: 'Same as hers', meaning: '跟她一樣' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Same as hers', pronunciation: 'Same as hers', chinese: '跟她一樣' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 202, language: lang, category: cat, target: 'No onions, please.', pronunciation: 'No onions, please.', meaning: '不要洋蔥', usage: '點餐時去掉配料',
    keywords: ['no onions', 'onions'],
    words: [{ word: 'No onions', meaning: '不要洋蔥' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'No onions', pronunciation: 'No onions', chinese: '不要洋蔥' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 203, language: lang, category: cat, target: 'Less salt, please.', pronunciation: 'Less salt, please.', meaning: '少鹽一點', usage: '調整口味',
    keywords: ['less salt', 'salt'],
    words: [{ word: 'Less salt', meaning: '少鹽' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Less salt', pronunciation: 'Less salt', chinese: '少鹽' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 204, language: lang, category: cat, target: 'Is this gluten-free?', pronunciation: 'Is this gluten-free?', meaning: '這是無麩質的嗎？', usage: '麩質過敏或飲食限制時',
    keywords: ['gluten-free', 'gluten free'],
    words: [{ word: 'Is this', meaning: '這是' }, { word: 'gluten-free', meaning: '無麩質的嗎' }],
    chunks: [{ text: 'Is this', pronunciation: 'Is this', chinese: '這是' }, { text: 'gluten-free', pronunciation: 'gluten-free', chinese: '無麩質的嗎' }],
  }),
  makeSentence({
    id: 205, language: lang, category: cat, target: "We're still waiting for our order.", pronunciation: "We're still waiting for our order.", meaning: '我們的餐還沒來', usage: '等太久時禮貌催促',
    keywords: ['waiting for order', 'still waiting'],
    words: [{ word: "We're still waiting", meaning: '我們還在等' }, { word: 'for our order', meaning: '我們的餐' }],
    chunks: [{ text: "We're still waiting", pronunciation: "We're still waiting", chinese: '我們還在等' }, { text: 'for our order', pronunciation: 'for our order', chinese: '我們的餐' }],
  }),
  makeSentence({
    id: 206, language: lang, category: cat, target: 'This is delicious.', pronunciation: 'This is delicious.', meaning: '很好吃', usage: '稱讚料理，跟店員聊天',
    keywords: ['delicious', 'this is delicious'],
    words: [{ word: 'This is', meaning: '這很' }, { word: 'delicious', meaning: '好吃' }],
    chunks: [{ text: 'This is', pronunciation: 'This is', chinese: '這很' }, { text: 'delicious', pronunciation: 'delicious', chinese: '好吃' }],
  }),
  makeSentence({
    id: 207, language: lang, category: cat, target: 'Can we sit outside?', pronunciation: 'Can we sit outside?', meaning: '可以坐外面嗎？', usage: '想坐戶外座位時',
    keywords: ['sit outside', 'outside'],
    words: [{ word: 'Can we sit', meaning: '我們可以坐' }, { word: 'outside', meaning: '外面' }],
    chunks: [{ text: 'Can we sit', pronunciation: 'Can we sit', chinese: '我們可以坐' }, { text: 'outside', pronunciation: 'outside', chinese: '外面' }],
  }),
  makeSentence({
    id: 208, language: lang, category: cat, target: 'How long is the wait?', pronunciation: 'How long is the wait?', meaning: '要等多久？', usage: '餐廳需要排隊時',
    keywords: ['how long', 'wait', 'the wait'],
    words: [{ word: 'How long is', meaning: '多久' }, { word: 'the wait', meaning: '等待' }],
    chunks: [{ text: 'How long is', pronunciation: 'How long is', chinese: '多久' }, { text: 'the wait', pronunciation: 'the wait', chinese: '等待' }],
  }),
  makeSentence({
    id: 209, language: lang, category: cat, target: 'Do you accept credit cards?', pronunciation: 'Do you accept credit cards?', meaning: '可以刷卡嗎？', usage: '結帳前確認付款方式',
    keywords: ['credit cards', 'accept credit', 'card'],
    words: [{ word: 'Do you accept', meaning: '你接受' }, { word: 'credit cards', meaning: '信用卡嗎' }],
    chunks: [{ text: 'Do you accept', pronunciation: 'Do you accept', chinese: '你接受' }, { text: 'credit cards', pronunciation: 'credit cards', chinese: '信用卡嗎' }],
  }),
  makeSentence({
    id: 210, language: lang, category: cat, target: 'Could I see the menu?', pronunciation: 'Could I see the menu?', meaning: '可以看一下菜單嗎？', usage: '入座後要菜單',
    keywords: ['see the menu', 'menu'],
    words: [{ word: 'Could I see', meaning: '我可以看' }, { word: 'the menu', meaning: '菜單' }],
    chunks: [{ text: 'Could I see', pronunciation: 'Could I see', chinese: '我可以看' }, { text: 'the menu', pronunciation: 'the menu', chinese: '菜單' }],
  }),
  makeSentence({
    id: 211, language: lang, category: cat, target: 'Is this very spicy?', pronunciation: 'Is this very spicy?', meaning: '這個很辣嗎？', usage: '點菜前確認辣度',
    keywords: ['very spicy', 'spicy'],
    words: [{ word: 'Is this', meaning: '這個' }, { word: 'very spicy', meaning: '很辣嗎' }],
    chunks: [{ text: 'Is this', pronunciation: 'Is this', chinese: '這個' }, { text: 'very spicy', pronunciation: 'very spicy', chinese: '很辣嗎' }],
  }),
]
