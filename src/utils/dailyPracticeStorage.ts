import type { Language } from '../data/types'
import {
  getMaxFreezeCards,
  STREAK_MILESTONE_DAYS,
  type StreakMilestoneDay,
} from '../constants/streakConfig'
import { getDayBeforeDateKey, getTodayDateKey, getYesterdayDateKey } from './dateKey'

const STORAGE_PREFIX = 'travel-speaking-coach-daily'

export interface DailyPracticeData {
  completedDates: string[]
  /** Stored as `streak`; exposed as streakCount in getters. */
  streak: number
  lastCompletedDate: string | null
  streakFreezeCards: number
  claimedMilestones: number[]
}

export interface PracticeCompletionOptions {
  isPro?: boolean
}

export interface PracticeCompletionResult {
  streak: number
  isNewCompletion: boolean
  freezeCards: number
  freezeCardUsed: boolean
  streakReset: boolean
  newMilestones: StreakMilestoneDay[]
  freezeCardAwarded: boolean
}

function storageKey(language: Language): string {
  return `${STORAGE_PREFIX}:${language}`
}

function normalizeDailyPracticeData(parsed: Partial<DailyPracticeData> | null): DailyPracticeData {
  if (!parsed) {
    return {
      completedDates: [],
      streak: 0,
      lastCompletedDate: null,
      streakFreezeCards: 0,
      claimedMilestones: [],
    }
  }

  return {
    completedDates: Array.isArray(parsed.completedDates) ? parsed.completedDates : [],
    streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
    lastCompletedDate: parsed.lastCompletedDate ?? null,
    streakFreezeCards:
      typeof parsed.streakFreezeCards === 'number' ? Math.max(0, parsed.streakFreezeCards) : 0,
    claimedMilestones: Array.isArray(parsed.claimedMilestones)
      ? parsed.claimedMilestones.filter((value): value is number => typeof value === 'number')
      : [],
  }
}

function loadData(language: Language): DailyPracticeData {
  try {
    const raw = localStorage.getItem(storageKey(language))
    if (!raw) {
      return normalizeDailyPracticeData(null)
    }
    return normalizeDailyPracticeData(JSON.parse(raw) as Partial<DailyPracticeData>)
  } catch {
    return normalizeDailyPracticeData(null)
  }
}

function saveData(language: Language, data: DailyPracticeData): void {
  localStorage.setItem(storageKey(language), JSON.stringify(data))
}

function isStreakMilestoneDay(value: number): value is StreakMilestoneDay {
  return STREAK_MILESTONE_DAYS.includes(value as StreakMilestoneDay)
}

function resolveNewMilestones(
  streak: number,
  claimedMilestones: number[],
): { milestones: StreakMilestoneDay[]; claimedMilestones: number[] } {
  const nextClaimed = [...claimedMilestones]
  const milestones: StreakMilestoneDay[] = []

  for (const milestone of STREAK_MILESTONE_DAYS) {
    if (streak >= milestone && !nextClaimed.includes(milestone)) {
      milestones.push(milestone)
      nextClaimed.push(milestone)
    }
  }

  return { milestones, claimedMilestones: nextClaimed }
}

function awardFreezeCard(data: DailyPracticeData, maxCards: number): boolean {
  if (data.streakFreezeCards >= maxCards) {
    return false
  }

  data.streakFreezeCards += 1
  return true
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

/** Alias for UI copy that refers to streakCount. */
export function getStreakCount(language: Language): number {
  return getStreak(language)
}

export function getStreakFreezeCards(language: Language): number {
  return loadData(language).streakFreezeCards
}

export function getClaimedMilestones(language: Language): number[] {
  return [...loadData(language).claimedMilestones]
}

export function getCompletedDates(language: Language): string[] {
  return loadData(language).completedDates
}

export function getDailyPracticeSnapshot(language: Language): DailyPracticeData {
  return loadData(language)
}

export function recordValidPracticeCompletion(
  language: Language,
  options: PracticeCompletionOptions = {},
): PracticeCompletionResult {
  const today = getTodayDateKey()
  const yesterday = getYesterdayDateKey()
  const dayBeforeYesterday = getDayBeforeDateKey(yesterday)
  const data = loadData(language)
  const maxFreezeCards = getMaxFreezeCards(options.isPro === true)

  if (data.completedDates.includes(today)) {
    return {
      streak: data.streak,
      isNewCompletion: false,
      freezeCards: data.streakFreezeCards,
      freezeCardUsed: false,
      streakReset: false,
      newMilestones: [],
      freezeCardAwarded: false,
    }
  }

  let freezeCardUsed = false
  let streakReset = false
  let newStreak = 1

  if (data.lastCompletedDate === yesterday) {
    newStreak = data.streak > 0 ? data.streak + 1 : 1
  } else if (
    data.lastCompletedDate === dayBeforeYesterday &&
    data.streak > 0 &&
    data.streakFreezeCards > 0
  ) {
    newStreak = data.streak + 1
    data.streakFreezeCards -= 1
    freezeCardUsed = true
  } else if (data.lastCompletedDate === null) {
    newStreak = 1
  } else {
    streakReset = data.streak > 0
    newStreak = 1
  }

  const milestoneResult = resolveNewMilestones(newStreak, data.claimedMilestones)
  let freezeCardAwarded = false

  if (milestoneResult.milestones.includes(10)) {
    freezeCardAwarded = awardFreezeCard(data, maxFreezeCards)
  }

  const nextData: DailyPracticeData = {
    completedDates: [...new Set([...data.completedDates, today])],
    streak: newStreak,
    lastCompletedDate: today,
    streakFreezeCards: data.streakFreezeCards,
    claimedMilestones: milestoneResult.claimedMilestones,
  }

  saveData(language, nextData)

  return {
    streak: newStreak,
    isNewCompletion: true,
    freezeCards: nextData.streakFreezeCards,
    freezeCardUsed,
    streakReset: streakReset && !freezeCardUsed,
    newMilestones: milestoneResult.milestones.filter(isStreakMilestoneDay),
    freezeCardAwarded,
  }
}

/** @deprecated Use recordValidPracticeCompletion */
export function completeToday(
  language: Language,
  options: PracticeCompletionOptions = {},
): { streak: number; isNewCompletion: boolean } {
  const result = recordValidPracticeCompletion(language, options)
  return { streak: result.streak, isNewCompletion: result.isNewCompletion }
}
