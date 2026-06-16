import type { Language } from '../../data/types'
import { LANGUAGE_LABELS } from '../../data/types'
import type {
  ConversationReplyRequest,
  ConversationReplyResult,
  CustomScenarioRequest,
  CustomScenarioResult,
  SentenceCorrectionRequest,
  SentenceCorrectionResult,
  TopicSuggestionRequest,
  TopicSuggestionResult,
} from './types'

const API_BASE = import.meta.env.VITE_AI_API_BASE ?? ''
const USE_MOCK = !API_BASE

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const TOPIC_POOL: Record<
  Language,
  {
    scenarioTitle: string
    scenarioDescriptionZh: string
    openingLine: string
    openingMeaningZh: string
    openingPronunciation?: string
    suggestedReply: string
    suggestedReplyMeaningZh: string
  }[]
> = {
  ja: [
    {
      scenarioTitle: '便利商店結帳',
      scenarioDescriptionZh: '你在日本便利商店買完東西，店員問你要不要袋子。',
      openingLine: 'レジ袋はご利用ですか？',
      openingMeaningZh: '需要塑膠袋嗎？',
      openingPronunciation: 'reji bukuro wa goriyou desu ka',
      suggestedReply: 'いりません、ありがとうございます。',
      suggestedReplyMeaningZh: '不用了，謝謝。',
    },
    {
      scenarioTitle: '電車上搭話',
      scenarioDescriptionZh: '旁邊的日本人注意到你的地圖，主動問你需要幫忙嗎。',
      openingLine: 'どこかお困りですか？',
      openingMeaningZh: '有什麼需要幫忙的嗎？',
      openingPronunciation: 'doko ka okomari desu ka',
      suggestedReply: '駅はどこですか？',
      suggestedReplyMeaningZh: '車站在哪裡？',
    },
    {
      scenarioTitle: '居酒屋點餐',
      scenarioDescriptionZh: '你第一次進居酒屋，服務生來幫你點第一杯飲料。',
      openingLine: 'お飲み物はいかがなさいますか？',
      openingMeaningZh: '請問要喝什麼？',
      openingPronunciation: 'onomono wa ikaga nasaimasu ka',
      suggestedReply: '生ビールをお願いします。',
      suggestedReplyMeaningZh: '請給我生啤酒。',
    },
  ],
  en: [
    {
      scenarioTitle: 'Hotel check-in',
      scenarioDescriptionZh: '你剛到飯店櫃台，服務人員跟你打招呼。',
      openingLine: 'Good evening. Do you have a reservation?',
      openingMeaningZh: '晚安，請問您有預訂嗎？',
      suggestedReply: 'Yes, under Chen. I booked for two nights.',
      suggestedReplyMeaningZh: '有的，姓 Chen，我訂了兩晚。',
    },
    {
      scenarioTitle: 'Coffee shop order',
      scenarioDescriptionZh: '你在國外咖啡店，店員問你要什麼。',
      openingLine: 'Hi there! What can I get for you today?',
      openingMeaningZh: '嗨！今天想點什麼？',
      suggestedReply: 'Can I have a latte, please?',
      suggestedReplyMeaningZh: '可以給我一杯拿鐵嗎？',
    },
    {
      scenarioTitle: 'Asking for directions',
      scenarioDescriptionZh: '你在街頭向路人問路。',
      openingLine: 'Sorry, you look a bit lost. Need some help?',
      openingMeaningZh: '不好意思，你看起來有點迷路，需要幫忙嗎？',
      suggestedReply: 'Yes, could you tell me where the subway is?',
      suggestedReplyMeaningZh: '是的，請問地鐵站在哪？',
    },
  ],
  ko: [
    {
      scenarioTitle: '카페 주문',
      scenarioDescriptionZh: '你在韓國咖啡店點飲料。',
      openingLine: '어서 오세요. 주문하시겠어요?',
      openingMeaningZh: '歡迎光臨，請問要點什麼？',
      openingPronunciation: 'eoseo oseyo. jumunhasigess-eoyo?',
      suggestedReply: '아메리카노 한 잔 주세요.',
      suggestedReplyMeaningZh: '請給我一杯美式咖啡。',
    },
    {
      scenarioTitle: '지하철 안내',
      scenarioDescriptionZh: '你向站務人員詢問路線。',
      openingLine: '어디 가시는데요?',
      openingMeaningZh: '請問要去哪裡？',
      openingPronunciation: 'eodi gasineundeyo?',
      suggestedReply: '명동역에 가고 싶어요.',
      suggestedReplyMeaningZh: '我想去明洞站。',
    },
    {
      scenarioTitle: '편의점 계산',
      scenarioDescriptionZh: '你在韓國便利商店結帳。',
      openingLine: '봉투 필요하세요?',
      openingMeaningZh: '需要袋子嗎？',
      openingPronunciation: 'bongtu pilyohaseyo?',
      suggestedReply: '아니요, 괜찮아요.',
      suggestedReplyMeaningZh: '不用，沒關係。',
    },
  ],
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

const CONVERSATION_REPLIES: Record<
  Language,
  { reply: string; replyMeaningZh: string; replyPronunciation?: string }[]
> = {
  ja: [
    {
      reply: 'かしこまりました。こちらがおすすめです。',
      replyMeaningZh: '好的，這款是我們推薦的。',
      replyPronunciation: 'kashikomarimashita. kochira ga osusume desu',
    },
    {
      reply: '少々お待ちください。',
      replyMeaningZh: '請稍等一下。',
      replyPronunciation: 'shoushou omachi kudasai',
    },
    {
      reply: '他にご質問はありますか？',
      replyMeaningZh: '還有其他問題嗎？',
      replyPronunciation: 'hoka ni goshitsumon wa arimasu ka',
    },
  ],
  en: [
    {
      reply: 'Sure, let me show you.',
      replyMeaningZh: '好的，我帶你看。',
    },
    {
      reply: 'No problem. Anything else?',
      replyMeaningZh: '沒問題，還需要別的嗎？',
    },
    {
      reply: 'That sounds good. Here you go.',
      replyMeaningZh: '聽起來不錯，給你。',
    },
  ],
  ko: [
    {
      reply: '네, 이쪽으로 오세요.',
      replyMeaningZh: '好的，請往這邊。',
      replyPronunciation: 'ne, ijjog-euro oseyo',
    },
    {
      reply: '잠시만 기다려 주세요.',
      replyMeaningZh: '請稍等一下。',
      replyPronunciation: 'jamsiman gidaryeo juseyo',
    },
    {
      reply: '다른 거 필요하세요?',
      replyMeaningZh: '還需要別的嗎？',
      replyPronunciation: 'dareun geo pilyohaseyo?',
    },
  ],
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function mockCorrectSentence(language: Language, sentence: string): SentenceCorrectionResult {
  const trimmed = sentence.trim()
  const langLabel = LANGUAGE_LABELS[language]

  if (language === 'en') {
    const lower = trimmed.toLowerCase()
    if (lower.includes('i want check in hotel')) {
      return {
        original: trimmed,
        corrected: "I'd like to check in, please.",
        explanationZh: '「check in」前面需要加 to，且旅館用 check in 比較自然。',
        naturalnessTipZh: '在櫃台說 I\'d like to... 比 I want... 更禮貌自然。',
      }
    }
    if (!trimmed.endsWith('.') && !trimmed.endsWith('?') && !trimmed.endsWith('!')) {
      return {
        original: trimmed,
        corrected: `${trimmed}.`,
        explanationZh: '陳述句結尾建議加句點，語氣更完整。',
        naturalnessTipZh: '開口前先確認主詞＋動詞是否完整。',
      }
    }
  }

  if (language === 'ja' && !trimmed.endsWith('。') && !trimmed.endsWith('？')) {
    return {
      original: trimmed,
      corrected: `${trimmed}。`,
      explanationZh: '日文句子結尾建議加上「。」',
      naturalnessTipZh: '旅行對話中，結尾加上です／ます 會更禮貌。',
    }
  }

  return {
    original: trimmed,
    corrected: trimmed,
    explanationZh: `這句${langLabel}大致可以溝通，以下是讓它更自然的建議。`,
    naturalnessTipZh: '試著用更短、更直接的句子，對方比較容易聽懂。',
  }
}

async function fetchFromApi<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export async function startCustomScenario(
  request: CustomScenarioRequest,
): Promise<CustomScenarioResult> {
  if (!USE_MOCK) {
    return fetchFromApi<CustomScenarioResult>('/coach/custom-scenario', request)
  }

  await delay(600)

  const opening = CUSTOM_OPENINGS[request.language]
  const title = request.scenario.trim().slice(0, 24) || '自訂旅行情境'

  return {
    scenarioTitle: title,
    roleDescriptionZh: `AI 將扮演${opening.roleZh}，陪你練習「${request.scenario.trim()}」`,
    openingLine: opening.openingLine,
    openingMeaningZh: opening.openingMeaningZh,
    openingPronunciation: opening.openingPronunciation,
  }
}

export async function suggestTopic(request: TopicSuggestionRequest): Promise<TopicSuggestionResult> {
  if (!USE_MOCK) {
    return fetchFromApi<TopicSuggestionResult>('/coach/suggest-topic', request)
  }

  await delay(500)
  return pickRandom(TOPIC_POOL[request.language])
}

export async function correctSentence(
  request: SentenceCorrectionRequest,
): Promise<SentenceCorrectionResult> {
  if (!USE_MOCK) {
    return fetchFromApi<SentenceCorrectionResult>('/coach/correct-sentence', request)
  }

  await delay(450)
  return mockCorrectSentence(request.language, request.sentence)
}

export async function continueConversation(
  request: ConversationReplyRequest,
): Promise<ConversationReplyResult> {
  if (!USE_MOCK) {
    return fetchFromApi<ConversationReplyResult>('/coach/conversation-reply', request)
  }

  await delay(500)
  const turnIndex = request.history.filter((m) => m.role === 'user').length
  const replies = CONVERSATION_REPLIES[request.language]
  return replies[Math.min(turnIndex, replies.length - 1)]
}

export function isCoachMockMode(): boolean {
  return USE_MOCK
}
