import type { Language } from '../types'

export type TranslationScenarioId =
  | 'travel-common'
  | 'airport'
  | 'hotel'
  | 'restaurant'
  | 'shopping'
  | 'traffic'
  | 'emergency'

export interface TranslationChallengeQuestion {
  id: string
  language: Language
  scenarios: TranslationScenarioId[]
  chinese: string
  answer: string
  romanization?: string
  keywords: string[]
  difficulty: 1 | 2 | 3
}

export interface TranslationChallengeRoundResult {
  questionId: string
  transcript: string
  score: number
  feedback: string
  exp: number
}
