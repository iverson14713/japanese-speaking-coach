export interface ConversationLine {
  role: '日本人' | '你'
  japanese?: string
  chinese: string
}

export interface ConversationExample {
  id: number
  lines: ConversationLine[]
}

export const firstConversationExamples: ConversationExample[] = [
  {
    id: 1,
    lines: [
      {
        role: '日本人',
        japanese: '日本語、上手ですね。',
        chinese: '你日文說得不錯耶。',
      },
      {
        role: '你',
        japanese: '日本語を少し勉強しています。',
        chinese: '我有學一點日文。',
      },
    ],
  },
  {
    id: 2,
    lines: [
      {
        role: '日本人',
        japanese: 'どうして日本語を勉強しているんですか？',
        chinese: '你為什麼學日文？',
      },
      {
        role: '你',
        japanese: '旅行のために勉強しています。',
        chinese: '我是為了旅行而學日文。',
      },
    ],
  },
  {
    id: 3,
    lines: [
      {
        role: '日本人',
        japanese: '日本は初めてですか？',
        chinese: '你是第一次來日本嗎？',
      },
      {
        role: '你',
        japanese: 'はい、初めて日本に来ました。',
        chinese: '對，我第一次來日本。',
      },
    ],
  },
]
