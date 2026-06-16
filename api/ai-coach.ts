import { processAiCoachRequest } from './lib/processAiCoachRequest.js'

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

function readJsonBody(req: VercelRequest): unknown {
  if (req.body === undefined || req.body === null) {
    return null
  }
  if (typeof req.body === 'string') {
    return JSON.parse(req.body)
  }
  return req.body
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(204).end()
    return
  }

  if (req.method !== 'POST') {
    console.error('[ai-coach] Method not allowed:', req.method)
    res.status(405).json({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' })
    return
  }

  try {
    const body = readJsonBody(req)
    const result = await processAiCoachRequest(body)

    if (result.error) {
      res.status(result.status).json(result.error)
      return
    }

    res.status(200).json(result.data)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error'
    console.error('[ai-coach] Unhandled server error:', message)
    res.status(500).json({ error: message, code: 'SERVER_ERROR' })
  }
}
