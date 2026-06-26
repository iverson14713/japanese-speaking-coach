import type { Language } from '../data/types'
import { getTodayDateKey, getYesterdayDateKey } from './dateKey'

const STORAGE_PREFIX = 'travel-speaking-coach-daily'

interface DailyPracticeData {
  completedDates: string[]
  streak: number
  lastCompletedDate: string | null
}

function storageKey(language: Language): string {
  return `${STORAGE_PREFIX}:${language}`
}

function loadData(language: Language): DailyPracticeData {
  try {
    const raw = localStorage.getItem(storageKey(language))
    if (!raw) {
      return { completedDates: [], streak: 0, lastCompletedDate: null }
    }
    const parsed = JSON.parse(raw) as DailyPracticeData
    return {
      completedDates: Array.isArray(parsed.completedDates) ? parsed.completedDates : [],
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
      lastCompletedDate: parsed.lastCompletedDate ?? null,
    }
  } catch {
    return { completedDates: [], streak: 0, lastCompletedDate: null }
  }
}

function saveData(language: Language, data: DailyPracticeData): void {
  localStorage.setItem(storageKey(language), JSON.stringify(data))
}

export function getLastPracticeDate(language: Language): string | null {
  const data = loadData(language)
  if (data.lastCompletedDate) {
    return data.lastCompletedDate
  }
  if (data.completedDates.length === 0) {
    return null
  }
  return [...data.completedDates].sort().at(-1) ?? null
}

export function isTodayCompleted(language: Language): boolean {
  const data = loadData(language)
  return data.completedDates.includes(getTodayDateKey())
}

export function getStreak(language: Language): number {
  const data = loadData(language)
  const today = getTodayDateKey()
  const yesterday = getYesterdayDateKey()

  if (data.lastCompletedDate === today || data.lastCompletedDate === yesterday) {
    return data.streak
  }

  return 0
}

export function getCompletedDates(language: Language): string[] {
  return loadData(language).completedDates
}

export function completeToday(language: Language): { streak: number; isNewCompletion: boolean } {
  const today = getTodayDateKey()
  const data = loadData(language)

  if (data.completedDates.includes(today)) {
    return { streak: data.streak, isNewCompletion: false }
  }

  const yesterday = getYesterdayDateKey()
  const newStreak = data.lastCompletedDate === yesterday ? data.streak + 1 : 1

  const nextData: DailyPracticeData = {
    completedDates: [...new Set([...data.completedDates, today])],
    streak: newStreak,
    lastCompletedDate: today,
  }

  saveData(language, nextData)
  return { streak: newStreak, isNewCompletion: true }
}
