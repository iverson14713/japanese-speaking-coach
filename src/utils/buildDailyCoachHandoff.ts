import type { Sentence } from '../data/sentences'
import { getCategoryLabel } from '../data/categories'
import type { CategoryId } from '../data/categories'
import type { Language } from '../data/types'
import type { DailyCoachHandoff } from '../types/dailyCoachHandoff'

interface OpeningLine {
  openingLine: string
  openingMeaningZh: string
  openingPronunciation?: string
}

interface CategoryScenarioTemplate {
  scenarioTitleZh: string
  roleLabelZh: string
  buildGoal: (sentence: Sentence, categoryLabel: string) => string
  openings: Record<Language, OpeningLine>
}

const CATEGORY_TEMPLATES: Record<CategoryId, CategoryScenarioTemplate> = {
  'first-conversation': {
    scenarioTitleZh: '旅途中聽到不懂的話',
    roleLabelZh: '旅途中遇到的人',
    buildGoal: (sentence) => `練習詢問對方剛剛說的意思，並用「${sentence.targetText}」回應`,
    openings: {
      en: {
        openingLine: 'This ticket is valid only for local trains.',
        openingMeaningZh: '這張票只適用於普通列車。',
      },
      ja: {
        openingLine: 'この切符は普通列車だけです。',
        openingMeaningZh: '這張票只適用於普通列車。',
        openingPronunciation: 'kono kippu wa futsuu ressha dake desu',
      },
      ko: {
        openingLine: '이 표는 일반 열차만 가능해요.',
        openingMeaningZh: '這張票只適用於普通列車。',
        openingPronunciation: 'i pyoneun ilban yeolcha-man ganeunghae-yo',
      },
    },
  },
  'convenience-store': {
    scenarioTitleZh: '便利商店購物',
    roleLabelZh: '店員',
    buildGoal: (sentence, categoryLabel) =>
      `在${categoryLabel}練習使用「${sentence.targetText}」完成購物對話`,
    openings: {
      ja: {
        openingLine: 'いらっしゃいませ。袋はご入用ですか？',
        openingMeaningZh: '歡迎光臨，需要袋子嗎？',
        openingPronunciation: 'irasshaimase. fukuro wa goinyou desu ka',
      },
      en: {
        openingLine: 'Hi there! Do you need a bag with that?',
        openingMeaningZh: '你好！需要袋子嗎？',
      },
      ko: {
        openingLine: '어서 오세요. 봉투 필요하세요?',
        openingMeaningZh: '歡迎光臨，需要袋子嗎？',
        openingPronunciation: 'eoseo oseyo. bongtu piryohaseyo',
      },
    },
  },
  restaurant: {
    scenarioTitleZh: '餐廳點餐',
    roleLabelZh: '服務人員',
    buildGoal: (sentence, categoryLabel) =>
      `在${categoryLabel}練習用「${sentence.targetText}」完成點餐`,
    openings: {
      ja: {
        openingLine: 'いらっしゃいませ。ご注文はお決まりですか？',
        openingMeaningZh: '歡迎光臨，決定好要點什麼了嗎？',
        openingPronunciation: 'irasshaimase. gochuumon wa okimari desu ka',
      },
      en: {
        openingLine: 'Welcome! Are you ready to order?',
        openingMeaningZh: '歡迎！準備好點餐了嗎？',
      },
      ko: {
        openingLine: '어서 오세요. 주문하시겠어요?',
        openingMeaningZh: '歡迎光臨，要點餐嗎？',
        openingPronunciation: 'eoseo oseyo. jumunhasigesseoyo',
      },
    },
  },
  directions: {
    scenarioTitleZh: '問路與交通',
    roleLabelZh: '站務人員',
    buildGoal: (sentence, categoryLabel) =>
      `在${categoryLabel}練習用「${sentence.targetText}」詢問路線`,
    openings: {
      ja: {
        openingLine: 'はい、どちらへ行かれますか？',
        openingMeaningZh: '請問您要去哪裡？',
        openingPronunciation: 'hai, dochira e ikaremasu ka',
      },
      en: {
        openingLine: 'Sure, where are you trying to go?',
        openingMeaningZh: '好的，你想去哪裡？',
      },
      ko: {
        openingLine: '네, 어디로 가시나요?',
        openingMeaningZh: '請問您要去哪裡？',
        openingPronunciation: 'ne, eodiro gasinayo',
      },
    },
  },
  hotel: {
    scenarioTitleZh: '飯店入住',
    roleLabelZh: '櫃台人員',
    buildGoal: (sentence, categoryLabel) =>
      `在${categoryLabel}練習用「${sentence.targetText}」辦理入住`,
    openings: {
      ja: {
        openingLine: 'いらっしゃいませ。ご予約はお済みですか？',
        openingMeaningZh: '歡迎光臨，您有預約嗎？',
        openingPronunciation: 'irasshaimase. goyoyaku wa osumi desu ka',
      },
      en: {
        openingLine: 'Good evening. Do you have a reservation?',
        openingMeaningZh: '晚安，您有預約嗎？',
      },
      ko: {
        openingLine: '어서 오세요. 예약하셨나요?',
        openingMeaningZh: '歡迎光臨，您有預約嗎？',
        openingPronunciation: 'eoseo oseyo. yeyakhasyeonna-yo',
      },
    },
  },
  shopping: {
    scenarioTitleZh: '購物付款',
    roleLabelZh: '店員',
    buildGoal: (sentence, categoryLabel) =>
      `在${categoryLabel}練習用「${sentence.targetText}」完成購物`,
    openings: {
      ja: {
        openingLine: 'いらっしゃいませ。何かお探しですか？',
        openingMeaningZh: '歡迎光臨，請問在找什麼嗎？',
        openingPronunciation: 'irasshaimase. nanika osagashi desu ka',
      },
      en: {
        openingLine: 'Hi! Can I help you find anything?',
        openingMeaningZh: '嗨！需要幫您找什麼嗎？',
      },
      ko: {
        openingLine: '어서 오세요. 찾으시는 거 있으세요?',
        openingMeaningZh: '歡迎光臨，有在找什麼嗎？',
        openingPronunciation: 'eoseo oseyo. chajeusineun geo isseuseyo',
      },
    },
  },
  pharmacy: {
    scenarioTitleZh: '藥妝店辦理免稅',
    roleLabelZh: '店員',
    buildGoal: (sentence) => `練習向店員詢問並辦理免稅手續，使用「${sentence.targetText}」`,
    openings: {
      ja: {
        openingLine: 'いらっしゃいませ。免税をご希望ですか？',
        openingMeaningZh: '歡迎光臨，請問您要辦理免稅嗎？',
        openingPronunciation: 'irasshaimase. menzei o gokibou desu ka',
      },
      en: {
        openingLine: 'Welcome! Are you shopping tax-free today?',
        openingMeaningZh: '歡迎！今天要辦免稅購物嗎？',
      },
      ko: {
        openingLine: '어서 오세요. 면세로 구매하시나요?',
        openingMeaningZh: '歡迎光臨，要免稅購買嗎？',
        openingPronunciation: 'eoseo oseyo. myeonsero gumaesinasinayo',
      },
    },
  },
  emergency: {
    scenarioTitleZh: '緊急求助',
    roleLabelZh: '工作人員',
    buildGoal: (sentence, categoryLabel) =>
      `在${categoryLabel}練習用「${sentence.targetText}」說明狀況`,
    openings: {
      ja: {
        openingLine: 'どうしましたか？',
        openingMeaningZh: '怎麼了？',
        openingPronunciation: 'dou shimashita ka',
      },
      en: {
        openingLine: 'Are you okay? How can I help?',
        openingMeaningZh: '你還好嗎？需要什麼協助？',
      },
      ko: {
        openingLine: '괜찮으세요? 무엇을 도와드릴까요?',
        openingMeaningZh: '您還好嗎？需要什麼協助？',
        openingPronunciation: 'gwaenchaneuseyo mueoseul dowadeurilkkayo',
      },
    },
  },
}

