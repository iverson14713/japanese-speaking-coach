import type { Language, PhraseChunk, Sentence } from '../data/types'

function normalizeForCompare(text: string): string {
  return text.replace(/\s+/g, '').trim().toLowerCase()
}

export function shouldShowPronunciation(language: Language): boolean {
  return language === 'ja' || language === 'ko'
}

export function getSentenceDisplayPronunciation(sentence: Sentence): string | null {
  if (!shouldShowPronunciation(sentence.language)) {
    return null
  }

  const pronunciation = sentence.pronunciation?.trim()
  if (!pronunciation) {
    return null
  }

  if (normalizeForCompare(pronunciation) === normalizeForCompare(sentence.targetText)) {
    return null
  }

  return pronunciation
}

export function getSentenceDisplayHelper(sentence: Sentence): string | null {
  if (!shouldShowPronunciation(sentence.language)) {
    return null
  }

  const helper = sentence.helperText?.trim()
  if (!helper) {
    return null
  }

  if (normalizeForCompare(helper) === normalizeForCompare(sentence.targetText)) {
    return null
  }

  const pronunciation = getSentenceDisplayPronunciation(sentence)
  if (pronunciation && normalizeForCompare(helper) === normalizeForCompare(pronunciation)) {
    return null
  }

  return helper
}

export function getChunkDisplayPronunciation(
  language: Language,
  chunk: PhraseChunk,
  sentence?: Sentence,
): string | null {
  if (!shouldShowPronunciation(language)) {
    return null
  }

  const pronunciation = chunk.pronunciation?.trim()
  if (!pronunciation) {
    return null
  }

  if (normalizeForCompare(pronunciation) === normalizeForCompare(chunk.text)) {
    return null
  }

  if (sentence) {
    const isPartialChunk =
      normalizeForCompare(chunk.text) !== normalizeForCompare(sentence.targetText)
    const isFullSentenceFallback =
      normalizeForCompare(pronunciation) === normalizeForCompare(sentence.pronunciation)
    if (isPartialChunk && isFullSentenceFallback) {
      return null
    }
  }

  return pronunciation
}
