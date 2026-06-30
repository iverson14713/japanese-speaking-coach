import type { CategoryId } from '../data/categories'
import type { Language } from '../data/types'

export type FavoriteSentenceSource = 'sentence' | 'dialogue' | 'challenge'

export interface FavoriteSentence {
  id: string
  sentenceId: number | string
  language: Language
  scenario: string
  chinese: string
  answer: string
  romanization?: string
  source: FavoriteSentenceSource
  categoryId?: CategoryId
  createdAt: number
  /** Reserved for future cloud sync */
  syncVersion?: number
}

export type FavoriteSentenceInput = Omit<FavoriteSentence, 'createdAt'>
