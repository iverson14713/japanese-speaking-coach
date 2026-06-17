import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = 'directions' as const

export const directionsKo: Sentence[] = [
  makeSentence({ id: 241, language: lang, category: cat, target: '역이 어디예요?', pronunciation: 'yeogi eodiyeyo?', helper: 'yeok-i eo-di-ye-yo', meaning: '車站在哪裡？', usage: '問路人或站務人員', keywords: ['역', 'yeok', 'station', 'eodiyeyo'] }),
  makeSentence({ id: 242, language: lang, category: cat, target: '지하철 입구가 어디예요?', pronunciation: 'jihacheol ipguga eodiyeyo?', helper: 'ji-ha-cheol ip-gu-ga eo-di-ye-yo', meaning: '地鐵入口在哪？', usage: '找地鐵站入口時', keywords: ['지하철', 'jihacheol', 'subway', '입구'] }),
  makeSentence({ id: 243, language: lang, category: cat, target: '몇 번 승강장이에요?', pronunciation: 'myeot beon seunggangjangieyo?', helper: 'myeot beon seung-gang-jang-i-e-yo', meaning: '是幾號月台？', usage: '在車站確認搭車月台', keywords: ['승강장', 'seunggangjang', 'platform', 'myeot beon'] }),
  makeSentence({ id: 244, language: lang, category: cat, target: '시내까지 표 한 장 주세요.', pronunciation: 'sinaekkaji pyo han jang juseyo', helper: 'si-nae-kka-ji pyo han jang ju-se-yo', meaning: '請給我一張到市中心的票', usage: '在售票機或櫃檯買票', keywords: ['표', 'pyo', 'ticket', '시내'] }),
  makeSentence({ id: 245, language: lang, category: cat, target: '이 전철 명동에 가요?', pronunciation: 'i jeoncheol myeongdonge gayo?', helper: 'i jeon-cheol myeong-dong-e ga-yo', meaning: '這班地鐵到明洞嗎？', usage: '確認車次方向，站名可替換', keywords: ['전철', 'jeoncheol', '명동', 'myeongdong'] }),
  makeSentence({ id: 246, language: lang, category: cat, target: '이 버스 시내 가요?', pronunciation: 'i beoseu sinae gayo?', helper: 'i beo-seu si-nae ga-yo', meaning: '這班公車到市中心嗎？', usage: '在公車站確認路線', keywords: ['버스', 'beoseu', 'bus', '시내'] }),
  makeSentence({ id: 247, language: lang, category: cat, target: '어디서 갈아타요?', pronunciation: 'eodiseo garatayo?', helper: 'eo-di-seo ga-ra-ta-yo', meaning: '在哪裡轉車？', usage: '需要換線或換車時', keywords: ['갈아타', 'garata', 'transfer', 'eodiseo'] }),
  makeSentence({ id: 248, language: lang, category: cat, target: '얼마나 걸려요?', pronunciation: 'eolmana geollyeoyo?', helper: 'eol-ma-na geol-lyeo-yo', meaning: '要多久？', usage: '問路程或車程時間', keywords: ['얼마나', 'eolmana', 'how long', 'geollyeoyo'] }),
  makeSentence({ id: 249, language: lang, category: cat, target: '요금이 얼마예요?', pronunciation: 'yogeumi eolmayeyo?', helper: 'yo-geum-i eol-ma-ye-yo', meaning: '車資多少？', usage: '買票前確認價格', keywords: ['요금', 'yogeum', 'fare', 'eolma'] }),
  makeSentence({ id: 250, language: lang, category: cat, target: '공항에 가고 싶어요.', pronunciation: 'gonghange gago sipeoyo', helper: 'gong-hang-e ga-go si-peo-yo', meaning: '我想去機場', usage: '向站務或司機說明目的地', keywords: ['공항', 'gonghang', 'airport', 'sipeoyo'] }),
  makeSentence({ id: 251, language: lang, category: cat, target: '여기서 택시 탈 수 있어요?', pronunciation: 'yeogiseo taeksi tal su isseoyo?', helper: 'yeo-gi-seo taek-si tal su i-sseo-yo', meaning: '這裡可以搭計程車嗎？', usage: '確認能否在此叫車', keywords: ['택시', 'taeksi', 'taxi', 'yeogiseo'] }),
  makeSentence({ id: 252, language: lang, category: cat, target: '이 주소로 가 주세요.', pronunciation: 'i jusoro ga juseyo', helper: 'i ju-so-ro ga ju-se-yo', meaning: '請帶我去這個地址', usage: '上計程車後出示地址', keywords: ['주소', 'juso', 'address', 'juseyo'] }),
  makeSentence({ id: 253, language: lang, category: cat, target: '여기서 세워 주세요.', pronunciation: 'yeogiseo sewo juseyo', helper: 'yeo-gi-seo se-wo ju-se-yo', meaning: '請在這裡停', usage: '搭計程車或公車時下車', keywords: ['세워', 'sewo', 'stop', 'yeogiseo'] }),
  makeSentence({ id: 254, language: lang, category: cat, target: '직진해 주세요.', pronunciation: 'jikjinhae juseyo', helper: 'jik-jin-hae ju-se-yo', meaning: '請直走', usage: '問路後確認方向', keywords: ['직진', 'jikjin', 'straight', 'juseyo'] }),
  makeSentence({ id: 255, language: lang, category: cat, target: '모퉁이에서 왼쪽으로 가 주세요.', pronunciation: 'motungieseo oenjjogeuro ga juseyo', helper: 'mo-tung-i-e-seo oen-jjok-eu-ro ga ju-se-yo', meaning: '請在轉角左轉', usage: '指路或確認方向', keywords: ['왼쪽', 'oenjjok', 'left', 'motungi'] }),
  makeSentence({ id: 256, language: lang, category: cat, target: '여기서 멀어요?', pronunciation: 'yeogiseo meoreoyo?', helper: 'yeo-gi-seo meo-reo-yo', meaning: '離這裡遠嗎？', usage: '問路程距離', keywords: ['멀', 'meol', 'far', 'meoreoyo'] }),
  makeSentence({ id: 257, language: lang, category: cat, target: '미술관에 어떻게 가요?', pronunciation: 'misulgane eotteoke gayo?', helper: 'mi-sul-gwan-e eot-teo-ke ga-yo', meaning: '怎麼去美術館？', usage: '問路，地點可替換', keywords: ['미술관', 'misulgwan', 'museum', 'eotteoke'] }),
  makeSentence({ id: 258, language: lang, category: cat, target: '출구가 어디예요?', pronunciation: 'chulguga eodiyeyo?', helper: 'chul-gu-ga eo-di-ye-yo', meaning: '出口在哪裡？', usage: '在車站或商場找出口', keywords: ['출구', 'chulgu', 'exit', 'eodiyeyo'] }),
  makeSentence({ id: 259, language: lang, category: cat, target: '이 길 맞아요?', pronunciation: 'i gil marayo?', helper: 'i gil ma-ra-yo', meaning: '這條路走對了嗎？', usage: '途中確認方向是否正確', keywords: ['길', 'gil', 'road', 'marayo'] }),
  makeSentence({ id: 260, language: lang, category: cat, target: '정거장을 지나친 것 같아요.', pronunciation: 'jeonggeojangeul jinachin geot gatayo', helper: 'jeong-geo-jang-eul ji-na-chin geot ga-ta-yo', meaning: '我好像坐過站了', usage: '搭車坐過站時跟司機說', keywords: ['지나친', 'jinachin', 'missed', '정거장'] }),
  makeSentence({ id: 261, language: lang, category: cat, target: '지도에서 알려 주실 수 있어요?', pronunciation: 'jidoeseo allyeo jusil su isseoyo?', helper: 'ji-do-e-seo al-lyeo ju-sil su i-sseo-yo', meaning: '可以在地圖上指給我看嗎？', usage: '語言不通時請對方指地圖', keywords: ['지도', 'jido', 'map', 'allyeo'] }),
  makeSentence({ id: 262, language: lang, category: cat, target: '이 버스 정류장 맞아요?', pronunciation: 'i beoseu jeongnyujang marayo?', helper: 'i beo-seu jeong-nyu-jang ma-ra-yo', meaning: '這個公車站對嗎？', usage: '確認公車站是否正確', keywords: ['정류장', 'jeongnyujang', 'bus stop', 'beoseu'] }),
]
