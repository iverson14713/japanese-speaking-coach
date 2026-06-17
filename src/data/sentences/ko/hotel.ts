import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = 'hotel' as const

export const hotelKo: Sentence[] = [
  makeSentence({ id: 263, language: lang, category: cat, target: '체크인하고 싶어요.', pronunciation: 'chekeu-inhago sipeoyo', helper: 'che-keu-in-ha-go si-peo-yo', meaning: '我要辦理入住', usage: '到飯店櫃檯時', keywords: ['체크인', 'chekeuin', 'check in', 'sipeoyo'] }),
  makeSentence({ id: 264, language: lang, category: cat, target: '예약했어요.', pronunciation: 'yeyakhaesseoyo', helper: 'ye-yak-hae-sseo-yo', meaning: '我有預約', usage: '到櫃檯說明已訂房', keywords: ['예약', 'yeyak', 'reservation', 'yeyakhaesseoyo'] }),
  makeSentence({ id: 265, language: lang, category: cat, target: '예약자 이름은 린입니다.', pronunciation: 'yeyakja ireumeun rimimnida', helper: 'ye-yak-ja i-reum-eun rim-im-ni-da', meaning: '預約名字是 Lin', usage: '報訂房姓名，可換成你的名字', keywords: ['예약자', 'yeyakja', '이름', 'ireum'] }),
  makeSentence({ id: 266, language: lang, category: cat, target: '여권입니다.', pronunciation: 'yeogwonimnida', helper: 'yeo-gwon-im-ni-da', meaning: '這是我的護照', usage: '入住時櫃檯要求證件', keywords: ['여권', 'yeogwon', 'passport'] }),
  makeSentence({ id: 267, language: lang, category: cat, target: '일찍 체크인할 수 있어요?', pronunciation: 'iljjik chekeu-inhal su isseoyo?', helper: 'il-jjik che-keu-in-hal su i-sseo-yo', meaning: '可以提早入住嗎？', usage: '提早到飯店想先進房', keywords: ['일찍', 'iljjik', 'early', 'chekeuin'] }),
  makeSentence({ id: 268, language: lang, category: cat, target: '늦게 체크아웃할 수 있어요?', pronunciation: 'neutge chekeu-outhal su isseoyo?', helper: 'neut-ge che-keu-au-hal su i-sseo-yo', meaning: '可以晚一點退房嗎？', usage: '想延後退房時間', keywords: ['늦게', 'neutge', 'late checkout', 'chekeuaut'] }),
  makeSentence({ id: 269, language: lang, category: cat, target: '짐 맡아 주실 수 있어요?', pronunciation: 'jim mat-a jusil su isseoyo?', helper: 'jim mat-a ju-sil su i-sseo-yo', meaning: '可以寄放行李嗎？', usage: '入住前或退房後寄行李', keywords: ['짐', 'jim', 'luggage', 'mat-a'] }),
  makeSentence({ id: 270, language: lang, category: cat, target: '체크아웃하고 싶어요.', pronunciation: 'chekeu-outhago sipeoyo', helper: 'che-keu-au-ha-go si-peo-yo', meaning: '我要退房', usage: '離開飯店辦理退房', keywords: ['체크아웃', 'chekeuaut', 'checkout', 'sipeoyo'] }),
  makeSentence({ id: 271, language: lang, category: cat, target: '방이 깨끗하지 않아요.', pronunciation: 'bangi kkaekkeuthaji anayo', helper: 'bang-i kkaek-keut-ha-ji a-na-yo', meaning: '房間沒有打掃乾淨', usage: '房間清潔有問題時', keywords: ['방', 'bang', 'room', 'kkaekkeut'] }),
  makeSentence({ id: 272, language: lang, category: cat, target: '에어컨이 고장 났어요.', pronunciation: 'eeokeoni gojang nasseoyo', helper: 'eeo-keon-i go-jang nat-sseo-yo', meaning: '冷氣壞了', usage: '房間設備故障時', keywords: ['에어컨', 'eeokeon', 'aircon', 'gojang'] }),
  makeSentence({ id: 273, language: lang, category: cat, target: '따뜻한 물이 안 나와요.', pronunciation: 'ttatteuthan muri an nawayo', helper: 'tta-tteu-than mu-ri an na-wa-yo', meaning: '沒有熱水', usage: '洗澡沒熱水時向櫃檯反映', keywords: ['따뜻한 물', 'ttatteuthan mul', 'hot water', 'nawayo'] }),
  makeSentence({ id: 274, language: lang, category: cat, target: 'Wi-Fi 비밀번호가 뭐예요?', pronunciation: 'Wi-Fi bimilbeonhoga mwoyeyo?', helper: 'Wi-Fi bi-mil-beon-ho-ga mwo-ye-yo', meaning: 'Wi-Fi 密碼是什麼？', usage: '入住後連網路', keywords: ['wifi', 'wi-fi', '비밀번호', 'bimilbeonho'] }),
  makeSentence({ id: 275, language: lang, category: cat, target: '베개 하나 더 주세요.', pronunciation: 'begae hana deo juseyo', helper: 'be-gae ha-na deo ju-se-yo', meaning: '請再給我一個枕頭', usage: '需要更多寢具時', keywords: ['베개', 'begae', 'pillow', 'juseyo'] }),
  makeSentence({ id: 276, language: lang, category: cat, target: '수건 좀 더 주세요.', pronunciation: 'sugeon jom deo juseyo', helper: 'su-geon jom deo ju-se-yo', meaning: '請再給幾條毛巾', usage: '毛巾不夠用時', keywords: ['수건', 'sugeon', 'towel', 'juseyo'] }),
  makeSentence({ id: 277, language: lang, category: cat, target: '일곱 시에 모닝콜 부탁드려요.', pronunciation: 'ilgop sie moningkol butakdeuryeoyo', helper: 'il-gop si-e mo-ning-kol bu-tak-deu-ryeo-yo', meaning: '請七點叫醒我', usage: '請飯店早上電話叫醒', keywords: ['모닝콜', 'moningkol', 'morning call', 'ilgop si'] }),
  makeSentence({ id: 278, language: lang, category: cat, target: '룸키를 잃어버렸어요.', pronunciation: 'rumkireul ireobeoryeosseoyo', helper: 'rum-ki-reul i-reo-beo-ryeo-sseo-yo', meaning: '我把房卡弄丟了', usage: '房卡遺失向櫃檯求助', keywords: ['룸키', 'rumki', 'room key', 'ireobeoryeo'] }),
  makeSentence({ id: 279, language: lang, category: cat, target: '엘리베이터가 어디예요?', pronunciation: 'ellibeiteoga eodiyeyo?', helper: 'el-li-be-i-teo-ga eo-di-ye-yo', meaning: '電梯在哪裡？', usage: '在大廳找電梯', keywords: ['엘리베이터', 'ellibeiteo', 'elevator'] }),
  makeSentence({ id: 280, language: lang, category: cat, target: '조식 포함이에요?', pronunciation: 'josik pohamieyo?', helper: 'jo-sik po-ham-i-e-yo', meaning: '有含早餐嗎？', usage: '確認訂房是否含早餐', keywords: ['조식', 'josik', 'breakfast', 'poham'] }),
  makeSentence({ id: 281, language: lang, category: cat, target: '변환 플러그 있어요?', pronunciation: 'byeonhwan peulgeop isseoyo?', helper: 'byeon-hwan peul-geop i-sseo-yo', meaning: '有轉接頭嗎？', usage: '台灣插頭不合時借用', keywords: ['변환', 'byeonhwan', 'adapter', 'peulgeop'] }),
  makeSentence({ id: 282, language: lang, category: cat, target: '체크아웃은 몇 시예요?', pronunciation: 'chekeu-auteun myeot siyeyo?', helper: 'che-keu-au-teun myeot si-ye-yo', meaning: '幾點退房？', usage: '確認退房時間', keywords: ['체크아웃', 'chekeuaut', 'myeot si', 'checkout'] }),
  makeSentence({ id: 283, language: lang, category: cat, target: 'Wi-Fi가 안 돼요.', pronunciation: 'Wi-Figa an dwaeyo', helper: 'Wi-Fi-ga an dwae-yo', meaning: 'Wi-Fi 連不上', usage: '網路連不上時', keywords: ['wifi', 'wi-fi', 'an dwaeyo', 'not working'] }),
  makeSentence({ id: 284, language: lang, category: cat, target: '하루 더 묵고 싶어요.', pronunciation: 'haru deo mukgo sipeoyo', helper: 'ha-ru deo muk-go si-peo-yo', meaning: '我想多住一晚', usage: '想延長住宿時', keywords: ['하루 더', 'haru deo', 'extend', 'mukgo'] }),
]
