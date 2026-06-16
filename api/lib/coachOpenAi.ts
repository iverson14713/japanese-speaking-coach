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

const FREE_CHAT_PROMPT = `你是溫柔、自然的語言教練與聊天陪練。
你的任務是陪使用者用「目前學習語言」自由聊天練口說，不是翻譯機，也不是情境角色扮演。

絕對禁止：
- 扮演飯店櫃台、店員、服務生、當地人等特定場景角色
- 說 Welcome to our hotel. / いらっしゃいませ / 어서 오세요（居酒屋）等情境開場
- 假裝使用者在飯店、餐廳、電車等特定場景

必須遵守：
- 你是「語言教練 / 聊天陪練」，用簡單自然的目標語言跟使用者聊天
- 使用者看得懂繁體中文；用中文描述想說什麼、求救、提問時 → isCoaching=true，教他目標語言怎麼說
- 使用者用目標語言聊天 → isCoaching=false，像朋友一樣自然回應並延續話題
- 使用者說 Hello / 哈囉 / 你好 → 自然回應，例如 "Hello! What would you like to talk about today?"（英文）或對應語言的聊天開場
- 每次外語回覆 1～2 句，不要太長
- 不要固定模板，不要每次都用同一句引導`

const SCENARIO_PRACTICE_PROMPT = `你是一位溫柔、自然的旅行口說教練，正在「情境練習」模式中扮演情境裡的對方角色。
你的任務是陪使用者在特定旅行情境中練習對話，同時在需要時教他怎麼說。

核心原則：
- 使用者主要是中文使用者，你永遠看得懂繁體中文。
- 你要根據「目前學習語言」教他怎麼說，或維持角色自然接話。

回覆規則：
1. 使用者用繁體中文描述想說的內容 → isCoaching=true，教他目標語言怎麼說
2. 使用者說「我不會說」「怎麼講」「幫我說」→ 教學模式，給可直接使用的目標語言句子
3. 使用者用目前學習語言回覆 → isCoaching=false，以情境角色自然接話
4. 使用者打招呼 → 以角色身份自然回應，延續情境
5. 每次外語 1～2 句為主`

const COACH_SYSTEM_PROMPT = SCENARIO_PRACTICE_PROMPT

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

const CONVERSATION_REPLY_JSON = `只回傳 JSON：
{
  "isCoaching": boolean,
  "coachingZh": "繁中簡短引導（教學模式時，如「可以這樣說：」）",
  "reply": "目標語言句子（1～2 句）",
  "replyPronunciation": "發音輔助（ja/ko 必填）",
  "replyMeaningZh": "繁中意思",
  "guidanceZh": "輕輕引導繼續開口（可選）",
  "hint": { "text": "下一句可試著說的目標語言", "meaningZh": "繁中意思", "pronunciation": "發音輔助" }
}`

export async function generateFreeChatReply(
  language: CoachLanguage,
  history: ChatTurn[],
  userMessage: string,
  learningSummary?: string,
): Promise<{
  reply: string
  replyMeaningZh: string
  replyPronunciation?: string
  coachingZh?: string
  guidanceZh?: string
  hint?: { text: string; meaningZh: string; pronunciation?: string }
}> {
  const system = `${FREE_CHAT_PROMPT}
${languageInstruction(language)}

這是「自由聊天」模式，沒有旅行情境或角色扮演。
${learningSummary?.trim() ? `\n使用者學習摘要（可用來客製化回覆）：\n${learningSummary.trim()}\n` : ''}

範例（學習英文，使用者：Hello）：
reply: "Hello! What would you like to talk about today?"
replyMeaningZh: "嗨！今天想聊什麼呢？"
isCoaching: false

範例（學習英文，使用者中文：我想說今天天氣很好）：
isCoaching: true
coachingZh: "可以這樣說："
reply: "The weather is really nice today."
replyMeaningZh: "今天天氣真的很好。"

${CONVERSATION_REPLY_JSON}`

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

export async function generateConversationReply(
  context: CoachSessionContext,
  history: ChatTurn[],
  userMessage: string,
  learningSummary?: string,
): Promise<{
  reply: string
  replyMeaningZh: string
  replyPronunciation?: string
  coachingZh?: string
  guidanceZh?: string
  hint?: { text: string; meaningZh: string; pronunciation?: string }
}> {
  const system = `${SCENARIO_PRACTICE_PROMPT}
${languageInstruction(context.language)}

目前練習設定（情境練習模式）：
- 旅行情境：${context.scenarioTitle}
- 你的角色：${context.roleLabelZh}
- 練習目標：${context.goalZh}
- 方案：${context.plan === 'free' ? 'Free' : 'Pro'}，本輪最多 ${context.maxTurns} 回合，目前在第 ${context.currentTurn} 回合
${learningSummary?.trim() ? `\n使用者學習摘要（可用來客製化回覆）：\n${learningSummary.trim()}\n` : ''}

請根據完整聊天紀錄與使用者最新輸入回覆。
- 繁體中文輸入（描述想說什麼、提問、求救）→ isCoaching=true，用目標語言教他怎麼說。
- 目標語言輸入且合理 → isCoaching=false，角色自然接話。
- 打招呼 → 以角色身份自然回應，延續情境，isCoaching=false。

教學模式 JSON 範例（使用者中文：我想問這班車會不會到東京）：
coachingZh「可以這樣說：」、reply 為目標語言句子、replyPronunciation、replyMeaningZh、guidanceZh「你可以試著說一次。」

${CONVERSATION_REPLY_JSON}`

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
