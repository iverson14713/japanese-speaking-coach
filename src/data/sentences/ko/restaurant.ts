import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = 'restaurant' as const

export const restaurantKo: Sentence[] = [
  makeSentence({ id: 285, language: lang, category: cat, target: '두 명이에요.', pronunciation: 'du myeongieyo', helper: 'du myeong-i-e-yo', meaning: '兩位', usage: '進餐廳告訴店員人數', keywords: ['두 명', 'du myeong', 'two', 'myeong'] }),
  makeSentence({ id: 286, language: lang, category: cat, target: '예약했어요.', pronunciation: 'yeyakhaesseoyo', helper: 'ye-yak-hae-sseo-yo', meaning: '我有預約', usage: '有訂位時向接待說明', keywords: ['예약', 'yeyak', 'reservation'] }),
  makeSentence({ id: 287, language: lang, category: cat, target: '영어 메뉴 있어요?', pronunciation: 'yeongeo menyu isseoyo?', helper: 'yeong-eo me-nyu i-sseo-yo', meaning: '有英文菜單嗎？', usage: '看不懂韓文菜單時', keywords: ['메뉴', 'menyu', 'menu', '영어'] }),
  makeSentence({ id: 288, language: lang, category: cat, target: '추천 메뉴가 뭐예요?', pronunciation: 'chucheon menyuga mwoyeyo?', helper: 'chu-cheon me-nyu-ga mwo-ye-yo', meaning: '有什麼推薦的？', usage: '不知道點什麼時問店員', keywords: ['추천', 'chucheon', 'recommend', 'menyu'] }),
  makeSentence({ id: 289, language: lang, category: cat, target: '이걸로 주세요.', pronunciation: 'igeollo juseyo', helper: 'i-geol-lo ju-se-yo', meaning: '我要這個', usage: '點菜時指著菜單或圖片', keywords: ['이걸로', 'igeollo', 'juseyo', 'this'] }),
  makeSentence({ id: 290, language: lang, category: cat, target: '안 매운 걸로 주세요.', pronunciation: 'an maeun geollo juseyo', helper: 'an mae-un geol-lo ju-se-yo', meaning: '請給我不辣的', usage: '點餐時說明口味', keywords: ['안 매운', 'an maeun', 'not spicy', 'maeun'] }),
  makeSentence({ id: 291, language: lang, category: cat, target: '너무 맵지 않게 해 주세요.', pronunciation: 'neomu maepji anke hae juseyo', helper: 'neo-mu maep-ji an-ke hae ju-se-yo', meaning: '請不要太辣', usage: '可以接受微辣時', keywords: ['맵', 'maep', 'spicy', 'anke'] }),
  makeSentence({ id: 292, language: lang, category: cat, target: '땅콩 알레르기가 있어요.', pronunciation: 'ttangkong allergiga isseoyo', helper: 'ttang-kong al-le-reu-gi-ga i-sseo-yo', meaning: '我對花生過敏', usage: '說明食物過敏', keywords: ['땅콩', 'ttangkong', 'peanut', 'allergi'] }),
  makeSentence({ id: 293, language: lang, category: cat, target: '갑각류 알레르기가 있어요.', pronunciation: 'gapgakryu allergiga isseoyo', helper: 'gap-gak-ryu al-le-reu-gi-ga i-sseo-yo', meaning: '我對海鮮過敏', usage: '海鮮過敏時務必說明', keywords: ['갑각류', 'gapgakryu', 'shellfish', 'allergi'] }),
  makeSentence({ id: 294, language: lang, category: cat, target: '채식주의자예요.', pronunciation: 'chaesikjuuijayeyo', helper: 'chae-sik-ju-ui-ja-ye-yo', meaning: '我是素食者', usage: '點餐時說明飲食限制', keywords: ['채식', 'chaesik', 'vegetarian'] }),
  makeSentence({ id: 295, language: lang, category: cat, target: '물 좀 주세요.', pronunciation: 'mul jom juseyo', helper: 'mul jom ju-se-yo', meaning: '請給我水', usage: '點水或要水喝', keywords: ['물', 'mul', 'water', 'juseyo'] }),
  makeSentence({ id: 296, language: lang, category: cat, target: '한 잔 더 주세요.', pronunciation: 'han jan deo juseyo', helper: 'han jan deo ju-se-yo', meaning: '請再來一杯', usage: '飲料喝完想續杯', keywords: ['한 잔 더', 'han jan deo', 'refill', 'more'] }),
  makeSentence({ id: 297, language: lang, category: cat, target: '계산해 주세요.', pronunciation: 'gyesanhae juseyo', helper: 'gye-san-hae ju-se-yo', meaning: '請結帳', usage: '用餐完畢請店員結帳', keywords: ['계산', 'gyesan', 'check', 'bill'] }),
  makeSentence({ id: 298, language: lang, category: cat, target: '따로 계산할 수 있어요?', pronunciation: 'ttaro gyesanhal su isseoyo?', helper: 'tta-ro gye-san-hal su i-sseo-yo', meaning: '可以分開付嗎？', usage: '跟朋友各自付帳', keywords: ['따로', 'ttaro', 'split', 'gyesan'] }),
  makeSentence({ id: 299, language: lang, category: cat, target: '포장해 주세요.', pronunciation: 'pojanghae juseyo', helper: 'po-jang-hae ju-se-yo', meaning: '請幫我外帶', usage: '想把餐點帶走', keywords: ['포장', 'pojang', 'takeout', 'to go'] }),
  makeSentence({ id: 300, language: lang, category: cat, target: '봉사료 포함이에요?', pronunciation: 'bongsaryo pohamieyo?', helper: 'bong-sa-ryo po-ham-i-e-yo', meaning: '有含服務費嗎？', usage: '確認帳單是否含服務費', keywords: ['봉사료', 'bongsaryo', 'service charge'] }),
  makeSentence({ id: 301, language: lang, category: cat, target: '저 사람이랑 똑같이 주세요.', pronunciation: 'jeo saramirang ttokgati juseyo', helper: 'jeo sa-ram-i-rang ttok-ga-ti ju-se-yo', meaning: '請給我跟他一樣的', usage: '跟同伴點相同餐點', keywords: ['똑같이', 'ttokgati', 'same', 'saram'] }),
  makeSentence({ id: 302, language: lang, category: cat, target: '양파 빼 주세요.', pronunciation: 'yangpa bbae juseyo', helper: 'yang-pa bbae ju-se-yo', meaning: '請不要洋蔥', usage: '點餐時去掉配料', keywords: ['양파', 'yangpa', 'onion', 'bbae'] }),
  makeSentence({ id: 303, language: lang, category: cat, target: '소금 적게 해 주세요.', pronunciation: 'sogeum jeokge hae juseyo', helper: 'so-geum jeok-ge hae ju-se-yo', meaning: '請少鹽一點', usage: '調整口味', keywords: ['소금', 'sogeum', 'salt', 'jeokge'] }),
  makeSentence({ id: 304, language: lang, category: cat, target: '글루텐 프리예요?', pronunciation: 'geulluten peurieyo?', helper: 'geul-lu-ten peu-ri-e-yo', meaning: '這是無麩質的嗎？', usage: '麩質過敏或飲食限制時', keywords: ['글루텐', 'geulluten', 'gluten free'] }),
  makeSentence({ id: 305, language: lang, category: cat, target: '아직 음식이 안 나왔어요.', pronunciation: 'ajik eumsigi an nawasseoyo', helper: 'a-jik eum-sik-i an na-wat-sseo-yo', meaning: '餐點還沒來', usage: '等太久時禮貌催促', keywords: ['음식', 'eumsik', 'food', 'nawasseoyo'] }),
  makeSentence({ id: 306, language: lang, category: cat, target: '맛있어요.', pronunciation: 'masisseoyo', helper: 'ma-sit-sseo-yo', meaning: '很好吃', usage: '稱讚料理，跟店員聊天', keywords: ['맛있', 'masit', 'delicious', 'masisseoyo'] }),
  makeSentence({ id: 307, language: lang, category: cat, target: '야외석에 앉을 수 있어요?', pronunciation: 'yaoeseoge anjeul su isseoyo?', helper: 'ya-oe-seok-e an-jeul su i-sseo-yo', meaning: '可以坐外面嗎？', usage: '想坐戶外座位時', keywords: ['야외', 'yaoe', 'outside', 'anjeul'] }),
  makeSentence({ id: 308, language: lang, category: cat, target: '대기 시간이 얼마나 걸려요?', pronunciation: 'daegi sigani eolmana geollyeoyo?', helper: 'dae-gi si-gan-i eol-ma-na geol-lyeo-yo', meaning: '要等多久？', usage: '餐廳需要排隊時', keywords: ['대기', 'daegi', 'wait', 'geollyeoyo'] }),
  makeSentence({ id: 309, language: lang, category: cat, target: '카드 되나요?', pronunciation: 'kadeu doenayo?', helper: 'ka-deu doe-na-yo', meaning: '可以刷卡嗎？', usage: '結帳前確認付款方式', keywords: ['카드', 'kadeu', 'card', 'doenayo'] }),
  makeSentence({ id: 310, language: lang, category: cat, target: '메뉴판 좀 보여 주세요.', pronunciation: 'menyupan jom boyeo juseyo', helper: 'me-nyu-pan jom bo-yeo ju-se-yo', meaning: '可以看一下菜單嗎？', usage: '入座後要菜單', keywords: ['메뉴', 'menyu', 'menu', 'boyeo'] }),
  makeSentence({ id: 311, language: lang, category: cat, target: '이거 많이 매워요?', pronunciation: 'igeo mani maewoyo?', helper: 'i-geo ma-ni mae-wo-yo', meaning: '這個很辣嗎？', usage: '點菜前確認辣度', keywords: ['매워', 'maewo', 'spicy', 'mani'] }),
]
