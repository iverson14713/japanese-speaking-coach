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

const FREE_CHAT_PROMPT = `你是專業、溫柔的口說教練（不是閒聊聊天機器人）。
你的任務是陪使用者練口說，每次回覆都必須先給「教練回饋」，再延續對話。

這是「自由聊天」模式：不要扮演飯店櫃台、店員、服務生等特定角色，也不要用情境開場白。

絕對禁止：
- 只聊天、不糾正（例如只回 "That's great! What do you do?" 而不先修正使用者句子）
- 扮演特定場景角色或假裝使用者在飯店、餐廳等
- 長篇文法術語講解
- 固定模板、每次都用同一句引導

必須遵守：
- 使用者看得懂繁體中文
- 回饋簡短，適合手機閱讀
- 外語句子要可直接開口說
- 句子很短或錯得很嚴重時，也要猜測想表達的意思並給可用版本；不確定可在 tipZh 寫「我猜你想表達的是...」`

const SCENARIO_PRACTICE_PROMPT = `你是一位溫柔、自然的旅行口說教練，正在「情境練習」模式中扮演情境裡的對方角色。
你的任務是：先給口說教練回饋（修正、更自然說法、小提醒），再以角色身份用 followUp 延續情境對話。

核心原則：
- 使用者主要是中文使用者，你永遠看得懂繁體中文。
- 每次回覆都必須包含完整的教練回饋四區塊，不能只角色扮演聊天。

回覆規則：
1. 使用者用繁體中文描述想說的內容 → 不糾正中文，直接教目標語言怎麼說（corrected / natural）
2. 使用者用目標語言回覆（可能有錯）→ 先修正與改善，再延續對話
3. followUp 必須以情境角色自然接話，同時讓使用者能繼續練習
4. 每次外語句子精簡，適合手機閱讀`

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

type CoachInputMode = 'zh-coach' | 'practice-language'

function inputModeInstruction(inputMode: CoachInputMode): string {
  if (inputMode === 'zh-coach') {
    return `目前輸入模式：中文問教練。
使用者用繁體中文描述想表達的意思 → 不糾正中文，直接給目標語言說法：
- corrected：可直接開口說的目標語言句子
- natural：更口語、母語者更常說的版本（若與 corrected 相近可相同）
- tipZh：簡短說明用法或語感（1～2 重點）
- followUp：一句自然的延伸問題（目標語言），鼓勵繼續練`
  }
  return `目前輸入模式：練習目標語言。
使用者用目標語言輸入（可能有文法或用詞錯誤）→ 必須先教練回饋再聊天：
1. 判斷使用者想表達的意思
2. corrected：文法正確、可直接使用的句子
3. natural：更自然的母語者說法；若原句已很自然 → natural 設為「這句已經很自然」且 naturalAlreadyGood=true
4. tipZh：用繁中簡短說明錯在哪（1～2 重點，少術語）
5. followUp：一句自然的延伸問題（目標語言）`
}

const COACH_FEEDBACK_JSON = `只回傳 JSON（所有欄位必填，除非註明可省略）：
{
  "corrected": "✅ 修正版：文法正確、可直接使用的目標語言句子",
  "correctedPronunciation": "發音輔助（ja/ko 必填，en 省略）",
  "correctedMeaningZh": "修正版中文意思",
  "natural": "✨ 更自然：母語者更常說的版本；若已很自然則填「這句已經很自然」",
  "naturalPronunciation": "發音輔助（ja/ko 必填，en 省略）",
  "naturalMeaningZh": "更自然版中文意思（naturalAlreadyGood 時可省略）",
  "naturalAlreadyGood": false,
  "tipZh": "💡 小提醒：繁中簡短說明（1～2 重點，不要太多文法術語）",
  "followUp": "🗣️ 接著聊：一句自然的延伸問題（目標語言）",
  "followUpPronunciation": "發音輔助（ja/ko 必填，en 省略）",
  "followUpMeaningZh": "接著聊的中文意思"
}`

interface CoachFeedbackPayload {
  corrected: string
  correctedPronunciation?: string
  correctedMeaningZh?: string
  natural: string
  naturalPronunciation?: string
  naturalMeaningZh?: string
  naturalAlreadyGood?: boolean
  tipZh: string
  followUp: string
  followUpPronunciation?: string
  followUpMeaningZh?: string
}

function mapCoachFeedbackPayload(
  language: CoachLanguage,
  payload: CoachFeedbackPayload,
): {
  coachFeedback: CoachFeedbackPayload
  reply: string
  replyMeaningZh: string
  replyPronunciation?: string
} {
  const stripPron = language === 'en'

  const coachFeedback: CoachFeedbackPayload = {
    corrected: payload.corrected,
    correctedPronunciation: stripPron ? undefined : payload.correctedPronunciation,
    correctedMeaningZh: payload.correctedMeaningZh,
    natural: payload.natural,
    naturalPronunciation: stripPron ? undefined : payload.naturalPronunciation,
    naturalMeaningZh: payload.naturalMeaningZh,
    naturalAlreadyGood: payload.naturalAlreadyGood,
    tipZh: payload.tipZh,
    followUp: payload.followUp,
    followUpPronunciation: stripPron ? undefined : payload.followUpPronunciation,
    followUpMeaningZh: payload.followUpMeaningZh,
  }

  return {
    coachFeedback,
    reply: payload.followUp,
    replyMeaningZh: payload.followUpMeaningZh ?? '',
    replyPronunciation: stripPron ? undefined : payload.followUpPronunciation,
  }
}

