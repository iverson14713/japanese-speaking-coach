import type { Language } from '../../data/types'
import type {
  ChatHint,
  ChatMessage,
  CoachAiSource,
  ConversationReplyRequest,
  ConversationReplyResult,
  CustomScenarioRequest,
  CustomScenarioResult,
  SentenceCorrectionRequest,
  SentenceCorrectionResult,
  TopicChatSession,
  TopicConversationRequest,
  TopicSuggestionRequest,
} from './types'

const API_BASE = import.meta.env.VITE_AI_API_BASE ?? '/api/ai-coach'
const FORCE_MOCK = import.meta.env.VITE_AI_COACH_USE_MOCK === 'true'
const FALLBACK_ON_ERROR = import.meta.env.VITE_AI_COACH_FALLBACK_ON_ERROR === 'true'

let lastCoachAiSource: CoachAiSource = FORCE_MOCK ? 'mock' : 'openai'
let lastCoachApiError: string | null = null

export function getCoachAiSource(): CoachAiSource {
  return lastCoachAiSource
}

export function getCoachLastApiError(): string | null {
  return lastCoachApiError
}

export class CoachApiError extends Error {
  code?: string
  status?: number

  constructor(message: string, options?: { code?: string; status?: number; detail?: string }) {
    super(options?.detail ?? message)
    this.name = 'CoachApiError'
    this.code = options?.code
    this.status = options?.status
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const TOPIC_POOL: Record<Language, TopicChatSession[]> = {
  ja: [
    {
      scenarioTitle: '便利商店結帳',
      roleLabelZh: '店員',
      goalZh: '完成結帳並回答要不要袋子',
      openingLine: 'レジ袋はご利用ですか？',
      openingMeaningZh: '需要塑膠袋嗎？',
      openingPronunciation: 'reji bukuro wa goriyou desu ka',
      hints: [
        { text: 'いりません、ありがとうございます。', meaningZh: '不用了，謝謝。' },
        { text: 'カードでお願いします。', meaningZh: '請用信用卡。' },
        { text: 'レシートは大丈夫です。', meaningZh: '收據不用了。' },
      ],
      followUpReplies: [
        {
          reply: 'かしこまりました。お会計は〇〇円です。',
          replyMeaningZh: '好的，總共是〇〇日圓。',
          replyPronunciation: 'kashikomarimashita. okaikei wa maru maru en desu',
        },
        {
          reply: 'ありがとうございました。またお越しください。',
          replyMeaningZh: '謝謝惠顧，歡迎再來。',
          replyPronunciation: 'arigatou gozaimashita. mata okoshi kudasai',
        },
      ],
    },
    {
      scenarioTitle: '居酒屋點餐',
      roleLabelZh: '店員',
      goalZh: '點一杯飲料',
      openingLine: 'いらっしゃいませ。お飲み物は何になさいますか？',
      openingMeaningZh: '歡迎光臨，請問要喝什麼？',
      openingPronunciation: 'irasshaimase. onomono wa nani ni nasaimasu ka',
      hints: [
        { text: '生ビールをお願いします。', meaningZh: '請給我生啤酒。' },
        { text: 'お水をください。', meaningZh: '請給我水。' },
        { text: 'おすすめは何ですか？', meaningZh: '有什麼推薦的嗎？' },
      ],
      followUpReplies: [
        {
          reply: 'はい、生ビールですね。他にご注文はありますか？',
          replyMeaningZh: '好的，生啤酒。還需要點其他的嗎？',
          replyPronunciation: 'hai, nama biiru desu ne. hoka ni gochuumon wa arimasu ka',
        },
        {
          reply: 'かしこまりました。少々お待ちください。',
          replyMeaningZh: '好的，請稍等一下。',
          replyPronunciation: 'kashikomarimashita. shoushou omachi kudasai',
        },
      ],
    },
    {
      scenarioTitle: '電車上問路',
      roleLabelZh: '當地人',
      goalZh: '問清楚車站怎麼走',
      openingLine: 'どこかお困りですか？',
      openingMeaningZh: '有什麼需要幫忙的嗎？',
      openingPronunciation: 'doko ka okomari desu ka',
      hints: [
        { text: '駅はどこですか？', meaningZh: '車站在哪裡？' },
        { text: '新宿駅に行きたいです。', meaningZh: '我想去新宿站。' },
        { text: 'この電車は渋谷に行きますか？', meaningZh: '這班電車會去澀谷嗎？' },
      ],
      followUpReplies: [
        {
          reply: '新宿なら、この電車で大丈夫ですよ。',
          replyMeaningZh: '去新宿的話，搭這班電車就可以了。',
          replyPronunciation: 'shinjuku nara, kono densha de daijoubu desu yo',
        },
        {
          reply: '次の駅で乗り換えてください。',
          replyMeaningZh: '請在下一站換車。',
          replyPronunciation: 'tsugi no eki de norikaete kudasai',
        },
      ],
    },
  ],
  en: [
    {
      scenarioTitle: 'Hotel check-in',
      roleLabelZh: '櫃台人員',
      goalZh: '完成入住登記',
      openingLine: 'Good evening. Do you have a reservation?',
      openingMeaningZh: '晚安，請問您有預訂嗎？',
      hints: [
        { text: 'Yes, under Chen. I booked for two nights.', meaningZh: '有的，姓 Chen，我訂了兩晚。' },
        { text: 'I have a booking through Booking.com.', meaningZh: '我在 Booking.com 上有訂房。' },
        { text: 'Could I check in early?', meaningZh: '我可以提早入住嗎？' },
      ],
      followUpReplies: [
        {
          reply: 'Great. May I see your passport, please?',
          replyMeaningZh: '好的，可以看一下您的護照嗎？',
        },
        {
          reply: 'Your room is ready. Here is your key card.',
          replyMeaningZh: '您的房間準備好了，這是房卡。',
        },
      ],
    },
    {
      scenarioTitle: 'Coffee shop order',
      roleLabelZh: '店員',
      goalZh: '點一杯飲料',
      openingLine: 'Hi there! What can I get for you today?',
      openingMeaningZh: '嗨！今天想點什麼？',
      hints: [
        { text: 'Can I have a latte, please?', meaningZh: '可以給我一杯拿鐵嗎？' },
        { text: 'Do you have anything hot?', meaningZh: '有熱的飲料嗎？' },
        { text: 'For here, please.', meaningZh: '內用，謝謝。' },
      ],
      followUpReplies: [
        {
          reply: 'Sure. Would you like that hot or iced?',
          replyMeaningZh: '好的，要熱的還是冰的？',
        },
        {
          reply: 'That will be $4.50. Cash or card?',
          replyMeaningZh: '總共 4.5 美元，現金還是刷卡？',
        },
      ],
    },
    {
      scenarioTitle: 'Asking for directions',
      roleLabelZh: '路人',
      goalZh: '問清楚地鐵站方向',
      openingLine: 'Sorry, you look a bit lost. Need some help?',
      openingMeaningZh: '不好意思，你看起來有點迷路，需要幫忙嗎？',
      hints: [
        { text: 'Yes, could you tell me where the subway is?', meaningZh: '是的，請問地鐵站在哪？' },
        { text: 'Is it far from here?', meaningZh: '離這裡遠嗎？' },
        { text: 'Should I turn left or right?', meaningZh: '我該左轉還是右轉？' },
      ],
      followUpReplies: [
        {
          reply: 'Go straight for two blocks, then turn left.',
          replyMeaningZh: '直走兩個路口，然後左轉。',
        },
        {
          reply: 'You will see the station on your right.',
          replyMeaningZh: '你會在右手邊看到車站。',
        },
      ],
    },
  ],
  ko: [
    {
      scenarioTitle: '카페 주문',
      roleLabelZh: '店員',
      goalZh: '點一杯飲料',
      openingLine: '어서 오세요. 주문하시겠어요?',
      openingMeaningZh: '歡迎光臨，請問要點什麼？',
      openingPronunciation: 'eoseo oseyo. jumunhasigess-eoyo?',
      hints: [
        { text: '아메리카노 한 잔 주세요.', meaningZh: '請給我一杯美式咖啡。' },
        { text: '따뜻한 걸로 주세요.', meaningZh: '請給我熱的。' },
        { text: '추천해 주세요.', meaningZh: '請推薦一下。' },
      ],
      followUpReplies: [
        {
          reply: '네, 아메리카노 한 잔이요. 다른 거 필요하세요?',
          replyMeaningZh: '好的，一杯美式。還需要別的嗎？',
          replyPronunciation: 'ne, amerikano han janiyo. dareun geo pilyohaseyo?',
        },
        {
          reply: '잠시만 기다려 주세요.',
          replyMeaningZh: '請稍等一下。',
          replyPronunciation: 'jamsiman gidaryeo juseyo',
        },
      ],
    },
    {
      scenarioTitle: '지하철 안내',
      roleLabelZh: '站務人員',
      goalZh: '問清楚要怎麼換車',
      openingLine: '어디 가시는데요?',
      openingMeaningZh: '請問要去哪裡？',
      openingPronunciation: 'eodi gasineundeyo?',
      hints: [
        { text: '명동역에 가고 싶어요.', meaningZh: '我想去明洞站。' },
        { text: '환승해야 하나요?', meaningZh: '需要換車嗎？' },
        { text: '몇 정거장 가야 해요?', meaningZh: '要坐幾站？' },
      ],
      followUpReplies: [
        {
          reply: '명동역이면 2호선을 타세요.',
          replyMeaningZh: '去明洞的話，請搭 2 號線。',
          replyPronunciation: 'myeongdong-yeog-imyeon 2-hoseon-eul taseyo',
        },
        {
          reply: '다음 역에서 갈아타시면 됩니다.',
          replyMeaningZh: '下一站換車就可以了。',
          replyPronunciation: 'da-eum yeog-eseo garatasimyeon doemnida',
        },
      ],
    },
    {
      scenarioTitle: '편의점 계산',
      roleLabelZh: '店員',
      goalZh: '完成結帳',
      openingLine: '봉투 필요하세요?',
      openingMeaningZh: '需要袋子嗎？',
      openingPronunciation: 'bongtu pilyohaseyo?',
      hints: [
        { text: '아니요, 괜찮아요.', meaningZh: '不用，沒關係。' },
        { text: '카드로 할게요.', meaningZh: '我用卡片。' },
        { text: '영수증 주세요.', meaningZh: '請給我收據。' },
      ],
      followUpReplies: [
        {
          reply: '네, 총 오천 원입니다.',
          replyMeaningZh: '好的，總共五千元。',
          replyPronunciation: 'ne, chong ocheon won-imnida',
        },
        {
          reply: '감사합니다. 또 오세요!',
          replyMeaningZh: '謝謝，歡迎再來！',
          replyPronunciation: 'gamsahamnida. tto oseyo',
        },
      ],
    },
  ],
}

const CUSTOM_HINTS: Record<Language, ChatHint[]> = {
  ja: [
    { text: 'すみません、これを探しています。', meaningZh: '不好意思，我在找這個。' },
    { text: 'おすすめはありますか？', meaningZh: '有推薦的嗎？' },
    { text: 'ありがとうございます。', meaningZh: '謝謝。' },
  ],
  en: [
    { text: 'Excuse me, could you help me?', meaningZh: '不好意思，可以幫我嗎？' },
    { text: 'Do you have any recommendations?', meaningZh: '有什麼推薦的嗎？' },
    { text: 'Thank you very much.', meaningZh: '非常謝謝。' },
  ],
  ko: [
    { text: '실례합니다, 도와주실 수 있나요?', meaningZh: '不好意思，可以幫我嗎？' },
    { text: '추천해 주세요.', meaningZh: '請推薦一下。' },
    { text: '감사합니다.', meaningZh: '謝謝。' },
  ],
}

function inferRoleFromScenario(scenario: string): string {
  if (/藥妝|药妆|drug|pharmacy/i.test(scenario)) return '藥妝店店員'
  if (/飯店|酒店|hotel/i.test(scenario)) return '櫃台人員'
  if (/餐廳|餐館|restaurant|居酒屋/i.test(scenario)) return '店員'
  if (/車站|地鐵|電車|station/i.test(scenario)) return '站務人員'
  return '當地人'
}

const CUSTOM_OPENINGS: Record<
  Language,
  { openingLine: string; openingMeaningZh: string; openingPronunciation?: string; roleZh: string }
> = {
  ja: {
    openingLine: 'いらっしゃいませ。何をお探しですか？',
    openingMeaningZh: '歡迎光臨，請問在找什麼？',
    openingPronunciation: 'irasshaimase. nani o osagashi desu ka',
    roleZh: '店員',
  },
  en: {
    openingLine: 'Hi! How can I help you today?',
    openingMeaningZh: '嗨！今天我能幫你什麼？',
    roleZh: '店員／當地人',
  },
  ko: {
    openingLine: '어서 오세요. 무엇을 도와드릴까요?',
    openingMeaningZh: '歡迎光臨，有什麼可以幫您的？',
    openingPronunciation: 'eoseo oseyo. mueoseul dowadeurilkkayo?',
    roleZh: '店員',
  },
}

const GENERIC_FOLLOW_UPS: Record<
  Language,
  { reply: string; replyMeaningZh: string; replyPronunciation?: string }[]
> = {
  ja: [
    {
      reply: 'かしこまりました。他にご質問はありますか？',
      replyMeaningZh: '好的，還有其他問題嗎？',
      replyPronunciation: 'kashikomarimashita. hoka ni goshitsumon wa arimasu ka',
    },
    {
      reply: '少々お待ちください。',
      replyMeaningZh: '請稍等一下。',
      replyPronunciation: 'shoushou omachi kudasai',
    },
  ],
  en: [
    { reply: 'Sure, no problem. Anything else?', replyMeaningZh: '好的，沒問題。還需要別的嗎？' },
    { reply: 'Got it. Here you go.', replyMeaningZh: '了解，給你。' },
  ],
  ko: [
    {
      reply: '네, 알겠습니다. 다른 거 필요하세요?',
      replyMeaningZh: '好的，還需要別的嗎？',
      replyPronunciation: 'ne, algesseumnida. dareun geo pilyohaseyo?',
    },
    {
      reply: '잠시만 기다려 주세요.',
      replyMeaningZh: '請稍等一下。',
      replyPronunciation: 'jamsiman gidaryeo juseyo',
    },
  ],
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function findTopicSession(language: Language, scenarioTitle: string): TopicChatSession | undefined {
  return TOPIC_POOL[language].find((t) => t.scenarioTitle === scenarioTitle)
}

function isExplicitHelpRequest(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) {
    return false
  }
  return /不會說|不会说|不知道怎麼|怎麼說|怎么说|怎麼講|怎么讲|這句怎麼說|这句怎么说|教.*我說|教我讲|幫我說|帮我说|不會講|不会讲|不會回答|不会回答/i.test(
    trimmed,
  )
}

function isChineseDominantInput(text: string): boolean {
  const trimmed = text.trim()
  if (!trimmed) {
    return false
  }
  if (isExplicitHelpRequest(trimmed)) {
    return true
  }
  if (/^(哈囉|你好|嗨|hi|hello|こんにちは)$/i.test(trimmed)) {
    return false
  }
  const hasCjk = /[\u4e00-\u9fff]/.test(trimmed)
  const hasJapanese = /[ぁ-んァ-ンー]/.test(trimmed)
  const hasKorean = /[가-힣]/.test(trimmed)
  const hasEnglishWords = /\b[a-zA-Z]{2,}\b/.test(trimmed)
  return hasCjk && !hasJapanese && !hasKorean && !hasEnglishWords
}

function coachingIntroForLanguage(language: Language): string {
  if (language === 'en') {
    return 'You can say:'
  }
  return '可以這樣說：'
}

const TRAIN_TO_TOKYO_PHRASES: Record<
  Language,
  { foreign: string; pronunciation?: string; meaningZh: string }
> = {
  ja: {
    foreign: 'この電車は東京に行きますか？',
    pronunciation: 'kono densha wa Tokyo ni ikimasu ka',
    meaningZh: '這班電車會到東京嗎？',
  },
  en: {
    foreign: 'Does this train go to Tokyo?',
    meaningZh: '這班車會到東京嗎？',
  },
  ko: {
    foreign: '이 열차는 도쿄에 가나요?',
    pronunciation: 'i yeolcha-neun dokyo-e ganayo',
    meaningZh: '這班列車會到東京嗎？',
  },
}

function pickPhraseForChineseMessage(language: Language, message: string, turnIndex: number) {
  if (/東京|东京|這班車|这班车|電車|电车|火車|火车|train/i.test(message)) {
    return TRAIN_TO_TOKYO_PHRASES[language]
  }
  return pickCoachingPhrase(language, turnIndex)
}

const COACHING_PHRASES: Record<
  Language,
  { foreign: string; pronunciation?: string; meaningZh: string; guidanceZh: string }[]
> = {
  ja: [
    {
      foreign: '生ビールをお願いします。',
      pronunciation: 'nama biiru o onegaishimasu',
      meaningZh: '請給我生啤酒。',
      guidanceZh: '你試著打一次看看。',
    },
    {
      foreign: 'すみません、これを探しています。',
      pronunciation: 'sumimasen, kore o sagashite imasu',
      meaningZh: '不好意思，我在找這個。',
      guidanceZh: '可以照著輸入，或用自己的話改寫。',
    },
    {
      foreign: 'おすすめはありますか？',
      pronunciation: 'osusume wa arimasu ka',
      meaningZh: '有什麼推薦的嗎？',
      guidanceZh: '試著用這句回覆店員看看。',
    },
  ],
  en: [
    {
      foreign: 'Could I have a latte, please?',
      meaningZh: '可以給我一杯拿鐵嗎？',
      guidanceZh: '你試著打一次看看。',
    },
    {
      foreign: 'Excuse me, could you help me?',
      meaningZh: '不好意思，可以幫我嗎？',
      guidanceZh: '先從這句開始開口。',
    },
    {
      foreign: 'Do you have any recommendations?',
      meaningZh: '有什麼推薦的嗎？',
      guidanceZh: '試著用這句回覆看看。',
    },
  ],
  ko: [
    {
      foreign: '아메리카노 한 잔 주세요.',
      pronunciation: 'amerikano han jan juseyo',
      meaningZh: '請給我一杯美式咖啡。',
      guidanceZh: '你試著打一次看看。',
    },
    {
      foreign: '실례합니다, 도와주실 수 있나요?',
      pronunciation: 'sillyehamnida, dowajusil su innayo?',
      meaningZh: '不好意思，可以幫我嗎？',
      guidanceZh: '先從這句開始開口。',
    },
    {
      foreign: '추천해 주세요.',
      pronunciation: 'chucheonhae juseyo',
      meaningZh: '請推薦一下。',
      guidanceZh: '試著用這句回覆看看。',
    },
  ],
}

function pickCoachingPhrase(language: Language, turnIndex: number) {
  const phrases = COACHING_PHRASES[language]
  return phrases[turnIndex % phrases.length]
}

function mockCoachSpeakHelp(
  language: Language,
  sentence: string,
  turnIndex: number,
): SentenceCorrectionResult {
  const trimmed = sentence.trim()
  const phrase = pickCoachingPhrase(language, turnIndex)

  if (isExplicitHelpRequest(trimmed) || isChineseDominantInput(trimmed)) {
    const phrase = pickPhraseForChineseMessage(language, trimmed, turnIndex)
    return {
      original: trimmed,
      corrected: phrase.foreign,
      pronunciation: phrase.pronunciation,
      meaningZh: phrase.meaningZh,
      explanationZh: coachingIntroForLanguage(language),
      naturalnessTipZh: '你可以試著說一次。',
    }
  }

  if (language === 'en') {
    const lower = trimmed.toLowerCase()
    if (lower.includes('i want check in hotel')) {
      return {
        original: trimmed,
        corrected: "I'd like to check in, please.",
        meaningZh: '我想辦理入住，謝謝。',
        explanationZh: '在飯店櫃台用 I\'d like to... 比 I want... 更自然禮貌。',
        naturalnessTipZh: '你試著打一次看看。',
      }
    }
  }

  if (language === 'ja' && /です$|ます$/.test(trimmed)) {
    return {
      original: trimmed,
      corrected: trimmed,
      pronunciation: phrase.pronunciation,
      meaningZh: phrase.meaningZh,
      explanationZh: '這句日文大致可以溝通，語氣也夠禮貌。',
      naturalnessTipZh: '如果想換個說法，也可以試試看其他建議句。',
    }
  }

  return {
    original: trimmed,
    corrected: phrase.foreign,
    pronunciation: phrase.pronunciation,
    meaningZh: phrase.meaningZh,
    explanationZh: '根據你的意思，這句比較適合在這個情境開口。',
    naturalnessTipZh: phrase.guidanceZh,
  }
}

function mockConversationReply(
  language: Language,
  userMessage: string,
  userTurnIndex: number,
  topic?: TopicChatSession,
): ConversationReplyResult {
  if (isExplicitHelpRequest(userMessage) || isChineseDominantInput(userMessage)) {
    const phrase = pickPhraseForChineseMessage(language, userMessage, userTurnIndex)
    const hints = topic?.hints ?? CUSTOM_HINTS[language]
    return {
      coachingZh: coachingIntroForLanguage(language),
      reply: phrase.foreign,
      replyPronunciation: phrase.pronunciation,
      replyMeaningZh: phrase.meaningZh,
      guidanceZh: '你可以試著說一次。',
      hint: hints[userTurnIndex % hints.length],
    }
  }

  const replies = topic?.followUpReplies ?? GENERIC_FOLLOW_UPS[language]
  const index = Math.min(userTurnIndex - 1, replies.length - 1)
  const reply = replies[Math.max(0, index)]
  const hints = topic?.hints ?? CUSTOM_HINTS[language]

  return {
    ...reply,
    hint: hints[userTurnIndex % hints.length],
  }
}

type CoachApiAction =
  | 'custom-scenario'
  | 'start-topic-chat'
  | 'conversation-reply'
  | 'correct-sentence'

async function fetchFromApi<T>(action: CoachApiAction, body: Record<string, unknown>): Promise<T> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...body }),
  })

  const payload = (await response.json().catch(() => ({}))) as {
    error?: string
    code?: string
  }

  if (!response.ok) {
    const detail = payload.error ?? `HTTP ${response.status}`
    lastCoachApiError = payload.code ? `${payload.code}: ${detail}` : detail
    throw new CoachApiError(`AI API error: ${response.status}`, {
      code: payload.code,
      status: response.status,
      detail,
    })
  }

  lastCoachApiError = null
  return payload as T
}

