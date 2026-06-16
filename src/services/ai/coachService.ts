import type { Language } from '../../data/types'
import { LANGUAGE_LABELS } from '../../data/types'
import type {
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

const API_BASE = import.meta.env.VITE_AI_API_BASE ?? ''
const USE_MOCK = !API_BASE

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

export async function startTopicChat(request: TopicSuggestionRequest): Promise<TopicChatSession> {
  if (!USE_MOCK) {
    return fetchFromApi<TopicChatSession>('/coach/start-topic-chat', request)
  }

  await delay(500)
  return pickRandom(TOPIC_POOL[request.language])
}

/** @deprecated Use startTopicChat */
export async function suggestTopic(request: TopicSuggestionRequest): Promise<TopicChatSession> {
  return startTopicChat(request)
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

export async function continueTopicConversation(
  request: TopicConversationRequest,
): Promise<ConversationReplyResult> {
  if (!USE_MOCK) {
    return fetchFromApi<ConversationReplyResult>('/coach/topic-reply', request)
  }

  await delay(500)
  const topic = findTopicSession(request.language, request.scenarioTitle)
  const replies = topic?.followUpReplies ?? GENERIC_FOLLOW_UPS[request.language]
  const index = Math.min(request.userTurnIndex - 1, replies.length - 1)
  return replies[Math.max(0, index)]
}

export async function continueConversation(
  request: ConversationReplyRequest,
): Promise<ConversationReplyResult> {
  if (!USE_MOCK) {
    return fetchFromApi<ConversationReplyResult>('/coach/conversation-reply', request)
  }

  await delay(500)
  const topic = findTopicSession(request.language, request.scenario)
  if (topic) {
    const userTurnIndex = request.history.filter((m) => m.role === 'user').length
    return continueTopicConversation({
      language: request.language,
      scenarioTitle: request.scenario,
      userTurnIndex,
    })
  }

  const turnIndex = request.history.filter((m) => m.role === 'user').length
  const replies = GENERIC_FOLLOW_UPS[request.language]
  return replies[Math.min(turnIndex - 1, replies.length - 1)] ?? replies[0]
}

export function getTopicHint(
  session: TopicChatSession,
  assistantMessageIndex: number,
): { text: string; meaningZh: string; pronunciation?: string } | undefined {
  const hintIndex = Math.floor(assistantMessageIndex / 2)
  return session.hints[hintIndex]
}

export function isCoachMockMode(): boolean {
  return USE_MOCK
}
