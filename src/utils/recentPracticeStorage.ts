import type { Language } from '../data/types'

const STORAGE_KEY = 'travel-speaking-coach-recent-practice'
const MAX_RECENT_ITEMS = 30

export interface RecentPracticeEntry {
  language: Language
  sentenceId: number
  categoryId: string
  practicedAt: number
}

interface RecentPracticePayload {
  items: RecentPracticeEntry[]
}

type RecentPracticeListener = () => void
const listeners = new Set<RecentPracticeListener>()

function notifyListeners(): void {
  listeners.forEach((listener) => listener())
}

export function subscribeRecentPractice(listener: RecentPracticeListener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function loadPayload(): RecentPracticePayload {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { items: [] }
    }
    const parsed = JSON.parse(raw) as Partial<RecentPracticePayload>
    if (!Array.isArray(parsed.items)) {
      return { items: [] }
    }
    return {
      items: parsed.items.filter(
        (item) =>
          item &&
          typeof item.language === 'string' &&
          typeof item.sentenceId === 'number' &&
          typeof item.categoryId === 'string' &&
          typeof item.practicedAt === 'number',
      ),
    }
  } catch {
    return { items: [] }
  }
}

function savePayload(payload: RecentPracticePayload): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  notifyListeners()
}

export function recordRecentPractice(
  language: Language,
  sentenceId: number,
  categoryId: string,
): void {
  const payload = loadPayload()
  const filtered = payload.items.filter(
    (item) => !(item.language === language && item.sentenceId === sentenceId),
  )
  const next: RecentPracticeEntry = {
    language,
    sentenceId,
    categoryId,
    practicedAt: Date.now(),
  }
  savePayload({
    items: [next, ...filtered].slice(0, MAX_RECENT_ITEMS),
  })
}

export function getRecentPracticeEntries(language?: Language): RecentPracticeEntry[] {
  const items = loadPayload().items
  if (!language) {
    return [...items]
  }
  return items.filter((item) => item.language === language)
}
