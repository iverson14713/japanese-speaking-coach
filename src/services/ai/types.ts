import type { Language } from '../../data/types'

export type CoachPlan = 'free' | 'pro'

export interface CoachLimits {
  dailySessions: number
  maxTurnsPerSession: number
}

export const COACH_LIMITS: Record<CoachPlan, CoachLimits> = {
  free: { dailySessions: 1, maxTurnsPerSession: 3 },
  pro: { dailySessions: 5, maxTurnsPerSession: 8 },
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
  meaningZh?: string
  pronunciation?: string
}

export interface ChatSessionInfo {
  scenarioTitle: string
  roleLabelZh: string
  goalZh: string
}

export interface ChatHint {
  text: string
  meaningZh: string
  pronunciation?: string
}

export interface TopicChatSession extends ChatSessionInfo {
  openingLine: string
  openingMeaningZh: string
  openingPronunciation?: string
  hints: ChatHint[]
  followUpReplies: {
    reply: string
    replyMeaningZh: string
    replyPronunciation?: string
  }[]
}

export interface CustomScenarioResult {
  scenarioTitle: string
  roleDescriptionZh: string
  openingLine: string
  openingMeaningZh: string
  openingPronunciation?: string
}

/** @deprecated Use TopicChatSession for chat mode */
export interface TopicSuggestionResult extends TopicChatSession {
  scenarioDescriptionZh: string
  suggestedReply: string
  suggestedReplyMeaningZh: string
}

export interface SentenceCorrectionResult {
  original: string
  corrected: string
  explanationZh: string
  naturalnessTipZh: string
}

export interface ConversationReplyResult {
  reply: string
  replyMeaningZh: string
  replyPronunciation?: string
}

export interface CustomScenarioRequest {
  language: Language
  scenario: string
}

export interface SentenceCorrectionRequest {
  language: Language
  sentence: string
}

export interface ConversationReplyRequest {
  language: Language
  scenario: string
  history: ChatMessage[]
  userMessage: string
}

export interface TopicSuggestionRequest {
  language: Language
}

export interface TopicConversationRequest {
  language: Language
  scenarioTitle: string
  userTurnIndex: number
}

export const REPLY_PLACEHOLDERS: Record<Language, string> = {
  ja: '日文で返してみよう...',
  en: 'Try replying in English...',
  ko: '한국어로 답해보세요...',
}
