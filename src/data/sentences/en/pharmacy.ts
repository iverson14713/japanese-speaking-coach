import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'en' as const
const cat = 'pharmacy' as const

export const pharmacyEn: Sentence[] = [
  makeSentence({ id: 119, language: lang, category: cat, target: 'Where is the nearest pharmacy?', pronunciation: 'Where is the nearest pharmacy?', meaning: '最近的藥局在哪？', usage: '需要買藥或日用品時問路', keywords: ['pharmacy', 'nearest pharmacy'] }),
  makeSentence({ id: 120, language: lang, category: cat, target: 'Do you have anything for a headache?', pronunciation: 'Do you have anything for a headache?', meaning: '有頭痛的藥嗎？', usage: '在藥局描述簡單症狀', keywords: ['headache', 'for a headache'] }),
  makeSentence({ id: 121, language: lang, category: cat, target: 'I need something for a cold.', pronunciation: 'I need something for a cold.', meaning: '我需要感冒藥', usage: '說明需要感冒相關藥品', keywords: ['cold', 'for a cold'] }),
  makeSentence({ id: 122, language: lang, category: cat, target: 'Do you have bandages?', pronunciation: 'Do you have bandages?', meaning: '有OK繃嗎？', usage: '買創可貼或繃帶', keywords: ['bandages', 'bandage'] }),
  makeSentence({ id: 123, language: lang, category: cat, target: 'I have a sore throat.', pronunciation: 'I have a sore throat.', meaning: '我喉嚨痛', usage: '向店員描述症狀以便推薦藥品', keywords: ['sore throat', 'throat'] }),
  makeSentence({ id: 124, language: lang, category: cat, target: 'Is this for adults or children?', pronunciation: 'Is this for adults or children?', meaning: '這是給大人還是小孩用的？', usage: '確認藥品適用對象', keywords: ['adults', 'children', 'for adults'] }),
  makeSentence({ id: 125, language: lang, category: cat, target: 'How many times a day should I take this?', pronunciation: 'How many times a day should I take this?', meaning: '這個一天要吃幾次？', usage: '確認用藥方式', keywords: ['how many times', 'take this', 'a day'] }),
  makeSentence({ id: 126, language: lang, category: cat, target: 'Do I need a prescription for this?', pronunciation: 'Do I need a prescription for this?', meaning: '這個需要處方籤嗎？', usage: '確認是否為處方藥', keywords: ['prescription', 'need a prescription'] }),
  makeSentence({ id: 127, language: lang, category: cat, target: 'Where is the sunscreen?', pronunciation: 'Where is the sunscreen?', meaning: '防曬在哪裡？', usage: '在藥妝店找防曬用品', keywords: ['sunscreen', 'where is'] }),
  makeSentence({ id: 128, language: lang, category: cat, target: 'Do you have face masks?', pronunciation: 'Do you have face masks?', meaning: '有口罩嗎？', usage: '購買口罩或日用品', keywords: ['face masks', 'face mask', 'masks'] }),
  makeSentence({ id: 129, language: lang, category: cat, target: 'Can I try this on?', pronunciation: 'Can I try this on?', meaning: '可以試用嗎？', usage: '試用化妝品或保養品', keywords: ['try this on', 'try on'] }),
  makeSentence({ id: 130, language: lang, category: cat, target: 'Is this good for sensitive skin?', pronunciation: 'Is this good for sensitive skin?', meaning: '這適合敏感肌嗎？', usage: '購買保養品前確認', keywords: ['sensitive skin', 'sensitive'] }),
  makeSentence({ id: 131, language: lang, category: cat, target: 'Do you have a smaller size?', pronunciation: 'Do you have a smaller size?', meaning: '有小一點的包裝嗎？', usage: '旅行想買小容量試用品', keywords: ['smaller size', 'small size'] }),
  makeSentence({ id: 132, language: lang, category: cat, target: 'Is this tax-free?', pronunciation: 'Is this tax-free?', meaning: '這可以免稅嗎？', usage: '確認商品是否符合免稅', keywords: ['tax-free', 'tax free'] }),
  makeSentence({ id: 133, language: lang, category: cat, target: 'Where is the duty-free shop?', pronunciation: 'Where is the duty-free shop?', meaning: '免稅店在哪裡？', usage: '在機場或市區找免稅店', keywords: ['duty-free', 'duty free shop'] }),
  makeSentence({ id: 134, language: lang, category: cat, target: 'I need a tax refund form.', pronunciation: 'I need a tax refund form.', meaning: '我需要退稅單', usage: '辦理免稅或退稅手續', keywords: ['tax refund', 'refund form'] }),
  makeSentence({ id: 135, language: lang, category: cat, target: 'Can I pay with a credit card?', pronunciation: 'Can I pay with a credit card?', meaning: '可以刷卡嗎？', usage: '在藥妝店結帳時', keywords: ['credit card', 'pay with'] }),
  makeSentence({ id: 136, language: lang, category: cat, target: 'Do you have a bag I can put this in?', pronunciation: 'Do you have a bag I can put this in?', meaning: '有袋子可以裝嗎？', usage: '購買後需要袋子', keywords: ['bag', 'put this in'] }),
  makeSentence({ id: 137, language: lang, category: cat, target: 'Can you recommend something popular?', pronunciation: 'Can you recommend something popular?', meaning: '可以推薦熱門商品嗎？', usage: '請店員推薦伴手禮或必買品', keywords: ['recommend', 'popular', 'something popular'] }),
  makeSentence({ id: 138, language: lang, category: cat, target: 'Is this made in Japan?', pronunciation: 'Is this made in Japan?', meaning: '這是日本製的嗎？', usage: '確認產地（日韓藥妝店常用）', keywords: ['made in japan', 'made in'] }),
  makeSentence({ id: 139, language: lang, category: cat, target: 'How much is this?', pronunciation: 'How much is this?', meaning: '這個多少錢？', usage: '詢問藥妝商品價格', keywords: ['how much', 'how much is this'] }),
  makeSentence({ id: 140, language: lang, category: cat, target: "I'll take this one, please.", pronunciation: "I'll take this one, please.", meaning: '我要這個', usage: '決定購買時指著商品說', keywords: ['take this', 'this one', 'please'] }),
]
