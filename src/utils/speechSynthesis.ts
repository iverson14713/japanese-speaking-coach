import type { Language } from '../data/types'
import { SPEECH_LANG } from '../data/types'

export function speakText(text: string, language: Language): void {
  if (!window.speechSynthesis) {
    return
  }

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = SPEECH_LANG[language]
  utterance.rate = language === 'ja' ? 0.85 : 0.9
  window.speechSynthesis.speak(utterance)
}
