import { getTodayDateKey } from './dateKey'

export type MascotMood = 'happy' | 'excited' | 'sad' | 'tired'

export const MASCOT_IMAGE_BY_MOOD: Record<MascotMood, string> = {
  happy: 'dog-happy.png',
  excited: 'dog-excited.png',
  sad: 'dog-sad.png',
  tired: 'dog-tired.png',
}

export const MASCOT_EMOJI_BY_MOOD: Record<MascotMood, string> = {
  happy: '🐶',
  excited: '🐶✨',
  sad: '🐶',
  tired: '🐶💤',
}

export const MASCOT_BASE_PATH = '/mascot'

export function getMascotImageUrl(filename: string): string {
  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}mascot/${filename}`
}

export interface MascotStateInput {
  todayCompleted: boolean
  streakDays: number
  lastPracticeDate: string | null
  todayDateKey?: string
}

export interface MascotState {
  mood: MascotMood
  image: string
  imageUrl: string
  emoji: string
  title: string
  message: string
  showStreak: boolean
}

function daysBetween(fromDateKey: string, toDateKey: string): number {
  const from = new Date(`${fromDateKey}T12:00:00`)
  const to = new Date(`${toDateKey}T12:00:00`)
  const diffMs = to.getTime() - from.getTime()
  return Math.floor(diffMs / 86_400_000)
}

function buildState(
  mood: MascotMood,
  title: string,
  message: string,
  showStreak: boolean,
): MascotState {
  const image = MASCOT_IMAGE_BY_MOOD[mood]
  return {
    mood,
    image,
    imageUrl: getMascotImageUrl(image),
    emoji: MASCOT_EMOJI_BY_MOOD[mood],
    title,
    message,
    showStreak,
  }
}

export function getMascotState(input: MascotStateInput): MascotState {
  const { todayCompleted, streakDays, lastPracticeDate } = input
  const today = input.todayDateKey ?? getTodayDateKey()

  if (todayCompleted && streakDays >= 3) {
    return buildState(
      'excited',
      '今日已完成',
      `連續練習 ${streakDays} 天，出國更敢開口了！`,
      false,
    )
  }

  if (todayCompleted) {
    return buildState(
      'happy',
      '今日已完成',
      '做得好！今天又多會一句旅行口說。',
      streakDays > 0,
    )
  }

  if (lastPracticeDate) {
    const daysSinceLastPractice = daysBetween(lastPracticeDate, today)
    if (daysSinceLastPractice > 2) {
      return buildState(
        'tired',
        '今日任務',
        '我等你好久了，今天一起練一句吧。',
        false,
      )
    }
  }

  return buildState(
    'sad',
    '今日任務',
    '今天還沒練喔，我在等你開口～',
    streakDays > 0,
  )
}
