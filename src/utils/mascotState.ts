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

export const DEFAULT_MASCOT_IMAGE = MASCOT_IMAGE_BY_MOOD.happy

export const DEFAULT_MASCOT_IMAGE_URL = `${MASCOT_BASE_PATH}/${DEFAULT_MASCOT_IMAGE}`

const VALID_MASCOT_FILENAMES = new Set<string>(Object.values(MASCOT_IMAGE_BY_MOOD))

export function resolveMascotImageFilename(mood: MascotMood | string | undefined): string {
  if (mood && typeof mood === 'string' && mood in MASCOT_IMAGE_BY_MOOD) {
    return MASCOT_IMAGE_BY_MOOD[mood as MascotMood]
  }
  return DEFAULT_MASCOT_IMAGE
}

export function getMascotImageUrl(filename: string | undefined): string {
  const safeFilename =
    filename && typeof filename === 'string' && VALID_MASCOT_FILENAMES.has(filename)
      ? filename
      : DEFAULT_MASCOT_IMAGE
  return `${MASCOT_BASE_PATH}/${safeFilename}`
}

export function isValidMascotState(state: MascotState | null | undefined): state is MascotState {
  if (!state) {
    return false
  }
  return (
    typeof state.image === 'string' &&
    state.image.length > 0 &&
    typeof state.imageUrl === 'string' &&
    state.imageUrl.length > 0 &&
    !state.imageUrl.includes('undefined') &&
    !state.imageUrl.includes('[object')
  )
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

/** Mascot mood depends only on practice progress — never language or sentence data. */
export function resolveMascotMood(input: MascotStateInput): MascotMood {
  const { todayCompleted, streakDays, lastPracticeDate } = input
  const today = input.todayDateKey ?? getTodayDateKey()

  if (todayCompleted && streakDays >= 3) {
    return 'excited'
  }

  if (todayCompleted) {
    return 'happy'
  }

  if (lastPracticeDate) {
    const daysSinceLastPractice = daysBetween(lastPracticeDate, today)
    if (daysSinceLastPractice > 2) {
      return 'tired'
    }
  }

  return 'sad'
}

function buildMascotVisual(mood: MascotMood): Pick<MascotState, 'mood' | 'image' | 'imageUrl' | 'emoji'> {
  const safeMood = mood in MASCOT_IMAGE_BY_MOOD ? mood : 'happy'
  const image = resolveMascotImageFilename(safeMood)
  return {
    mood: safeMood,
    image,
    imageUrl: getMascotImageUrl(image),
    emoji: MASCOT_EMOJI_BY_MOOD[safeMood],
  }
}

function buildState(
  mood: MascotMood,
  title: string,
  message: string,
  showStreak: boolean,
): MascotState {
  return {
    ...buildMascotVisual(mood),
    title,
    message,
    showStreak,
  }
}

/** Mascot mood/image depend only on practice progress — never language or sentence data. */
export function getMascotState(input: MascotStateInput): MascotState {
  const { todayCompleted, streakDays, lastPracticeDate } = input
  const mood = resolveMascotMood(input)

  if (todayCompleted && streakDays >= 3) {
    return buildState(
      mood,
      '今日已完成',
      `連續練習 ${streakDays} 天，出國更敢開口了！`,
      false,
    )
  }

  if (todayCompleted) {
    return buildState(
      mood,
      '今日已完成',
      '做得好！今天又多會一句旅行口說。',
      streakDays > 0,
    )
  }

  if (lastPracticeDate) {
    const today = input.todayDateKey ?? getTodayDateKey()
    const daysSinceLastPractice = daysBetween(lastPracticeDate, today)
    if (daysSinceLastPractice > 2) {
      return buildState(
        mood,
        '今日任務',
        '我等你好久了，今天一起練一句吧。',
        false,
      )
    }
  }

  return buildState(
    mood,
    '今日任務',
    '今天還沒練喔，我在等你開口～',
    streakDays > 0,
  )
}