export async function generateFreeChatReply(
  language: CoachLanguage,
  history: ChatTurn[],
  userMessage: string,
  learningSummary?: string,
  inputMode: CoachInputMode = 'practice-language',
): Promise<{
  reply: string
  replyMeaningZh: string
  replyPronunciation?: string
  coachFeedback: CoachFeedbackPayload
}> {
  const system = `${FREE_CHAT_PROMPT}
${languageInstruction(language)}
${inputModeInstruction(inputMode)}

這是「自由聊天」模式，沒有旅行情境或角色扮演。
${learningSummary?.trim() ? `\n使用者學習摘要（可用來客製化回覆）：\n${learningSummary.trim()}\n` : ''}

範例（練習英文，使用者：I'm not busy today am engineer）：
corrected: "I'm not busy today. I'm an engineer."
natural: "I'm free today. I work as an engineer."
tipZh: "「am engineer」前面需要主詞，應該說 \\"I'm an engineer\\"。如果想表達職業，英文常說 \\"I work as an engineer.\\""
followUp: "What kind of engineering do you do?"
followUpMeaningZh: "你做哪一種工程呢？"

範例（中文問教練，使用者：我想說今天天氣很好）：
corrected: "The weather is really nice today."
natural: "It's such a beautiful day today."
tipZh: "形容天氣好，nice 或 beautiful 都很常用。"
followUp: "Are you going out to enjoy the weather?"

${COACH_FEEDBACK_JSON}`

  const user = `完整聊天紀錄：
${formatHistory(history)}

使用者最新輸入：${userMessage}`

  const result = await callOpenAiJson<CoachFeedbackPayload>(system, user)
  return mapCoachFeedbackPayload(language, result)
}

export async function generateConversationReply(
  context: CoachSessionContext,
  history: ChatTurn[],
  userMessage: string,
  learningSummary?: string,
  inputMode: CoachInputMode = 'practice-language',
): Promise<{
  reply: string
  replyMeaningZh: string
  replyPronunciation?: string
  coachFeedback: CoachFeedbackPayload
  hint?: { text: string; meaningZh: string; pronunciation?: string }
}> {
  const system = `${SCENARIO_PRACTICE_PROMPT}
${languageInstruction(context.language)}
${inputModeInstruction(inputMode)}

目前練習設定（情境練習模式）：
- 旅行情境：${context.scenarioTitle}
- 你的角色：${context.roleLabelZh}
- 練習目標：${context.goalZh}
- 方案：${context.plan === 'free' ? 'Free' : 'Pro'}，本輪最多 ${context.maxTurns} 回合，目前在第 ${context.currentTurn} 回合
${learningSummary?.trim() ? `\n使用者學習摘要（可用來客製化回覆）：\n${learningSummary.trim()}\n` : ''}

請根據完整聊天紀錄與使用者最新輸入回覆。
- followUp 必須以「${context.roleLabelZh}」角色自然接話，延續「${context.scenarioTitle}」情境。
- 同時必須完成 corrected / natural / tipZh 教練回饋。

${COACH_FEEDBACK_JSON}
可選附加欄位（若適合給下一句提示）：
"hint": { "text": "下一句可試著說的目標語言", "meaningZh": "繁中意思", "pronunciation": "發音輔助" }`

  const user = `完整聊天紀錄：
${formatHistory(history)}

使用者最新輸入：${userMessage}`

  const result = await callOpenAiJson<
    CoachFeedbackPayload & {
      hint?: { text: string; meaningZh: string; pronunciation?: string }
    }
  >(system, user)

  const mapped = mapCoachFeedbackPayload(context.language, result)
  return {
    ...mapped,
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

const TRANSLATION_COACH_REPORT_JSON = `只回傳 JSON（所有欄位必填）：
{
  "overall": "string（1 句總評，繁中）",
  "averagePerformance": "string（例如：不錯，意思大多有到）",
  "commonIssues": ["string"]（1~3 點常見問題，繁中）,
  "moreNaturalPhrases": ["string", "string", "string"]（3 句更自然說法，用目標語言；不要加羅馬拼音）,
  "reviewSuggestion": "string（建議複習句型或主題，繁中）",
  "encouragement": "string（鼓勵一句，繁中）"
}`

export async function generateTranslationCoachReport(
  language: CoachLanguage,
  scenarioLabel: string,
  items: { chinese: string; userAnswer: string; standardAnswer: string }[],
): Promise<{
  overall: string
  averagePerformance: string
  commonIssues: string[]
  moreNaturalPhrases: string[]
  reviewSuggestion: string
  encouragement: string
}> {
  const system = `${COACH_SYSTEM_PROMPT}

你是旅行口說 App 的「AI 翻譯教練」。你會閱讀使用者在「中翻外語」練習中的 5 題作答（中文題目、使用者回答、標準答案），並回傳一份精簡的總結報告。

要求：
- 使用繁體中文回饋（moreNaturalPhrases 除外）
- moreNaturalPhrases 必須是目標語言（${LANGUAGE_LABELS[language]}）的自然句子
- 不要逐題長篇解釋，重點是總結常見問題與更自然說法
- 保持內容簡短可讀，避免冗長

${TRANSLATION_COACH_REPORT_JSON}`

  const user = `情境：${scenarioLabel}
語言：${LANGUAGE_LABELS[language]}

以下是 5 題資料（中文題目 / 使用者回答 / 標準答案）：
${items
  .map(
    (item, index) =>
      `${index + 1}. 中文：${item.chinese}\n   你的回答：${item.userAnswer || '（空白）'}\n   標準答案：${item.standardAnswer}`,
  )
  .join('\n\n')}`

  return callOpenAiJson(system, user)
}
