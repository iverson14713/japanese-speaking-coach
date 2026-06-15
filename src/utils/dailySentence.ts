import { getSentencesByLanguage, type Language, type Sentence } from '../data/sentences'
import { getTodayDateKey } from './dateKey'

function getDailyIndex(seed: string, total: number): number {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  return Math.abs(hash) % total
}

export function getDailySentence(language: Language): Sentence | undefined {
  const sentences = getSentencesByLanguage(language)
  if (sentences.length === 0) {
    return undefined
  }

  const seed = `${getTodayDateKey()}:${language}`
  const index = getDailyIndex(seed, sentences.length)
  return sentences[index]
}
