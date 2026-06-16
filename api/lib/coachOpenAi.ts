import OpenAI from 'openai'

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

export class CoachOpenAiError extends Error {
  code: string

  constructor(code: string, message: string) {
    super(message)
    this.name = 'CoachOpenAiError'
    this.code = code
  }
}

const COACH_SYSTEM_PROMPT = `你是一位溫柔、自然的旅行口說教練。
你的任務是陪使用者練習旅行對話，不是翻譯機，也不是死板題庫。

核心原則：
- 使用者主要是中文使用者，你永遠看得懂繁體中文。
- 不管目前學習語言是日文、英文或韓文，使用者都可以先用中文說明想表達什麼。
- 你要根據「目前學習語言」教他怎麼說，再輕輕引導他試著開口。

回覆規則：
1. 使用者用繁體中文描述想說的內容（例如「我想問這班車會不會到東京」）→ 進入教學模式：
   - coachingZh：繁中簡短引導，如「可以這樣說：」（英文學習時可用 "You can say:"，但不要每次都用同一句）
   - reply：目標語言 1～2 句，可直接開口
   - replyPronunciation：日文、韓文必填羅馬音/發音輔助；英文可省略
   - replyMeaningZh：繁中意思
   - guidanceZh：輕輕引導，如「你可以試著說一次。」「換你回我一句。」「你也可以用中文告訴我你想說什麼。」
2. 使用者說「我不會說」「怎麼講」「幫我說」「這句怎麼說」→ 依目前情境給一句可直接使用的目標語言句子（教學模式）。
3. 使用者用目前學習語言回覆 → 維持角色扮演，自然接話（非教學模式）；必要時簡短指出更自然的說法。
4. 使用者只是打招呼（如「哈囉」）→ 自然回應並延續情境，不要硬塞無關例句。
5. 每次回覆不要太長，外語以 1～2 句為主。
6. 不要固定模板，不要不管使用者說什麼都回「你可以先用這句」「沒關係，你可以先用這句」。
7. 不要要求使用者一定要先用外語；允許先用中文問，再慢慢帶回目標語言。`

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

function getOpenAiClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('[ai-coach] Missing OPENAI_API_KEY')
    throw new CoachOpenAiError('MISSING_API_KEY', 'OPENAI_API_KEY is not configured')
  }
  return new OpenAI({ apiKey })
}