function historyForApi(history: ChatMessage[]): { role: 'user' | 'assistant'; text: string }[] {
  return history
    .filter((message) => message.variant !== 'welcome')
    .map((message) => {
      if (message.role === 'assistant' && message.variant === 'dialogue') {
        const parts: string[] = []
        if (message.coachingZh) {
          parts.push(message.coachingZh)
        }
        parts.push(message.text)
        if (message.meaningZh) {
          parts.push(`（${message.meaningZh}）`)
        }
        if (message.guidanceZh) {
          parts.push(message.guidanceZh)
        }
        return { role: 'assistant' as const, text: parts.join('\n') }
      }
      return { role: message.role, text: message.text }
    })
}

async function withCoachApi<T>(
  action: CoachApiAction,
  body: Record<string, unknown>,
  mockHandler: () => Promise<T>,
): Promise<T> {
  if (FORCE_MOCK) {
    lastCoachAiSource = 'mock'
    return mockHandler()
  }

  try {
    const result = await fetchFromApi<T>(action, body)
    lastCoachAiSource = 'openai'
    return result
  } catch (error) {
    if (FALLBACK_ON_ERROR) {
      lastCoachAiSource = 'fallback'
      return mockHandler()
    }
    throw error instanceof CoachApiError ? error : new CoachApiError('Coach API request failed')
  }
}

