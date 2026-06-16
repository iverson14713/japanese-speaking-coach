type CoachLanguage = 'ja' | 'en' | 'ko'

const LANGUAGE_LABELS: Record<CoachLanguage, string> = {
  ja: '日文',
  en: '英文',
  ko: '韓文',
}

interface ChatTurn {
  role: 'user' | 'assistant'
  text: string
}

export interface CoachSessionContext {
  language: CoachLanguage
  scenarioTitle: string
  roleLabelZh: string
  goalZh: string
  maxTurns: number
  currentTurn: number
  plan: 'free' | 'pro'
}

const COACH_SYSTEM_PROMPT = `你是一位溫柔、自然的旅行口說教練。
你的任務是陪使用者練習旅行對話，不是只翻譯句子。

你會根據：
- 目前學習語言
- 旅行情境
- 你的角色
- 練習目標
- 聊天紀錄
- 使用者最新輸入

自然地回覆。

規則：
1. 如果使用者用中文說「我不會說」「怎麼講」「幫我說」，請提供一個適合目前情境的外語句子、發音輔助、中文意思，然後請使用者試著說一次。
2. 如果使用者用學習語言回覆，請先自然接話，再簡短指出是否可以更自然。
3. 如果使用者只是打招呼，請自然回應，不要硬給無關句子。
4. 不要一次給太多內容。
5. 每次回覆以一到兩句外語對話為主。
6. 保持像真人教練在陪練，不要像題庫。`

function languageInstruction(language: CoachLanguage): string {
  const label = LANGUAGE_LABELS[language]
  if (language === 'ja') {
    return `目前學習語言：${label}。外語對話請用日文，並提供羅馬拼音（romaji）發音輔助。`
  }
  if (language === 'ko') {
    return `目前學習語言：${label}。外語對話請用韓文，並提供羅馬字發音輔助。`
  }
  return `目前學習語言：${label}。外語對話請用英文。`
}

async function callOpenAiJson<T>(system: string, user: string): Promise<T> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      temperature: 0.75,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`OpenAI error ${response.status}: ${detail}`)
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[]
  }
  const content = payload.choices?.[0]?.message?.content
  if (!content) {
    throw new Error('Empty OpenAI response')
  }

  return JSON.parse(content) as T
}

function formatHistory(history: ChatTurn[]): string {
  if (history.length === 0) {
    return '（尚無對話）'
  }
  return history
    .map((turn) => `${turn.role === 'user' ? '使用者' : 'AI 教練'}：${turn.text}`)
    .join('\n')
}

export async function generateCustomScenario(
  language: CoachLanguage,
  scenario: string,
): Promise<{
  scenarioTitle: string
  roleLabelZh: string
  goalZh: string
  introZh: string
  openingLine: string
  openingMeaningZh: string
  openingPronunciation?: string
  hints: { text: string; meaningZh: string; pronunciation?: string }[]
}> {
  const system = `${COACH_SYSTEM_PROMPT}
${languageInstruction(language)}

請根據使用者描述的情境，設計一個旅行口說練習，並以角色身份開場。
只回傳 JSON：
{
  "scenarioTitle": "簡短情境標題（繁中）",
  "roleLabelZh": "AI 扮演的角色（繁中）",
  "goalZh": "練習目標（繁中）",
  "introZh": "教練開場，例如：好，我會扮演○○，陪你練習這個情境。",
  "openingLine": "學習語言的第一句對話（角色開場）",
  "openingMeaningZh": "開場句中文意思",
  "openingPronunciation": "發音輔助（ja/ko 必填，en 可省略）",
  "hints": [
    { "text": "建議回覆外語", "meaningZh": "中文意思", "pronunciation": "發音輔助" }
  ]
}`

  const user = `使用者想練的情境：${scenario}`
  return callOpenAiJson(system, user)
}

export async function generateTopicChat(language: CoachLanguage): Promise<{
  scenarioTitle: string
  roleLabelZh: string
  goalZh: string
  openingLine: string
  openingMeaningZh: string
  openingPronunciation?: string
  hints: { text: string; meaningZh: string; pronunciation?: string }[]
}> {
  const system = `${COACH_SYSTEM_PROMPT}
${languageInstruction(language)}

請隨機設計一個適合旅行者的口說情境（便利商店、餐廳、交通、飯店等），並直接開始對話。
只回傳 JSON：
{
  "scenarioTitle": "情境標題（繁中）",
  "roleLabelZh": "AI 角色（繁中）",
  "goalZh": "練習目標（繁中）",
  "openingLine": "學習語言開場第一句",
  "openingMeaningZh": "中文意思",
  "openingPronunciation": "發音輔助（ja/ko 必填）",
  "hints": [
    { "text": "建議回覆外語", "meaningZh": "中文意思", "pronunciation": "發音輔助" }
  ]
}`

  return callOpenAiJson(system, '請幫我開一個旅行口說話題。')
}

