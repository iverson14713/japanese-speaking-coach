import {
  generateCoachSpeakHelp,
  generateConversationReply,
  generateCustomScenario,
  generateTopicChat,
  type CoachSessionContext,
} from './openai.js'

type CoachLanguage = 'ja' | 'en' | 'ko'

interface VercelRequest {
  method?: string
  body?: unknown
}

interface VercelResponse {
  status: (code: number) => VercelResponse
  json: (body: unknown) => void
  end: () => void
  setHeader: (name: string, value: string) => void
}

function readBody<T>(req: VercelRequest): T {
  return req.body as T
}

function handleOptions(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.status(204).end()
}

function handleError(res: VercelResponse, error: unknown): void {
  const message = error instanceof Error ? error.message : 'Unknown error'
  const status = message.includes('OPENAI_API_KEY') ? 503 : 500
  res.status(status).json({ error: message })
}

export async function customScenarioHandler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    handleOptions(res)
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { language, scenario } = readBody<{ language: CoachLanguage; scenario: string }>(req)
    const result = await generateCustomScenario(language, scenario)
    res.status(200).json(result)
  } catch (error) {
    handleError(res, error)
  }
}

export async function startTopicChatHandler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    handleOptions(res)
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { language } = readBody<{ language: CoachLanguage }>(req)
    const result = await generateTopicChat(language)
    res.status(200).json(result)
  } catch (error) {
    handleError(res, error)
  }
}

export async function conversationReplyHandler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    handleOptions(res)
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = readBody<{
      language: CoachLanguage
      scenario: string
      roleLabelZh: string
      goalZh: string
      maxTurns: number
      currentTurn: number
      plan: 'free' | 'pro'
      history: { role: 'user' | 'assistant'; text: string }[]
      userMessage: string
    }>(req)

    const context: CoachSessionContext = {
      language: body.language,
      scenarioTitle: body.scenario,
      roleLabelZh: body.roleLabelZh,
      goalZh: body.goalZh,
      maxTurns: body.maxTurns,
      currentTurn: body.currentTurn,
      plan: body.plan,
    }

    const result = await generateConversationReply(context, body.history, body.userMessage)
    res.status(200).json(result)
  } catch (error) {
    handleError(res, error)
  }
}

export async function correctSentenceHandler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method === 'OPTIONS') {
    handleOptions(res)
    return
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = readBody<{
      language: CoachLanguage
      sentence: string
      scenarioTitle: string
      roleLabelZh: string
      goalZh: string
      history: { role: 'user' | 'assistant'; text: string }[]
    }>(req)

    const result = await generateCoachSpeakHelp(
      body.language,
      body.sentence,
      {
        scenarioTitle: body.scenarioTitle,
        roleLabelZh: body.roleLabelZh,
        goalZh: body.goalZh,
      },
      body.history,
    )

    res.status(200).json({
      original: body.sentence,
      corrected: result.foreignText,
      pronunciation: result.pronunciation,
      meaningZh: result.meaningZh,
      explanationZh: result.explanationZh,
      naturalnessTipZh: result.guidanceZh,
    })
  } catch (error) {
    handleError(res, error)
  }
}
