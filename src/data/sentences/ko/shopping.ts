import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = 'shopping' as const

export const shoppingKo: Sentence[] = [
  makeSentence({ id: 329, language: lang, category: cat, target: '이거 얼마예요?', pronunciation: 'igeo eolmayeyo?', helper: 'i-geo eol-ma-ye-yo', meaning: '這個多少錢？', usage: '在商店詢問價格', keywords: ['얼마', 'eolma', 'how much', 'igeo'] }),
  makeSentence({ id: 330, language: lang, category: cat, target: '좀 비싸네요.', pronunciation: 'jom bissaneyo', helper: 'jom bi-ssa-ne-yo', meaning: '有點貴呢', usage: '表示猶豫或試著議價', keywords: ['비싸', 'bissa', 'expensive', 'jom'] }),
  makeSentence({ id: 331, language: lang, category: cat, target: '할인돼요?', pronunciation: 'harindwaeyo?', helper: 'ha-rin-dwae-yo', meaning: '有折扣嗎？', usage: '詢問是否有優惠', keywords: ['할인', 'harin', 'discount'] }),
  makeSentence({ id: 332, language: lang, category: cat, target: '더 작은 사이즈 있어요?', pronunciation: 'deo jageun saijeu isseoyo?', helper: 'deo ja-geun sa-i-jeu i-sseo-yo', meaning: '有更小的尺寸嗎？', usage: '衣服或鞋子尺寸不合', keywords: ['작은', 'jageun', 'size', 'saijeu'] }),
  makeSentence({ id: 333, language: lang, category: cat, target: '더 큰 사이즈 있어요?', pronunciation: 'deo keun saijeu isseoyo?', helper: 'deo keun sa-i-jeu i-sseo-yo', meaning: '有更大的尺寸嗎？', usage: '需要更大尺寸時', keywords: ['큰', 'keun', 'large', 'size'] }),
  makeSentence({ id: 334, language: lang, category: cat, target: '다른 색 있어요?', pronunciation: 'dareun saek isseoyo?', helper: 'da-reun saek i-sseo-yo', meaning: '有其他顏色嗎？', usage: '想換顏色時', keywords: ['색', 'saek', 'color', 'dareun'] }),
  makeSentence({ id: 335, language: lang, category: cat, target: '입어 봐도 돼요?', pronunciation: 'ibeo boado dwaeyo?', helper: 'i-beo bo-a-do dae-yo', meaning: '可以試穿嗎？', usage: '買衣服鞋子前試穿', keywords: ['입어', 'ibeo', 'try on', 'boado'] }),
  makeSentence({ id: 336, language: lang, category: cat, target: '탈의실 어디예요?', pronunciation: 'taluishil eodiyeyo?', helper: 'tal-ui-sil eo-di-ye-yo', meaning: '試衣間在哪裡？', usage: '試穿前找試衣間', keywords: ['탈의실', 'taluishil', 'fitting room'] }),
  makeSentence({ id: 337, language: lang, category: cat, target: '면세 되나요?', pronunciation: 'myeonse doenayo?', helper: 'myeon-se doe-na-yo', meaning: '可以免稅嗎？', usage: '購物時確認免稅資格', keywords: ['면세', 'myeonse', 'tax free'] }),
  makeSentence({ id: 338, language: lang, category: cat, target: '카드로 결제할 수 있어요?', pronunciation: 'kadeuro gyeoljehal su isseoyo?', helper: 'ka-deu-ro gyeol-je-hal su i-sseo-yo', meaning: '可以刷卡嗎？', usage: '結帳前確認付款方式', keywords: ['카드', 'kadeu', 'card'] }),
  makeSentence({ id: 339, language: lang, category: cat, target: '선물 포장해 주세요.', pronunciation: 'seonmul pojanghae juseyo', helper: 'seon-mul po-jang-hae ju-se-yo', meaning: '請幫我包成禮物', usage: '買禮物請店員包裝', keywords: ['선물', 'seonmul', 'gift', 'pojang'] }),
  makeSentence({ id: 340, language: lang, category: cat, target: '환불돼요?', pronunciation: 'hwanbuldwaeyo?', helper: 'hwan-bul-dwae-yo', meaning: '可以退貨嗎？', usage: '購買前確認能否退貨', keywords: ['환불', 'hwanbul', 'return', 'refund'] }),
  makeSentence({ id: 341, language: lang, category: cat, target: '이걸로 할게요.', pronunciation: 'igeollo halgeyo', helper: 'i-geol-lo hal-ge-yo', meaning: '我要買這個', usage: '決定購買時', keywords: ['할게요', 'halgeyo', 'take it', 'igeollo'] }),
  makeSentence({ id: 342, language: lang, category: cat, target: '그냥 구경하는 거예요.', pronunciation: 'geunyang gugyeonghaneun geoyeyo', helper: 'geu-nyang gu-gyeong-ha-neun geo-ye-yo', meaning: '我只是看看', usage: '店員招呼時表示隨便逛逛', keywords: ['구경', 'gugyeong', 'just looking', 'geunyang'] }),
  makeSentence({ id: 343, language: lang, category: cat, target: '대만으로 배송돼요?', pronunciation: 'daeman-euro baesongdwaeyo?', helper: 'dae-man-eu-ro bae-song-dwae-yo', meaning: '可以寄到台灣嗎？', usage: '買太多想直寄回家', keywords: ['대만', 'daeman', 'taiwan', 'baesong'] }),
  makeSentence({ id: 344, language: lang, category: cat, target: '현금만 되나요?', pronunciation: 'hyeongeumman doenayo?', helper: 'hyeon-geum-man doe-na-yo', meaning: '只能付現金嗎？', usage: '確認是否只收現金', keywords: ['현금', 'hyeongeum', 'cash only'] }),
  makeSentence({ id: 345, language: lang, category: cat, target: '영수증 주세요.', pronunciation: 'yeongsujeung juseyo', helper: 'yeong-su-jeung ju-se-yo', meaning: '請給我收據', usage: '結帳後要收據或退稅用', keywords: ['영수증', 'yeongsujeung', 'receipt'] }),
  makeSentence({ id: 346, language: lang, category: cat, target: '세일 중이에요?', pronunciation: 'seil jungieyo?', helper: 'se-il jung-i-e-yo', meaning: '正在特價嗎？', usage: '確認商品是否在打折', keywords: ['세일', 'seil', 'sale'] }),
  makeSentence({ id: 347, language: lang, category: cat, target: '이게 마지막이에요?', pronunciation: 'ige majimakieyo?', helper: 'i-ge ma-ji-ma-gi-e-yo', meaning: '這是最後一個嗎？', usage: '搶限量商品時確認', keywords: ['마지막', 'majimak', 'last one'] }),
  makeSentence({ id: 348, language: lang, category: cat, target: '면세 상품이에요?', pronunciation: 'myeonse sangpumieyo?', helper: 'myeon-se sang-pum-i-e-yo', meaning: '這是免稅商品嗎？', usage: '在免稅店或機場購物', keywords: ['면세', 'myeonse', 'duty free', 'sangpum'] }),
  makeSentence({ id: 349, language: lang, category: cat, target: '봉투 주세요.', pronunciation: 'bongtu juseyo', helper: 'bong-tu ju-se-yo', meaning: '請給我袋子', usage: '需要購物袋時', keywords: ['봉투', 'bongtu', 'bag'] }),
  makeSentence({ id: 350, language: lang, category: cat, target: '딱 맞아요.', pronunciation: 'ttak mawayo', helper: 'ttak ma-wa-yo', meaning: '很合穿', usage: '試穿滿意，決定購買', keywords: ['딱 맞', 'ttak ma', 'fits', 'mawayo'] }),
]
