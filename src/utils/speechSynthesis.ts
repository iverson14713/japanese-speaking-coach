export function speakJapanese(text: string): void {
  if (!window.speechSynthesis) {
    return
  }

  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ja-JP'
  utterance.rate = 0.85
  window.speechSynthesis.speak(utterance)
}
