import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = 'shopping' as const

export const shoppingJa: Sentence[] = [
  makeSentence({ id: 129, language: lang, category: cat, target: 'これはいくらですか。', pronunciation: 'Kore wa ikura desu ka.', helper: 'これは いくら ですか', meaning: '這個多少錢？', usage: '在商店詢問價格', keywords: ['いくら', 'ikura', 'how much'] }),
  makeSentence({ id: 130, language: lang, category: cat, target: 'ちょっと高いですね。', pronunciation: 'Chotto takai desu ne.', helper: 'ちょっと たかい ですね', meaning: '有點貴呢', usage: '表示猶豫或試著議價', keywords: ['高い', 'たかい', 'takai', 'expensive'] }),
  makeSentence({ id: 131, language: lang, category: cat, target: '割引はありますか。', pronunciation: 'Waribiki wa arimasu ka.', helper: 'わりびきは ありますか', meaning: '有折扣嗎？', usage: '詢問是否有優惠', keywords: ['割引', 'わりびき', 'waribiki', 'discount'] }),
  makeSentence({ id: 132, language: lang, category: cat, target: 'もっと小さいサイズはありますか。', pronunciation: 'Motto chiisai saizu wa arimasu ka.', helper: 'もっと ちいさい さいずは ありますか', meaning: '有更小的尺寸嗎？', usage: '衣服或鞋子尺寸不合', keywords: ['小さい', 'chiisai', 'size', 'サイズ'] }),
  makeSentence({ id: 133, language: lang, category: cat, target: 'もっと大きいサイズはありますか。', pronunciation: 'Motto ookii saizu wa arimasu ka.', helper: 'もっと おおきい さいずは ありますか', meaning: '有更大的尺寸嗎？', usage: '需要更大尺寸時', keywords: ['大きい', 'ookii', 'size'] }),
  makeSentence({ id: 134, language: lang, category: cat, target: '他の色はありますか。', pronunciation: 'Hoka no iro wa arimasu ka.', helper: 'ほかの いろは ありますか', meaning: '有其他顏色嗎？', usage: '想換顏色時', keywords: ['色', 'いろ', 'iro', 'color'] }),
  makeSentence({ id: 135, language: lang, category: cat, target: '試着できますか。', pronunciation: 'Shichaku dekimasu ka.', helper: 'しちゃく できますか', meaning: '可以試穿嗎？', usage: '買衣服鞋子前試穿', keywords: ['試着', 'しちゃく', 'shichaku', 'try on'] }),
  makeSentence({ id: 136, language: lang, category: cat, target: '試着室はどこですか。', pronunciation: 'Shichaku-shitsu wa doko desu ka.', helper: 'しちゃくしつは どこ ですか', meaning: '試衣間在哪裡？', usage: '試穿前找試衣間', keywords: ['試着室', 'しちゃくしつ', 'fitting room'] }),
  makeSentence({ id: 137, language: lang, category: cat, target: '免税できますか。', pronunciation: 'Menzei dekimasu ka.', helper: 'めんぜい できますか', meaning: '可以免稅嗎？', usage: '購物時確認免稅資格', keywords: ['免税', 'menzei', 'tax free'] }),
  makeSentence({ id: 138, language: lang, category: cat, target: 'カードで払えますか。', pronunciation: 'Kaado de haraemasu ka.', helper: 'カードで はらえますか', meaning: '可以刷卡嗎？', usage: '結帳前確認付款方式', keywords: ['カード', 'card', 'haraemasu'] }),
  makeSentence({ id: 139, language: lang, category: cat, target: 'プレゼント用に包んでください。', pronunciation: 'Purezento-you ni tsutsunde kudasai.', helper: 'プレゼントように つつんで ください', meaning: '請幫我包成禮物', usage: '買禮物請店員包裝', keywords: ['プレゼント', 'present', '包んで', 'tsutsunde'] }),
  makeSentence({ id: 140, language: lang, category: cat, target: '返品はできますか。', pronunciation: 'Henpin wa dekimasu ka.', helper: 'へんぴんは できますか', meaning: '可以退貨嗎？', usage: '購買前確認能否退貨', keywords: ['返品', 'henpin', 'return'] }),
  makeSentence({ id: 141, language: lang, category: cat, target: 'これにします。', pronunciation: 'Kore ni shimasu.', helper: 'これに します', meaning: '我要買這個', usage: '決定購買時', keywords: ['これ', 'kore', 'shimasu'] }),
  makeSentence({ id: 142, language: lang, category: cat, target: '見ているだけです。', pronunciation: 'Mite iru dake desu.', helper: 'みて いる だけ です', meaning: '我只是看看', usage: '店員招呼時表示隨便逛逛', keywords: ['見ている', 'mite iru', 'just looking'] }),
  makeSentence({ id: 143, language: lang, category: cat, target: '台湾に送れますか。', pronunciation: 'Taiwan ni okuremasu ka.', helper: 'たいわんに おくれますか', meaning: '可以寄到台灣嗎？', usage: '買太多想直寄回家', keywords: ['台湾', 'taiwan', '送れ', 'okuremasu'] }),
  makeSentence({ id: 144, language: lang, category: cat, target: '現金のみですか。', pronunciation: 'Genkin nomi desu ka.', helper: 'げんきん のみ ですか', meaning: '只能付現金嗎？', usage: '確認是否只收現金', keywords: ['現金', 'genkin', 'cash only'] }),
  makeSentence({ id: 145, language: lang, category: cat, target: 'レシートをください。', pronunciation: 'Reshiito wo kudasai.', helper: 'レシートを ください', meaning: '請給我收據', usage: '結帳後要收據或退稅用', keywords: ['レシート', 'reshiito', 'receipt'] }),
  makeSentence({ id: 146, language: lang, category: cat, target: 'セール中ですか。', pronunciation: 'Seeru chuu desu ka.', helper: 'セールちゅう ですか', meaning: '正在特價嗎？', usage: '確認商品是否在打折', keywords: ['セール', 'seeru', 'sale'] }),
  makeSentence({ id: 147, language: lang, category: cat, target: 'これが最後の一つですか。', pronunciation: 'Kore ga saigo no hitotsu desu ka.', helper: 'これが さいごの ひとつ ですか', meaning: '這是最後一個嗎？', usage: '搶限量商品時確認', keywords: ['最後', 'saigo', 'last one'] }),
  makeSentence({ id: 148, language: lang, category: cat, target: 'これは免税品ですか。', pronunciation: 'Kore wa menzei-hin desu ka.', helper: 'これは めんぜいひん ですか', meaning: '這是免稅商品嗎？', usage: '在免稅店或機場購物', keywords: ['免税品', 'menzeihin', 'duty free'] }),
  makeSentence({ id: 149, language: lang, category: cat, target: '袋をください。', pronunciation: 'Fukuro wo kudasai.', helper: 'ふくろを ください', meaning: '請給我袋子', usage: '需要購物袋時', keywords: ['袋', 'fukuro', 'bag'] }),
  makeSentence({ id: 150, language: lang, category: cat, target: 'ぴったりです。', pronunciation: 'Pittari desu.', helper: 'ぴったり です', meaning: '很合穿', usage: '試穿滿意，決定購買', keywords: ['ぴったり', 'pittari', 'fits'] }),
]
