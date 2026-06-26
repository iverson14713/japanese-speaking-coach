import type { DailyCoachHandoff } from '../types/dailyCoachHandoff'

const STORAGE_KEY = 'travel-speaking-coach-daily-handoff'

export function saveDailyCoachHandoff(handoff: DailyCoachHandoff): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(handoff))
  } catch {
    // Ignore storage errors
  }
}

export function loadDailyCoachHandoff(): DailyCoachHandoff | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw) as DailyCoachHandoff
    if (!parsed || parsed.source !== 'dailyPractice') {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function clearDailyCoachHandoff(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors
  }
}

export function startCoachPracticeFromDaily(handoff: DailyCoachHandoff): void {
  saveDailyCoachHandoff(handoff)
}
