import {
  CoachOpenAiError,
  generateCoachSpeakHelp,
  generateConversationReply,
  generateCustomScenario,
  generateTopicChat,
  type CoachSessionContext,
} from './coachOpenAi.js'

type CoachLanguage = 'ja' | 'en' | 'ko'

export type AiCoachAction =
  | 'custom-scenario'
  | 'start-topic-chat'
  | 'conversation-reply'
  | 'correct-sentence'

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
        )
        return { status: 200, data }
      }

      case 'correct-sentence': {
        const { language, sentence, scenarioTitle, roleLabelZh, goalZh, history } = payload

        if (!isCoachLanguage(language)) {
          return invalidBody('Invalid language')
        }
        if (
          typeof sentence !== 'string' ||
          typeof scenarioTitle !== 'string' ||
          typeof roleLabelZh !== 'string' ||
          typeof goalZh !== 'string' ||
          !Array.isArray(history)
        ) {
          return invalidBody('Missing correction context')
        }

        const result = await generateCoachSpeakHelp(
          language,
          sentence,
          { scenarioTitle, roleLabelZh, goalZh },
          history as { role: 'user' | 'assistant'; text: string }[],
        )

        return {
          status: 200,
          data: {
            original: sentence,
            corrected: result.foreignText,
            pronunciation: result.pronunciation,
            meaningZh: result.meaningZh,
            explanationZh: result.explanationZh,
            naturalnessTipZh: result.guidanceZh,
          },
        }
      }

      default:
        return invalidBody(`Unknown action: ${action}`)
    }
  } catch (error) {
    return mapOpenAiError(error)
  }
}
