import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'en' as const
const cat = 'first-conversation' as const

export const firstConversationEn: Sentence[] = [
  makeSentence({ id: 101, language: lang, category: cat, target: 'Hello.', pronunciation: 'Hello.', meaning: '你好', usage: '打招呼、開場最常用', keywords: ['hello', 'hi'] }),
  makeSentence({ id: 102, language: lang, category: cat, target: 'Nice to meet you.', pronunciation: 'Nice to meet you.', meaning: '很高興認識你', usage: '第一次見面、自我介紹時使用', keywords: ['nice to meet', 'meet you'] }),
  makeSentence({
    id: 103, language: lang, category: cat, target: "I'm from Taiwan.", pronunciation: "I'm from Taiwan.", meaning: '我來自台灣', usage: '自我介紹時說明自己來自哪裡',
    keywords: ['from taiwan', 'taiwan'],
    words: [{ word: "I'm from", meaning: '我來自' }, { word: 'Taiwan', meaning: '台灣' }],
    chunks: [{ text: "I'm from", pronunciation: "I'm from", chinese: '我來自' }, { text: 'Taiwan', pronunciation: 'Taiwan', chinese: '台灣' }],
  }),
  makeSentence({
    id: 104, language: lang, category: cat, target: 'I only speak a little English.', pronunciation: 'I only speak a little English.', meaning: '我只會一點英文', usage: '請對方諒解、說話慢一點',
    keywords: ['little english', 'only speak'],
    words: [{ word: 'I only speak', meaning: '我只會說' }, { word: 'a little English', meaning: '一點英文' }],
    chunks: [{ text: 'I only speak', pronunciation: 'I only speak', chinese: '我只會說' }, { text: 'a little English', pronunciation: 'a little English', chinese: '一點英文' }],
  }),
  makeSentence({
    id: 105, language: lang, category: cat, target: 'Could you speak more slowly?', pronunciation: 'Could you speak more slowly?', meaning: '請說慢一點', usage: '聽不懂時請對方放慢速度',
    keywords: ['slowly', 'slow', 'speak more'],
    words: [{ word: 'Could you speak', meaning: '你可以說' }, { word: 'more slowly', meaning: '更慢一點' }],
    chunks: [{ text: 'Could you speak', pronunciation: 'Could you speak', chinese: '你可以說' }, { text: 'more slowly', pronunciation: 'more slowly', chinese: '更慢一點' }],
  }),
  makeSentence({
    id: 106, language: lang, category: cat, target: "Sorry, I don't understand.", pronunciation: "Sorry, I don't understand.", meaning: '抱歉，我聽不懂', usage: '聽不懂對方說什麼時',
    keywords: ["don't understand", 'not understand'],
    words: [{ word: 'Sorry', meaning: '抱歉' }, { word: "I don't understand", meaning: '我聽不懂' }],
    chunks: [{ text: 'Sorry', pronunciation: 'Sorry', chinese: '抱歉' }, { text: "I don't understand", pronunciation: "I don't understand", chinese: '我聽不懂' }],
  }),
  makeSentence({
    id: 107, language: lang, category: cat, target: 'Could you say that again?', pronunciation: 'Could you say that again?', meaning: '可以請你再說一次嗎？', usage: '沒聽清楚，請對方重複',
    keywords: ['say that again', 'again'],
    words: [{ word: 'Could you say', meaning: '你可以說' }, { word: 'that again', meaning: '再一次' }],
    chunks: [{ text: 'Could you say', pronunciation: 'Could you say', chinese: '你可以說' }, { text: 'that again', pronunciation: 'that again', chinese: '再一次' }],
  }),
  makeSentence({
    id: 108, language: lang, category: cat, target: 'One more time, please.', pronunciation: 'One more time, please.', meaning: '請再說一次', usage: '簡短請求對方重複一遍',
    keywords: ['one more time', 'again', 'please'],
    words: [{ word: 'One more time', meaning: '再一次' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'One more time', pronunciation: 'One more time', chinese: '再一次' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 109, language: lang, category: cat, target: 'What does that mean?', pronunciation: 'What does that mean?', meaning: '那是什麼意思？', usage: '聽到不懂的單字或句子時',
    keywords: ['what does', 'mean'],
    words: [{ word: 'What does that', meaning: '那是' }, { word: 'mean', meaning: '什麼意思' }],
    chunks: [{ text: 'What does that', pronunciation: 'What does that', chinese: '那是' }, { text: 'mean', pronunciation: 'mean', chinese: '什麼意思' }],
  }),
  makeSentence({
    id: 110, language: lang, category: cat, target: 'Can you write it down?', pronunciation: 'Can you write it down?', meaning: '可以寫下來嗎？', usage: '聽不懂時請對方寫字或打字',
    keywords: ['write it down', 'write down'],
    words: [{ word: 'Can you write', meaning: '你可以寫' }, { word: 'it down', meaning: '下來' }],
    chunks: [{ text: 'Can you write', pronunciation: 'Can you write', chinese: '你可以寫' }, { text: 'it down', pronunciation: 'it down', chinese: '下來' }],
  }),
  makeSentence({
    id: 111, language: lang, category: cat, target: 'This is my first time here.', pronunciation: 'This is my first time here.', meaning: '我是第一次來這裡', usage: '聊天時說明自己是新手旅客',
    keywords: ['first time', 'first time here'],
    words: [{ word: 'This is my first time', meaning: '這是我第一次' }, { word: 'here', meaning: '來這裡' }],
    chunks: [{ text: 'This is my first time', pronunciation: 'This is my first time', chinese: '這是我第一次' }, { text: 'here', pronunciation: 'here', chinese: '來這裡' }],
  }),
  makeSentence({
    id: 112, language: lang, category: cat, target: "I'm here on vacation.", pronunciation: "I'm here on vacation.", meaning: '我來這裡旅遊', usage: '聊天或入境時說明來意',
    keywords: ['on vacation', 'vacation'],
    words: [{ word: "I'm here", meaning: '我在這裡' }, { word: 'on vacation', meaning: '旅遊' }],
    chunks: [{ text: "I'm here", pronunciation: "I'm here", chinese: '我在這裡' }, { text: 'on vacation', pronunciation: 'on vacation', chinese: '旅遊' }],
  }),
  makeSentence({ id: 113, language: lang, category: cat, target: 'Thank you.', pronunciation: 'Thank you.', meaning: '謝謝', usage: '日常感謝最常用', keywords: ['thank you', 'thanks'] }),
  makeSentence({
    id: 114, language: lang, category: cat, target: 'Thank you very much.', pronunciation: 'Thank you very much.', meaning: '非常謝謝你', usage: '對方幫了大忙時',
    keywords: ['thank you very much', 'thanks'],
    words: [{ word: 'Thank you', meaning: '謝謝' }, { word: 'very much', meaning: '非常' }],
    chunks: [{ text: 'Thank you', pronunciation: 'Thank you', chinese: '謝謝' }, { text: 'very much', pronunciation: 'very much', chinese: '非常' }],
  }),
  makeSentence({ id: 115, language: lang, category: cat, target: 'Excuse me.', pronunciation: 'Excuse me.', meaning: '不好意思／借過', usage: '搭話前或輕微打擾別人時', keywords: ['excuse me'] }),
  makeSentence({ id: 116, language: lang, category: cat, target: 'Sorry.', pronunciation: 'Sorry.', meaning: '對不起', usage: '不小心碰到人或打擾時', keywords: ['sorry'] }),
  makeSentence({
    id: 117, language: lang, category: cat, target: 'Do you speak Chinese?', pronunciation: 'Do you speak Chinese?', meaning: '你會說中文嗎？', usage: '英文溝通困難時試著找中文',
    keywords: ['speak chinese', 'chinese'],
    words: [{ word: 'Do you speak', meaning: '你會說' }, { word: 'Chinese', meaning: '中文嗎' }],
    chunks: [{ text: 'Do you speak', pronunciation: 'Do you speak', chinese: '你會說' }, { text: 'Chinese', pronunciation: 'Chinese', chinese: '中文嗎' }],
  }),
  makeSentence({
    id: 118, language: lang, category: cat, target: 'Goodbye. Have a nice day.', pronunciation: 'Goodbye. Have a nice day.', meaning: '再見，祝你有美好的一天', usage: '結束對話、離開時',
    keywords: ['goodbye', 'nice day', 'have a nice day'],
    words: [{ word: 'Goodbye', meaning: '再見' }, { word: 'Have a nice day', meaning: '祝你有美好的一天' }],
    chunks: [{ text: 'Goodbye', pronunciation: 'Goodbye', chinese: '再見' }, { text: 'Have a nice day', pronunciation: 'Have a nice day', chinese: '祝你有美好的一天' }],
  }),
]
