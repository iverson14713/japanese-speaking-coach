import type { Language } from '../data/types'
import type { ChatMessage, ChatSessionInfo, CoachPracticeMode } from '../services/ai'

const CHAT_STORAGE_PREFIX = 'aiCoachChat'
const SUMMARY_STORAGE_PREFIX = 'aiCoachSummary'
const MODE_STORAGE_PREFIX = 'aiCoachMode'

const MAX_STORED_MESSAGES = 30
const MAX_API_MESSAGES = 10

type StoredMessage = {
  role: 'user' | 'assistant'
  text: string
  pronunciation?: string
  meaningZh?: string
  createdAt: number
  mode: CoachPracticeMode
  variant?: ChatMessage['variant']
}

export type CoachChatSnapshot = {
  version: 1
  savedAt: number
  language: Language
  practiceMode: CoachPracticeMode
  phase: 'welcome' | 'active' | 'ended'
  sessionInfo: ChatSessionInfo | null
  scenarioKey: string
  userTurns: number
  messages: StoredMessage[]
}

function modeKey(language: Language): string {
  return `${MODE_STORAGE_PREFIX}_${language}`
}

function keyModeSuffix(mode: CoachPracticeMode): 'freeChat' | 'scenarioPractice' {
  return mode === 'free-chat' ? 'freeChat' : 'scenarioPractice'
}

function chatKey(language: Language, mode: CoachPracticeMode): string {
  return `${CHAT_STORAGE_PREFIX}_${language}_${keyModeSuffix(mode)}`
}

function legacyChatKey(language: Language): string {
  return `${CHAT_STORAGE_PREFIX}_${language}`
}

function summaryKey(language: Language): string {
  return `${SUMMARY_STORAGE_PREFIX}_${language}`
}