export async function startCustomScenario(
  request: CustomScenarioRequest,
): Promise<CustomScenarioResult> {
  return withCoachApi('custom-scenario', { language: request.language, scenario: request.scenario }, async () => {
    await delay(600)

    const opening = CUSTOM_OPENINGS[request.language]
    const scenario = request.scenario.trim()
    const title = scenario.slice(0, 24) || '自訂旅行情境'
    const roleLabelZh = inferRoleFromScenario(scenario)

    return {
      scenarioTitle: title,
      roleLabelZh,
      goalZh: scenario,
      introZh: `好，我會扮演${roleLabelZh}，陪你練習這個情境。`,
      openingLine: opening.openingLine,
      openingMeaningZh: opening.openingMeaningZh,
      openingPronunciation: opening.openingPronunciation,
      hints: CUSTOM_HINTS[request.language],
    }
  })
}

export async function startTopicChat(request: TopicSuggestionRequest): Promise<TopicChatSession> {
  return withCoachApi('start-topic-chat', { language: request.language }, async () => {
    await delay(500)
    return pickRandom(TOPIC_POOL[request.language])
  })
}

/** @deprecated Use startTopicChat */
export async function suggestTopic(request: TopicSuggestionRequest): Promise<TopicChatSession> {
  return startTopicChat(request)
}

