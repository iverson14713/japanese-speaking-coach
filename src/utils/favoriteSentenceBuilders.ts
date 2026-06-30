import type { Sentence } from '../data/types'
import type { DialogueScript, DialogueTurn } from '../data/dialogues'
import { getCategoryLabel } from '../data/categories'
import { getDialogueScenario } from '../data/dialogues'
import type { TranslationChallengeQuestion } from '../data/translationChallenge'
import { TRANSLATION_SCENARIOS } from '../data/translationChallenge'
import type { FavoriteSentenceInput } from '../types/favoriteSentence'

export function buildFavoriteIdFromSentence(sentence: Sentence): string {
  return `sentence:${sentence.language}:${sentence.id}`
}

export function buildFavoriteFromSentence(sentence: Sentence): FavoriteSentenceInput {
  const romanization =
    sentence.language === 'en'
      ? undefined
      : sentence.pronunciation.trim() &&
          sentence.pronunciation.trim() !== sentence.targetText.trim()
        ? sentence.pronunciation.trim()
        : undefined

  return {
    id: buildFavoriteIdFromSentence(sentence),
    sentenceId: sentence.id,
    language: sentence.language,
    scenario: getCategoryLabel(sentence.category),
    chinese: sentence.meaningZh,
    answer: sentence.targetText,
    romanization,
    source: 'sentence',
    categoryId: sentence.category,
  }
}

export function buildFavoriteIdFromDialogueTurn(
  script: DialogueScript,
  sectionTitle: string,
  turnIndex: number,
): string {
  return `dialogue:${script.language}:${script.id}:${sectionTitle}:${turnIndex}`
}

export function buildFavoriteFromDialogueTurn(
  script: DialogueScript,
  sectionTitle: string,
  turnIndex: number,
  turn: DialogueTurn,
): FavoriteSentenceInput {
  const scenario = getDialogueScenario(script.category)?.name ?? sectionTitle

  return {
    id: buildFavoriteIdFromDialogueTurn(script, sectionTitle, turnIndex),
    sentenceId: `${script.id}:${sectionTitle}:${turnIndex}`,
    language: script.language,
    scenario,
    chinese: turn.meaningZh,
    answer: turn.text,
    romanization: turn.pronunciation?.trim() || undefined,
    source: 'dialogue',
  }
}

export function buildFavoriteFromChallengeQuestion(
  question: TranslationChallengeQuestion,
): FavoriteSentenceInput {
  const scenario =
    TRANSLATION_SCENARIOS.find((item) => question.scenarios.includes(item.id))?.label ??
    question.scenarios[0] ??
    '口說挑戰'

  const numericId = Number(question.id.replace(/^sentence-\w+-/, ''))

  return {
    id: `challenge:${question.id}`,
    sentenceId: Number.isFinite(numericId) ? numericId : question.id,
    language: question.language,
    scenario,
    chinese: question.chinese,
    answer: question.answer,
    romanization: question.romanization,
    source: 'challenge',
  }
}
