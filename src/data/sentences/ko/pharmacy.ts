import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = 'pharmacy' as const

export const pharmacyKo: Sentence[] = [
  makeSentence({ id: 219, language: lang, category: cat, target: '가까운 약국이 어디예요?', pronunciation: 'gakkaun yakgugi eodiyeyo?', helper: 'gak-kaun yak-guk-i eo-di-ye-yo', meaning: '最近的藥局在哪？', usage: '需要買藥時問路', keywords: ['약국', 'yakguk', 'pharmacy', 'eodiyeyo'] }),
  makeSentence({ id: 220, language: lang, category: cat, target: '두통약 있어요?', pronunciation: 'dutongyak isseoyo?', helper: 'du-tong-yak i-sseo-yo', meaning: '有頭痛藥嗎？', usage: '在藥局描述簡單症狀', keywords: ['두통', 'dutong', 'headache', 'yak'] }),
  makeSentence({ id: 221, language: lang, category: cat, target: '감기약이 필요해요.', pronunciation: 'gamgiyagi piryohaeyo', helper: 'gam-gi-yak-i pi-ryo-hae-yo', meaning: '我需要感冒藥', usage: '說明需要感冒相關藥品', keywords: ['감기', 'gamgi', 'cold', 'gamgiyak'] }),
  makeSentence({ id: 222, language: lang, category: cat, target: '밴드 있어요?', pronunciation: 'baendeu isseoyo?', helper: 'baen-deu i-sseo-yo', meaning: '有OK繃嗎？', usage: '買創可貼或繃帶', keywords: ['밴드', 'baendeu', 'bandage', 'band'] }),
  makeSentence({ id: 223, language: lang, category: cat, target: '목이 아파요.', pronunciation: 'mogi apayo', helper: 'mo-gi a-pa-yo', meaning: '我喉嚨痛', usage: '向店員描述症狀', keywords: ['목', 'mogi', 'throat', 'apayo'] }),
  makeSentence({ id: 224, language: lang, category: cat, target: '이거 어른용이에요, 아이용이에요?', pronunciation: 'igeo eoreun-yongieyo, ai-yongieyo?', helper: 'i-geo eo-reun-yong-i-e-yo, a-i-yong-i-e-yo', meaning: '這是給大人還是小孩用的？', usage: '確認藥品適用對象', keywords: ['어른', 'eoreun', '아이', 'ai'] }),
  makeSentence({ id: 225, language: lang, category: cat, target: '하루에 몇 번 먹어야 해요?', pronunciation: 'harue myeot beon meogeoya haeyo?', helper: 'ha-ru-e myeot beon meo-geo-ya hae-yo', meaning: '一天要吃幾次？', usage: '確認用藥方式', keywords: ['하루', 'haru', '몇 번', 'myeot beon'] }),
  makeSentence({ id: 226, language: lang, category: cat, target: '처방전 필요해요?', pronunciation: 'cheobangjeon piryohaeyo?', helper: 'cheo-bang-jeon pi-ryo-hae-yo', meaning: '需要處方籤嗎？', usage: '確認是否為處方藥', keywords: ['처방전', 'cheobangjeon', 'prescription'] }),
  makeSentence({ id: 227, language: lang, category: cat, target: '선크림 어디에 있어요?', pronunciation: 'seokeurim eodie isseoyo?', helper: 'seon-keu-rim eo-di-e i-sseo-yo', meaning: '防曬乳在哪裡？', usage: '在藥妝店找防曬用品', keywords: ['선크림', 'seokeurim', 'sunscreen'] }),
  makeSentence({ id: 228, language: lang, category: cat, target: '마스크 있어요?', pronunciation: 'maseukeu isseoyo?', helper: 'ma-seu-keu i-sseo-yo', meaning: '有口罩嗎？', usage: '購買口罩或日用品', keywords: ['마스크', 'maseukeu', 'mask'] }),
  makeSentence({ id: 229, language: lang, category: cat, target: '테스트해 봐도 돼요?', pronunciation: 'teseuteuhae boado dwaeyo?', helper: 'te-seu-teu-hae bo-a-do dae-yo', meaning: '可以試用嗎？', usage: '試用化妝品或保養品', keywords: ['테스트', 'teseuteu', 'try', 'boado'] }),
  makeSentence({ id: 230, language: lang, category: cat, target: '민감한 피부에도 괜찮아요?', pronunciation: 'mingamhan pibuedo gwaenchanayo?', helper: 'min-gam-han pi-bu-e-do gwaen-cha-na-yo', meaning: '敏感肌也能用嗎？', usage: '購買保養品前確認', keywords: ['민감', 'mingam', '피부', 'pibu'] }),
  makeSentence({ id: 231, language: lang, category: cat, target: '더 작은 사이즈 있어요?', pronunciation: 'deo jageun saijeu isseoyo?', helper: 'deo ja-geun sa-i-jeu i-sseo-yo', meaning: '有更小的包裝嗎？', usage: '旅行想買小容量試用品', keywords: ['작은', 'jageun', '사이즈', 'saijeu'] }),
  makeSentence({ id: 232, language: lang, category: cat, target: '면세 되나요?', pronunciation: 'myeonse doenayo?', helper: 'myeon-se doe-na-yo', meaning: '可以免稅嗎？', usage: '確認商品是否符合免稅', keywords: ['면세', 'myeonse', 'tax free'] }),
  makeSentence({ id: 233, language: lang, category: cat, target: '면세점 어디예요?', pronunciation: 'myeonsejeom eodiyeyo?', helper: 'myeon-se-jeom eo-di-ye-yo', meaning: '免稅店在哪裡？', usage: '在機場或市區找免稅店', keywords: ['면세점', 'myeonsejeom', 'duty free'] }),
  makeSentence({ id: 234, language: lang, category: cat, target: '면세 처리해 주세요.', pronunciation: 'myeonse cheorihae juseyo', helper: 'myeon-se cheo-ri-hae ju-se-yo', meaning: '請幫我辦免稅手續', usage: '購物後辦理免稅', keywords: ['면세', 'myeonse', '처리', 'cheori'] }),
  makeSentence({ id: 235, language: lang, category: cat, target: '카드로 결제할 수 있어요?', pronunciation: 'kadeuro gyeoljehal su isseoyo?', helper: 'ka-deu-ro gyeol-je-hal su i-sseo-yo', meaning: '可以刷卡嗎？', usage: '在藥妝店結帳時', keywords: ['카드', 'kadeu', 'card', 'gyeolje'] }),
  makeSentence({ id: 236, language: lang, category: cat, target: '봉투 주세요.', pronunciation: 'bongtu juseyo', helper: 'bong-tu ju-se-yo', meaning: '請給我袋子', usage: '購買後需要袋子', keywords: ['봉투', 'bongtu', 'bag'] }),
  makeSentence({ id: 237, language: lang, category: cat, target: '추천해 주실 만한 게 뭐예요?', pronunciation: 'chucheonhae jusil manhan ge mwoyeyo?', helper: 'chu-cheon-hae ju-sil man-han ge mwo-ye-yo', meaning: '有什麼推薦的？', usage: '請店員推薦熱門商品', keywords: ['추천', 'chucheon', 'recommend'] }),
  makeSentence({ id: 238, language: lang, category: cat, target: '한국 제품이에요?', pronunciation: 'hanguk jepumieyo?', helper: 'han-guk je-pum-i-e-yo', meaning: '這是韓國製的嗎？', usage: '確認產地', keywords: ['한국', 'hanguk', 'korea', 'jepum'] }),
  makeSentence({ id: 239, language: lang, category: cat, target: '이거 얼마예요?', pronunciation: 'igeo eolmayeyo?', helper: 'i-geo eol-ma-ye-yo', meaning: '這個多少錢？', usage: '詢問藥妝商品價格', keywords: ['얼마', 'eolma', 'how much', 'igeo'] }),
  makeSentence({ id: 240, language: lang, category: cat, target: '이걸로 주세요.', pronunciation: 'igeollo juseyo', helper: 'i-geol-lo ju-se-yo', meaning: '我要這個', usage: '決定購買時指著商品說', keywords: ['이걸로', 'igeollo', 'juseyo', 'this'] }),
]
