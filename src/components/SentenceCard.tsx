import type { Sentence } from '../data/sentences'
import { getCategoryLabel } from '../data/categories'
import { speakJapanese } from '../utils/speechSynthesis'
import { StepHeader } from './StepHeader'

interface SentenceCardProps {
  sentence: Sentence
}

export function SentenceCard({ sentence }: SentenceCardProps) {
  return (
    <section className="sentence-card" aria-label="練習句子">
      <p className="sentence-label">{getCategoryLabel(sentence.category)}</p>
      <p className="sentence-japanese">{sentence.japanese}</p>
      <p className="sentence-kana">{sentence.kana}</p>
      <p className="sentence-romaji">{sentence.romaji}</p>
      <p className="sentence-chinese">{sentence.meaningZh}</p>

      <div className="usage-note">
        <p className="usage-note-label">使用時機</p>
        <p className="usage-note-text">{sentence.usageNoteZh}</p>
      </div>

      <div className="listen-section">
        <StepHeader step="①" title="先聽一次" />
        <button
          type="button"
          className="listen-button"
          onClick={() => speakJapanese(sentence.japanese)}
          aria-label="先聽一次日文句子"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          先聽一次
        </button>
      </div>
    </section>
  )
}
