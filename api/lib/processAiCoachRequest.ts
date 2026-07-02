import {
  CoachOpenAiError,
  generateConversationReply,
  generateCustomScenario,
  generateFreeChatReply,
  generateSuggestUserReply,
  generateTopicChat,
  type CoachSessionContext,
} from './coachOpenAi.js'

type CoachLanguage = 'ja' | 'en' | 'ko'

export type AiCoachAction =
  | 'custom-scenario'
  | 'start-topic-chat'
  | 'free-chat-reply'
  | 'conversation-reply'
  | 'suggest-user-reply'
  | 'correct-sentence'
  | 'translation-coach-report'

export interface AiCoachErrorBody {
  error: string
  code: string
}

export interface AiCoachResult {
  status: number
  data?: unknown
  error?: AiCoachErrorBody
}

function isCoachLanguage(value: unknown): value is CoachLanguage {
  return value === 'ja' || value === 'en' || value === 'ko'
}

function invalidBody(message: string): AiCoachResult {
  console.error('[ai-coach] Invalid request body:', message)
  return {
    status: 400,
    error: { code: 'INVALID_BODY', error: message },
  }
}

function mapOpenAiError(error: unknown): AiCoachResult {
  if (error instanceof CoachOpenAiError) {
    const status = error.code === 'MISSING_API_KEY' ? 503 : 502
    return {
      status,
      error: { code: error.code, error: error.message },
    }
  }

  const message = error instanceof Error ? error.message : 'Unknown server error'
  console.error('[ai-coach] Server error:', message)
  return {
    status: 500,
    error: { code: 'SERVER_ERROR', error: message },
  }
}