export async function generateConversationReply(
  context: CoachSessionContext,
  history: ChatTurn[],
  userMessage: string,
): Promise<{
  reply: string
  replyMeaningZh: string
  replyPronunciation?: string
  coachingZh?: string
  guidanceZh?: string
  hint?: { text: string; meaningZh: string; pronunciation?: string }
}> {
  const system = `${COACH_SYSTEM_PROMPT}
${languageInstruction(context.language)}

目前練習設定：
- 旅行情境：${context.scenarioTitle}
- 你的角色：${context.roleLabelZh}
- 練習目標：${context.goalZh}
- 方案：${context.plan === 'free' ? 'Free' : 'Pro'}，本輪最多 ${context.maxTurns} 回合，目前在第 ${context.currentTurn} 回合

請根據完整聊天紀錄與使用者最新輸入，自然地扮演角色或提供教練引導。
- 打招呼：自然回應並延續情境，不要硬塞無關例句。
- 「我不會說」「怎麼講」「幫我說」：進入教練模式（isCoaching=true），提供一句適合情境的外語、發音、中文意思，並請使用者試著說一次。
- 學習語言回覆：先自然接話（isCoaching=false），可簡短補充是否可更自然。

只回傳 JSON：
{
  "isCoaching": boolean,
  "coachingZh": "教練引導繁中（僅教練模式）",
  "reply": "一到兩句外語（角色對話或教學例句）",
  "replyPronunciation": "發音輔助",
  "replyMeaningZh": "中文意思",
  "guidanceZh": "簡短下一步引導（可選）",
  "hint": { "text": "下一句可試著說的外語", "meaningZh": "中文意思", "pronunciation": "發音輔助" }
}`

  const user = `完整聊天紀錄：
${formatHistory(history)}

使用者最新輸入：${userMessage}`

  const result = await callOpenAiJson<{
    isCoaching?: boolean
    coachingZh?: string
    reply: string
    replyMeaningZh: string
    replyPronunciation?: string
    guidanceZh?: string
    hint?: { text: string; meaningZh: string; pronunciation?: string }
  }>(system, user)

  return {
    reply: result.reply,
    replyMeaningZh: result.replyMeaningZh,
    replyPronunciation: result.replyPronunciation,
    coachingZh: result.isCoaching ? result.coachingZh : undefined,
    guidanceZh: result.guidanceZh,
    hint: result.hint,
  }
}

export async function generateCoachSpeakHelp(
  language: CoachLanguage,
  sentence: string,
  context: Pick<CoachSessionContext, 'scenarioTitle' | 'roleLabelZh' | 'goalZh'>,
  history: ChatTurn[],
): Promise<{
  foreignText: string
  pronunciation?: string
  meaningZh: string
  explanationZh: string
  guidanceZh?: string
}> {
  const system = `${COACH_SYSTEM_PROMPT}
${languageInstruction(language)}

使用者按下「教練幫我說」。請根據情境、聊天紀錄與使用者意思，產生一句適合當下、可直接開口的外語。
- 中文求救或「我不會說」：給可直接使用的外語句子。
- 外語但不太自然：修正成更自然的說法並簡短說明。
- 只是打招呼：給適合情境的自然問候或回應句，不要給無關句子。

目前情境：${context.scenarioTitle}
你的角色：${context.roleLabelZh}
練習目標：${context.goalZh}

只回傳 JSON：
{
  "foreignText": "建議開口的外語句子",
  "pronunciation": "發音輔助（ja/ko）",
  "meaningZh": "中文意思",
  "explanationZh": "為什麼這句適合這個情境（繁中，一兩句）",
  "guidanceZh": "鼓勵使用者試著輸入或開口（繁中，可選）"
}`

  const user = `近期聊天紀錄：
${formatHistory(history)}

使用者訊息：${sentence}`

  return callOpenAiJson(system, user)
}
