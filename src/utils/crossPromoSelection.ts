import { getAvailableCrossPromoApps, type CrossPromoApp } from '../constants/crossPromoApps'
import { getTodayDateKey } from './dateKey'

export type CrossPromoTab = 'today' | 'library' | 'dialogue'

const TAB_OFFSET: Record<CrossPromoTab, number> = {
  today: 0,
  library: 1,
  dialogue: 2,
}

function hashDateKey(dateKey: string): number {
  let hash = 0
  for (const char of dateKey) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }
  return hash
}

export function pickCrossPromoApp(
  tab: CrossPromoTab,
  dateKey: string = getTodayDateKey(),
): CrossPromoApp | null {
  const apps = getAvailableCrossPromoApps()
  if (apps.length === 0) {
    return null
  }

  const index = (hashDateKey(dateKey) + TAB_OFFSET[tab]) % apps.length
  return apps[index] ?? null
}
