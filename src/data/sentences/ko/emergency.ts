import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = 'emergency' as const

export const emergencyKo: Sentence[] = [
  makeSentence({ id: 351, language: lang, category: cat, target: '도와주세요.', pronunciation: 'dowajuseyo', helper: 'do-wa-ju-se-yo', meaning: '請幫幫我', usage: '遇到困難或危險時求助', keywords: ['도와', 'dowa', 'help', 'dowajuseyo'] }),
  makeSentence({ id: 352, language: lang, category: cat, target: '길을 잃었어요.', pronunciation: 'gireul ireosseoyo', helper: 'gi-reul i-reo-sseo-yo', meaning: '我迷路了', usage: '找不到路時向路人求助', keywords: ['길', 'gil', 'lost', 'ireosseoyo'] }),
  makeSentence({ id: 353, language: lang, category: cat, target: '몸 상태가 안 좋아요.', pronunciation: 'mom sangtaega an joayo', helper: 'mom sang-tae-ga an jo-a-yo', meaning: '我身體不舒服', usage: '身體不適時說明狀況', keywords: ['몸', 'mom', 'sangtae', 'not well'] }),
  makeSentence({ id: 354, language: lang, category: cat, target: '구급차 불러 주세요.', pronunciation: 'gugeupcha bulleo juseyo', helper: 'gu-geup-cha bul-leo ju-se-yo', meaning: '請叫救護車', usage: '嚴重受傷或急病時', keywords: ['구급차', 'gugeupcha', 'ambulance'] }),
  makeSentence({ id: 355, language: lang, category: cat, target: '경찰 불러 주세요.', pronunciation: 'gyeongchal bulleo juseyo', helper: 'gyeong-chal bul-leo ju-se-yo', meaning: '請叫警察', usage: '遭遇竊盜或危險時', keywords: ['경찰', 'gyeongchal', 'police'] }),
  makeSentence({ id: 356, language: lang, category: cat, target: '지갑을 잃어버렸어요.', pronunciation: 'jigabeul ireobeoryeosseoyo', helper: 'ji-ga-beul i-reo-beo-ryeo-sseo-yo', meaning: '我遺失了錢包', usage: '錢包遺失向警察或櫃檯求助', keywords: ['지갑', 'jigap', 'wallet', 'ireobeoryeo'] }),
  makeSentence({ id: 357, language: lang, category: cat, target: '여권을 잃어버렸어요.', pronunciation: 'yeogwoneul ireobeoryeosseoyo', helper: 'yeo-gwon-eul i-reo-beo-ryeo-sseo-yo', meaning: '我遺失了護照', usage: '護照遺失，緊急求助', keywords: ['여권', 'yeogwon', 'passport', 'lost'] }),
  makeSentence({ id: 358, language: lang, category: cat, target: '휴대폰을 잃어버렸어요.', pronunciation: 'hyudaeponeul ireobeoryeosseoyo', helper: 'hyu-dae-pon-eul i-reo-beo-ryeo-sseo-yo', meaning: '我手機弄丟了', usage: '手機遺失時說明', keywords: ['휴대폰', 'hyudaepone', 'phone', 'lost'] }),
  makeSentence({ id: 359, language: lang, category: cat, target: '휴대폰 배터리가 다 됐어요.', pronunciation: 'hyudaepone baeteoriga da dwaesseoyo', helper: 'hyu-dae-pon bae-teo-ri-ga da dwaet-sseo-yo', meaning: '我手機沒電了', usage: '需要充電或借電話時', keywords: ['배터리', 'baeteori', 'battery', 'dead'] }),
  makeSentence({ id: 360, language: lang, category: cat, target: '병원에 가고 싶어요.', pronunciation: 'byeongwone gago sipeoyo', helper: 'byeong-won-e ga-go si-peo-yo', meaning: '我想看醫生', usage: '身體不舒服需要醫療', keywords: ['병원', 'byeongwon', 'doctor', 'hospital'] }),
  makeSentence({ id: 361, language: lang, category: cat, target: '알레르기가 생겼어요.', pronunciation: 'allereugiga saenggyeosseoyo', helper: 'al-le-reu-gi-ga saeng-gyeot-sseo-yo', meaning: '我過敏了', usage: '食物或藥物過敏緊急狀況', keywords: ['알레르기', 'allereugi', 'allergy'] }),
  makeSentence({ id: 362, language: lang, category: cat, target: '가장 가까운 병원이 어디예요?', pronunciation: 'gajang gakkaun byeongwoni eodiyeyo?', helper: 'ga-jang gak-kaun byeong-won-i eo-di-ye-yo', meaning: '最近的醫院在哪？', usage: '需要就醫時找醫院', keywords: ['병원', 'byeongwon', 'hospital', 'gakkaun'] }),
  makeSentence({ id: 363, language: lang, category: cat, target: '호텔에 연락해 주세요.', pronunciation: 'hotere yeollakhae juseyo', helper: 'ho-te-re yeon-rak-hae ju-se-yo', meaning: '請聯絡我的飯店', usage: '緊急時請人幫忙打給飯店', keywords: ['호텔', 'hoter', 'hotel', 'yeollak'] }),
  makeSentence({ id: 364, language: lang, category: cat, target: '가방을 도둑맞았어요.', pronunciation: 'gabangeul dodukmajasseoyo', helper: 'ga-bang-eul do-dung-ma-jat-sseo-yo', meaning: '我的包包被偷了', usage: '遭遇竊盜向警察報案', keywords: ['도둑', 'doduk', 'stolen', 'gabang'] }),
  makeSentence({ id: 365, language: lang, category: cat, target: '불이 났어요. 119에 전화해 주세요.', pronunciation: 'buri nasseoyo. 119-e jeonhwahae juseyo', helper: 'bu-ri nat-sseo-yo. 119-e jeon-hwa-hae ju-se-yo', meaning: '失火了，請打 119', usage: '火災緊急狀況（韓國）', keywords: ['불', 'bul', '119', 'fire'] }),
  makeSentence({ id: 366, language: lang, category: cat, target: '전화 좀 빌려 주실 수 있어요?', pronunciation: 'jeonhwa jom billyeo jusil su isseoyo?', helper: 'jeon-hwa jom bil-lyeo ju-sil su i-sseo-yo', meaning: '可以借電話嗎？', usage: '自己手機沒電或遺失時', keywords: ['전화', 'jeonhwa', 'phone', 'billyeo'] }),
  makeSentence({ id: 367, language: lang, category: cat, target: '긴급 전화번호가 뭐예요?', pronunciation: 'gingeup jeonhwabeonhoga mwoyeyo?', helper: 'gin-geup jeon-hwa-beon-ho-ga mwo-ye-yo', meaning: '緊急電話是幾號？', usage: '不知道當地急救電話時', keywords: ['긴급', 'gingeup', 'emergency', '전화번호'] }),
]