export async function processAiCoachRequest(body: unknown): Promise<AiCoachResult> {
  if (!body || typeof body !== 'object') {
    return invalidBody('Request body must be a JSON object')
  }

  const payload = body as Record<string, unknown>
  const action = payload.action

  if (typeof action !== 'string') {
    return invalidBody('Missing action field')
  }

  try {
    switch (action as AiCoachAction) {
      case 'custom-scenario': {
        const { language, scenario } = payload
        if (!isCoachLanguage(language)) {
          return invalidBody('Invalid language')
        }
        if (typeof scenario !== 'string' || !scenario.trim()) {
          return invalidBody('Missing scenario')
        }
        const data = await generateCustomScenario(language, scenario)
        return { status: 200, data }
      }

      case 'start-topic-chat': {
        const { language } = payload
        if (!isCoachLanguage(language)) {
          return invalidBody('Invalid language')
        }
        const data = await generateTopicChat(language)
        return { status: 200, data }
      }

      case 'free-chat-reply': {
        const { language, history, userMessage } = payload
        const learningSummary = typeof payload.learningSummary === 'string' ? payload.learningSummary : ''
        const inputMode =
          payload.inputMode === 'zh-coach' || payload.inputMode === 'practice-language'
            ? payload.inputMode
            : 'practice-language'

        if (!isCoachLanguage(language)) {
          return invalidBody('Invalid language')
        }
        if (!Array.isArray(history) || typeof userMessage !== 'string') {
          return invalidBody('Missing history or userMessage')
        }

        const data = await generateFreeChatReply(
          language,
          history as { role: 'user' | 'assistant'; text: string }[],
          userMessage,
          learningSummary,
          inputMode,
        )
        return { status: 200, data }
      }

      case 'conversation-reply': {
        const {
          language,
          scenario,
          roleLabelZh,
          goalZh,
          maxTurns,
          currentTurn,
          plan,
          history,
          userMessage,
        } = payload
        const learningSummary = typeof payload.learningSummary === 'string' ? payload.learningSummary : ''
        const inputMode =
          payload.inputMode === 'zh-coach' || payload.inputMode === 'practice-language'
            ? payload.inputMode
            : 'practice-language'

        if (!isCoachLanguage(language)) {
          return invalidBody('Invalid language')
        }
        if (typeof scenario !== 'string' || typeof roleLabelZh !== 'string' || typeof goalZh !== 'string') {
          return invalidBody('Missing session context')
        }
        if (typeof maxTurns !== 'number' || typeof currentTurn !== 'number') {
          return invalidBody('Invalid turn limits')
        }
        if (plan !== 'free' && plan !== 'pro') {
          return invalidBody('Invalid plan')
        }
        if (!Array.isArray(history) || typeof userMessage !== 'string') {
          return invalidBody('Missing history or userMessage')
        }

        const context: CoachSessionContext = {
          language,
          scenarioTitle: scenario,
          roleLabelZh,
          goalZh,
          maxTurns,
          currentTurn,
          plan,
        }

        const data = await generateConversationReply(
          context,
          history as { role: 'user' | 'assistant'; text: string }[],
          userMessage,
          learningSummary,
          inputMode,
        )
        return { status: 200, data }
      }

      case 'suggest-user-reply':
      case 'correct-sentence': {
        const language = payload.currentLanguage ?? payload.language
        const userInput = payload.userInput ?? payload.sentence
        const currentScenario = payload.currentScenario ?? payload.scenarioTitle
        const aiRole = payload.aiRole ?? payload.roleLabelZh
        const userRole = payload.userRole ?? '旅行者'
        const goal = payload.goal ?? payload.goalZh
        const history = payload.conversationHistory ?? payload.history

        if (!isCoachLanguage(language)) {
          return invalidBody('Invalid language')
        }
        if (
          typeof userInput !== 'string' ||
          typeof currentScenario !== 'string' ||
          typeof aiRole !== 'string' ||
          typeof userRole !== 'string' ||
          typeof goal !== 'string' ||
          !Array.isArray(history)
        ) {
          return invalidBody('Missing suggest-user-reply context')
        }

        const result = await generateSuggestUserReply(
          language,
          userInput,
          {
            scenarioTitle: currentScenario,
            aiRoleLabelZh: aiRole,
            userRoleLabelZh: userRole,
            goalZh: goal,
          },
          history as { role: 'user' | 'assistant'; text: string }[],
        )

        return {
          status: 200,
          data: {
            original: userInput,
            suggestedSentence: result.suggestedSentence,
            corrected: result.suggestedSentence,
            pronunciation: language === 'en' ? undefined : result.pronunciation || undefined,
            meaningZh: result.meaningZh,
            explanationZh: result.explanationZh,
          },
        }
      }

      case 'translation-coach-report': {
        const { language, scenarioLabel, items } = payload
        if (!isCoachLanguage(language)) {
          return invalidBody('Invalid language')
        }
        if (typeof scenarioLabel !== 'string' || !scenarioLabel.trim()) {
          return invalidBody('Missing scenarioLabel')
        }
        if (!Array.isArray(items) || items.length === 0) {
          return invalidBody('Missing items')
        }

        const normalized = items.map((item) => {
          if (!item || typeof item !== 'object') {
            return null
          }
          const row = item as Record<string, unknown>
          const chinese = row.chinese
          const userAnswer = row.userAnswer
          const standardAnswer = row.standardAnswer
          if (typeof chinese !== 'string' || typeof userAnswer !== 'string' || typeof standardAnswer !== 'string') {
            return null
          }
          return { chinese, userAnswer, standardAnswer }
        })

        if (normalized.some((row) => row === null)) {
          return invalidBody('Invalid items payload')
        }

        const { generateTranslationCoachReport } = await import('./coachOpenAi.js')
        const data = await generateTranslationCoachReport(language, scenarioLabel, normalized as {
          chinese: string
          userAnswer: string
          standardAnswer: string
        }[])
        return { status: 200, data }
      }

      default:
        return invalidBody(`Unknown action: ${action}`)
    }
  } catch (error) {
    return mapOpenAiError(error)
  }
}
