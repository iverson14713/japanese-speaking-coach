import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'en' as const
const cat = 'shopping' as const

export const shoppingEn: Sentence[] = [
  makeSentence({
    id: 229, language: lang, category: cat, target: 'How much is this?', pronunciation: 'How much is this?', meaning: '這個多少錢？', usage: '在商店詢問價格',
    keywords: ['how much', 'much is this'],
    words: [{ word: 'How much is', meaning: '多少錢' }, { word: 'this', meaning: '這個' }],
    chunks: [{ text: 'How much is', pronunciation: 'How much is', chinese: '多少錢' }, { text: 'this', pronunciation: 'this', chinese: '這個' }],
  }),
  makeSentence({
    id: 230, language: lang, category: cat, target: "That's a bit expensive.", pronunciation: "That's a bit expensive.", meaning: '有點貴', usage: '議價或表示猶豫時',
    keywords: ['expensive', 'bit expensive'],
    words: [{ word: "That's a bit", meaning: '那有點' }, { word: 'expensive', meaning: '貴' }],
    chunks: [{ text: "That's a bit", pronunciation: "That's a bit", chinese: '那有點' }, { text: 'expensive', pronunciation: 'expensive', chinese: '貴' }],
  }),
  makeSentence({
    id: 231, language: lang, category: cat, target: 'Is there a discount?', pronunciation: 'Is there a discount?', meaning: '有折扣嗎？', usage: '詢問是否有優惠',
    keywords: ['discount'],
    words: [{ word: 'Is there', meaning: '有' }, { word: 'a discount', meaning: '折扣嗎' }],
    chunks: [{ text: 'Is there', pronunciation: 'Is there', chinese: '有' }, { text: 'a discount', pronunciation: 'a discount', chinese: '折扣嗎' }],
  }),
  makeSentence({
    id: 232, language: lang, category: cat, target: 'Do you have a smaller size?', pronunciation: 'Do you have a smaller size?', meaning: '有小一號嗎？', usage: '衣服或鞋子尺寸不合',
    keywords: ['smaller size', 'size'],
    words: [{ word: 'Do you have', meaning: '你有' }, { word: 'a smaller size', meaning: '小一號嗎' }],
    chunks: [{ text: 'Do you have', pronunciation: 'Do you have', chinese: '你有' }, { text: 'a smaller size', pronunciation: 'a smaller size', chinese: '小一號嗎' }],
  }),
  makeSentence({
    id: 233, language: lang, category: cat, target: 'Do you have a larger size?', pronunciation: 'Do you have a larger size?', meaning: '有大一號嗎？', usage: '需要更大尺寸時',
    keywords: ['larger size', 'bigger size', 'size'],
    words: [{ word: 'Do you have', meaning: '你有' }, { word: 'a larger size', meaning: '大一號嗎' }],
    chunks: [{ text: 'Do you have', pronunciation: 'Do you have', chinese: '你有' }, { text: 'a larger size', pronunciation: 'a larger size', chinese: '大一號嗎' }],
  }),
  makeSentence({
    id: 234, language: lang, category: cat, target: 'Do you have this in another color?', pronunciation: 'Do you have this in another color?', meaning: '有其他顏色嗎？', usage: '想換顏色時',
    keywords: ['another color', 'color'],
    words: [{ word: 'Do you have this', meaning: '你有這個' }, { word: 'in another color', meaning: '其他顏色嗎' }],
    chunks: [{ text: 'Do you have this', pronunciation: 'Do you have this', chinese: '你有這個' }, { text: 'in another color', pronunciation: 'in another color', chinese: '其他顏色嗎' }],
  }),
  makeSentence({
    id: 235, language: lang, category: cat, target: 'Can I try this on?', pronunciation: 'Can I try this on?', meaning: '可以試穿嗎？', usage: '買衣服鞋子前試穿',
    keywords: ['try this on', 'try on'],
    words: [{ word: 'Can I try', meaning: '我可以試' }, { word: 'this on', meaning: '穿這個' }],
    chunks: [{ text: 'Can I try', pronunciation: 'Can I try', chinese: '我可以試' }, { text: 'this on', pronunciation: 'this on', chinese: '穿這個' }],
  }),
  makeSentence({
    id: 236, language: lang, category: cat, target: 'Where is the fitting room?', pronunciation: 'Where is the fitting room?', meaning: '試衣間在哪裡？', usage: '試穿前找試衣間',
    keywords: ['fitting room'],
    words: [{ word: 'Where is', meaning: '在哪裡' }, { word: 'the fitting room', meaning: '試衣間' }],
    chunks: [{ text: 'Where is', pronunciation: 'Where is', chinese: '在哪裡' }, { text: 'the fitting room', pronunciation: 'the fitting room', chinese: '試衣間' }],
  }),
  makeSentence({
    id: 237, language: lang, category: cat, target: 'Can I get a tax refund?', pronunciation: 'Can I get a tax refund?', meaning: '可以退稅嗎？', usage: '購物時確認退稅資格',
    keywords: ['tax refund', 'refund'],
    words: [{ word: 'Can I get', meaning: '我可以' }, { word: 'a tax refund', meaning: '退稅' }],
    chunks: [{ text: 'Can I get', pronunciation: 'Can I get', chinese: '我可以' }, { text: 'a tax refund', pronunciation: 'a tax refund', chinese: '退稅' }],
  }),
  makeSentence({
    id: 238, language: lang, category: cat, target: 'Can I pay by card?', pronunciation: 'Can I pay by card?', meaning: '可以刷卡嗎？', usage: '結帳前確認付款方式',
    keywords: ['pay by card', 'card'],
    words: [{ word: 'Can I pay', meaning: '我可以付' }, { word: 'by card', meaning: '用卡片' }],
    chunks: [{ text: 'Can I pay', pronunciation: 'Can I pay', chinese: '我可以付' }, { text: 'by card', pronunciation: 'by card', chinese: '用卡片' }],
  }),
  makeSentence({
    id: 239, language: lang, category: cat, target: 'Can you gift-wrap this?', pronunciation: 'Can you gift-wrap this?', meaning: '可以幫我包裝嗎？', usage: '買禮物請店員包裝',
    keywords: ['gift wrap', 'gift-wrap', 'wrapping'],
    words: [{ word: 'Can you gift-wrap', meaning: '你可以包裝' }, { word: 'this', meaning: '這個' }],
    chunks: [{ text: 'Can you gift-wrap', pronunciation: 'Can you gift-wrap', chinese: '你可以包裝' }, { text: 'this', pronunciation: 'this', chinese: '這個' }],
  }),
  makeSentence({
    id: 240, language: lang, category: cat, target: 'What is your return policy?', pronunciation: 'What is your return policy?', meaning: '退貨規定是什麼？', usage: '購買前確認能否退貨',
    keywords: ['return policy', 'return'],
    words: [{ word: 'What is your', meaning: '你們的' }, { word: 'return policy', meaning: '退貨規定' }],
    chunks: [{ text: 'What is your', pronunciation: 'What is your', chinese: '你們的' }, { text: 'return policy', pronunciation: 'return policy', chinese: '退貨規定' }],
  }),
  makeSentence({
    id: 241, language: lang, category: cat, target: "I'll take it.", pronunciation: "I'll take it.", meaning: '我要買這個', usage: '決定購買時',
    keywords: ['take it', "i'll take"],
    words: [{ word: "I'll take", meaning: '我要買' }, { word: 'it', meaning: '這個' }],
    chunks: [{ text: "I'll take", pronunciation: "I'll take", chinese: '我要買' }, { text: 'it', pronunciation: 'it', chinese: '這個' }],
  }),
  makeSentence({
    id: 242, language: lang, category: cat, target: "I'm just looking.", pronunciation: "I'm just looking.", meaning: '我只是看看', usage: '店員招呼時表示隨便逛逛',
    keywords: ['just looking', 'looking'],
    words: [{ word: "I'm just", meaning: '我只是' }, { word: 'looking', meaning: '看看' }],
    chunks: [{ text: "I'm just", pronunciation: "I'm just", chinese: '我只是' }, { text: 'looking', pronunciation: 'looking', chinese: '看看' }],
  }),
  makeSentence({
    id: 243, language: lang, category: cat, target: 'Do you ship to Taiwan?', pronunciation: 'Do you ship to Taiwan?', meaning: '可以寄到台灣嗎？', usage: '買太多想直寄回家',
    keywords: ['ship to taiwan', 'ship'],
    words: [{ word: 'Do you ship', meaning: '你可以寄' }, { word: 'to Taiwan', meaning: '到台灣嗎' }],
    chunks: [{ text: 'Do you ship', pronunciation: 'Do you ship', chinese: '你可以寄' }, { text: 'to Taiwan', pronunciation: 'to Taiwan', chinese: '到台灣嗎' }],
  }),
  makeSentence({
    id: 244, language: lang, category: cat, target: 'Cash only?', pronunciation: 'Cash only?', meaning: '只能付現金嗎？', usage: '確認是否只收現金',
    keywords: ['cash only', 'cash'],
    words: [{ word: 'Cash', meaning: '現金' }, { word: 'only', meaning: '只能' }],
    chunks: [{ text: 'Cash', pronunciation: 'Cash', chinese: '現金' }, { text: 'only', pronunciation: 'only', chinese: '只能' }],
  }),
  makeSentence({
    id: 245, language: lang, category: cat, target: 'Receipt, please.', pronunciation: 'Receipt, please.', meaning: '請給我收據', usage: '結帳後要收據或退稅用',
    keywords: ['receipt'],
    words: [{ word: 'Receipt', meaning: '收據' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Receipt', pronunciation: 'Receipt', chinese: '收據' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 246, language: lang, category: cat, target: 'Is this on sale?', pronunciation: 'Is this on sale?', meaning: '這個有特價嗎？', usage: '確認商品是否在打折',
    keywords: ['on sale', 'sale'],
    words: [{ word: 'Is this', meaning: '這個' }, { word: 'on sale', meaning: '特價嗎' }],
    chunks: [{ text: 'Is this', pronunciation: 'Is this', chinese: '這個' }, { text: 'on sale', pronunciation: 'on sale', chinese: '特價嗎' }],
  }),
  makeSentence({
    id: 247, language: lang, category: cat, target: 'Is this the last one?', pronunciation: 'Is this the last one?', meaning: '這是最後一個嗎？', usage: '搶限量商品時確認',
    keywords: ['last one', 'the last one'],
    words: [{ word: 'Is this', meaning: '這是' }, { word: 'the last one', meaning: '最後一個嗎' }],
    chunks: [{ text: 'Is this', pronunciation: 'Is this', chinese: '這是' }, { text: 'the last one', pronunciation: 'the last one', chinese: '最後一個嗎' }],
  }),
  makeSentence({
    id: 248, language: lang, category: cat, target: 'Is this duty-free?', pronunciation: 'Is this duty-free?', meaning: '這是免稅的嗎？', usage: '在免稅店或機場購物',
    keywords: ['duty-free', 'duty free'],
    words: [{ word: 'Is this', meaning: '這是' }, { word: 'duty-free', meaning: '免稅的嗎' }],
    chunks: [{ text: 'Is this', pronunciation: 'Is this', chinese: '這是' }, { text: 'duty-free', pronunciation: 'duty-free', chinese: '免稅的嗎' }],
  }),
  makeSentence({
    id: 249, language: lang, category: cat, target: 'Can I have a bag, please?', pronunciation: 'Can I have a bag, please?', meaning: '可以給我一個袋子嗎？', usage: '需要購物袋時',
    keywords: ['bag', 'have a bag'],
    words: [{ word: 'Can I have a bag', meaning: '可以給我袋子' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Can I have a bag', pronunciation: 'Can I have a bag', chinese: '可以給我袋子' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 250, language: lang, category: cat, target: 'It fits perfectly.', pronunciation: 'It fits perfectly.', meaning: '很合穿', usage: '試穿滿意，決定購買',
    keywords: ['fits perfectly', 'fits', 'perfectly'],
    words: [{ word: 'It fits', meaning: '很合' }, { word: 'perfectly', meaning: '完美' }],
    chunks: [{ text: 'It fits', pronunciation: 'It fits', chinese: '很合' }, { text: 'perfectly', pronunciation: 'perfectly', chinese: '完美' }],
  }),
]
