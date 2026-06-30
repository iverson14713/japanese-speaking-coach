import { getSentencesByLanguage } from '../sentences'
import type { Language, Sentence } from '../types'
import { getScenariosForCategory } from './scenarios'
import type { TranslationChallengeQuestion } from './types'

function sentenceToQuestion(sentence: Sentence): TranslationChallengeQuestion {
  const romanization =
    sentence.language === 'en'
      ? undefined
      : sentence.pronunciation.trim() &&
          sentence.pronunciation.trim() !== sentence.targetText.trim()
        ? sentence.pronunciation.trim()
        : undefined

  return {
    id: `sentence-${sentence.language}-${sentence.id}`,
    language: sentence.language,
    scenarios: getScenariosForCategory(sentence.category),
    chinese: sentence.meaningZh,
    answer: sentence.targetText,
    romanization,
    keywords: sentence.keywords,
    difficulty: 1,
  }
}

const questionCache = new Map<Language, TranslationChallengeQuestion[]>()

export function getAllTranslationQuestions(language: Language): TranslationChallengeQuestion[] {
  const cached = questionCache.get(language)
  if (cached) {
    return cached
  }

  const questions = getSentencesByLanguage(language).map(sentenceToQuestion)
  questionCache.set(language, questions)
  return questions
}
