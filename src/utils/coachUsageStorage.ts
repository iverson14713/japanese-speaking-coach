import type { Language } from '../data/types'
import type { CoachPlan } from '../services/ai/types'
import { COACH_LIMITS } from '../services/ai/types'
import { AI_COACH_DEBUG_MAX_TURNS, isAiCoachDebugMode } from './aiCoachDebugMode'
import { getTodayDateKey } from './dateKey'

const STORAGE_PREFIX = 'travel-speaking-coach-coach-usage'
const FREE_PER_SESSION_TURN_LIMIT = COACH_LIMITS.free.freePerSessionTurnLimit ?? 5
const FREE_DAILY_TURN_LIMIT = COACH_LIMITS.free.dailyTurnLimit
const PRO_DAILY_TURN_LIMIT = COACH_LIMITS.pro.dailyTurnLimit

export interface CoachDailyUsage {
  dateKey: string
  freeSessionStarted: boolean
  freeSessionCompleted: boolean
  currentFreeSessionTurns: number
  totalTurnsUsedToday: number
}

export type CoachUsageDisplayKind =
  | 'debug'
  | 'free-not-started'
  | 'free-in-progress'
  | 'free-exhausted'
  | 'pro-active'
  | 'pro-exhausted'

export interface CoachUsageDisplayInfo {
  kind: CoachUsageDisplayKind
  title: string
  hint?: string
  secondaryTitle?: string
  totalTurnsUsed: number
  dailyTurnLimit: number
  remainingTurns: number
  currentSessionTurns: number
  freePerSessionTurnLimit: number
  freeSessionStarted: boolean
  freeSessionCompleted: boolean
}

function storageKey(language: Language): string {
  return `${STORAGE_PREFIX}:${language}`
}

function freshUsage(): CoachDailyUsage {
  return {
    dateKey: getTodayDateKey(),
    freeSessionStarted: false,
    freeSessionCompleted: false,
    currentFreeSessionTurns: 0,
    totalTurnsUsedToday: 0,
  }
}

function isCoachDailyUsage(value: unknown): value is CoachDailyUsage {
  if (!value || typeof value !== 'object') {
    return false
  }
  const record = value as Record<string, unknown>
  return (
    typeof record.dateKey === 'string' &&
    typeof record.freeSessionStarted === 'boolean' &&
    typeof record.freeSessionCompleted === 'boolean' &&
    typeof record.currentFreeSessionTurns === 'number' &&
    typeof record.totalTurnsUsedToday === 'number'
  )
}

function loadData(language: Language): CoachDailyUsage {
  try {
    const raw = localStorage.getItem(storageKey(language))
    if (!raw) {
      return freshUsage()
    }
    const parsed = JSON.parse(raw) as unknown
    if (!isCoachDailyUsage(parsed) || parsed.dateKey !== getTodayDateKey()) {
      return freshUsage()
    }
    return parsed
  } catch {
    return freshUsage()
  }
}

function saveData(language: Language, data: CoachDailyUsage): void {
  localStorage.setItem(storageKey(language), JSON.stringify(data))
}

export function getDailyTurnLimit(plan: CoachPlan): number {
  if (isAiCoachDebugMode()) {
    return AI_COACH_DEBUG_MAX_TURNS
  }
  return COACH_LIMITS[plan].dailyTurnLimit
}

export function getCoachDailyUsage(language: Language): CoachDailyUsage {
  return loadData(language)
}

export function getTotalTurnsUsedToday(language: Language): number {
  return loadData(language).totalTurnsUsedToday
}

export function getRemainingTurnsToday(plan: CoachPlan, language: Language): number {
  const limit = getDailyTurnLimit(plan)
  return Math.max(0, limit - getTotalTurnsUsedToday(language))
}

/** 是否還能呼叫 AI 教練 API（送出前檢查） */
export function canUseCoachApi(plan: CoachPlan, language: Language): boolean {
  if (isAiCoachDebugMode()) {
    return true
  }

  const usage = loadData(language)
  const limit = getDailyTurnLimit(plan)

  if (usage.totalTurnsUsedToday >= limit) {
    return false
  }

  if (plan === 'pro') {
    return true
  }

  if (usage.freeSessionCompleted) {
    return false
  }

  if (usage.freeSessionStarted && usage.currentFreeSessionTurns >= FREE_PER_SESSION_TURN_LIMIT) {
    return false
  }

  return true
}

/** AI 成功回覆後記錄 1 回合（API 失敗時不呼叫） */
export function recordCoachTurnSuccess(plan: CoachPlan, language: Language): void {
  if (isAiCoachDebugMode()) {
    return
  }

  const usage = loadData(language)
  const next: CoachDailyUsage = {
    ...usage,
    totalTurnsUsedToday: usage.totalTurnsUsedToday + 1,
  }

  if (plan === 'free') {
    if (!next.freeSessionStarted) {
      next.freeSessionStarted = true
    }
    next.currentFreeSessionTurns += 1

    const sessionLimit = FREE_PER_SESSION_TURN_LIMIT
    const dailyLimit = FREE_DAILY_TURN_LIMIT
    if (next.currentFreeSessionTurns >= sessionLimit || next.totalTurnsUsedToday >= dailyLimit) {
      next.freeSessionCompleted = true
    }
  }

  saveData(language, next)
}

