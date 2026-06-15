import type { Sentence } from '../data/sentences'
import type { Language } from '../data/types'
import { getCategoryLabel } from '../data/categories'
import { speakText } from '../utils/speechSynthesis'

interface SentenceCardProps {
  sentence: Sentence
  language: Language
}

export function SentenceCard({ sentence, language }: SentenceCardProps) {
  return (
    <section className="sentence-card" aria-label="練習句子">
      <p className="sentence-label">{getCategoryLabel(sentence.category)}</p>
      <p className="sentence-target">{sentence.targetText}</p>
      {sentence.helperText ? <p className="sentence-helper">{sentence.helperText}</p> : null}
      {sentence.pronunciation !== sentence.targetText ? (
        <p className="sentence-pronunciation">{sentence.pronunciation}</p>
      ) : null}
      <p className="sentence-chinese">{sentence.meaningZh}</p>
      <p className="sentence-usage">使用時機：{sentence.usageNoteZh}</p>

      <button
        type="button"
        className="listen-button"
        onClick={() => speakText(sentence.targetText, language)}
        aria-label="先聽一次練習句"
      >
        🔊 先聽一次
      </button>
    </section>
  )
}
