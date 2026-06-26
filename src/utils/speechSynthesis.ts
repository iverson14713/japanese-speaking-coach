import type { Language } from '../data/types'
import { SPEECH_LANG } from '../data/types'
import { getSpeakableText, type SpeakableSource } from './getSpeakableText'
import { showToast } from './toast'

export interface SpeakOptions {
  /** When true, do not show toast on failure (e.g. auto-speak). */
  silent?: boolean
  onStart?: () => void
  onEnd?: () => void
  onError?: () => void
}

let currentUtterance: SpeechSynthesisUtterance | null = null
let speaking = false

export function isSpeaking(): boolean {
  return speaking
}

export function stopSpeaking(): void {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
  speaking = false
  currentUtterance = null
}

export function speakText(
  source: string | SpeakableSource,
  language: Language,
  options?: SpeakOptions,
): void {
  if (!window.speechSynthesis) {
    if (!options?.silent) {
      showToast('目前裝置不支援語音朗讀')
    }
    options?.onError?.()
    return
  }

  const trimmed = getSpeakableText(source, language).trim()
  if (!trimmed) {
    return
  }

  if (speaking && currentUtterance?.text === trimmed) {
    return
  }

  window.speechSynthesis.cancel()
  speaking = false

  const utterance = new SpeechSynthesisUtterance(trimmed)
  currentUtterance = utterance
  utterance.lang = SPEECH_LANG[language]
  utterance.rate = language === 'ja' ? 0.85 : 0.9

  utterance.onstart = () => {
    speaking = true
    options?.onStart?.()
  }

  utterance.onend = () => {
    speaking = false
    currentUtterance = null
    options?.onEnd?.()
  }

  utterance.onerror = () => {
    speaking = false
    currentUtterance = null
    options?.onError?.()
  }

  try {
    window.speechSynthesis.speak(utterance)
  } catch {
    speaking = false
    currentUtterance = null
    options?.onError?.()
  }
}
