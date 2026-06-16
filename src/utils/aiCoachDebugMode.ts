const STORAGE_KEY = 'aiCoachDebugMode'

export const AI_COACH_DEBUG_MAX_TURNS = 20
export const TITLE_TAP_COUNT_REQUIRED = 5
export const TITLE_TAP_WINDOW_MS = 2500

export function isAiCoachDebugMode(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export function enableAiCoachDebugMode(): void {
  try {
    localStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // Ignore quota / private mode errors
  }
}

export function disableAiCoachDebugMode(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore
  }
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

interface TitleTapState {
  count: number
  lastTapAt: number
}

export function registerTitleTapForDebug(
  state: TitleTapState,
  now: number = Date.now(),
): { nextState: TitleTapState; activated: boolean } {
  const withinWindow = now - state.lastTapAt <= TITLE_TAP_WINDOW_MS
  const count = withinWindow ? state.count + 1 : 1

  if (count >= TITLE_TAP_COUNT_REQUIRED) {
    enableAiCoachDebugMode()
    return { nextState: { count: 0, lastTapAt: now }, activated: true }
  }

  return { nextState: { count, lastTapAt: now }, activated: false }
}
