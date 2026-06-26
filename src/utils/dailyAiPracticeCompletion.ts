import type { Language } from '../data/types'
import { getTodayDateKey } from './dateKey'

const STORAGE_PREFIX = 'travel-speaking-coach-daily-ai-done'

function storageKey(language: Language, sentenceId: number): string {
  return `${STORAGE_PREFIX}:${getTodayDateKey()}:${language}:${sentenceId}`
}

export function markDailyAiPracticeComplete(language: Language, sentenceId: number): void {
  try {
    localStorage.setItem(storageKey(language, sentenceId), '1')
  } catch {
    // Ignore storage errors
  }
}

export function isDailyAiPracticeComplete(language: Language, sentenceId: number): boolean {
  try {
    return localStorage.getItem(storageKey(language, sentenceId)) === '1'
  } catch {
    return false
  }
}
