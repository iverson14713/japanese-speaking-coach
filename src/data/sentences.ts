export interface WordBreakdown {
  word: string
  meaning: string
}

export interface Sentence {
  id: number
  japanese: string
  kana: string
  romaji: string
  chinese: string
  words: WordBreakdown[]
  keywords: string[]
}

export const sentences: Sentence[] = [
  {
    id: 1,
    japanese: '今日は疲れました。',
    kana: 'きょうは つかれました',
    romaji: 'kyou wa tsukaremashita',
    chinese: '今天累了',
    words: [
      { word: '今日', meaning: '今天' },
      { word: '疲れました', meaning: '累了' },
    ],
    keywords: ['疲れました', 'つかれました'],
  },
  {
    id: 2,
    japanese: 'おはようございます。',
    kana: 'おはようございます',
    romaji: 'ohayou gozaimasu',
    chinese: '早安',
    words: [
      { word: 'おはよう', meaning: '早安' },
      { word: 'ございます', meaning: '（敬語）' },
    ],
    keywords: ['おはよう'],
  },
  {
    id: 3,
    japanese: 'ありがとうございます。',
    kana: 'ありがとうございます',
    romaji: 'arigatou gozaimasu',
    chinese: '謝謝',
    words: [
      { word: 'ありがとう', meaning: '謝謝' },
      { word: 'ございます', meaning: '（敬語）' },
    ],
    keywords: ['ありがとうございます', 'ありがとう'],
  },
]
