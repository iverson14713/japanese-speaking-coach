import { getTodayDateKey } from './dateKey'

const STORAGE_KEY = 'travel-speaking-coach-translation-challenge'

interface TranslationChallengeDailyStats {
  lastPlayedDate: string | null
  todayExp: number
  roundsCompleted: number
}

function loadStats(): TranslationChallengeDailyStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { lastPlayedDate: null, todayExp: 0, roundsCompleted: 0 }
    }
    const parsed = JSON.parse(raw) as Partial<TranslationChallengeDailyStats>
    const today = getTodayDateKey()
    if (parsed.lastPlayedDate !== today) {
      return {
        lastPlayedDate: parsed.lastPlayedDate ?? null,
        todayExp: 0,
        roundsCompleted: 0,
      }
    }
    return {
      lastPlayedDate: parsed.lastPlayedDate ?? null,
      todayExp: typeof parsed.todayExp === 'number' ? parsed.todayExp : 0,
      roundsCompleted:
        typeof parsed.roundsCompleted === 'number' ? parsed.roundsCompleted : 0,
    }
  } catch {
    return { lastPlayedDate: null, todayExp: 0, roundsCompleted: 0 }
  }
}

function saveStats(stats: TranslationChallengeDailyStats): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats))
}

export function getTranslationChallengeTodayExp(): number {
  return loadStats().todayExp
}

export function recordTranslationChallengeRound(expGained: number): TranslationChallengeDailyStats {
  const today = getTodayDateKey()
  const current = loadStats()
  const next: TranslationChallengeDailyStats = {
    lastPlayedDate: today,
    todayExp: (current.lastPlayedDate === today ? current.todayExp : 0) + expGained,
    roundsCompleted: (current.lastPlayedDate === today ? current.roundsCompleted : 0) + 1,
  }
  saveStats(next)
  return next
}
