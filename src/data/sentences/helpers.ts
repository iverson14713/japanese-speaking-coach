import type { CategoryId } from '../categories'
import type { Language, PhraseChunk, Sentence, WordBreakdown } from '../types'

interface SentenceInput {
  id: number
  language: Language
  category: CategoryId
  target: string
  pronunciation: string
  meaning: string
  usage: string
  keywords: string[]
  helper?: string
  chunks?: PhraseChunk[]
  words?: WordBreakdown[]
}

export function makeSentence(input: SentenceInput): Sentence {
  const chunks = input.chunks ?? [
    { text: input.target, pronunciation: input.pronunciation, chinese: input.meaning },
  ]
  const words = input.words ?? [{ word: input.target, meaning: input.meaning }]
  return {
    id: input.id,
    language: input.language,
    category: input.category,
    targetText: input.target,
    pronunciation: input.pronunciation,
    helperText: input.helper ?? '',
    meaningZh: input.meaning,
    usageNoteZh: input.usage,
    wordBreakdown: words,
    phraseChunks: chunks,
    keywords: input.keywords,
  }
}