export function loadCoachChatSnapshot(language: Language, mode: CoachPracticeMode): CoachChatSnapshot | null {
  try {
    const raw = localStorage.getItem(chatKey(language, mode))
    if (!raw) {
      // Migration: older versions stored a single chat per language under `aiCoachChat_{lang}`.
      // We migrate that legacy data into the freeChat bucket on first load.
      if (mode === 'free-chat') {
        const legacyRaw = localStorage.getItem(legacyChatKey(language))
        if (legacyRaw) {
          const legacyParsed = JSON.parse(legacyRaw) as Partial<CoachChatSnapshot>
          if (legacyParsed && legacyParsed.version === 1 && legacyParsed.language === language) {
            const migrated: CoachChatSnapshot = {
              version: 1,
              savedAt: typeof legacyParsed.savedAt === 'number' ? legacyParsed.savedAt : Date.now(),
              language,
              practiceMode: 'free-chat',
              phase: legacyParsed.phase === 'active' || legacyParsed.phase === 'ended' ? legacyParsed.phase : 'welcome',
              sessionInfo: (legacyParsed.sessionInfo as ChatSessionInfo | null) ?? null,
              scenarioKey: typeof legacyParsed.scenarioKey === 'string' ? legacyParsed.scenarioKey : '',
              userTurns: typeof legacyParsed.userTurns === 'number' ? legacyParsed.userTurns : 0,
              messages: Array.isArray(legacyParsed.messages) ? (legacyParsed.messages as StoredMessage[]) : [],
            }
            localStorage.setItem(chatKey(language, 'free-chat'), JSON.stringify(migrated))
            localStorage.removeItem(legacyChatKey(language))
            return migrated
          }
        }
      }
      return null
    }
    const parsed = JSON.parse(raw) as CoachChatSnapshot
    if (
      !parsed ||
      parsed.version !== 1 ||
      parsed.language !== language ||
      parsed.practiceMode !== mode ||
      !Array.isArray(parsed.messages)
    ) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function saveCoachChatSnapshot(snapshot: CoachChatSnapshot): void {
  try {
    localStorage.setItem(chatKey(snapshot.language, snapshot.practiceMode), JSON.stringify(snapshot))
    // Clean up legacy key if it exists to avoid confusion.
    localStorage.removeItem(legacyChatKey(snapshot.language))
  } catch {
    // Ignore storage errors
  }
}

export type InitialCoachState = {
  practiceMode: CoachPracticeMode
  phase: 'welcome' | 'active' | 'ended'
  sessionInfo: ChatSessionInfo | null
  scenarioKey: string
  userTurns: number
  messages: ChatMessage[]
  hasStoredChat: boolean
}

export function readInitialCoachState(language: Language, mode: CoachPracticeMode): InitialCoachState {
  const snapshot = loadCoachChatSnapshot(language, mode)
  if (!snapshot || snapshot.messages.length === 0) {
    return {
      practiceMode: mode,
      phase: 'welcome',
      sessionInfo: null,
      scenarioKey: '',
      userTurns: 0,
      messages: [],
      hasStoredChat: false,
    }
  }

  return {
    practiceMode: snapshot.practiceMode,
    phase: snapshot.phase,
    sessionInfo: snapshot.sessionInfo,
    scenarioKey: snapshot.scenarioKey,
    userTurns: snapshot.userTurns,
    messages: hydrateMessagesFromStorage(snapshot.messages),
    hasStoredChat: true,
  }
}

export function buildCoachChatSnapshot(input: {
  language: Language
  practiceMode: CoachPracticeMode
  phase: 'welcome' | 'active' | 'ended'
  sessionInfo: ChatSessionInfo | null
  scenarioKey: string
  userTurns: number
  messages: ChatMessage[]
}): CoachChatSnapshot {
  return {
    version: 1,
    savedAt: Date.now(),
    language: input.language,
    practiceMode: input.practiceMode,
    phase: input.phase,
    sessionInfo: input.sessionInfo,
    scenarioKey: input.scenarioKey,
    userTurns: input.userTurns,
    messages: serializeMessagesForStorage(input.language, input.practiceMode, input.messages),
  }
}

export function clearCoachChatSnapshot(language: Language): void {
  try {
    localStorage.removeItem(chatKey(language, 'free-chat'))
    localStorage.removeItem(chatKey(language, 'scenario-practice'))
  } catch {
    // Ignore storage errors
  }
}

export function clearCoachChatSnapshotForMode(language: Language, mode: CoachPracticeMode): void {
  try {
    localStorage.removeItem(chatKey(language, mode))
  } catch {
    // Ignore storage errors
  }
}

export function loadCoachPracticeModePreference(language: Language): CoachPracticeMode {
  try {
    const raw = localStorage.getItem(modeKey(language))
    return raw === 'scenario-practice' ? 'scenario-practice' : 'free-chat'
  } catch {
    return 'free-chat'
  }
}

export function saveCoachPracticeModePreference(language: Language, mode: CoachPracticeMode): void {
  try {
    localStorage.setItem(modeKey(language), mode)
  } catch {
    // Ignore storage errors
  }
}

export function serializeMessagesForStorage(
  language: Language,
  practiceMode: CoachPracticeMode,
  messages: ChatMessage[],
): StoredMessage[] {
  const now = Date.now()
  const stored: StoredMessage[] = messages
    .filter((m) => m.variant !== 'welcome')
    .map((m) => ({
      role: m.role,
      text: m.text,
      pronunciation: m.pronunciation,
      meaningZh: m.meaningZh,
      createdAt: m.createdAt ?? now,
      mode: m.mode ?? practiceMode,
      variant: m.variant,
    }))
    .slice(-MAX_STORED_MESSAGES)

  void language
  return stored
}

export function hydrateMessagesFromStorage(
  stored: StoredMessage[],
): ChatMessage[] {
  return stored.map((m) => ({
    role: m.role,
    text: m.text,
    pronunciation: m.pronunciation,
    meaningZh: m.meaningZh,
    variant: m.variant ?? 'dialogue',
    createdAt: m.createdAt,
    mode: m.mode,
  }))
}

export function takeRecentHistoryForApi(messages: ChatMessage[]): ChatMessage[] {
  const usable = messages.filter((m) => m.variant !== 'welcome')
  return usable.slice(-MAX_API_MESSAGES)
}

export function loadCoachLearningSummary(language: Language): string {
  try {
    return localStorage.getItem(summaryKey(language)) ?? ''
  } catch {
    return ''
  }
}

export function saveCoachLearningSummary(language: Language, summary: string): void {
  const trimmed = summary.trim()
  try {
    if (!trimmed) {
      localStorage.removeItem(summaryKey(language))
      return
    }
    localStorage.setItem(summaryKey(language), trimmed.slice(0, 800))
  } catch {
    // Ignore storage errors
  }
}

export function clearCoachLearningSummary(language: Language): void {
  try {
    localStorage.removeItem(summaryKey(language))
  } catch {
    // Ignore storage errors
  }
}

