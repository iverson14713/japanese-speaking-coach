import { getCurrentWeekDateKeys, getTodayDateKey } from './dateKey'
import {
  getMascotImageUrl,
  MASCOT_EMOJI_BY_MOOD,
  resolveMascotImageFilename,
  resolveMascotMood,
  type MascotMood,
} from './mascotState'

export interface WeekProgressDay {
  dateKey: string
  completed: boolean
  isToday: boolean
}

export interface DailyProgressStateInput {
  todayCompleted: boolean
  streakDays: number
  lastPracticeDate: string | null
  completedDates: string[]
  todayDateKey?: string
}

export interface DailyProgressState {
  todayCompleted: boolean
  streakDays: number
  weekProgress: WeekProgressDay[]
  mascotMood: MascotMood
  mascotImage: string
  mascotImageUrl: string
  mascotEmoji: string
  title: string
  message: string
  statusLabel: string
}

function buildWeekProgress(completedDates: string[], today: string): WeekProgressDay[] {
  const completedSet = new Set(completedDates)
  return getCurrentWeekDateKeys().map((dateKey) => ({
    dateKey,
    completed: completedSet.has(dateKey),
    isToday: dateKey === today,
  }))
}

/** Shared today-page + future widget progress snapshot. Practice data only — no language/sentence. */
export function getDailyProgressState(input: DailyProgressStateInput): DailyProgressState {
  const today = input.todayDateKey ?? getTodayDateKey()
  const mascotMood = resolveMascotMood({
    todayCompleted: input.todayCompleted,
    streakDays: input.streakDays,
    lastPracticeDate: input.lastPracticeDate,
    todayDateKey: today,
  })
  const mascotImage = resolveMascotImageFilename(mascotMood)
  const weekProgress = buildWeekProgress(input.completedDates, today)

  const base = {
    todayCompleted: input.todayCompleted,
    streakDays: input.streakDays,
    weekProgress,
    mascotMood,
    mascotImage,
    mascotImageUrl: getMascotImageUrl(mascotImage),
    mascotEmoji: MASCOT_EMOJI_BY_MOOD[mascotMood],
  }

  if (input.todayCompleted) {
    return {
      ...base,
      title: '今日已完成',
      message: '做得好！今天又多會一句旅行口說。',
      statusLabel:
        input.streakDays > 0 ? `🔥 連續練習 ${input.streakDays} 天` : '',
    }
  }

  return {
    ...base,
    title: '今日尚未完成',
    message: '今天花 30 秒，練會一句出國會用到的話。',
    statusLabel: '今天還沒練習',
  }
}
