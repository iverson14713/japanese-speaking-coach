import type { Language } from '../../data/types'

export type CoachAiSource = 'openai' | 'mock' | 'fallback'

export const COACH_AI_SOURCE_LABELS: Record<CoachAiSource, string> = {
  openai: 'OpenAI',
  mock: 'Mock',
  fallback: 'Fallback',
}

export type CoachPlan = 'free' | 'pro'

export interface CoachLimits {
  dailySessions: number
  maxTurnsPerSession: number
}

export const COACH_LIMITS: Record<CoachPlan, CoachLimits> = {
  free: { dailySessions: 1, maxTurnsPerSession: 3 },
  pro: { dailySessions: 5, maxTurnsPerSession: 8 },
}

export type CoachPracticeMode = 'free-chat' | 'scenario-practice'

export interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
  meaningZh?: string
  pronunciation?: string
  coachingZh?: string
  guidanceZh?: string
  hint?: ChatHint
  /** welcome = 開場白；scenario-meta = 情境說明；dialogue = 對話內容 */
  variant?: 'welcome' | 'scenario-meta' | 'dialogue'
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

export interface CustomScenarioResult extends ChatSessionInfo {
  introZh: string
  openingLine: string
  openingMeaningZh: string
  openingPronunciation?: string
  hints: ChatHint[]
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
  pronunciation?: string
  meaningZh?: string
  explanationZh: string
  naturalnessTipZh?: string
}

/** @deprecated Use SuggestUserReplyResult fields via corrected alias */
export interface SuggestUserReplyResult {
  original: string
  suggestedSentence: string
  pronunciation?: string
  meaningZh: string
  explanationZh: string
}

export interface SuggestUserReplyRequest {
  language: Language
  userInput: string
  currentScenario: string
  aiRole: string
  userRole: string
  goal: string
  history: ChatMessage[]
}

export interface ConversationReplyResult {
  reply: string
  replyMeaningZh: string
  replyPronunciation?: string
  coachingZh?: string
  guidanceZh?: string
  hint?: ChatHint
}

export interface CustomScenarioRequest {
  language: Language
  scenario: string
}

export interface SentenceCorrectionRequest {
  language: Language
  userInput?: string
  /** @deprecated Use userInput */
  sentence?: string
  currentScenario?: string
  /** @deprecated Use currentScenario */
  scenarioTitle?: string
  aiRole?: string
  /** @deprecated Use aiRole */
  roleLabelZh?: string
  userRole?: string
  goal?: string
  /** @deprecated Use goal */
  goalZh?: string
  history: ChatMessage[]
}

export interface ConversationReplyRequest {
  language: Language
  scenario: string
  roleLabelZh: string
  goalZh: string
  maxTurns: number
  currentTurn: number
  plan: CoachPlan
  history: ChatMessage[]
  userMessage: string
  practiceMode?: CoachPracticeMode
}

export interface FreeChatReplyRequest {
  language: Language
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

export const COACH_CHAT_INPUT_PLACEHOLDER = '用中文描述想說的話，或用學習語言回覆教練...'

export const COACH_FREE_CHAT_WELCOME: Record<Language, string> = {
  en: 'Hi! What would you like to practice today?\n你也可以用中文告訴我想練什麼。',
  ja: 'こんにちは！今日は何を練習しましょうか？\n你也可以用中文告訴我想練什麼。',
  ko: '안녕하세요! 오늘은 무엇을 연습해 볼까요?\n你也可以用中文告訴我想練什麼。',
}

/** @deprecated Use COACH_FREE_CHAT_WELCOME[language] */
export const COACH_FREE_CHAT_WELCOME_TEXT = COACH_FREE_CHAT_WELCOME.en

export const COACH_SCENARIO_WELCOME =
  '今天想練什麼情境呢？\n你可以自己輸入旅行情境，\n也可以讓我幫你開一個話題。'

/** @deprecated Use COACH_SCENARIO_WELCOME or COACH_FREE_CHAT_WELCOME */
export const COACH_WELCOME_TEXT = COACH_SCENARIO_WELCOME

export const REPLY_PLACEHOLDERS: Record<Language, string> = {
  ja: '日文で返してみよう...',
  en: 'Try replying in English...',
  ko: '한국어로 답해보세요...',
}
