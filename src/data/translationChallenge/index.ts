import type { Language } from '../types'
import { getAllTranslationQuestions } from './buildQuestions'
import type { TranslationChallengeQuestion, TranslationScenarioId } from './types'

export type {
  TranslationChallengeQuestion,
  TranslationChallengeRoundResult,
  TranslationScenarioId,
} from './types'
export {
  DEFAULT_TRANSLATION_SCENARIO,
  TRANSLATION_SCENARIOS,
  getScenariosForCategory,
} from './scenarios'

export const QUESTIONS_PER_ROUND = 5
export const PREP_COUNTDOWN_SECONDS = 3
export const RECORD_SECONDS = 7
export const EXP_PER_QUESTION = 10

export function getQuestionPoolSize(language: Language, scenario: TranslationScenarioId): number {
  return getQuestionsForScenario(language, scenario).length
}

export function getQuestionsForScenario(
  language: Language,
  scenario: TranslationScenarioId,
): TranslationChallengeQuestion[] {
  return getAllTranslationQuestions(language).filter(
    (question) => scenario === 'travel-common' || question.scenarios.includes(scenario),
  )
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }
  return next
}

export function pickRoundQuestions(
  language: Language,
  scenario: TranslationScenarioId,
  count: number = QUESTIONS_PER_ROUND,
): TranslationChallengeQuestion[] {
  const pool = getQuestionsForScenario(language, scenario)
  if (pool.length === 0) {
    return []
  }

  const shuffled = shuffle(pool)
  if (shuffled.length <= count) {
    return shuffled
  }

  return shuffled.slice(0, count)
}