export async function correctSentence(
  request: SentenceCorrectionRequest,
): Promise<SentenceCorrectionResult> {
  return withCoachApi(
    'correct-sentence',
    {
      language: request.language,
      sentence: request.sentence,
      scenarioTitle: request.scenarioTitle,
      roleLabelZh: request.roleLabelZh,
      goalZh: request.goalZh,
      history: historyForApi(request.history),
    },
    async () => {
      await delay(450)
      const turnIndex = request.history.filter((message) => message.role === 'user').length
      return mockCoachSpeakHelp(request.language, request.sentence, turnIndex)
    },
  )
}

export async function continueTopicConversation(
  request: TopicConversationRequest,
): Promise<ConversationReplyResult> {
  return withCoachApi('conversation-reply', request as unknown as Record<string, unknown>, async () => {
    await delay(500)
    const topic = findTopicSession(request.language, request.scenarioTitle)
    return mockConversationReply(request.language, '', request.userTurnIndex, topic)
  })
}

export async function continueConversation(
  request: ConversationReplyRequest,
): Promise<ConversationReplyResult> {
  return withCoachApi(
    'conversation-reply',
    {
      language: request.language,
      scenario: request.scenario,
      roleLabelZh: request.roleLabelZh,
      goalZh: request.goalZh,
      maxTurns: request.maxTurns,
      currentTurn: request.currentTurn,
      plan: request.plan,
      history: historyForApi(request.history),
      userMessage: request.userMessage,
    },
    async () => {
      await delay(500)
      const topic = findTopicSession(request.language, request.scenario)
      const userTurnIndex = request.history.filter((message) => message.role === 'user').length
      return mockConversationReply(request.language, request.userMessage, userTurnIndex, topic)
    },
  )
}

export function getTopicHint(
  session: TopicChatSession,
  assistantMessageIndex: number,
): { text: string; meaningZh: string; pronunciation?: string } | undefined {
  const hintIndex = Math.floor(assistantMessageIndex / 2)
  return session.hints[hintIndex]
}

export function isCoachMockMode(): boolean {
  return FORCE_MOCK
}
