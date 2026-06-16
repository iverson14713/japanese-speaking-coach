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

const COACH_PERSONA = `你是「旅行口說教練」App 裡的 AI 口說教練，用繁體中文引導、陪伴使用者練旅行口說。
你的風格像真人教練：溫暖、具體、會根據使用者剛說的話調整，不要像死板題庫或固定模板。
當使用者用中文求救、說「我不會說」「不知道怎麼說」、或輸入與情境無關的內容時，先暫停角色扮演，改用教練模式教他一句可直接開口的外語，再鼓勵他試著輸入或開口。
當使用者用學習語言回覆且大致合理時，維持角色扮演，用學習語言自然回應。`

function languageInstruction(language: CoachLanguage): string {
  const label = LANGUAGE_LABELS[language]
  if (language === 'ja') {
    return `學習語言是${label}。回覆中的外語句子請用日文；並提供羅馬拼音發音（romaji）。`
  }
  if (language === 'ko') {
    return `學習語言是${label}。回覆中的外語句子請用韓文；並提供羅馬字發音輔助。`
  }
  return `學習語言是${label}。回覆中的外語句子請用英文。`
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
    .map((turn) => `${turn.role === 'user' ? '使用者' : 'AI'}：${turn.text}`)
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
  const system = `${COACH_PERSONA}
${languageInstruction(language)}
請根據使用者描述的情境，設計一個旅行口說練習。
只回傳 JSON，格式：
{
  "scenarioTitle": "簡短情境標題（繁中）",
  "roleLabelZh": "AI 扮演的角色（繁中）",
  "goalZh": "練習目標（繁中）",
  "introZh": "像教練開場，例如：好，我會扮演○○，陪你練習這個情境。",
  "openingLine": "學習語言的第一句對話（角色開場）",
  "openingMeaningZh": "開場句中文意思",
  "openingPronunciation": "發音輔助（ja/ko 必填，en 可省略）",
  "hints": [
    { "text": "建議回覆外語", "meaningZh": "中文意思", "pronunciation": "發音輔助" }
  ]
}
hints 請給 3 句符合情境、由易到難的建議回覆。`

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
  const system = `${COACH_PERSONA}
${languageInstruction(language)}
請隨機設計一個適合旅行者的口說情境（便利商店、餐廳、交通、飯店等），並直接開始對話。
只回傳 JSON，格式：
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
}
hints 請給 3 句。`

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
  const system = `${COACH_PERSONA}
${languageInstruction(context.language)}

目前練習設定：
- 情境：${context.scenarioTitle}
- AI 扮演：${context.roleLabelZh}
- 練習目標：${context.goalZh}
- 方案：${context.plan === 'free' ? 'Free' : 'Pro'}，本輪最多 ${context.maxTurns} 回合，目前在第 ${context.currentTurn} 回合

回覆規則：
1. 若使用者求救、說不會、或輸入中文求助：進入教練模式（isCoaching=true），不要繼續硬演角色。
   - coachingZh：繁中引導，如「沒關係，你可以先用這句：」
   - reply：可直接開口的外語句子
   - replyPronunciation、replyMeaningZh 必填
   - guidanceZh：鼓勵下一步，如「你試著打一次看看。」
2. 若使用者用學習語言合理回覆：維持角色扮演（isCoaching=false）。
   - reply：角色用學習語言的自然回應（1～2 句）
   - replyMeaningZh、replyPronunciation（ja/ko）必填
   - guidanceZh 可簡短引導下一步（可選）
3. hint 提供一句使用者下一輪可以試著說的外語（含 meaningZh；ja/ko 加 pronunciation）

只回傳 JSON：
{
  "isCoaching": boolean,
  "coachingZh": "教練引導繁中（教練模式時）",
  "reply": "外語句子（角色對話或教學例句）",
  "replyPronunciation": "發音輔助",
  "replyMeaningZh": "中文意思",
  "guidanceZh": "下一步引導（繁中，可選）",
  "hint": { "text": "", "meaningZh": "", "pronunciation": "" }
}`

  const user = `對話紀錄：
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
  const system = `${COACH_PERSONA}
${languageInstruction(language)}

使用者按下「教練幫我說」，請根據情境與使用者意思，產生一句適合當下、可直接開口的外語。
- 若使用者輸入中文、求救語、或「我不會說」：給可直接使用的外語句子，不要只改標點。
- 若使用者輸入外語但不太自然：修正成更自然的說法並簡短說明。

目前情境：${context.scenarioTitle}
AI 角色：${context.roleLabelZh}
練習目標：${context.goalZh}

只回傳 JSON：
{
  "foreignText": "建議開口的外語句子",
  "pronunciation": "發音輔助（ja/ko）",
  "meaningZh": "中文意思",
  "explanationZh": "為什麼這句適合這個情境（繁中，一兩句）",
  "guidanceZh": "鼓勵使用者試著輸入或開口（繁中，可選）"
}`

  const user = `近期對話：
${formatHistory(history.slice(-6))}

使用者訊息：${sentence}`

  return callOpenAiJson(system, user)
}
