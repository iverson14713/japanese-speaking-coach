import type { Language } from '../data/types'
import type { CoachPlan } from '../services/ai/types'
import { COACH_LIMITS } from '../services/ai/types'
import { AI_COACH_DEBUG_MAX_TURNS, isAiCoachDebugMode } from './aiCoachDebugMode'
import { getTodayDateKey } from './dateKey'

const STORAGE_PREFIX = 'travel-speaking-coach-coach-usage'

interface CoachUsageData {
  dateKey: string
  sessionsUsed: number
}

function storageKey(language: Language): string {
  return `${STORAGE_PREFIX}:${language}`
}

function loadData(language: Language): CoachUsageData {
  try {
    const raw = localStorage.getItem(storageKey(language))
    if (!raw) {
      return { dateKey: getTodayDateKey(), sessionsUsed: 0 }
    }
    const parsed = JSON.parse(raw) as CoachUsageData
    if (parsed.dateKey !== getTodayDateKey()) {
      return { dateKey: getTodayDateKey(), sessionsUsed: 0 }
    }
    return parsed
  } catch {
    return { dateKey: getTodayDateKey(), sessionsUsed: 0 }
  }
}

function saveData(language: Language, data: CoachUsageData): void {
  localStorage.setItem(storageKey(language), JSON.stringify(data))
}

export function getCoachSessionsUsed(language: Language): number {
  return loadData(language).sessionsUsed
}

export function getRemainingCoachSessions(plan: CoachPlan, language: Language): number {
  if (isAiCoachDebugMode()) {
    return COACH_LIMITS[plan].dailySessions
  }
  const limit = COACH_LIMITS[plan].dailySessions
  return Math.max(0, limit - getCoachSessionsUsed(language))
}

export function canStartCoachSession(plan: CoachPlan, language: Language): boolean {
  if (isAiCoachDebugMode()) {
    return true
  }
  return getRemainingCoachSessions(plan, language) > 0
}

export function consumeCoachSession(language: Language): void {
  if (isAiCoachDebugMode()) {
    return
  }
  const data = loadData(language)
  saveData(language, {
    dateKey: getTodayDateKey(),
    sessionsUsed: data.sessionsUsed + 1,
  })
}

export function getMaxTurnsForPlan(plan: CoachPlan): number {
  if (isAiCoachDebugMode()) {
    return AI_COACH_DEBUG_MAX_TURNS
  }
  return COACH_LIMITS[plan].maxTurnsPerSession
}
