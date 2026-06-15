import type { CategoryId } from '../categories'
import { categories } from '../categories'
import type { Language, Sentence } from '../types'
import { japaneseSentences } from './ja'
import { englishSentences } from './en'
import { koreanSentences } from './ko'

export type { Language, Sentence, WordBreakdown, PhraseChunk } from '../types'
export { SPEECH_LANG, LANGUAGE_LABELS } from '../types'

const allSentences: Sentence[] = [...japaneseSentences, ...englishSentences, ...koreanSentences]

export function getSentencesByLanguage(language: Language): Sentence[] {
  return allSentences.filter((s) => s.language === language)
}

export function getSentencesByCategory(language: Language, categoryId: CategoryId): Sentence[] {
  return allSentences.filter((s) => s.language === language && s.category === categoryId)
}

export function getCategoriesForLanguage(language: Language): CategoryId[] {
  const available = new Set<CategoryId>()
  for (const sentence of allSentences) {
    if (sentence.language === language) {
      available.add(sentence.category)
    }
  }
  return categories.map((c) => c.id).filter((id) => available.has(id))
}

export function getDefaultCategory(language: Language): CategoryId {
  const categories = getCategoriesForLanguage(language)
  return categories[0] ?? 'first-conversation'
}

export function getTotalSentenceCount(language: Language): number {
  return getSentencesByLanguage(language).length
}

export function getLibraryHint(language: Language): string {
  const count = getTotalSentenceCount(language)
  switch (language) {
    case 'ja':
      return `${count} 句日本旅行常用口說`
    case 'en':
      return `${count} 句旅行英文口說`
    case 'ko':
      return `${count} 句旅行韓文口說`
  }
}
