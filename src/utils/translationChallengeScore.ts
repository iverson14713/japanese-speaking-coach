import type { TranslationChallengeQuestion } from '../data/translationChallenge'

function normalize(text: string): string {
  return text.replace(/\s+/g, '').toLowerCase()
}

export interface TranslationScoreResult {
  score: number
  feedback: string
}

export function scoreTranslationChallenge(
  transcript: string,
  question: TranslationChallengeQuestion,
): TranslationScoreResult {
  const normalizedTranscript = normalize(transcript)
  if (!normalizedTranscript) {
    return {
      score: 0,
      feedback: '剛剛好像沒有聽清楚，再試一次',
    }
  }

  const normalizedAnswer = normalize(question.answer)
  if (
    normalizedTranscript.includes(normalizedAnswer) ||
    normalizedAnswer.includes(normalizedTranscript)
  ) {
    return {
      score: 96,
      feedback: '這句很接近標準答案',
    }
  }

  const matchedKeywords = question.keywords.filter((keyword) =>
    normalizedTranscript.includes(normalize(keyword)),
  )
  const keywordRatio = matchedKeywords.length / Math.max(question.keywords.length, 1)

  if (keywordRatio >= 0.66) {
    return {
      score: Math.min(92, Math.round(72 + keywordRatio * 20)),
      feedback: '意思有到，但可以再自然一點',
    }
  }

  if (keywordRatio >= 0.34) {
    return {
      score: Math.round(48 + keywordRatio * 28),
      feedback: '發音可以再清楚一點',
    }
  }

  if (keywordRatio > 0) {
    return {
      score: Math.round(24 + keywordRatio * 24),
      feedback: '有聽到一些關鍵字，再聽一次標準答案練練看',
    }
  }

  return {
    score: 12,
    feedback: '再聽一次標準答案，跟著練練看',
  }
}
