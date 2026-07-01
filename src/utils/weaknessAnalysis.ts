import type { Language } from '../data/types'
import type { ChatMessage, CoachFeedback } from '../services/ai/types'
import { getTodayDateKey } from './dateKey'
import { loadCoachChatSnapshot } from './aiCoachChatStorage'

export interface WeaknessAnalysisResult {
  hasData: boolean
  commonMistakes: string[]
  naturalPhrases: { foreign: string; meaningZh?: string }[]
  reviewSentences: { foreign: string; meaningZh?: string }[]
}

function isTodayTimestamp(timestamp?: number): boolean {
  if (!timestamp) {
    return false
  }
  const date = new Date(timestamp)
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return key === getTodayDateKey()
}

function collectTodayMessages(language: Language): ChatMessage[] {
  const modes = ['free-chat', 'scenario-practice'] as const
  const combined: ChatMessage[] = []

  for (const mode of modes) {
    const snapshot = loadCoachChatSnapshot(language, mode)
    if (!snapshot) {
      continue
    }
    for (const message of snapshot.messages) {
      if (isTodayTimestamp(message.createdAt)) {
        combined.push(message)
      }
    }
  }

  return combined.sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0))
}

function pairUserFeedback(messages: ChatMessage[]): { userText: string; feedback: CoachFeedback }[] {
  const pairs: { userText: string; feedback: CoachFeedback }[] = []

  for (let index = 0; index < messages.length; index += 1) {
    const message = messages[index]
    if (message.role !== 'assistant' || !message.coachFeedback) {
      continue
    }
    const previous = messages[index - 1]
    if (!previous || previous.role !== 'user') {
      continue
    }
    pairs.push({ userText: previous.text, feedback: message.coachFeedback })
  }

  return pairs
}

function uniqueStrings(items: string[], limit: number): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const item of items) {
    const trimmed = item.trim()
    if (!trimmed || seen.has(trimmed)) {
      continue
    }
    seen.add(trimmed)
    result.push(trimmed)
    if (result.length >= limit) {
      break
    }
  }
  return result
}

export function buildWeaknessAnalysis(language: Language): WeaknessAnalysisResult {
  const messages = collectTodayMessages(language)
  const pairs = pairUserFeedback(messages)

  if (pairs.length === 0) {
    return {
      hasData: false,
      commonMistakes: [],
      naturalPhrases: [],
      reviewSentences: [],
    }
  }

  const commonMistakes = uniqueStrings(
    pairs.map((pair) => pair.feedback.tipZh).filter(Boolean),
    3,
  )

  const naturalPhrases = pairs
    .filter((pair) => !pair.feedback.naturalAlreadyGood)
    .map((pair) => ({
      foreign: pair.feedback.natural,
      meaningZh: pair.feedback.naturalMeaningZh,
    }))
    .filter((item) => item.foreign && item.foreign !== '這句已經很自然')
    .slice(0, 3)

  const reviewSentences = pairs
    .map((pair) => ({
      foreign: pair.feedback.corrected,
      meaningZh: pair.feedback.correctedMeaningZh,
    }))
    .slice(-3)
    .reverse()

  return {
    hasData: commonMistakes.length > 0 || naturalPhrases.length > 0 || reviewSentences.length > 0,
    commonMistakes,
    naturalPhrases,
    reviewSentences,
  }
}