function resolveScenarioTitle(sentence: Sentence, template: CategoryScenarioTemplate): string {
  const target = sentence.targetText
  if (/免税|menzei|면세|tax.?free/i.test(target) || /免稅/.test(sentence.meaningZh)) {
    return '藥妝店辦理免稅'
  }
  if (/意味|mean|뜻|무슨/.test(target) || /什麼意思/.test(sentence.meaningZh)) {
    return '第一次對話中聽到不懂的單字'
  }
  return template.scenarioTitleZh
}

function buildScenarioPrompt(
  sentence: Sentence,
  scenarioTitle: string,
  roleLabelZh: string,
  goalZh: string,
  opening: OpeningLine,
): string {
  const categoryLabel = getCategoryLabel(sentence.category)
  return [
    '【今日實戰】',
    `情境：${scenarioTitle}`,
    `角色：${roleLabelZh}`,
    `目標：${goalZh}`,
    `今日句子：${sentence.targetText}`,
    `中文意思：${sentence.meaningZh}`,
    `使用時機：${sentence.usageNoteZh}`,
    `分類：${categoryLabel}`,
    `建議開場：${opening.openingLine}`,
    `開場中文：${opening.openingMeaningZh}`,
  ].join('\n')
}

export function buildDailyCoachHandoff(
  sentence: Sentence,
  options?: { sessionAlreadyConsumed?: boolean },
): DailyCoachHandoff {
  const template = CATEGORY_TEMPLATES[sentence.category]
  const categoryLabel = getCategoryLabel(sentence.category)
  const scenarioTitle = resolveScenarioTitle(sentence, template)
  const opening = template.openings[sentence.language]
  const goalZh = template.buildGoal(sentence, categoryLabel)
  const roleLabelZh = template.roleLabelZh

  return {
    source: 'dailyPractice',
    sentenceId: sentence.id,
    language: sentence.language,
    targetText: sentence.targetText,
    meaningZh: sentence.meaningZh,
    category: sentence.category,
    usageNoteZh: sentence.usageNoteZh,
    pronunciation: sentence.pronunciation,
    scenarioTitle,
    roleLabelZh,
    goalZh,
    openingLine: opening.openingLine,
    openingMeaningZh: opening.openingMeaningZh,
    openingPronunciation: opening.openingPronunciation,
    scenarioPrompt: buildScenarioPrompt(sentence, scenarioTitle, roleLabelZh, goalZh, opening),
    sessionAlreadyConsumed: options?.sessionAlreadyConsumed ?? false,
    createdAt: Date.now(),
  }
}

export function buildDailyScenarioKey(sentenceId: number): string {
  return `daily:${sentenceId}`
}
