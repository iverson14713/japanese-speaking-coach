import type { Language } from '../data/types'
import { SPEECH_LANG } from '../data/types'
import { showToast } from './toast'

export function speakText(text: string, language: Language): void {
  if (!window.speechSynthesis) {
    showToast('目前裝置不支援語音朗讀')
    return
  }

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = SPEECH_LANG[language]
  utterance.rate = language === 'ja' ? 0.85 : 0.9
  window.speechSynthesis.speak(utterance)
}
