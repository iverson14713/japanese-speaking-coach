import { getTodayDateKey } from './dateKey'

const DISMISS_KEY = 'coach-completion-upgrade-dismissed'

export function isCoachCompletionUpgradeDismissedToday(): boolean {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === getTodayDateKey()
  } catch {
    return false
  }
}

export function dismissCoachCompletionUpgradeToday(): void {
  try {
    sessionStorage.setItem(DISMISS_KEY, getTodayDateKey())
  } catch {
    // Ignore storage errors
  }
}
