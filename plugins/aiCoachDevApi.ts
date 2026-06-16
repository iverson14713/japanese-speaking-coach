import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { processAiCoachRequest } from '../api/lib/processAiCoachRequest'

async function readRequestBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

export function aiCoachDevApi(): Plugin {
  return {
    name: 'ai-coach-dev-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      if (env.OPENAI_API_KEY) {
        process.env.OPENAI_API_KEY = env.OPENAI_API_KEY
      }
      if (env.OPENAI_MODEL) {
        process.env.OPENAI_MODEL = env.OPENAI_MODEL
      }

      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/ai-coach' && !req.url?.startsWith('/api/ai-coach?')) {
          next()
          return
        }

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' })
          return
        }

        try {
          const raw = await readRequestBody(req)
          const body = raw ? JSON.parse(raw) : null
          const result = await processAiCoachRequest(body)

          if (result.error) {
            sendJson(res, result.status, result.error)
            return
          }

          sendJson(res, 200, result.data)
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Unknown server error'
          console.error('[ai-coach:dev] Unhandled server error:', message)
          sendJson(res, 500, { error: message, code: 'SERVER_ERROR' })
        }
      })
    },
  }
}
