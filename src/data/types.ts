import type { CategoryId } from './categories'

export type Language = 'ja' | 'en' | 'ko'

export interface WordBreakdown {
  word: string
  meaning: string
}

export interface PhraseChunk {
  text: string
  pronunciation: string
  chinese: string
}

export interface Sentence {
  id: number
  language: Language
  category: CategoryId
  targetText: string
  pronunciation: string
  helperText: string
  meaningZh: string
  usageNoteZh: string
  wordBreakdown: WordBreakdown[]
  phraseChunks: PhraseChunk[]
  keywords: string[]
}

export const SPEECH_LANG: Record<Language, string> = {
  ja: 'ja-JP',
  en: 'en-US',
  ko: 'ko-KR',
}

export const LANGUAGE_LABELS: Record<Language, string> = {
  ja: '日文',
  en: '英文',
  ko: '韓文',
}
