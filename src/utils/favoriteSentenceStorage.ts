import type { FavoriteSentence, FavoriteSentenceInput } from '../types/favoriteSentence'
import { FREE_FAVORITE_LIMIT } from '../constants/proEntitlements'
import { showToast } from './toast'

const STORAGE_KEY = 'travel-speaking-coach-favorite-sentences'
const STORAGE_VERSION = 1

interface FavoriteStoragePayload {
  version: number
  items: FavoriteSentence[]
}

type FavoriteListener = () => void
const listeners = new Set<FavoriteListener>()

function notifyListeners(): void {
  listeners.forEach((listener) => listener())
}

export function subscribeFavoriteSentences(listener: FavoriteListener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function loadPayload(): FavoriteStoragePayload {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { version: STORAGE_VERSION, items: [] }
    }
    const parsed = JSON.parse(raw) as Partial<FavoriteStoragePayload>
    if (!Array.isArray(parsed.items)) {
      return { version: STORAGE_VERSION, items: [] }
    }
    return {
      version: typeof parsed.version === 'number' ? parsed.version : STORAGE_VERSION,
      items: parsed.items.filter(isValidFavorite),
    }
  } catch {
    return { version: STORAGE_VERSION, items: [] }
  }
}

function isValidFavorite(item: unknown): item is FavoriteSentence {
  if (!item || typeof item !== 'object') {
    return false
  }
  const favorite = item as Partial<FavoriteSentence>
  return (
    typeof favorite.id === 'string' &&
    (typeof favorite.sentenceId === 'number' || typeof favorite.sentenceId === 'string') &&
    typeof favorite.language === 'string' &&
    typeof favorite.scenario === 'string' &&
    typeof favorite.chinese === 'string' &&
    typeof favorite.answer === 'string' &&
    typeof favorite.source === 'string' &&
    typeof favorite.createdAt === 'number'
  )
}

function savePayload(payload: FavoriteStoragePayload): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  notifyListeners()
}

export function getFavoriteSentences(): FavoriteSentence[] {
  return [...loadPayload().items].sort((a, b) => b.createdAt - a.createdAt)
}

export function getFavoriteSentencesByLanguage(language: string): FavoriteSentence[] {
  return getFavoriteSentences().filter((item) => item.language === language)
}

export function isFavoriteSentence(id: string): boolean {
  return loadPayload().items.some((item) => item.id === id)
}

export function getFavoriteSentenceCount(): number {
  return loadPayload().items.length
}

export function canAddFavoriteSentence(isPro: boolean): boolean {
  if (isPro) {
    return true
  }
  return getFavoriteSentenceCount() < FREE_FAVORITE_LIMIT
}

export function addFavoriteSentence(
  input: FavoriteSentenceInput,
  options?: { isPro?: boolean },
): FavoriteSentence | 'limit-reached' {
  const payload = loadPayload()
  const existing = payload.items.find((item) => item.id === input.id)
  if (existing) {
    return existing
  }

  const isPro = options?.isPro ?? false
  if (!canAddFavoriteSentence(isPro)) {
    return 'limit-reached'
  }

  const next: FavoriteSentence = {
    ...input,
    createdAt: Date.now(),
    syncVersion: 0,
  }
  savePayload({
    version: STORAGE_VERSION,
    items: [next, ...payload.items],
  })
  showToast('已加入收藏，之後可在句庫查看')
  return next
}

export function removeFavoriteSentence(id: string): void {
  const payload = loadPayload()
  const nextItems = payload.items.filter((item) => item.id !== id)
  if (nextItems.length === payload.items.length) {
    return
  }
  savePayload({ version: STORAGE_VERSION, items: nextItems })
  showToast('已取消收藏')
}

export function toggleFavoriteSentence(
  input: FavoriteSentenceInput,
  options?: { isPro?: boolean },
): boolean | 'limit-reached' {
  if (isFavoriteSentence(input.id)) {
    removeFavoriteSentence(input.id)
    return false
  }
  const result = addFavoriteSentence(input, options)
  if (result === 'limit-reached') {
    return 'limit-reached'
  }
  return true
}