export function getCoachUsageDisplay(plan: CoachPlan, language: Language): CoachUsageDisplayInfo {
  if (isAiCoachDebugMode()) {
    return {
      kind: 'debug',
      title: '測試模式：不限次數',
      totalTurnsUsed: 0,
      dailyTurnLimit: AI_COACH_DEBUG_MAX_TURNS,
      remainingTurns: AI_COACH_DEBUG_MAX_TURNS,
      currentSessionTurns: 0,
      freePerSessionTurnLimit: FREE_PER_SESSION_TURN_LIMIT,
      freeSessionStarted: false,
      freeSessionCompleted: false,
    }
  }

  const usage = loadData(language)
  const dailyTurnLimit = getDailyTurnLimit(plan)
  const remainingTurns = getRemainingTurnsToday(plan, language)
  const freePerSessionTurnLimit = FREE_PER_SESSION_TURN_LIMIT

  if (plan === 'pro') {
    if (remainingTurns <= 0) {
      return {
        kind: 'pro-exhausted',
        title: '今日 Pro AI 回合已用完',
        hint: '明天會自動恢復 15 回合',
        totalTurnsUsed: usage.totalTurnsUsedToday,
        dailyTurnLimit,
        remainingTurns: 0,
        currentSessionTurns: usage.currentFreeSessionTurns,
        freePerSessionTurnLimit,
        freeSessionStarted: usage.freeSessionStarted,
        freeSessionCompleted: usage.freeSessionCompleted,
      }
    }

    return {
      kind: 'pro-active',
      title: `今日剩餘 ${remainingTurns} / ${dailyTurnLimit} 回合`,
      hint: `今日 AI 回合 ${usage.totalTurnsUsedToday} / ${dailyTurnLimit}`,
      totalTurnsUsed: usage.totalTurnsUsedToday,
      dailyTurnLimit,
      remainingTurns,
      currentSessionTurns: usage.currentFreeSessionTurns,
      freePerSessionTurnLimit,
      freeSessionStarted: usage.freeSessionStarted,
      freeSessionCompleted: usage.freeSessionCompleted,
    }
  }

  if (usage.freeSessionCompleted || remainingTurns <= 0) {
    return {
      kind: 'free-exhausted',
      title: '今日免費 AI 實戰已完成',
      hint: '升級 Pro 可解鎖每日 15 回合，不限場次',
      totalTurnsUsed: usage.totalTurnsUsedToday,
      dailyTurnLimit,
      remainingTurns: 0,
      currentSessionTurns: usage.currentFreeSessionTurns,
      freePerSessionTurnLimit,
      freeSessionStarted: usage.freeSessionStarted,
      freeSessionCompleted: true,
    }
  }

  if (!usage.freeSessionStarted) {
    return {
      kind: 'free-not-started',
      title: '今日免費實戰 0 / 1 場',
      hint: '每場 5 回合',
      totalTurnsUsed: usage.totalTurnsUsedToday,
      dailyTurnLimit,
      remainingTurns,
      currentSessionTurns: 0,
      freePerSessionTurnLimit,
      freeSessionStarted: false,
      freeSessionCompleted: false,
    }
  }

  return {
    kind: 'free-in-progress',
    title: `本場回合 ${usage.currentFreeSessionTurns} / ${freePerSessionTurnLimit}`,
    secondaryTitle: '今日免費實戰 1 / 1 場',
    totalTurnsUsed: usage.totalTurnsUsedToday,
    dailyTurnLimit,
    remainingTurns,
    currentSessionTurns: usage.currentFreeSessionTurns,
    freePerSessionTurnLimit,
    freeSessionStarted: true,
    freeSessionCompleted: false,
  }
}

/** @deprecated Use canUseCoachApi */
export function canStartCoachSession(plan: CoachPlan, language: Language): boolean {
  return canUseCoachApi(plan, language)
}

/** @deprecated Use getRemainingTurnsToday */
export function getRemainingCoachSessions(plan: CoachPlan, language: Language): number {
  return getRemainingTurnsToday(plan, language)
}

/** @deprecated Sessions are tracked via recordCoachTurnSuccess */
export function consumeCoachSession(_language: Language): void {
  // no-op: turns are recorded after successful AI replies
}

/** @deprecated Use getCoachUsageDisplay */
export function getCoachSessionsUsed(language: Language): number {
  return loadData(language).totalTurnsUsedToday
}

/** Free 單場上限；Pro 回傳每日上限（僅供 API 語境，不作為 Pro 中斷條件） */
export function getMaxTurnsForPlan(plan: CoachPlan): number {
  if (isAiCoachDebugMode()) {
    return AI_COACH_DEBUG_MAX_TURNS
  }
  if (plan === 'pro') {
    return PRO_DAILY_TURN_LIMIT
  }
  return COACH_LIMITS.free.freePerSessionTurnLimit ?? FREE_PER_SESSION_TURN_LIMIT
}

export function shouldEndCoachSessionAfterTurn(
  plan: CoachPlan,
  language: Language,
  nextSessionTurnCount: number,
): boolean {
  if (isAiCoachDebugMode()) {
    return false
  }

  if (getRemainingTurnsToday(plan, language) <= 0) {
    return true
  }

  if (plan === 'free') {
    return nextSessionTurnCount >= FREE_PER_SESSION_TURN_LIMIT
  }

  return false
}
