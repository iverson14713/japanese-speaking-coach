import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = 'pharmacy' as const

export const pharmacyJa: Sentence[] = [
  makeSentence({ id: 19, language: lang, category: cat, target: '近くの薬局はどこですか。', pronunciation: 'Chikaku no yakkyoku wa doko desu ka.', helper: 'ちかくの やっきょくは どこ ですか', meaning: '最近的藥局在哪？', usage: '需要買藥時問路', keywords: ['薬局', 'やっきょく', 'yakkyoku', 'doko'] }),
  makeSentence({ id: 20, language: lang, category: cat, target: '頭痛薬はありますか。', pronunciation: 'Zutsuu-yaku wa arimasu ka.', helper: 'ずつうやくは ありますか', meaning: '有頭痛藥嗎？', usage: '在藥局描述簡單症狀', keywords: ['頭痛', 'ずつう', 'zutsuu', '薬'] }),
  makeSentence({ id: 21, language: lang, category: cat, target: '風邪薬が欲しいです。', pronunciation: 'Kaze-gusuri ga hoshii desu.', helper: 'かぜぐすりが ほしい です', meaning: '我想要感冒藥', usage: '說明需要感冒相關藥品', keywords: ['風邪', 'かぜ', 'kaze', 'gusuri'] }),
  makeSentence({ id: 22, language: lang, category: cat, target: '絆創膏はありますか。', pronunciation: 'Bansoukou wa arimasu ka.', helper: 'ばんそうこうは ありますか', meaning: '有OK繃嗎？', usage: '買創可貼或繃帶', keywords: ['絆創膏', 'ばんそうこう', 'bansoukou'] }),
  makeSentence({ id: 23, language: lang, category: cat, target: 'のどが痛いです。', pronunciation: 'Nodo ga itai desu.', helper: 'のどが いたい です', meaning: '我喉嚨痛', usage: '向店員描述症狀', keywords: ['のど', 'nodo', '痛い', 'itai'] }),
  makeSentence({ id: 24, language: lang, category: cat, target: 'これは大人用ですか、子供用ですか。', pronunciation: 'Kore wa otona-you desu ka, kodomo-you desu ka.', helper: 'これは おとなよう ですか、こどもよう ですか', meaning: '這是給大人還是小孩用的？', usage: '確認藥品適用對象', keywords: ['大人', 'おとな', '子供', 'こども'] }),
  makeSentence({ id: 25, language: lang, category: cat, target: '一日何回飲めばいいですか。', pronunciation: 'Ichinichi nan-kai nomeba ii desu ka.', helper: 'いちにち なんかい のめば いい ですか', meaning: '一天要吃幾次？', usage: '確認用藥方式', keywords: ['何回', 'nan kai', '飲めば'] }),
  makeSentence({ id: 26, language: lang, category: cat, target: 'これは処方箋が必要ですか。', pronunciation: 'Kore wa shohousen ga hitsuyou desu ka.', helper: 'これは しょほうせんが ひつよう ですか', meaning: '這需要處方籤嗎？', usage: '確認是否為處方藥', keywords: ['処方箋', 'しょほうせん', 'shohousen'] }),
  makeSentence({ id: 27, language: lang, category: cat, target: '日焼け止めはどこですか。', pronunciation: 'Hiyake-dome wa doko desu ka.', helper: 'ひやけどめは どこ ですか', meaning: '防曬乳在哪裡？', usage: '在藥妝店找防曬用品', keywords: ['日焼け止め', 'ひやけどめ', 'hiyakedome'] }),
  makeSentence({ id: 28, language: lang, category: cat, target: 'マスクはありますか。', pronunciation: 'Masuku wa arimasu ka.', helper: 'ますくは ありますか', meaning: '有口罩嗎？', usage: '購買口罩或日用品', keywords: ['マスク', 'masuku', 'mask'] }),
  makeSentence({ id: 29, language: lang, category: cat, target: '試してもいいですか。', pronunciation: 'Teshite mo ii desu ka.', helper: 'ためしても いい ですか', meaning: '可以試用嗎？', usage: '試用化妝品或保養品', keywords: ['試して', 'tameshite', '試す'] }),
  makeSentence({ id: 30, language: lang, category: cat, target: '敏感肌でも使えますか。', pronunciation: 'Binkan-hada demo tsukaemasu ka.', helper: 'びんかんはだ でも つかえますか', meaning: '敏感肌也能用嗎？', usage: '購買保養品前確認', keywords: ['敏感肌', 'びんかん', 'binkan'] }),
  makeSentence({ id: 31, language: lang, category: cat, target: 'もっと小さいサイズはありますか。', pronunciation: 'Motto chiisai saizu wa arimasu ka.', helper: 'もっと ちいさい さいずは ありますか', meaning: '有更小的包裝嗎？', usage: '旅行想買小容量試用品', keywords: ['小さい', 'chiisai', 'サイズ', 'saizu'] }),
  makeSentence({ id: 32, language: lang, category: cat, target: 'これは免税ですか。', pronunciation: 'Kore wa menzei desu ka.', helper: 'これは めんぜい ですか', meaning: '這可以免稅嗎？', usage: '確認商品是否符合免稅', keywords: ['免税', 'めんぜい', 'menzei'] }),
  makeSentence({ id: 33, language: lang, category: cat, target: '免税店はどこですか。', pronunciation: 'Menzei-ten wa doko desu ka.', helper: 'めんぜいてんは どこ ですか', meaning: '免稅店在哪裡？', usage: '在機場或市區找免稅店', keywords: ['免税店', 'めんぜいてん', 'menzeiten'] }),
  makeSentence({ id: 34, language: lang, category: cat, target: '免税の手続きをお願いします。', pronunciation: 'Menzei no tetsuzuki wo onegaishimasu.', helper: 'めんぜいの てつづきを おねがいします', meaning: '請幫我辦免稅手續', usage: '購物後辦理免稅', keywords: ['免税', '手続き', 'tetsuzuki', 'menzei'] }),
  makeSentence({ id: 35, language: lang, category: cat, target: 'カードで払えますか。', pronunciation: 'Kaado de haraemasu ka.', helper: 'カードで はらえますか', meaning: '可以刷卡嗎？', usage: '在藥妝店結帳時', keywords: ['カード', 'card', '払えます', 'haraemasu'] }),
  makeSentence({ id: 36, language: lang, category: cat, target: '袋をください。', pronunciation: 'Fukuro wo kudasai.', helper: 'ふくろを ください', meaning: '請給我袋子', usage: '購買後需要袋子', keywords: ['袋', 'ふくろ', 'fukuro', 'kudasai'] }),
  makeSentence({ id: 37, language: lang, category: cat, target: 'おすすめは何ですか。', pronunciation: 'Osusume wa nan desu ka.', helper: 'おすすめは なん ですか', meaning: '有什麼推薦的？', usage: '請店員推薦熱門商品', keywords: ['おすすめ', 'osusume', 'recommend'] }),
  makeSentence({ id: 38, language: lang, category: cat, target: 'これは日本製ですか。', pronunciation: 'Kore wa Nihon-sei desu ka.', helper: 'これは にほんせい ですか', meaning: '這是日本製的嗎？', usage: '確認產地', keywords: ['日本製', 'にほんせい', 'nihonsei'] }),
  makeSentence({ id: 39, language: lang, category: cat, target: 'これはいくらですか。', pronunciation: 'Kore wa ikura desu ka.', helper: 'これは いくら ですか', meaning: '這個多少錢？', usage: '詢問藥妝商品價格', keywords: ['いくら', 'ikura', 'how much'] }),
  makeSentence({ id: 40, language: lang, category: cat, target: 'これをください。', pronunciation: 'Kore wo kudasai.', helper: 'これを ください', meaning: '我要這個', usage: '決定購買時指著商品說', keywords: ['これ', 'kore', 'kudasai', 'ください'] }),
]
