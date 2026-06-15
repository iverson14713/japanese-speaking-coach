import type { CategoryId } from './categories'

export interface WordBreakdown {
  word: string
  meaning: string
}

export interface PhraseChunk {
  japanese: string
  romaji: string
  chinese: string
}

export interface Sentence {
  id: number
  category: CategoryId
  japanese: string
  kana: string
  romaji: string
  meaningZh: string
  usageNoteZh: string
  wordBreakdown: WordBreakdown[]
  phraseChunks: PhraseChunk[]
  keywords: string[]
}

export const sentences: Sentence[] = [
  {
    id: 1,
    category: 'first-conversation',
    japanese: 'はじめまして',
    kana: 'はじめまして',
    romaji: 'hajimemashite',
    meaningZh: '初次見面',
    usageNoteZh: '第一次見面、向日本人自我介紹時使用',
    wordBreakdown: [{ word: 'はじめまして', meaning: '初次見面（禮貌問候）' }],
    phraseChunks: [
      { japanese: 'はじめまして', romaji: 'hajimemashite', chinese: '初次見面' },
    ],
    keywords: ['はじめまして', '初めまして'],
  },
  {
    id: 2,
    category: 'first-conversation',
    japanese: '台湾から来ました',
    kana: 'たいわんから きました',
    romaji: 'Taiwan kara kimashita',
    meaningZh: '我來自台灣',
    usageNoteZh: '自我介紹時說明自己來自哪裡',
    wordBreakdown: [
      { word: '台湾', meaning: '台灣' },
      { word: 'から', meaning: '從' },
      { word: '来ました', meaning: '來了（來到這裡）' },
    ],
    phraseChunks: [
      { japanese: '台湾から', romaji: 'Taiwan kara', chinese: '來自台灣' },
      { japanese: '来ました', romaji: 'kimashita', chinese: '我來了' },
    ],
    keywords: ['台湾', 'たいわん', '来ました', 'きました'],
  },
  {
    id: 3,
    category: 'first-conversation',
    japanese: '日本語はあまり話せません',
    kana: 'にほんごは あまり はなせません',
    romaji: 'nihongo wa amari hanasemasen',
    meaningZh: '我不太會日文',
    usageNoteZh: '向日本人說明自己日文不好，請對方諒解',
    wordBreakdown: [
      { word: '日本語', meaning: '日文' },
      { word: 'あまり', meaning: '不太' },
      { word: '話せません', meaning: '不會說' },
    ],
    phraseChunks: [
      { japanese: '日本語は', romaji: 'nihongo wa', chinese: '日文' },
      { japanese: 'あまり話せません', romaji: 'amari hanasemasen', chinese: '不太會說' },
    ],
    keywords: ['話せません', 'はなせません', '日本語'],
  },
  {
    id: 4,
    category: 'first-conversation',
    japanese: 'ゆっくり話してください',
    kana: 'ゆっくり はなしてください',
    romaji: 'yukkuri hanashite kudasai',
    meaningZh: '請說慢一點',
    usageNoteZh: '聽不懂時請對方放慢說話速度',
    wordBreakdown: [
      { word: 'ゆっくり', meaning: '慢慢地' },
      { word: '話してください', meaning: '請說' },
    ],
    phraseChunks: [
      { japanese: 'ゆっくり', romaji: 'yukkuri', chinese: '慢慢地' },
      { japanese: '話してください', romaji: 'hanashite kudasai', chinese: '請說' },
    ],
    keywords: ['ゆっくり', '話して', 'はなして'],
  },
  {
    id: 5,
    category: 'convenience-store',
    japanese: 'これをください',
    kana: 'これを ください',
    romaji: 'kore o kudasai',
    meaningZh: '我要這個',
    usageNoteZh: '便利商店結帳時，指著商品說',
    wordBreakdown: [
      { word: 'これ', meaning: '這個' },
      { word: 'ください', meaning: '請給我' },
    ],
    phraseChunks: [
      { japanese: 'これを', romaji: 'kore o', chinese: '這個' },
      { japanese: 'ください', romaji: 'kudasai', chinese: '請給我' },
    ],
    keywords: ['ください', 'これ'],
  },
  {
    id: 6,
    category: 'convenience-store',
    japanese: '袋はいりません',
    kana: 'ふくろは いりません',
    romaji: 'fukuro wa irimasen',
    meaningZh: '不需要袋子',
    usageNoteZh: '便利商店店員問要不要袋子時',
    wordBreakdown: [
      { word: '袋', meaning: '袋子' },
      { word: 'いりません', meaning: '不需要' },
    ],
    phraseChunks: [
      { japanese: '袋は', romaji: 'fukuro wa', chinese: '袋子' },
      { japanese: 'いりません', romaji: 'irimasen', chinese: '不需要' },
    ],
    keywords: ['いりません', '袋', 'ふくろ'],
  },
  {
    id: 7,
    category: 'restaurant',
    japanese: 'おすすめは何ですか',
    kana: 'おすすめは なんですか',
    romaji: 'osusume wa nan desu ka',
    meaningZh: '有什麼推薦的？',
    usageNoteZh: '進餐廳不知道點什麼時',
    wordBreakdown: [
      { word: 'おすすめ', meaning: '推薦' },
      { word: '何ですか', meaning: '是什麼？' },
    ],
    phraseChunks: [
      { japanese: 'おすすめは', romaji: 'osusume wa', chinese: '推薦' },
      { japanese: '何ですか', romaji: 'nan desu ka', chinese: '是什麼？' },
    ],
    keywords: ['おすすめ', '何ですか', 'なんですか'],
  },
  {
    id: 8,
    category: 'restaurant',
    japanese: '英語のメニューはありますか',
    kana: 'えいごの メニューは ありますか',
    romaji: 'eigo no menyuu wa arimasu ka',
    meaningZh: '有英文菜單嗎？',
    usageNoteZh: '看不懂日文菜單時',
    wordBreakdown: [
      { word: '英語', meaning: '英文' },
      { word: 'メニュー', meaning: '菜單' },
      { word: 'ありますか', meaning: '有嗎？' },
    ],
    phraseChunks: [
      { japanese: '英語のメニューは', romaji: 'eigo no menyuu wa', chinese: '英文菜單' },
      { japanese: 'ありますか', romaji: 'arimasu ka', chinese: '有嗎？' },
    ],
    keywords: ['メニュー', 'ありますか', '英語'],
  },
  {
    id: 9,
    category: 'directions',
    japanese: 'トイレはどこですか',
    kana: 'トイレは どこですか',
    romaji: 'toire wa doko desu ka',
    meaningZh: '廁所在哪裡？',
    usageNoteZh: '想找廁所時向店員或路人詢問',
    wordBreakdown: [
      { word: 'トイレ', meaning: '廁所' },
      { word: 'どこですか', meaning: '在哪裡？' },
    ],
    phraseChunks: [
      { japanese: 'トイレは', romaji: 'toire wa', chinese: '廁所' },
      { japanese: 'どこですか', romaji: 'doko desu ka', chinese: '在哪裡？' },
    ],
    keywords: ['トイレ', 'どこですか'],
  },
  {
    id: 10,
    category: 'directions',
    japanese: '駅はどこですか',
    kana: 'えきは どこですか',
    romaji: 'eki wa doko desu ka',
    meaningZh: '車站在哪裡？',
    usageNoteZh: '問路人或站務人員車站在哪',
    wordBreakdown: [
      { word: '駅', meaning: '車站' },
      { word: 'どこですか', meaning: '在哪裡？' },
    ],
    phraseChunks: [
      { japanese: '駅は', romaji: 'eki wa', chinese: '車站' },
      { japanese: 'どこですか', romaji: 'doko desu ka', chinese: '在哪裡？' },
    ],
    keywords: ['駅', 'えき', 'どこですか'],
  },
  {
    id: 11,
    category: 'hotel',
    japanese: 'チェックインをお願いします',
    kana: 'チェックインを おねがいします',
    romaji: 'chekkuin o onegaishimasu',
    meaningZh: '我要辦理入住',
    usageNoteZh: '到飯店櫃檯辦理入住時',
    wordBreakdown: [
      { word: 'チェックイン', meaning: '入住' },
      { word: 'お願いします', meaning: '拜託了' },
    ],
    phraseChunks: [
      { japanese: 'チェックインを', romaji: 'chekkuin o', chinese: '入住' },
      { japanese: 'お願いします', romaji: 'onegaishimasu', chinese: '拜託了' },
    ],
    keywords: ['チェックイン', 'お願いします'],
  },
  {
    id: 12,
    category: 'shopping',
    japanese: 'カードは使えますか',
    kana: 'カードは つかえますか',
    romaji: 'kaado wa tsukaemasu ka',
    meaningZh: '可以刷卡嗎？',
    usageNoteZh: '結帳前確認能否刷卡',
    wordBreakdown: [
      { word: 'カード', meaning: '卡片' },
      { word: '使えますか', meaning: '能用嗎？' },
    ],
    phraseChunks: [
      { japanese: 'カードは', romaji: 'kaado wa', chinese: '卡片' },
      { japanese: '使えますか', romaji: 'tsukaemasu ka', chinese: '能用嗎？' },
    ],
    keywords: ['カード', '使えますか', 'つかえますか'],
  },
]

export function getSentencesByCategory(categoryId: CategoryId): Sentence[] {
  return sentences.filter((s) => s.category === categoryId)
}
