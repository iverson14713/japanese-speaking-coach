const STORAGE_KEY = 'aiCoachDebugMode'

export const AI_COACH_DEBUG_MAX_TURNS = 20

export function isAiCoachDebugMode(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function enableAiCoachDebugMode(): void {
  localStorage.setItem(STORAGE_KEY, 'true')
}

export function disableAiCoachDebugMode(): void {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Reads ?debugAi=1|0 from the URL and syncs localStorage.
 * Returns whether debug mode is active after sync.
 */
export function syncAiCoachDebugFromUrl(search: string = window.location.search): boolean {
  const params = new URLSearchParams(search)
  if (!params.has('debugAi')) {
    return isAiCoachDebugMode()
  }

  const value = params.get('debugAi')
  if (value === '1') {
    enableAiCoachDebugMode()
    return true
  }
  if (value === '0') {
    disableAiCoachDebugMode()
    return false
  }

  return isAiCoachDebugMode()
}
