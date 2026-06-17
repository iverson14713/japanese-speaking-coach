import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'en' as const
const cat = 'directions' as const

export const directionsEn: Sentence[] = [
  makeSentence({
    id: 141, language: lang, category: cat, target: 'Where is the station?', pronunciation: 'Where is the station?', meaning: '車站在哪裡？', usage: '問路人或站務人員',
    keywords: ['station', 'where is'],
    words: [{ word: 'Where is', meaning: '在哪裡' }, { word: 'the station', meaning: '車站' }],
    chunks: [{ text: 'Where is', pronunciation: 'Where is', chinese: '在哪裡' }, { text: 'the station', pronunciation: 'the station', chinese: '車站' }],
  }),
  makeSentence({
    id: 142, language: lang, category: cat, target: 'Where is the subway?', pronunciation: 'Where is the subway?', meaning: '地鐵在哪裡？', usage: '找地鐵站入口時',
    keywords: ['subway', 'where is subway'],
    words: [{ word: 'Where is', meaning: '在哪裡' }, { word: 'the subway', meaning: '地鐵' }],
    chunks: [{ text: 'Where is', pronunciation: 'Where is', chinese: '在哪裡' }, { text: 'the subway', pronunciation: 'the subway', chinese: '地鐵' }],
  }),
  makeSentence({
    id: 143, language: lang, category: cat, target: 'Which platform is it?', pronunciation: 'Which platform is it?', meaning: '是哪個月台？', usage: '在車站確認搭車月台',
    keywords: ['platform', 'which platform'],
    words: [{ word: 'Which platform', meaning: '哪個月台' }, { word: 'is it', meaning: '是' }],
    chunks: [{ text: 'Which platform', pronunciation: 'Which platform', chinese: '哪個月台' }, { text: 'is it', pronunciation: 'is it', chinese: '是' }],
  }),
  makeSentence({
    id: 144, language: lang, category: cat, target: 'One ticket to downtown, please.', pronunciation: 'One ticket to downtown, please.', meaning: '一張到市中心的票', usage: '在售票機或櫃檯買票',
    keywords: ['one ticket', 'downtown', 'ticket'],
    words: [{ word: 'One ticket to downtown', meaning: '一張到市中心的票' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'One ticket to downtown', pronunciation: 'One ticket to downtown', chinese: '一張到市中心的票' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 145, language: lang, category: cat, target: 'Does this train go to Shibuya?', pronunciation: 'Does this train go to Shibuya?', meaning: '這班車有到澀谷嗎？', usage: '確認車次方向，站名可替換',
    keywords: ['does this train', 'go to', 'shibuya'],
    words: [{ word: 'Does this train', meaning: '這班車' }, { word: 'go to Shibuya', meaning: '有到澀谷嗎' }],
    chunks: [{ text: 'Does this train', pronunciation: 'Does this train', chinese: '這班車' }, { text: 'go to Shibuya', pronunciation: 'go to Shibuya', chinese: '有到澀谷嗎' }],
  }),
  makeSentence({
    id: 146, language: lang, category: cat, target: 'Does this bus go downtown?', pronunciation: 'Does this bus go downtown?', meaning: '這班公車有到市中心嗎？', usage: '在公車站確認路線',
    keywords: ['bus', 'downtown', 'go downtown'],
    words: [{ word: 'Does this bus', meaning: '這班公車' }, { word: 'go downtown', meaning: '到市中心嗎' }],
    chunks: [{ text: 'Does this bus', pronunciation: 'Does this bus', chinese: '這班公車' }, { text: 'go downtown', pronunciation: 'go downtown', chinese: '到市中心嗎' }],
  }),
  makeSentence({
    id: 147, language: lang, category: cat, target: 'Where do I transfer?', pronunciation: 'Where do I transfer?', meaning: '在哪裡轉車？', usage: '需要換線或換車時',
    keywords: ['transfer', 'where transfer'],
    words: [{ word: 'Where do I', meaning: '我在哪' }, { word: 'transfer', meaning: '轉車' }],
    chunks: [{ text: 'Where do I', pronunciation: 'Where do I', chinese: '我在哪' }, { text: 'transfer', pronunciation: 'transfer', chinese: '轉車' }],
  }),
  makeSentence({
    id: 148, language: lang, category: cat, target: 'How long does it take?', pronunciation: 'How long does it take?', meaning: '要多久？', usage: '問路程或車程時間',
    keywords: ['how long', 'does it take'],
    words: [{ word: 'How long', meaning: '多久' }, { word: 'does it take', meaning: '需要' }],
    chunks: [{ text: 'How long', pronunciation: 'How long', chinese: '多久' }, { text: 'does it take', pronunciation: 'does it take', chinese: '需要' }],
  }),
  makeSentence({
    id: 149, language: lang, category: cat, target: 'How much is the fare?', pronunciation: 'How much is the fare?', meaning: '車資多少？', usage: '買票前確認價格',
    keywords: ['fare', 'how much'],
    words: [{ word: 'How much is', meaning: '多少錢' }, { word: 'the fare', meaning: '車資' }],
    chunks: [{ text: 'How much is', pronunciation: 'How much is', chinese: '多少錢' }, { text: 'the fare', pronunciation: 'the fare', chinese: '車資' }],
  }),
  makeSentence({
    id: 150, language: lang, category: cat, target: 'I want to go to the airport.', pronunciation: 'I want to go to the airport.', meaning: '我要去機場', usage: '向站務或司機說明目的地',
    keywords: ['airport', 'want to go'],
    words: [{ word: 'I want to go', meaning: '我想去' }, { word: 'to the airport', meaning: '機場' }],
    chunks: [{ text: 'I want to go', pronunciation: 'I want to go', chinese: '我想去' }, { text: 'to the airport', pronunciation: 'to the airport', chinese: '機場' }],
  }),
  makeSentence({
    id: 151, language: lang, category: cat, target: 'Can I get a taxi here?', pronunciation: 'Can I get a taxi here?', meaning: '這裡可以搭計程車嗎？', usage: '確認能否在此叫車',
    keywords: ['taxi', 'get a taxi'],
    words: [{ word: 'Can I get', meaning: '我可以叫' }, { word: 'a taxi here', meaning: '計程車在這裡' }],
    chunks: [{ text: 'Can I get', pronunciation: 'Can I get', chinese: '我可以叫' }, { text: 'a taxi here', pronunciation: 'a taxi here', chinese: '計程車' }],
  }),
  makeSentence({
    id: 152, language: lang, category: cat, target: 'Please take me to this address.', pronunciation: 'Please take me to this address.', meaning: '請帶我去這個地址', usage: '上計程車後出示地址',
    keywords: ['take me to', 'address'],
    words: [{ word: 'Please take me', meaning: '請帶我' }, { word: 'to this address', meaning: '去這個地址' }],
    chunks: [{ text: 'Please take me', pronunciation: 'Please take me', chinese: '請帶我' }, { text: 'to this address', pronunciation: 'to this address', chinese: '去這個地址' }],
  }),
  makeSentence({
    id: 153, language: lang, category: cat, target: 'Please stop here.', pronunciation: 'Please stop here.', meaning: '請在這裡停', usage: '搭計程車或公車時下車',
    keywords: ['stop here', 'please stop'],
    words: [{ word: 'Please stop', meaning: '請停' }, { word: 'here', meaning: '在這裡' }],
    chunks: [{ text: 'Please stop', pronunciation: 'Please stop', chinese: '請停' }, { text: 'here', pronunciation: 'here', chinese: '在這裡' }],
  }),
  makeSentence({
    id: 154, language: lang, category: cat, target: 'Go straight, please.', pronunciation: 'Go straight, please.', meaning: '請直走', usage: '問路後確認方向',
    keywords: ['go straight', 'straight'],
    words: [{ word: 'Go straight', meaning: '直走' }, { word: 'please', meaning: '請' }],
    chunks: [{ text: 'Go straight', pronunciation: 'Go straight', chinese: '直走' }, { text: 'please', pronunciation: 'please', chinese: '請' }],
  }),
  makeSentence({
    id: 155, language: lang, category: cat, target: 'Turn left at the corner.', pronunciation: 'Turn left at the corner.', meaning: '在轉角左轉', usage: '指路或確認方向',
    keywords: ['turn left', 'left'],
    words: [{ word: 'Turn left', meaning: '左轉' }, { word: 'at the corner', meaning: '在轉角' }],
    chunks: [{ text: 'Turn left', pronunciation: 'Turn left', chinese: '左轉' }, { text: 'at the corner', pronunciation: 'at the corner', chinese: '在轉角' }],
  }),
  makeSentence({
    id: 156, language: lang, category: cat, target: 'Is it far from here?', pronunciation: 'Is it far from here?', meaning: '離這裡遠嗎？', usage: '問路程距離',
    keywords: ['far', 'far from here'],
    words: [{ word: 'Is it far', meaning: '遠嗎' }, { word: 'from here', meaning: '從這裡' }],
    chunks: [{ text: 'Is it far', pronunciation: 'Is it far', chinese: '遠嗎' }, { text: 'from here', pronunciation: 'from here', chinese: '從這裡' }],
  }),
  makeSentence({
    id: 157, language: lang, category: cat, target: 'How do I get to the museum?', pronunciation: 'How do I get to the museum?', meaning: '怎麼去博物館？', usage: '問路，地點可替換',
    keywords: ['how do i get', 'get to', 'museum'],
    words: [{ word: 'How do I get', meaning: '我怎麼去' }, { word: 'to the museum', meaning: '博物館' }],
    chunks: [{ text: 'How do I get', pronunciation: 'How do I get', chinese: '我怎麼去' }, { text: 'to the museum', pronunciation: 'to the museum', chinese: '博物館' }],
  }),
  makeSentence({
    id: 158, language: lang, category: cat, target: 'Where is the exit?', pronunciation: 'Where is the exit?', meaning: '出口在哪裡？', usage: '在車站或商場找出口',
    keywords: ['exit', 'where is exit'],
    words: [{ word: 'Where is', meaning: '在哪裡' }, { word: 'the exit', meaning: '出口' }],
    chunks: [{ text: 'Where is', pronunciation: 'Where is', chinese: '在哪裡' }, { text: 'the exit', pronunciation: 'the exit', chinese: '出口' }],
  }),
  makeSentence({
    id: 159, language: lang, category: cat, target: 'Am I going the right way?', pronunciation: 'Am I going the right way?', meaning: '我走對了嗎？', usage: '途中確認方向是否正確',
    keywords: ['right way', 'going the right way'],
    words: [{ word: 'Am I going', meaning: '我走' }, { word: 'the right way', meaning: '對的路嗎' }],
    chunks: [{ text: 'Am I going', pronunciation: 'Am I going', chinese: '我走' }, { text: 'the right way', pronunciation: 'the right way', chinese: '對的路嗎' }],
  }),
  makeSentence({
    id: 160, language: lang, category: cat, target: 'I think I missed my stop.', pronunciation: 'I think I missed my stop.', meaning: '我好像坐過站了', usage: '搭車坐過站時跟司機說',
    keywords: ['missed my stop', 'missed stop'],
    words: [{ word: 'I think I missed', meaning: '我好像錯過了' }, { word: 'my stop', meaning: '我的站' }],
    chunks: [{ text: 'I think I missed', pronunciation: 'I think I missed', chinese: '我好像錯過了' }, { text: 'my stop', pronunciation: 'my stop', chinese: '我的站' }],
  }),
  makeSentence({
    id: 161, language: lang, category: cat, target: 'Can you show me on the map?', pronunciation: 'Can you show me on the map?', meaning: '可以在地圖上指給我看嗎？', usage: '語言不通時請對方指地圖',
    keywords: ['show me', 'map', 'on the map'],
    words: [{ word: 'Can you show me', meaning: '你可以指給我' }, { word: 'on the map', meaning: '在地圖上' }],
    chunks: [{ text: 'Can you show me', pronunciation: 'Can you show me', chinese: '你可以指給我' }, { text: 'on the map', pronunciation: 'on the map', chinese: '在地圖上' }],
  }),
  makeSentence({
    id: 162, language: lang, category: cat, target: 'Is this the right bus stop?', pronunciation: 'Is this the right bus stop?', meaning: '這是正確的公車站嗎？', usage: '確認公車站是否正確',
    keywords: ['bus stop', 'right bus stop'],
    words: [{ word: 'Is this', meaning: '這是' }, { word: 'the right bus stop', meaning: '正確的公車站嗎' }],
    chunks: [{ text: 'Is this', pronunciation: 'Is this', chinese: '這是' }, { text: 'the right bus stop', pronunciation: 'the right bus stop', chinese: '正確的公車站嗎' }],
  }),
]
