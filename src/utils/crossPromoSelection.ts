import type { DialogueCategoryId } from '../data/dialogues'
import type { AppTab } from '../components/BottomTabBar'
import { getAvailableCrossPromoApps, type CrossPromoApp } from '../constants/crossPromoApps'
import { getTodayDateKey } from './dateKey'

export type CrossPromoSurface = 'today' | 'library' | 'dialogue'

function dayIndexFromDateKey(dateKey: string): number {
  const [year, month, day] = dateKey.split('-').map(Number)
  if (!year || !month || !day) {
    return 0
  }
  return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000)
}

export function getCrossPromoSurface(
  activeTab: AppTab,
  dialogueCategory: DialogueCategoryId | null,
): CrossPromoSurface | null {
  if (activeTab === 'today') {
    return 'today'
  }
  if (activeTab === 'library') {
    return 'library'
  }
  if (activeTab === 'dialogue' && dialogueCategory === null) {
    return 'dialogue'
  }
  return null
}

export function getInitialPromoIndex(dateKey: string = getTodayDateKey()): number {
  const apps = getAvailableCrossPromoApps()
  if (apps.length === 0) {
    return 0
  }
  return dayIndexFromDateKey(dateKey) % apps.length
}

export function getCrossPromoAppAtIndex(index: number): CrossPromoApp | null {
  const apps = getAvailableCrossPromoApps()
  if (apps.length === 0) {
    return null
  }
  const normalized = ((index % apps.length) + apps.length) % apps.length
  return apps[normalized] ?? null
}
