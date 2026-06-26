import type { Language, PhraseChunk, Sentence, WordBreakdown } from '../data/types'

const MIN_CHUNKS = 2
const MAX_CHUNKS = 4

const JA_PARTICLES = [
  'から',
  'まで',
  'より',
  'の',
  'を',
  'に',
  'で',
  'が',
  'は',
  'と',
  'へ',
  'も',
  'て',
  'か',
] as const

const KO_PARTICLES = [
  '에서',
  '으로',
  '로',
  '에게',
  '한테',
  '까지',
  '부터',
  '은',
  '는',
  '이',
  '가',
  '을',
  '를',
  '에',
  '와',
  '과',
  '도',
  '만',
  '요',
] as const

const JA_PHRASE_HINTS: [string, string][] = [
  ['お願いします', '麻煩你 / 請幫我'],
  ['ください', '請給我'],
  ['いただけますか', '可以…嗎？'],
  ['ありますか', '有嗎？'],
  ['ですか', '…嗎？'],
  ['でしょうか', '…嗎？'],
  ['ありがとうございます', '謝謝'],
  ['すみません', '不好意思'],
  ['わかりません', '聽不懂'],
  ['もう一度', '再一次'],
]

const KO_PHRASE_HINTS: [string, string][] = [
  ['주세요', '請給我'],
  ['해 주세요', '請幫我'],
  ['있어요', '有嗎？'],
  ['돼요', '可以嗎？'],
  ['예요', '…嗎？'],
  ['감사합니다', '謝謝'],
  ['죄송합니다', '不好意思'],
]

const KO_KEYWORD_GLOSS: [string, string][] = [
  ['카드', '刷卡'],
  ['결제', '付款'],
  ['면세', '免稅'],
  ['사이즈', '尺寸'],
  ['할인', '折扣'],
  ['환불', '退貨'],
  ['영수증', '收據'],
  ['봉투', '袋子'],
  ['선물', '禮物'],
]

const JA_KEYWORD_GLOSS: [string, string][] = [
  ['免税', '免稅的'],
  ['手続き', '手續'],
  ['薬局', '藥局'],
  ['空港', '機場'],
  ['駅', '車站'],
  ['ホテル', '飯店'],
  ['レストラン', '餐廳'],
  ['トイレ', '廁所'],
]

export function getPracticePhraseChunks(sentence: Sentence): PhraseChunk[] {
  if (hasExplicitChunks(sentence)) {
    return sentence.phraseChunks
  }
  return autoSplitPhraseChunks(sentence)
}

function normalizeCompare(text: string): string {
  return text.replace(/\s+/g, '').trim()
}

function hasExplicitChunks(sentence: Sentence): boolean {
  const { phraseChunks, targetText } = sentence
  if (phraseChunks.length < MIN_CHUNKS) {
    return false
  }

  const allFullSentence = phraseChunks.every(
    (chunk) => normalizeCompare(chunk.text) === normalizeCompare(targetText),
  )
  return !allFullSentence
}

function autoSplitPhraseChunks(sentence: Sentence): PhraseChunk[] {
  const segments = splitTargetText(sentence)
  const helperParts = splitHelperText(sentence.helperText)
  const pronunciationParts = splitPronunciationText(sentence.pronunciation, segments.length)

  return segments.map((text, index) => ({
    text,
    pronunciation:
      helperParts?.[index] ??
      pronunciationParts?.[index] ??
      sentence.pronunciation,
    chinese: getChunkChinese(text, sentence, index, segments.length),
  }))
}

function splitTargetText(sentence: Sentence): string[] {
  const { targetText, language } = sentence
  const trimmed = targetText.trim()
  if (!trimmed) {
    return []
  }

  let segments: string[]
  switch (language) {
    case 'ja':
      segments = splitJapanese(trimmed)
      break
    case 'ko':
      segments = splitKorean(trimmed)
      break
    case 'en':
      segments = splitEnglish(trimmed)
      break
    default:
      segments = [trimmed]
  }

  const helperAligned = alignWithHelperSegments(segments, sentence.helperText, language)
  return clampSegmentCount(helperAligned.length > 1 ? helperAligned : segments)
}

