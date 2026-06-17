import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = 'first-conversation' as const

export const firstConversationJa: Sentence[] = [
  makeSentence({ id: 1, language: lang, category: cat, target: 'こんにちは。', pronunciation: 'Konnichiwa.', helper: 'こんにちは', meaning: '你好', usage: '白天打招呼最常用', keywords: ['こんにちは', 'konnichiwa'] }),
  makeSentence({ id: 2, language: lang, category: cat, target: 'はじめまして。', pronunciation: 'Hajimemashite.', helper: 'はじめまして', meaning: '初次見面', usage: '第一次見面、自我介紹開場', keywords: ['はじめまして', 'hajimemashite', '初めまして'] }),
  makeSentence({ id: 3, language: lang, category: cat, target: '台湾から来ました。', pronunciation: 'Taiwan kara kimashita.', helper: 'たいわんから きました', meaning: '我來自台灣', usage: '自我介紹時說明來自哪裡', keywords: ['台湾', 'たいわん', 'taiwan', 'kimashita'], words: [{ word: '台湾から', meaning: '從台灣' }, { word: '来ました', meaning: '來了' }], chunks: [{ text: '台湾から', pronunciation: 'Taiwan kara', chinese: '從台灣' }, { text: '来ました', pronunciation: 'kimashita', chinese: '來了' }] }),
  makeSentence({ id: 4, language: lang, category: cat, target: 'すみません、日本語があまり話せません。', pronunciation: 'Sumimasen, nihongo ga amari hanasemasen.', helper: 'すみません、にほんごが あまり はなせません', meaning: '不好意思，我不太會說日文', usage: '請對方諒解、說話慢一點', keywords: ['日本語', 'にほんご', 'hanasemasen', 'amari'] }),
  makeSentence({ id: 5, language: lang, category: cat, target: 'もう少しゆっくり話していただけますか。', pronunciation: 'Mou sukoshi yukkuri hanashite itadakemasu ka.', helper: 'もうすこし ゆっくり はなして いただけますか', meaning: '可以請您說慢一點嗎？', usage: '聽不懂時請對方放慢速度', keywords: ['ゆっくり', 'yukkuri', 'slowly', 'もう少し'] }),
  makeSentence({ id: 6, language: lang, category: cat, target: 'すみません、わかりません。', pronunciation: 'Sumimasen, wakarimasen.', helper: 'すみません、わかりません', meaning: '不好意思，我聽不懂', usage: '聽不懂對方說什麼時', keywords: ['わかりません', 'wakarimasen', '分かりません'] }),
  makeSentence({ id: 7, language: lang, category: cat, target: 'もう一度お願いします。', pronunciation: 'Mou ichido onegaishimasu.', helper: 'もういちど おねがいします', meaning: '請再說一次', usage: '沒聽清楚，請對方重複', keywords: ['もう一度', 'mou ichido', 'onegaishimasu'] }),
  makeSentence({ id: 8, language: lang, category: cat, target: 'もう一度言ってください。', pronunciation: 'Mou ichido itte kudasai.', helper: 'もういちど いって ください', meaning: '請再說一遍', usage: '請對方重複剛才的話', keywords: ['もう一度', 'itte kudasai', '言って'] }),
  makeSentence({ id: 9, language: lang, category: cat, target: 'これはどういう意味ですか。', pronunciation: 'Kore wa dou iu imi desu ka.', helper: 'これは どういう いみ ですか', meaning: '這是什麼意思？', usage: '聽到不懂的單字或句子時', keywords: ['どういう意味', 'dou iu imi', '意味'] }),
  makeSentence({ id: 10, language: lang, category: cat, target: '書いてもらえますか。', pronunciation: 'Kaite moraemasu ka.', helper: 'かいて もらえますか', meaning: '可以寫下來嗎？', usage: '語言不通時請對方寫字', keywords: ['書いて', 'kaite', 'moraemasu'] }),
  makeSentence({ id: 11, language: lang, category: cat, target: '初めて来ました。', pronunciation: 'Hajimete kimashita.', helper: 'はじめて きました', meaning: '我是第一次來', usage: '聊天時說明自己是新手旅客', keywords: ['初めて', 'hajimete', 'はじめて'] }),
  makeSentence({ id: 12, language: lang, category: cat, target: '観光で来ました。', pronunciation: 'Kankou de kimashita.', helper: 'かんこうで きました', meaning: '我是來觀光的', usage: '說明來日本的目的', keywords: ['観光', 'かんこう', 'kankou'] }),
  makeSentence({ id: 13, language: lang, category: cat, target: 'ありがとうございます。', pronunciation: 'Arigatou gozaimasu.', helper: 'ありがとう ございます', meaning: '謝謝', usage: '日常感謝最常用', keywords: ['ありがとう', 'arigatou', 'gozaimasu'] }),
  makeSentence({ id: 14, language: lang, category: cat, target: 'どうもありがとうございます。', pronunciation: 'Doumo arigatou gozaimasu.', helper: 'どうも ありがとう ございます', meaning: '非常謝謝您', usage: '對方幫了大忙時', keywords: ['どうも', 'doumo', 'arigatou'] }),
  makeSentence({ id: 15, language: lang, category: cat, target: 'すみません。', pronunciation: 'Sumimasen.', helper: 'すみません', meaning: '不好意思／借過', usage: '搭話前或輕微打擾別人時', keywords: ['すみません', 'sumimasen'] }),
  makeSentence({ id: 16, language: lang, category: cat, target: 'ごめんなさい。', pronunciation: 'Gomen nasai.', helper: 'ごめんなさい', meaning: '對不起', usage: '不小心碰到人或做錯事時', keywords: ['ごめんなさい', 'gomen nasai', 'gomen'] }),
  makeSentence({ id: 17, language: lang, category: cat, target: '中国語は話せますか。', pronunciation: 'Chuugoku-go wa hanasemasu ka.', helper: 'ちゅうごくごは はなせますか', meaning: '您會說中文嗎？', usage: '日文溝通困難時試著找中文', keywords: ['中国語', 'ちゅうごくご', 'chuugokugo'] }),
  makeSentence({ id: 18, language: lang, category: cat, target: 'さようなら、また。', pronunciation: 'Sayounara, mata.', helper: 'さようなら、また', meaning: '再見，下次見', usage: '結束對話、離開時', keywords: ['さようなら', 'sayounara', 'また', 'mata'] }),
]
