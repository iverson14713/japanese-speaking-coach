import { mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../src/data/sentences/ko')
mkdirSync(outDir, { recursive: true })

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function line(s) {
  const parts = [
    `id: ${s.id}`,
    'language: lang',
    'category: cat',
    `target: '${esc(s.t)}'`,
    `pronunciation: '${esc(s.p)}'`,
    `helper: '${esc(s.h)}'`,
    `meaning: '${esc(s.m)}'`,
    `usage: '${esc(s.u)}'`,
    `keywords: [${s.k.map((w) => `'${esc(w)}'`).join(', ')}]`,
  ]
  if (s.words) {
    parts.push(
      `words: [${s.words.map((w) => `{ word: '${esc(w.w)}', meaning: '${esc(w.m)}' }`).join(', ')}]`,
    )
  }
  if (s.chunks) {
    parts.push(
      `chunks: [${s.chunks.map((c) => `{ text: '${esc(c.t)}', pronunciation: '${esc(c.p)}', chinese: '${esc(c.m)}' }`).join(', ')}]`,
    )
  }
  return `  makeSentence({ ${parts.join(', ')} }),`
}

const categories = [
  {
    file: 'first-conversation',
    export: 'firstConversationKo',
    cat: 'first-conversation',
    sentences: [
      { id: 201, t: '안녕하세요.', p: 'annyeonghaseyo', h: 'annyeong-haseyo', m: '你好', u: '打招呼最常用', k: ['안녕', '안녕하세요', 'annyeonghaseyo'] },
      { id: 202, t: '처음 뵙겠습니다.', p: 'cheoeum boepgetseumnida', h: 'cheoeum boep-get-seum-ni-da', m: '初次見面', u: '第一次見面、自我介紹開場', k: ['처음', '뵙겠습니다', 'cheoeum', 'boepgetseumnida'] },
      { id: 203, t: '대만에서 왔어요.', p: 'daeman-eseo wasseoyo', h: 'dae-man-e-seo wa-sseo-yo', m: '我來自台灣', u: '自我介紹時說明來自哪裡', k: ['대만', 'daeman', 'taiwan', 'wasseoyo'], words: [{ w: '대만에서', m: '從台灣' }, { w: '왔어요', m: '來了' }], chunks: [{ t: '대만에서', p: 'daeman-eseo', m: '從台灣' }, { t: '왔어요', p: 'wasseoyo', m: '來了' }] },
      { id: 204, t: '죄송해요, 한국어를 잘 못해요.', p: 'joesonghaeyo, hangugeoreul jal mothaeyo', h: 'joe-song-hae-yo, han-gu-geo-reul jal mot-hae-yo', m: '不好意思，我不太會說韓文', u: '請對方諒解、說話慢一點', k: ['한국어', 'hangugeo', '잘 못해요', 'mothaeyo'] },
      { id: 205, t: '좀 더 천천히 말씀해 주세요.', p: 'jom deo cheoncheonhi malsseumhae juseyo', h: 'jom deo cheon-cheon-hi mal-sseum-hae ju-se-yo', m: '可以請您說慢一點嗎？', u: '聽不懂時請對方放慢速度', k: ['천천히', 'cheoncheonhi', 'slowly', '말씀해'] },
      { id: 206, t: '죄송한데, 잘 못 알아들었어요.', p: 'joesonghande, jal mot aradeureosseoyo', h: 'joe-song-han-de, jal mot a-ra-deu-reo-sseo-yo', m: '不好意思，我聽不懂', u: '聽不懂對方說什麼時', k: ['알아들', 'aradeul', '못 알아들', 'joesonghande'] },
      { id: 207, t: '한 번 더 말씀해 주세요.', p: 'han beon deo malsseumhae juseyo', h: 'han beon deo mal-sseum-hae ju-se-yo', m: '請再說一次', u: '沒聽清楚，請對方重複', k: ['한 번 더', 'han beon deo', 'again', 'malsseumhae'] },
      { id: 208, t: '다시 한번 말해 주세요.', p: 'dasi hanbeon malhae juseyo', h: 'da-si han-beon mal-hae ju-se-yo', m: '請再說一遍', u: '請對方重複剛才的話', k: ['다시', 'dasi', '한번', 'malhae'] },
      { id: 209, t: '이게 무슨 뜻이에요?', p: 'ige museun tteusieyo?', h: 'i-ge mu-seun tteu-si-e-yo', m: '這是什麼意思？', u: '聽到不懂的單字或句子時', k: ['무슨 뜻', 'museun tteut', 'meaning', 'ige'] },
      { id: 210, t: '적어 주실 수 있어요?', p: 'jeogeo jusil su isseoyo?', h: 'jeo-geo ju-sil su i-sseo-yo', m: '可以寫下來嗎？', u: '語言不通時請對方寫字', k: ['적어', 'jeogeo', 'write', 'jusil'] },
      { id: 211, t: '처음 왔어요.', p: 'cheoeum wasseoyo', h: 'cheo-eum wa-sseo-yo', m: '我是第一次來', u: '聊天時說明自己是新手旅客', k: ['처음', 'cheoeum', 'first time', 'wasseoyo'] },
      { id: 212, t: '관광하러 왔어요.', p: 'gwanggwanghareo wasseoyo', h: 'gwang-gwang-ha-reo wa-sseo-yo', m: '我是來觀光的', u: '說明來韓國的目的', k: ['관광', 'gwanggwang', 'tourism', 'wasseoyo'] },
      { id: 213, t: '감사합니다.', p: 'gamsahamnida', h: 'gam-sa-ham-ni-da', m: '謝謝', u: '日常感謝最常用', k: ['감사', 'gamsa', 'gamsahamnida', 'thanks'] },
      { id: 214, t: '정말 감사합니다.', p: 'jeongmal gamsahamnida', h: 'jeong-mal gam-sa-ham-ni-da', m: '非常謝謝您', u: '對方幫了大忙時', k: ['정말', 'jeongmal', 'gamsahamnida'] },
      { id: 215, t: '실례합니다.', p: 'sillyehamnida', h: 'sil-lye-ham-ni-da', m: '不好意思／借過', u: '搭話前或輕微打擾別人時', k: ['실례', 'sillye', 'sillyehamnida', 'excuse me'] },
      { id: 216, t: '죄송합니다.', p: 'joesonghamnida', h: 'joe-song-ham-ni-da', m: '對不起', u: '不小心碰到人或做錯事時', k: ['죄송', 'joesong', 'joesonghamnida', 'sorry'] },
      { id: 217, t: '중국어 하실 수 있어요?', p: 'junggugeo hasil su isseoyo?', h: 'jung-gu-geo ha-sil su i-sseo-yo', m: '您會說中文嗎？', u: '韓文溝通困難時試著找中文', k: ['중국어', 'junggugeo', 'chinese', 'hasil'] },
      { id: 218, t: '안녕히 가세요, 또 봐요.', p: 'annyeonghi gaseyo, tto bwayo', h: 'an-nyeong-hi ga-se-yo, tto bwa-yo', m: '再見，下次見', u: '結束對話、離開時', k: ['안녕히', 'annyeonghi', '또 봐요', 'gaseyo'] },
    ],
  },
  {
    file: 'pharmacy',
    export: 'pharmacyKo',
    cat: 'pharmacy',
    sentences: [
      { id: 219, t: '가까운 약국이 어디예요?', p: 'gakkaun yakgugi eodiyeyo?', h: 'gak-kaun yak-guk-i eo-di-ye-yo', m: '最近的藥局在哪？', u: '需要買藥時問路', k: ['약국', 'yakguk', 'pharmacy', 'eodiyeyo'] },
      { id: 220, t: '두통약 있어요?', p: 'dutongyak isseoyo?', h: 'du-tong-yak i-sseo-yo', m: '有頭痛藥嗎？', u: '在藥局描述簡單症狀', k: ['두통', 'dutong', 'headache', 'yak'] },
      { id: 221, t: '감기약이 필요해요.', p: 'gamgiyagi piryohaeyo', h: 'gam-gi-yak-i pi-ryo-hae-yo', m: '我需要感冒藥', u: '說明需要感冒相關藥品', k: ['감기', 'gamgi', 'cold', 'gamgiyak'] },
      { id: 222, t: '밴드 있어요?', p: 'baendeu isseoyo?', h: 'baen-deu i-sseo-yo', m: '有OK繃嗎？', u: '買創可貼或繃帶', k: ['밴드', 'baendeu', 'bandage', 'band'] },
      { id: 223, t: '목이 아파요.', p: 'mogi apayo', h: 'mo-gi a-pa-yo', m: '我喉嚨痛', u: '向店員描述症狀', k: ['목', 'mogi', 'throat', 'apayo'] },
      { id: 224, t: '이거 어른용이에요, 아이용이에요?', p: 'igeo eoreun-yongieyo, ai-yongieyo?', h: 'i-geo eo-reun-yong-i-e-yo, a-i-yong-i-e-yo', m: '這是給大人還是小孩用的？', u: '確認藥品適用對象', k: ['어른', 'eoreun', '아이', 'ai'] },
      { id: 225, t: '하루에 몇 번 먹어야 해요?', p: 'harue myeot beon meogeoya haeyo?', h: 'ha-ru-e myeot beon meo-geo-ya hae-yo', m: '一天要吃幾次？', u: '確認用藥方式', k: ['하루', 'haru', '몇 번', 'myeot beon'] },
      { id: 226, t: '처방전 필요해요?', p: 'cheobangjeon piryohaeyo?', h: 'cheo-bang-jeon pi-ryo-hae-yo', m: '需要處方籤嗎？', u: '確認是否為處方藥', k: ['처방전', 'cheobangjeon', 'prescription'] },
      { id: 227, t: '선크림 어디에 있어요?', p: 'seokeurim eodie isseoyo?', h: 'seon-keu-rim eo-di-e i-sseo-yo', m: '防曬乳在哪裡？', u: '在藥妝店找防曬用品', k: ['선크림', 'seokeurim', 'sunscreen'] },
      { id: 228, t: '마스크 있어요?', p: 'maseukeu isseoyo?', h: 'ma-seu-keu i-sseo-yo', m: '有口罩嗎？', u: '購買口罩或日用品', k: ['마스크', 'maseukeu', 'mask'] },
      { id: 229, t: '테스트해 봐도 돼요?', p: 'teseuteuhae boado dwaeyo?', h: 'te-seu-teu-hae bo-a-do dae-yo', m: '可以試用嗎？', u: '試用化妝品或保養品', k: ['테스트', 'teseuteu', 'try', 'boado'] },
      { id: 230, t: '민감한 피부에도 괜찮아요?', p: 'mingamhan pibuedo gwaenchanayo?', h: 'min-gam-han pi-bu-e-do gwaen-cha-na-yo', m: '敏感肌也能用嗎？', u: '購買保養品前確認', k: ['민감', 'mingam', '피부', 'pibu'] },
      { id: 231, t: '더 작은 사이즈 있어요?', p: 'deo jageun saijeu isseoyo?', h: 'deo ja-geun sa-i-jeu i-sseo-yo', m: '有更小的包裝嗎？', u: '旅行想買小容量試用品', k: ['작은', 'jageun', '사이즈', 'saijeu'] },
      { id: 232, t: '면세 되나요?', p: 'myeonse doenayo?', h: 'myeon-se doe-na-yo', m: '可以免稅嗎？', u: '確認商品是否符合免稅', k: ['면세', 'myeonse', 'tax free'] },
      { id: 233, t: '면세점 어디예요?', p: 'myeonsejeom eodiyeyo?', h: 'myeon-se-jeom eo-di-ye-yo', m: '免稅店在哪裡？', u: '在機場或市區找免稅店', k: ['면세점', 'myeonsejeom', 'duty free'] },
      { id: 234, t: '면세 처리해 주세요.', p: 'myeonse cheorihae juseyo', h: 'myeon-se cheo-ri-hae ju-se-yo', m: '請幫我辦免稅手續', u: '購物後辦理免稅', k: ['면세', 'myeonse', '처리', 'cheori'] },
      { id: 235, t: '카드로 결제할 수 있어요?', p: 'kadeuro gyeoljehal su isseoyo?', h: 'ka-deu-ro gyeol-je-hal su i-sseo-yo', m: '可以刷卡嗎？', u: '在藥妝店結帳時', k: ['카드', 'kadeu', 'card', 'gyeolje'] },
      { id: 236, t: '봉투 주세요.', p: 'bongtu juseyo', h: 'bong-tu ju-se-yo', m: '請給我袋子', u: '購買後需要袋子', k: ['봉투', 'bongtu', 'bag'] },
      { id: 237, t: '추천해 주실 만한 게 뭐예요?', p: 'chucheonhae jusil manhan ge mwoyeyo?', h: 'chu-cheon-hae ju-sil man-han ge mwo-ye-yo', m: '有什麼推薦的？', u: '請店員推薦熱門商品', k: ['추천', 'chucheon', 'recommend'] },
      { id: 238, t: '한국 제품이에요?', p: 'hanguk jepumieyo?', h: 'han-guk je-pum-i-e-yo', m: '這是韓國製的嗎？', u: '確認產地', k: ['한국', 'hanguk', 'korea', 'jepum'] },
      { id: 239, t: '이거 얼마예요?', p: 'igeo eolmayeyo?', h: 'i-geo eol-ma-ye-yo', m: '這個多少錢？', u: '詢問藥妝商品價格', k: ['얼마', 'eolma', 'how much', 'igeo'] },
      { id: 240, t: '이걸로 주세요.', p: 'igeollo juseyo', h: 'i-geol-lo ju-se-yo', m: '我要這個', u: '決定購買時指著商品說', k: ['이걸로', 'igeollo', 'juseyo', 'this'] },
    ],
  },
  {
    file: 'directions',
    export: 'directionsKo',
    cat: 'directions',
    sentences: [
      { id: 241, t: '역이 어디예요?', p: 'yeogi eodiyeyo?', h: 'yeok-i eo-di-ye-yo', m: '車站在哪裡？', u: '問路人或站務人員', k: ['역', 'yeok', 'station', 'eodiyeyo'] },
      { id: 242, t: '지하철 입구가 어디예요?', p: 'jihacheol ipguga eodiyeyo?', h: 'ji-ha-cheol ip-gu-ga eo-di-ye-yo', m: '地鐵入口在哪？', u: '找地鐵站入口時', k: ['지하철', 'jihacheol', 'subway', '입구'] },
      { id: 243, t: '몇 번 승강장이에요?', p: 'myeot beon seunggangjangieyo?', h: 'myeot beon seung-gang-jang-i-e-yo', m: '是幾號月台？', u: '在車站確認搭車月台', k: ['승강장', 'seunggangjang', 'platform', 'myeot beon'] },
      { id: 244, t: '시내까지 표 한 장 주세요.', p: 'sinaekkaji pyo han jang juseyo', h: 'si-nae-kka-ji pyo han jang ju-se-yo', m: '請給我一張到市中心的票', u: '在售票機或櫃檯買票', k: ['표', 'pyo', 'ticket', '시내'] },
      { id: 245, t: '이 전철 명동에 가요?', p: 'i jeoncheol myeongdonge gayo?', h: 'i jeon-cheol myeong-dong-e ga-yo', m: '這班地鐵到明洞嗎？', u: '確認車次方向，站名可替換', k: ['전철', 'jeoncheol', '명동', 'myeongdong'] },
      { id: 246, t: '이 버스 시내 가요?', p: 'i beoseu sinae gayo?', h: 'i beo-seu si-nae ga-yo', m: '這班公車到市中心嗎？', u: '在公車站確認路線', k: ['버스', 'beoseu', 'bus', '시내'] },
      { id: 247, t: '어디서 갈아타요?', p: 'eodiseo garatayo?', h: 'eo-di-seo ga-ra-ta-yo', m: '在哪裡轉車？', u: '需要換線或換車時', k: ['갈아타', 'garata', 'transfer', 'eodiseo'] },
      { id: 248, t: '얼마나 걸려요?', p: 'eolmana geollyeoyo?', h: 'eol-ma-na geol-lyeo-yo', m: '要多久？', u: '問路程或車程時間', k: ['얼마나', 'eolmana', 'how long', 'geollyeoyo'] },
      { id: 249, t: '요금이 얼마예요?', p: 'yogeumi eolmayeyo?', h: 'yo-geum-i eol-ma-ye-yo', m: '車資多少？', u: '買票前確認價格', k: ['요금', 'yogeum', 'fare', 'eolma'] },
      { id: 250, t: '공항에 가고 싶어요.', p: 'gonghange gago sipeoyo', h: 'gong-hang-e ga-go si-peo-yo', m: '我想去機場', u: '向站務或司機說明目的地', k: ['공항', 'gonghang', 'airport', 'sipeoyo'] },
      { id: 251, t: '여기서 택시 탈 수 있어요?', p: 'yeogiseo taeksi tal su isseoyo?', h: 'yeo-gi-seo taek-si tal su i-sseo-yo', m: '這裡可以搭計程車嗎？', u: '確認能否在此叫車', k: ['택시', 'taeksi', 'taxi', 'yeogiseo'] },
      { id: 252, t: '이 주소로 가 주세요.', p: 'i jusoro ga juseyo', h: 'i ju-so-ro ga ju-se-yo', m: '請帶我去這個地址', u: '上計程車後出示地址', k: ['주소', 'juso', 'address', 'juseyo'] },
      { id: 253, t: '여기서 세워 주세요.', p: 'yeogiseo sewo juseyo', h: 'yeo-gi-seo se-wo ju-se-yo', m: '請在這裡停', u: '搭計程車或公車時下車', k: ['세워', 'sewo', 'stop', 'yeogiseo'] },
      { id: 254, t: '직진해 주세요.', p: 'jikjinhae juseyo', h: 'jik-jin-hae ju-se-yo', m: '請直走', u: '問路後確認方向', k: ['직진', 'jikjin', 'straight', 'juseyo'] },
      { id: 255, t: '모퉁이에서 왼쪽으로 가 주세요.', p: 'motungieseo oenjjogeuro ga juseyo', h: 'mo-tung-i-e-seo oen-jjok-eu-ro ga ju-se-yo', m: '請在轉角左轉', u: '指路或確認方向', k: ['왼쪽', 'oenjjok', 'left', 'motungi'] },
      { id: 256, t: '여기서 멀어요?', p: 'yeogiseo meoreoyo?', h: 'yeo-gi-seo meo-reo-yo', m: '離這裡遠嗎？', u: '問路程距離', k: ['멀', 'meol', 'far', 'meoreoyo'] },
      { id: 257, t: '미술관에 어떻게 가요?', p: 'misulgane eotteoke gayo?', h: 'mi-sul-gwan-e eot-teo-ke ga-yo', m: '怎麼去美術館？', u: '問路，地點可替換', k: ['미술관', 'misulgwan', 'museum', 'eotteoke'] },
      { id: 258, t: '출구가 어디예요?', p: 'chulguga eodiyeyo?', h: 'chul-gu-ga eo-di-ye-yo', m: '出口在哪裡？', u: '在車站或商場找出口', k: ['출구', 'chulgu', 'exit', 'eodiyeyo'] },
      { id: 259, t: '이 길 맞아요?', p: 'i gil marayo?', h: 'i gil ma-ra-yo', m: '這條路走對了嗎？', u: '途中確認方向是否正確', k: ['길', 'gil', 'road', 'marayo'] },
      { id: 260, t: '정거장을 지나친 것 같아요.', p: 'jeonggeojangeul jinachin geot gatayo', h: 'jeong-geo-jang-eul ji-na-chin geot ga-ta-yo', m: '我好像坐過站了', u: '搭車坐過站時跟司機說', k: ['지나친', 'jinachin', 'missed', '정거장'] },
      { id: 261, t: '지도에서 알려 주실 수 있어요?', p: 'jidoeseo allyeo jusil su isseoyo?', h: 'ji-do-e-seo al-lyeo ju-sil su i-sseo-yo', m: '可以在地圖上指給我看嗎？', u: '語言不通時請對方指地圖', k: ['지도', 'jido', 'map', 'allyeo'] },
      { id: 262, t: '이 버스 정류장 맞아요?', p: 'i beoseu jeongnyujang marayo?', h: 'i beo-seu jeong-nyu-jang ma-ra-yo', m: '這個公車站對嗎？', u: '確認公車站是否正確', k: ['정류장', 'jeongnyujang', 'bus stop', 'beoseu'] },
    ],
  },
  {
    file: 'hotel',
    export: 'hotelKo',
    cat: 'hotel',
    sentences: [
      { id: 263, t: '체크인하고 싶어요.', p: 'chekeu-inhago sipeoyo', h: 'che-keu-in-ha-go si-peo-yo', m: '我要辦理入住', u: '到飯店櫃檯時', k: ['체크인', 'chekeuin', 'check in', 'sipeoyo'] },
      { id: 264, t: '예약했어요.', p: 'yeyakhaesseoyo', h: 'ye-yak-hae-sseo-yo', m: '我有預約', u: '到櫃檯說明已訂房', k: ['예약', 'yeyak', 'reservation', 'yeyakhaesseoyo'] },
      { id: 265, t: '예약자 이름은 린입니다.', p: 'yeyakja ireumeun rimimnida', h: 'ye-yak-ja i-reum-eun rim-im-ni-da', m: '預約名字是 Lin', u: '報訂房姓名，可換成你的名字', k: ['예약자', 'yeyakja', '이름', 'ireum'] },
      { id: 266, t: '여권입니다.', p: 'yeogwonimnida', h: 'yeo-gwon-im-ni-da', m: '這是我的護照', u: '入住時櫃檯要求證件', k: ['여권', 'yeogwon', 'passport'] },
      { id: 267, t: '일찍 체크인할 수 있어요?', p: 'iljjik chekeu-inhal su isseoyo?', h: 'il-jjik che-keu-in-hal su i-sseo-yo', m: '可以提早入住嗎？', u: '提早到飯店想先進房', k: ['일찍', 'iljjik', 'early', 'chekeuin'] },
      { id: 268, t: '늦게 체크아웃할 수 있어요?', p: 'neutge chekeu-outhal su isseoyo?', h: 'neut-ge che-keu-au-hal su i-sseo-yo', m: '可以晚一點退房嗎？', u: '想延後退房時間', k: ['늦게', 'neutge', 'late checkout', 'chekeuaut'] },
      { id: 269, t: '짐 맡아 주실 수 있어요?', p: 'jim mat-a jusil su isseoyo?', h: 'jim mat-a ju-sil su i-sseo-yo', m: '可以寄放行李嗎？', u: '入住前或退房後寄行李', k: ['짐', 'jim', 'luggage', 'mat-a'] },
      { id: 270, t: '체크아웃하고 싶어요.', p: 'chekeu-outhago sipeoyo', h: 'che-keu-au-ha-go si-peo-yo', m: '我要退房', u: '離開飯店辦理退房', k: ['체크아웃', 'chekeuaut', 'checkout', 'sipeoyo'] },
      { id: 271, t: '방이 깨끗하지 않아요.', p: 'bangi kkaekkeuthaji anayo', h: 'bang-i kkaek-keut-ha-ji a-na-yo', m: '房間沒有打掃乾淨', u: '房間清潔有問題時', k: ['방', 'bang', 'room', 'kkaekkeut'] },
      { id: 272, t: '에어컨이 고장 났어요.', p: 'eeokeoni gojang nasseoyo', h: 'eeo-keon-i go-jang nat-sseo-yo', m: '冷氣壞了', u: '房間設備故障時', k: ['에어컨', 'eeokeon', 'aircon', 'gojang'] },
      { id: 273, t: '따뜻한 물이 안 나와요.', p: 'ttatteuthan muri an nawayo', h: 'tta-tteu-than mu-ri an na-wa-yo', m: '沒有熱水', u: '洗澡沒熱水時向櫃檯反映', k: ['따뜻한 물', 'ttatteuthan mul', 'hot water', 'nawayo'] },
      { id: 274, t: 'Wi-Fi 비밀번호가 뭐예요?', p: 'Wi-Fi bimilbeonhoga mwoyeyo?', h: 'Wi-Fi bi-mil-beon-ho-ga mwo-ye-yo', m: 'Wi-Fi 密碼是什麼？', u: '入住後連網路', k: ['wifi', 'wi-fi', '비밀번호', 'bimilbeonho'] },
      { id: 275, t: '베개 하나 더 주세요.', p: 'begae hana deo juseyo', h: 'be-gae ha-na deo ju-se-yo', m: '請再給我一個枕頭', u: '需要更多寢具時', k: ['베개', 'begae', 'pillow', 'juseyo'] },
      { id: 276, t: '수건 좀 더 주세요.', p: 'sugeon jom deo juseyo', h: 'su-geon jom deo ju-se-yo', m: '請再給幾條毛巾', u: '毛巾不夠用時', k: ['수건', 'sugeon', 'towel', 'juseyo'] },
      { id: 277, t: '일곱 시에 모닝콜 부탁드려요.', p: 'ilgop sie moningkol butakdeuryeoyo', h: 'il-gop si-e mo-ning-kol bu-tak-deu-ryeo-yo', m: '請七點叫醒我', u: '請飯店早上電話叫醒', k: ['모닝콜', 'moningkol', 'morning call', 'ilgop si'] },
      { id: 278, t: '룸키를 잃어버렸어요.', p: 'rumkireul ireobeoryeosseoyo', h: 'rum-ki-reul i-reo-beo-ryeo-sseo-yo', m: '我把房卡弄丟了', u: '房卡遺失向櫃檯求助', k: ['룸키', 'rumki', 'room key', 'ireobeoryeo'] },
      { id: 279, t: '엘리베이터가 어디예요?', p: 'ellibeiteoga eodiyeyo?', h: 'el-li-be-i-teo-ga eo-di-ye-yo', m: '電梯在哪裡？', u: '在大廳找電梯', k: ['엘리베이터', 'ellibeiteo', 'elevator'] },
      { id: 280, t: '조식 포함이에요?', p: 'josik pohamieyo?', h: 'jo-sik po-ham-i-e-yo', m: '有含早餐嗎？', u: '確認訂房是否含早餐', k: ['조식', 'josik', 'breakfast', 'poham'] },
      { id: 281, t: '변환 플러그 있어요?', p: 'byeonhwan peulgeop isseoyo?', h: 'byeon-hwan peul-geop i-sseo-yo', m: '有轉接頭嗎？', u: '台灣插頭不合時借用', k: ['변환', 'byeonhwan', 'adapter', 'peulgeop'] },
      { id: 282, t: '체크아웃은 몇 시예요?', p: 'chekeu-auteun myeot siyeyo?', h: 'che-keu-au-teun myeot si-ye-yo', m: '幾點退房？', u: '確認退房時間', k: ['체크아웃', 'chekeuaut', 'myeot si', 'checkout'] },
      { id: 283, t: 'Wi-Fi가 안 돼요.', p: 'Wi-Figa an dwaeyo', h: 'Wi-Fi-ga an dwae-yo', m: 'Wi-Fi 連不上', u: '網路連不上時', k: ['wifi', 'wi-fi', 'an dwaeyo', 'not working'] },
      { id: 284, t: '하루 더 묵고 싶어요.', p: 'haru deo mukgo sipeoyo', h: 'ha-ru deo muk-go si-peo-yo', m: '我想多住一晚', u: '想延長住宿時', k: ['하루 더', 'haru deo', 'extend', 'mukgo'] },
    ],
  },
  {
    file: 'restaurant',
    export: 'restaurantKo',
    cat: 'restaurant',
    sentences: [
      { id: 285, t: '두 명이에요.', p: 'du myeongieyo', h: 'du myeong-i-e-yo', m: '兩位', u: '進餐廳告訴店員人數', k: ['두 명', 'du myeong', 'two', 'myeong'] },
      { id: 286, t: '예약했어요.', p: 'yeyakhaesseoyo', h: 'ye-yak-hae-sseo-yo', m: '我有預約', u: '有訂位時向接待說明', k: ['예약', 'yeyak', 'reservation'] },
      { id: 287, t: '영어 메뉴 있어요?', p: 'yeongeo menyu isseoyo?', h: 'yeong-eo me-nyu i-sseo-yo', m: '有英文菜單嗎？', u: '看不懂韓文菜單時', k: ['메뉴', 'menyu', 'menu', '영어'] },
      { id: 288, t: '추천 메뉴가 뭐예요?', p: 'chucheon menyuga mwoyeyo?', h: 'chu-cheon me-nyu-ga mwo-ye-yo', m: '有什麼推薦的？', u: '不知道點什麼時問店員', k: ['추천', 'chucheon', 'recommend', 'menyu'] },
      { id: 289, t: '이걸로 주세요.', p: 'igeollo juseyo', h: 'i-geol-lo ju-se-yo', m: '我要這個', u: '點菜時指著菜單或圖片', k: ['이걸로', 'igeollo', 'juseyo', 'this'] },
      { id: 290, t: '안 매운 걸로 주세요.', p: 'an maeun geollo juseyo', h: 'an mae-un geol-lo ju-se-yo', m: '請給我不辣的', u: '點餐時說明口味', k: ['안 매운', 'an maeun', 'not spicy', 'maeun'] },
      { id: 291, t: '너무 맵지 않게 해 주세요.', p: 'neomu maepji anke hae juseyo', h: 'neo-mu maep-ji an-ke hae ju-se-yo', m: '請不要太辣', u: '可以接受微辣時', k: ['맵', 'maep', 'spicy', 'anke'] },
      { id: 292, t: '땅콩 알레르기가 있어요.', p: 'ttangkong allergiga isseoyo', h: 'ttang-kong al-le-reu-gi-ga i-sseo-yo', m: '我對花生過敏', u: '說明食物過敏', k: ['땅콩', 'ttangkong', 'peanut', 'allergi'] },
      { id: 293, t: '갑각류 알레르기가 있어요.', p: 'gapgakryu allergiga isseoyo', h: 'gap-gak-ryu al-le-reu-gi-ga i-sseo-yo', m: '我對海鮮過敏', u: '海鮮過敏時務必說明', k: ['갑각류', 'gapgakryu', 'shellfish', 'allergi'] },
      { id: 294, t: '채식주의자예요.', p: 'chaesikjuuijayeyo', h: 'chae-sik-ju-ui-ja-ye-yo', m: '我是素食者', u: '點餐時說明飲食限制', k: ['채식', 'chaesik', 'vegetarian'] },
      { id: 295, t: '물 좀 주세요.', p: 'mul jom juseyo', h: 'mul jom ju-se-yo', m: '請給我水', u: '點水或要水喝', k: ['물', 'mul', 'water', 'juseyo'] },
      { id: 296, t: '한 잔 더 주세요.', p: 'han jan deo juseyo', h: 'han jan deo ju-se-yo', m: '請再來一杯', u: '飲料喝完想續杯', k: ['한 잔 더', 'han jan deo', 'refill', 'more'] },
      { id: 297, t: '계산해 주세요.', p: 'gyesanhae juseyo', h: 'gye-san-hae ju-se-yo', m: '請結帳', u: '用餐完畢請店員結帳', k: ['계산', 'gyesan', 'check', 'bill'] },
      { id: 298, t: '따로 계산할 수 있어요?', p: 'ttaro gyesanhal su isseoyo?', h: 'tta-ro gye-san-hal su i-sseo-yo', m: '可以分開付嗎？', u: '跟朋友各自付帳', k: ['따로', 'ttaro', 'split', 'gyesan'] },
      { id: 299, t: '포장해 주세요.', p: 'pojanghae juseyo', h: 'po-jang-hae ju-se-yo', m: '請幫我外帶', u: '想把餐點帶走', k: ['포장', 'pojang', 'takeout', 'to go'] },
      { id: 300, t: '봉사료 포함이에요?', p: 'bongsaryo pohamieyo?', h: 'bong-sa-ryo po-ham-i-e-yo', m: '有含服務費嗎？', u: '確認帳單是否含服務費', k: ['봉사료', 'bongsaryo', 'service charge'] },
      { id: 301, t: '저 사람이랑 똑같이 주세요.', p: 'jeo saramirang ttokgati juseyo', h: 'jeo sa-ram-i-rang ttok-ga-ti ju-se-yo', m: '請給我跟他一樣的', u: '跟同伴點相同餐點', k: ['똑같이', 'ttokgati', 'same', 'saram'] },
      { id: 302, t: '양파 빼 주세요.', p: 'yangpa bbae juseyo', h: 'yang-pa bbae ju-se-yo', m: '請不要洋蔥', u: '點餐時去掉配料', k: ['양파', 'yangpa', 'onion', 'bbae'] },
      { id: 303, t: '소금 적게 해 주세요.', p: 'sogeum jeokge hae juseyo', h: 'so-geum jeok-ge hae ju-se-yo', m: '請少鹽一點', u: '調整口味', k: ['소금', 'sogeum', 'salt', 'jeokge'] },
      { id: 304, t: '글루텐 프리예요?', p: 'geulluten peurieyo?', h: 'geul-lu-ten peu-ri-e-yo', m: '這是無麩質的嗎？', u: '麩質過敏或飲食限制時', k: ['글루텐', 'geulluten', 'gluten free'] },
      { id: 305, t: '아직 음식이 안 나왔어요.', p: 'ajik eumsigi an nawasseoyo', h: 'a-jik eum-sik-i an na-wat-sseo-yo', m: '餐點還沒來', u: '等太久時禮貌催促', k: ['음식', 'eumsik', 'food', 'nawasseoyo'] },
      { id: 306, t: '맛있어요.', p: 'masisseoyo', h: 'ma-sit-sseo-yo', m: '很好吃', u: '稱讚料理，跟店員聊天', k: ['맛있', 'masit', 'delicious', 'masisseoyo'] },
      { id: 307, t: '야외석에 앉을 수 있어요?', p: 'yaoeseoge anjeul su isseoyo?', h: 'ya-oe-seok-e an-jeul su i-sseo-yo', m: '可以坐外面嗎？', u: '想坐戶外座位時', k: ['야외', 'yaoe', 'outside', 'anjeul'] },
      { id: 308, t: '대기 시간이 얼마나 걸려요?', p: 'daegi sigani eolmana geollyeoyo?', h: 'dae-gi si-gan-i eol-ma-na geol-lyeo-yo', m: '要等多久？', u: '餐廳需要排隊時', k: ['대기', 'daegi', 'wait', 'geollyeoyo'] },
      { id: 309, t: '카드 되나요?', p: 'kadeu doenayo?', h: 'ka-deu doe-na-yo', m: '可以刷卡嗎？', u: '結帳前確認付款方式', k: ['카드', 'kadeu', 'card', 'doenayo'] },
      { id: 310, t: '메뉴판 좀 보여 주세요.', p: 'menyupan jom boyeo juseyo', h: 'me-nyu-pan jom bo-yeo ju-se-yo', m: '可以看一下菜單嗎？', u: '入座後要菜單', k: ['메뉴', 'menyu', 'menu', 'boyeo'] },
      { id: 311, t: '이거 많이 매워요?', p: 'igeo mani maewoyo?', h: 'i-geo ma-ni mae-wo-yo', m: '這個很辣嗎？', u: '點菜前確認辣度', k: ['매워', 'maewo', 'spicy', 'mani'] },
    ],
  },
  {
    file: 'convenience-store',
    export: 'convenienceStoreKo',
    cat: 'convenience-store',
    sentences: [
      { id: 312, t: '이걸로 주세요.', p: 'igeollo juseyo', h: 'i-geol-lo ju-se-yo', m: '我要這個', u: '結帳時指著商品說', k: ['이걸로', 'igeollo', 'juseyo'] },
      { id: 313, t: '데워 주세요.', p: 'dewo juseyo', h: 'de-wo ju-se-yo', m: '請幫我加熱', u: '買便當或熟食請店員加熱', k: ['데워', 'dewo', 'heat', 'warm'] },
      { id: 314, t: '아이스로 주세요.', p: 'aiseuro juseyo', h: 'a-i-seu-ro ju-se-yo', m: '我要冰的', u: '買飲料時指定要冰的', k: ['아이스', 'aiseu', 'iced', 'cold'] },
      { id: 315, t: '따뜻하게 주세요.', p: 'ttatteuthage juseyo', h: 'tta-tteu-tha-ge ju-se-yo', m: '我要熱的', u: '買飲料或咖啡指定溫度', k: ['따뜻', 'ttatteut', 'hot', 'warm'] },
      { id: 316, t: '봉투 필요 없어요.', p: 'bongtu piryo eopseoyo', h: 'bong-tu pi-ryo eop-seo-yo', m: '不需要袋子', u: '店員問要不要袋子時', k: ['봉투', 'bongtu', 'bag', 'eopseoyo'] },
      { id: 317, t: '카드로 결제할 수 있어요?', p: 'kadeuro gyeoljehal su isseoyo?', h: 'ka-deu-ro gyeol-je-hal su i-sseo-yo', m: '可以刷卡嗎？', u: '結帳前確認能否刷卡', k: ['카드', 'kadeu', 'card'] },
      { id: 318, t: '영수증 주세요.', p: 'yeongsujeung juseyo', h: 'yeong-su-jeung ju-se-yo', m: '請給我收據', u: '結帳後需要收據時', k: ['영수증', 'yeongsujeung', 'receipt'] },
      { id: 319, t: '화장실 어디예요?', p: 'hwajangsil eodiyeyo?', h: 'hwa-jang-sil eo-di-ye-yo', m: '廁所在哪裡？', u: '在便利商店找廁所', k: ['화장실', 'hwajangsil', 'restroom'] },
      { id: 320, t: '근처에 ATM 있어요?', p: 'geuncheoe ATM isseoyo?', h: 'geun-cheo-e ATM i-sseo-yo', m: '附近有 ATM 嗎？', u: '需要提領現金時', k: ['atm', 'ATM', 'geuncheo'] },
      { id: 321, t: '생수 있어요?', p: 'saengsu isseoyo?', h: 'saeng-su i-sseo-yo', m: '有瓶裝水嗎？', u: '找特定商品時', k: ['생수', 'saengsu', 'water', 'bottled'] },
      { id: 322, t: '과자 어디에 있어요?', p: 'gwaja eodie isseoyo?', h: 'gwa-ja eo-di-e i-sseo-yo', m: '零食在哪裡？', u: '在店裡找商品區', k: ['과자', 'gwaja', 'snacks'] },
      { id: 323, t: '전자레인지 있어요?', p: 'jeonjareinji isseoyo?', h: 'jeon-ja-re-in-ji i-sseo-yo', m: '有微波爐嗎？', u: '想自己加熱食物時', k: ['전자레인지', 'jeonjareinji', 'microwave'] },
      { id: 324, t: '젓가락 주세요.', p: 'jeotgarak juseyo', h: 'jeot-ga-rak ju-se-yo', m: '請給我筷子', u: '買便當需要餐具時', k: ['젓가락', 'jeotgarak', 'chopsticks'] },
      { id: 325, t: '충전기 있어요?', p: 'chungjeongi isseoyo?', h: 'chung-jeon-gi i-sseo-yo', m: '有充電器嗎？', u: '手機沒電急需充電', k: ['충전기', 'chungjeongi', 'charger'] },
      { id: 326, t: '몇 시까지 해요?', p: 'myeot sikkaji haeyo?', h: 'myeot si-kka-ji hae-yo', m: '開到幾點？', u: '快關門時確認營業時間', k: ['몇 시', 'myeot si', 'close', 'kaji'] },
      { id: 327, t: '부가세 포함이에요?', p: 'bugase pohamieyo?', h: 'bu-ga-se po-ham-i-e-yo', m: '有含稅嗎？', u: '確認標價是否含稅', k: ['부가세', 'bugase', 'tax', 'poham'] },
      { id: 328, t: 'SIM 카드 팔아요?', p: 'SIM kadeu parayo?', h: 'SIM ka-deu pa-ra-yo', m: '有賣 SIM 卡嗎？', u: '台灣旅客到韓國常需網卡', k: ['sim', 'SIM', 'kadeu', 'card'] },
    ],
  },
  {
    file: 'shopping',
    export: 'shoppingKo',
    cat: 'shopping',
    sentences: [
      { id: 329, t: '이거 얼마예요?', p: 'igeo eolmayeyo?', h: 'i-geo eol-ma-ye-yo', m: '這個多少錢？', u: '在商店詢問價格', k: ['얼마', 'eolma', 'how much', 'igeo'] },
      { id: 330, t: '좀 비싸네요.', p: 'jom bissaneyo', h: 'jom bi-ssa-ne-yo', m: '有點貴呢', u: '表示猶豫或試著議價', k: ['비싸', 'bissa', 'expensive', 'jom'] },
      { id: 331, t: '할인돼요?', p: 'harindwaeyo?', h: 'ha-rin-dwae-yo', m: '有折扣嗎？', u: '詢問是否有優惠', k: ['할인', 'harin', 'discount'] },
      { id: 332, t: '더 작은 사이즈 있어요?', p: 'deo jageun saijeu isseoyo?', h: 'deo ja-geun sa-i-jeu i-sseo-yo', m: '有更小的尺寸嗎？', u: '衣服或鞋子尺寸不合', k: ['작은', 'jageun', 'size', 'saijeu'] },
      { id: 333, t: '더 큰 사이즈 있어요?', p: 'deo keun saijeu isseoyo?', h: 'deo keun sa-i-jeu i-sseo-yo', m: '有更大的尺寸嗎？', u: '需要更大尺寸時', k: ['큰', 'keun', 'large', 'size'] },
      { id: 334, t: '다른 색 있어요?', p: 'dareun saek isseoyo?', h: 'da-reun saek i-sseo-yo', m: '有其他顏色嗎？', u: '想換顏色時', k: ['색', 'saek', 'color', 'dareun'] },
      { id: 335, t: '입어 봐도 돼요?', p: 'ibeo boado dwaeyo?', h: 'i-beo bo-a-do dae-yo', m: '可以試穿嗎？', u: '買衣服鞋子前試穿', k: ['입어', 'ibeo', 'try on', 'boado'] },
      { id: 336, t: '탈의실 어디예요?', p: 'taluishil eodiyeyo?', h: 'tal-ui-sil eo-di-ye-yo', m: '試衣間在哪裡？', u: '試穿前找試衣間', k: ['탈의실', 'taluishil', 'fitting room'] },
      { id: 337, t: '면세 되나요?', p: 'myeonse doenayo?', h: 'myeon-se doe-na-yo', m: '可以免稅嗎？', u: '購物時確認免稅資格', k: ['면세', 'myeonse', 'tax free'] },
      { id: 338, t: '카드로 결제할 수 있어요?', p: 'kadeuro gyeoljehal su isseoyo?', h: 'ka-deu-ro gyeol-je-hal su i-sseo-yo', m: '可以刷卡嗎？', u: '結帳前確認付款方式', k: ['카드', 'kadeu', 'card'] },
      { id: 339, t: '선물 포장해 주세요.', p: 'seonmul pojanghae juseyo', h: 'seon-mul po-jang-hae ju-se-yo', m: '請幫我包成禮物', u: '買禮物請店員包裝', k: ['선물', 'seonmul', 'gift', 'pojang'] },
      { id: 340, t: '환불돼요?', p: 'hwanbuldwaeyo?', h: 'hwan-bul-dwae-yo', m: '可以退貨嗎？', u: '購買前確認能否退貨', k: ['환불', 'hwanbul', 'return', 'refund'] },
      { id: 341, t: '이걸로 할게요.', p: 'igeollo halgeyo', h: 'i-geol-lo hal-ge-yo', m: '我要買這個', u: '決定購買時', k: ['할게요', 'halgeyo', 'take it', 'igeollo'] },
      { id: 342, t: '그냥 구경하는 거예요.', p: 'geunyang gugyeonghaneun geoyeyo', h: 'geu-nyang gu-gyeong-ha-neun geo-ye-yo', m: '我只是看看', u: '店員招呼時表示隨便逛逛', k: ['구경', 'gugyeong', 'just looking', 'geunyang'] },
      { id: 343, t: '대만으로 배송돼요?', p: 'daeman-euro baesongdwaeyo?', h: 'dae-man-eu-ro bae-song-dwae-yo', m: '可以寄到台灣嗎？', u: '買太多想直寄回家', k: ['대만', 'daeman', 'taiwan', 'baesong'] },
      { id: 344, t: '현금만 되나요?', p: 'hyeongeumman doenayo?', h: 'hyeon-geum-man doe-na-yo', m: '只能付現金嗎？', u: '確認是否只收現金', k: ['현금', 'hyeongeum', 'cash only'] },
      { id: 345, t: '영수증 주세요.', p: 'yeongsujeung juseyo', h: 'yeong-su-jeung ju-se-yo', m: '請給我收據', u: '結帳後要收據或退稅用', k: ['영수증', 'yeongsujeung', 'receipt'] },
      { id: 346, t: '세일 중이에요?', p: 'seil jungieyo?', h: 'se-il jung-i-e-yo', m: '正在特價嗎？', u: '確認商品是否在打折', k: ['세일', 'seil', 'sale'] },
      { id: 347, t: '이게 마지막이에요?', p: 'ige majimakieyo?', h: 'i-ge ma-ji-ma-gi-e-yo', m: '這是最後一個嗎？', u: '搶限量商品時確認', k: ['마지막', 'majimak', 'last one'] },
      { id: 348, t: '면세 상품이에요?', p: 'myeonse sangpumieyo?', h: 'myeon-se sang-pum-i-e-yo', m: '這是免稅商品嗎？', u: '在免稅店或機場購物', k: ['면세', 'myeonse', 'duty free', 'sangpum'] },
      { id: 349, t: '봉투 주세요.', p: 'bongtu juseyo', h: 'bong-tu ju-se-yo', m: '請給我袋子', u: '需要購物袋時', k: ['봉투', 'bongtu', 'bag'] },
      { id: 350, t: '딱 맞아요.', p: 'ttak mawayo', h: 'ttak ma-wa-yo', m: '很合穿', u: '試穿滿意，決定購買', k: ['딱 맞', 'ttak ma', 'fits', 'mawayo'] },
    ],
  },
  {
    file: 'emergency',
    export: 'emergencyKo',
    cat: 'emergency',
    sentences: [
      { id: 351, t: '도와주세요.', p: 'dowajuseyo', h: 'do-wa-ju-se-yo', m: '請幫幫我', u: '遇到困難或危險時求助', k: ['도와', 'dowa', 'help', 'dowajuseyo'] },
      { id: 352, t: '길을 잃었어요.', p: 'gireul ireosseoyo', h: 'gi-reul i-reo-sseo-yo', m: '我迷路了', u: '找不到路時向路人求助', k: ['길', 'gil', 'lost', 'ireosseoyo'] },
      { id: 353, t: '몸 상태가 안 좋아요.', p: 'mom sangtaega an joayo', h: 'mom sang-tae-ga an jo-a-yo', m: '我身體不舒服', u: '身體不適時說明狀況', k: ['몸', 'mom', 'sangtae', 'not well'] },
      { id: 354, t: '구급차 불러 주세요.', p: 'gugeupcha bulleo juseyo', h: 'gu-geup-cha bul-leo ju-se-yo', m: '請叫救護車', u: '嚴重受傷或急病時', k: ['구급차', 'gugeupcha', 'ambulance'] },
      { id: 355, t: '경찰 불러 주세요.', p: 'gyeongchal bulleo juseyo', h: 'gyeong-chal bul-leo ju-se-yo', m: '請叫警察', u: '遭遇竊盜或危險時', k: ['경찰', 'gyeongchal', 'police'] },
      { id: 356, t: '지갑을 잃어버렸어요.', p: 'jigabeul ireobeoryeosseoyo', h: 'ji-ga-beul i-reo-beo-ryeo-sseo-yo', m: '我遺失了錢包', u: '錢包遺失向警察或櫃檯求助', k: ['지갑', 'jigap', 'wallet', 'ireobeoryeo'] },
      { id: 357, t: '여권을 잃어버렸어요.', p: 'yeogwoneul ireobeoryeosseoyo', h: 'yeo-gwon-eul i-reo-beo-ryeo-sseo-yo', m: '我遺失了護照', u: '護照遺失，緊急求助', k: ['여권', 'yeogwon', 'passport', 'lost'] },
      { id: 358, t: '휴대폰을 잃어버렸어요.', p: 'hyudaeponeul ireobeoryeosseoyo', h: 'hyu-dae-pon-eul i-reo-beo-ryeo-sseo-yo', m: '我手機弄丟了', u: '手機遺失時說明', k: ['휴대폰', 'hyudaepone', 'phone', 'lost'] },
      { id: 359, t: '휴대폰 배터리가 다 됐어요.', p: 'hyudaepone baeteoriga da dwaesseoyo', h: 'hyu-dae-pon bae-teo-ri-ga da dwaet-sseo-yo', m: '我手機沒電了', u: '需要充電或借電話時', k: ['배터리', 'baeteori', 'battery', 'dead'] },
      { id: 360, t: '병원에 가고 싶어요.', p: 'byeongwone gago sipeoyo', h: 'byeong-won-e ga-go si-peo-yo', m: '我想看醫生', u: '身體不舒服需要醫療', k: ['병원', 'byeongwon', 'doctor', 'hospital'] },
      { id: 361, t: '알레르기가 생겼어요.', p: 'allereugiga saenggyeosseoyo', h: 'al-le-reu-gi-ga saeng-gyeot-sseo-yo', m: '我過敏了', u: '食物或藥物過敏緊急狀況', k: ['알레르기', 'allereugi', 'allergy'] },
      { id: 362, t: '가장 가까운 병원이 어디예요?', p: 'gajang gakkaun byeongwoni eodiyeyo?', h: 'ga-jang gak-kaun byeong-won-i eo-di-ye-yo', m: '最近的醫院在哪？', u: '需要就醫時找醫院', k: ['병원', 'byeongwon', 'hospital', 'gakkaun'] },
      { id: 363, t: '호텔에 연락해 주세요.', p: 'hotere yeollakhae juseyo', h: 'ho-te-re yeon-rak-hae ju-se-yo', m: '請聯絡我的飯店', u: '緊急時請人幫忙打給飯店', k: ['호텔', 'hoter', 'hotel', 'yeollak'] },
      { id: 364, t: '가방을 도둑맞았어요.', p: 'gabangeul dodukmajasseoyo', h: 'ga-bang-eul do-dung-ma-jat-sseo-yo', m: '我的包包被偷了', u: '遭遇竊盜向警察報案', k: ['도둑', 'doduk', 'stolen', 'gabang'] },
      { id: 365, t: '불이 났어요. 119에 전화해 주세요.', p: 'buri nasseoyo. 119-e jeonhwahae juseyo', h: 'bu-ri nat-sseo-yo. 119-e jeon-hwa-hae ju-se-yo', m: '失火了，請打 119', u: '火災緊急狀況（韓國）', k: ['불', 'bul', '119', 'fire'] },
      { id: 366, t: '전화 좀 빌려 주실 수 있어요?', p: 'jeonhwa jom billyeo jusil su isseoyo?', h: 'jeon-hwa jom bil-lyeo ju-sil su i-sseo-yo', m: '可以借電話嗎？', u: '自己手機沒電或遺失時', k: ['전화', 'jeonhwa', 'phone', 'billyeo'] },
      { id: 367, t: '긴급 전화번호가 뭐예요?', p: 'gingeup jeonhwabeonhoga mwoyeyo?', h: 'gin-geup jeon-hwa-beon-ho-ga mwo-ye-yo', m: '緊急電話是幾號？', u: '不知道當地急救電話時', k: ['긴급', 'gingeup', 'emergency', '전화번호'] },
    ],
  },
]

for (const category of categories) {
  const body = `import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = '${category.cat}' as const

export const ${category.export}: Sentence[] = [
${category.sentences.map(line).join('\n')}
]
`
  writeFileSync(join(outDir, `${category.file}.ts`), body, 'utf8')
}

const imports = categories
  .map((c) => `import { ${c.export} } from './ko/${c.file}'`)
  .join('\n')
const spreads = categories.map((c) => `  ...${c.export},`).join('\n')

const koIndex = `import type { Sentence } from '../types'
${imports}

export const koreanSentences: Sentence[] = [
${spreads}
]
`

writeFileSync(join(__dirname, '../src/data/sentences/ko.ts'), koIndex, 'utf8')

const total = categories.reduce((sum, c) => sum + c.sentences.length, 0)
console.log(`Generated ${total} Korean sentences in ${categories.length} categories.`)
