import type { Language } from '../data/types'
import type { ChatMessage, ChatSessionInfo, CoachPracticeMode } from '../services/ai'

const CHAT_STORAGE_PREFIX = 'aiCoachChat'
const SUMMARY_STORAGE_PREFIX = 'aiCoachSummary'

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

function chatKey(language: Language): string {
  return `${CHAT_STORAGE_PREFIX}_${language}`
}

function summaryKey(language: Language): string {
  return `${SUMMARY_STORAGE_PREFIX}_${language}`
}

export function loadCoachChatSnapshot(language: Language): CoachChatSnapshot | null {
  try {
    const raw = localStorage.getItem(chatKey(language))
    if (!raw) {
      return null
    }
    const parsed = JSON.parse(raw) as CoachChatSnapshot
    if (!parsed || parsed.version !== 1 || parsed.language !== language || !Array.isArray(parsed.messages)) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function saveCoachChatSnapshot(snapshot: CoachChatSnapshot): void {
  try {
    localStorage.setItem(chatKey(snapshot.language), JSON.stringify(snapshot))
  } catch {
    // Ignore storage errors
  }
}

export function clearCoachChatSnapshot(language: Language): void {
  try {
    localStorage.removeItem(chatKey(language))
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