function splitByParticles(text: string, particles: readonly string[]): string[] {
  const segments: string[] = []
  let buffer = ''

  for (let index = 0; index < text.length; index += 1) {
    buffer += text[index]
    const matchedParticle = particles.find((particle) => buffer.endsWith(particle))
    if (matchedParticle && buffer.length > matchedParticle.length) {
      segments.push(buffer)
      buffer = ''
    }
  }

  if (buffer) {
    segments.push(buffer)
  }

  return segments.length > 0 ? segments : [text]
}

function splitJapanese(text: string): string[] {
  const commaParts = text
    .split(/[、,]/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (commaParts.length > 1) {
    return clampSegmentCount(commaParts.flatMap((part) => splitByParticles(part, JA_PARTICLES)))
  }

  return clampSegmentCount(splitByParticles(text, JA_PARTICLES))
}

function splitKorean(text: string): string[] {
  const commaParts = text
    .split(/[,，]/)
    .map((part) => part.trim())
    .filter(Boolean)

  if (commaParts.length > 1) {
    return clampSegmentCount(commaParts.flatMap((part) => splitKoreanClause(part)))
  }

  return clampSegmentCount(splitKoreanClause(text))
}

function splitKoreanClause(text: string): string[] {
  const spaceParts = text.split(/\s+/).filter(Boolean)

  if (spaceParts.length >= MIN_CHUNKS) {
    const targetCount = Math.min(
      MAX_CHUNKS,
      Math.max(MIN_CHUNKS, Math.ceil(spaceParts.length / 2)),
    )
    if (spaceParts.length > targetCount) {
      return groupWordSegments(spaceParts, targetCount)
    }
    return spaceParts
  }

  const particleSegments = splitByParticles(text, KO_PARTICLES)
  if (particleSegments.length >= MIN_CHUNKS) {
    return particleSegments
  }

  return particleSegments.length > 0 ? particleSegments : [text]
}

function splitEnglish(text: string): string[] {
  const clauseParts = text
    .split(/([,?!.…]+)/)
    .reduce<string[]>((parts, piece, index, array) => {
      if (!piece) {
        return parts
      }
      if (/^[,?!.…]+$/.test(piece) && parts.length > 0) {
        parts[parts.length - 1] += piece
        return parts
      }
      if (index > 0 && /^[,?!.…]+$/.test(array[index - 1])) {
        return parts
      }
      parts.push(piece.trim())
      return parts
    }, [])
    .filter(Boolean)

  if (clauseParts.length >= MIN_CHUNKS && clauseParts.length <= MAX_CHUNKS) {
    return clauseParts
  }

  const words = text.trim().split(/\s+/).filter(Boolean)
  if (words.length <= 1) {
    return [text.trim()]
  }

  const targetCount = Math.min(MAX_CHUNKS, Math.max(MIN_CHUNKS, Math.ceil(words.length / 2)))
  return groupWordSegments(words, targetCount)
}

function groupWordSegments(words: string[], targetCount: number): string[] {
  if (words.length <= targetCount) {
    return words
  }

  const result: string[] = []
  const chunkSize = Math.ceil(words.length / targetCount)

  for (let index = 0; index < words.length; index += chunkSize) {
    result.push(words.slice(index, index + chunkSize).join(' '))
  }

  return clampSegmentCount(result)
}

function clampSegmentCount(segments: string[]): string[] {
  let result = segments.filter(Boolean)

  while (result.length > MAX_CHUNKS) {
    let shortestIndex = 0
    for (let index = 1; index < result.length - 1; index += 1) {
      if (result[index].length < result[shortestIndex].length) {
        shortestIndex = index
      }
    }
    result = [
      ...result.slice(0, shortestIndex),
      result[shortestIndex] + result[shortestIndex + 1],
      ...result.slice(shortestIndex + 2),
    ]
  }

  return result
}

function splitHelperText(helperText: string): string[] | null {
  const trimmed = helperText.trim()
  if (!trimmed) {
    return null
  }
  const parts = trimmed.split(/\s+/).filter(Boolean)
  return parts.length > 1 ? parts : null
}

function alignWithHelperSegments(
  segments: string[],
  helperText: string,
  _language: Language,
): string[] {
  const helperParts = splitHelperText(helperText)
  if (!helperParts || helperParts.length !== segments.length) {
    return segments
  }

  return segments
}

function splitPronunciationText(pronunciation: string, count: number): string[] | null {
  const words = pronunciation.trim().split(/\s+/).filter(Boolean)
  if (words.length < MIN_CHUNKS) {
    return null
  }
  if (words.length === count) {
    return words
  }
  return groupWordSegments(words, count)
}

function getChunkChinese(
  chunkText: string,
  sentence: Sentence,
  index: number,
  total: number,
): string {
  const fromWords = chineseFromWordBreakdown(chunkText, sentence.wordBreakdown)
  if (fromWords) {
    return fromWords
  }

  const keywordHint = getKeywordHint(chunkText, sentence)
  if (keywordHint) {
    return keywordHint
  }

  const phraseHint = getPhraseHint(chunkText, sentence.language)
  if (phraseHint) {
    return phraseHint
  }

  const meaningParts = splitMeaningForChunks(sentence.meaningZh, total)
  if (meaningParts[index]) {
    return meaningParts[index]
  }

  return '跟讀這一段'
}

function chineseFromWordBreakdown(chunkText: string, words: WordBreakdown[]): string | null {
  if (words.length <= 1) {
    return null
  }

  const matched = words.filter((entry) => chunkIncludesWord(chunkText, entry.word))
  if (matched.length === 0) {
    return null
  }

  return matched.map((entry) => entry.meaning).join('')
}

function chunkIncludesWord(chunkText: string, word: string): boolean {
  const normalizedChunk = normalizeCompare(chunkText)
  const normalizedWord = normalizeCompare(word)
  return normalizedChunk.includes(normalizedWord) || normalizedWord.includes(normalizedChunk)
}

function getPhraseHint(chunkText: string, language: Language): string | null {
  const hints = language === 'ko' ? KO_PHRASE_HINTS : JA_PHRASE_HINTS
  const match = hints.find(([pattern]) => chunkText.includes(pattern))
  return match?.[1] ?? null
}

function getKeywordHint(chunkText: string, sentence: Sentence): string | null {
  const glossTable = sentence.language === 'ko' ? KO_KEYWORD_GLOSS : JA_KEYWORD_GLOSS
  const matched = glossTable
    .filter(([keyword]) => chunkText.includes(keyword))
    .map(([, gloss]) => gloss)

  if (matched.length > 0) {
    return matched.join(' / ')
  }

  for (const keyword of sentence.keywords) {
    if (!/[\u3040-\u9FFF\uAC00-\uD7AF]/.test(keyword)) {
      continue
    }
    if (!chunkText.includes(keyword)) {
      continue
    }
    if (sentence.meaningZh.includes(keyword)) {
      return keyword
    }
  }

  return null
}

function splitMeaningForChunks(meaningZh: string, total: number): string[] {
  const trimmed = meaningZh.trim()
  if (!trimmed || total <= 1) {
    return [trimmed]
  }

  const bySlash = trimmed.split(/\s*[/／]\s*/).filter(Boolean)
  if (bySlash.length === total) {
    return bySlash
  }

  const byComma = trimmed.split(/[，,]/).map((part) => part.trim()).filter(Boolean)
  if (byComma.length === total) {
    return byComma
  }

  if (total === 2) {
    const midpoint = Math.ceil(trimmed.length / 2)
    return [trimmed.slice(0, midpoint), trimmed.slice(midpoint)]
  }

  if (total === 3) {
    const first = Math.ceil(trimmed.length / 3)
    const second = Math.ceil((trimmed.length - first) / 2)
    return [
      trimmed.slice(0, first),
      trimmed.slice(first, first + second),
      trimmed.slice(first + second),
    ]
  }

  const chunkSize = Math.ceil(trimmed.length / total)
  const parts: string[] = []
  for (let index = 0; index < trimmed.length; index += chunkSize) {
    parts.push(trimmed.slice(index, index + chunkSize))
  }
  return parts
}