async function callOpenAiJson<T>(system: string, user: string): Promise<T> {
  const client = getOpenAiClient()
  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini'

  try {
    const completion = await client.chat.completions.create({
      model,
      temperature: 0.75,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    })

    const content = completion.choices[0]?.message?.content
    if (!content) {
      console.error('[ai-coach] OpenAI returned empty content')
      throw new CoachOpenAiError('OPENAI_EMPTY_RESPONSE', 'OpenAI returned an empty response')
    }

    return JSON.parse(content) as T
  } catch (error) {
    if (error instanceof CoachOpenAiError) {
      throw error
    }

    const message = error instanceof Error ? error.message : 'Unknown OpenAI error'
    console.error('[ai-coach] OpenAI API error:', message)
    throw new CoachOpenAiError('OPENAI_API_ERROR', message)
  }
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

  return callOpenAiJson(system, `使用者想練的情境：${scenario}`)
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

請根據完整聊天紀錄與使用者最新輸入回覆。
- 繁體中文輸入（描述想說什麼、提問、求救）→ isCoaching=true，用目標語言教他怎麼說。
- 目標語言輸入且合理 → isCoaching=false，角色自然接話。
- 打招呼 → 自然回應，延續情境，isCoaching=false。

教學模式 JSON 範例（使用者中文：我想問這班車會不會到東京）：
coachingZh「可以這樣說：」、reply 為目標語言句子、replyPronunciation、replyMeaningZh、guidanceZh「你可以試著說一次。」

只回傳 JSON：
{
  "isCoaching": boolean,
  "coachingZh": "繁中簡短引導（教學模式時，如「可以這樣說：」）",
  "reply": "目標語言句子（1～2 句）",
  "replyPronunciation": "發音輔助（ja/ko 必填）",
  "replyMeaningZh": "繁中意思",
  "guidanceZh": "輕輕引導繼續開口（可選）",
  "hint": { "text": "下一句可試著說的目標語言", "meaningZh": "繁中意思", "pronunciation": "發音輔助" }
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

const SUGGEST_USER_REPLY_PROMPT = `你是旅行口說教練，任務是幫「使用者」產生他自己可以開口說的下一句。
這不是接續對話，也不是扮演對方角色。

絕對禁止：
- 產生店員、櫃檯、服務生、當地人（AI 角色）該說的話
- 例如禁止：Welcome to our hotel. / May I have your name? / Thank you for your reservation. Your room is ready. / いらっしゃいませ
- 輸出與目前學習語言不同的語言
- 輸出與目前情境無關的句子（例如在飯店入住卻給餐廳點餐句）

必須遵守：
- suggestedSentence 只能是「使用者角色」對 AI 角色說的話
- 句子語言必須嚴格等於目前學習語言
- 使用者輸入繁體中文 → 翻成目標語言的使用者台詞
- 使用者輸入外語 → 修成更自然的使用者台詞，保留原意
- explanationZh 用繁中說明為何這樣說比較自然`

export async function generateSuggestUserReply(
  language: CoachLanguage,
  userInput: string,
  context: {
    scenarioTitle: string
    aiRoleLabelZh: string
    userRoleLabelZh: string
    goalZh: string
  },
  history: ChatTurn[],
): Promise<{
  suggestedSentence: string
  pronunciation?: string
  meaningZh: string
  explanationZh: string
}> {
  const system = `${SUGGEST_USER_REPLY_PROMPT}
${languageInstruction(language)}

目前練習設定：
- 旅行情境：${context.scenarioTitle}
- AI 扮演角色（對方）：${context.aiRoleLabelZh}
- 使用者角色：${context.userRoleLabelZh}
- 練習目標：${context.goalZh}

範例（飯店入住，學習英文，使用者輸入 I want to check in）：
suggestedSentence: "I'd like to check in, please."
meaningZh: "我想辦理入住，謝謝。"
explanationZh: "在櫃台用 I'd like to... 比 I want... 更禮貌自然。"

範例（飯店入住，學習英文，使用者輸入 My reservation number is 12345）：
suggestedSentence: "My reservation number is 12345."
explanationZh: "這是旅客向櫃台提供預訂號碼的說法，不是櫃台人員的回覆。"

只回傳 JSON：
{
  "suggestedSentence": "使用者可開口的目標語言句子（只能用目前學習語言）",
  "pronunciation": "羅馬音/發音輔助（僅 ja/ko，en 請省略或留空）",
  "meaningZh": "繁體中文意思",
  "explanationZh": "為什麼這樣說比較自然（繁中）"
}`

  const user = `近期聊天紀錄：
${formatHistory(history)}

使用者輸入：${userInput}`

  const result = await callOpenAiJson<{
    suggestedSentence: string
    pronunciation?: string
    meaningZh: string
    explanationZh: string
  }>(system, user)

  return {
    suggestedSentence: result.suggestedSentence,
    pronunciation: language === 'en' ? undefined : result.pronunciation,
    meaningZh: result.meaningZh,
    explanationZh: result.explanationZh,
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
  const result = await generateSuggestUserReply(
    language,
    sentence,
    {
      scenarioTitle: context.scenarioTitle,
      aiRoleLabelZh: context.roleLabelZh,
      userRoleLabelZh: '旅行者',
      goalZh: context.goalZh,
    },
    history,
  )
  return {
    foreignText: result.suggestedSentence,
    pronunciation: result.pronunciation,
    meaningZh: result.meaningZh,
    explanationZh: result.explanationZh,
  }
}
