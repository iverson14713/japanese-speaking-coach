import type { PhraseChunk } from '../data/sentences'
import type { Language } from '../data/types'
import { StepHeader } from './StepHeader'
import { SpeakButton } from './SpeakButton'

interface PhrasePracticeProps {
  chunks: PhraseChunk[]
  language: Language
}

export function PhrasePractice({ chunks, language }: PhrasePracticeProps) {
  return (
    <section className="phrase-practice" aria-label="拆音練習">
      <StepHeader step="②" title="分段跟讀" />
      <p className="section-hint">點喇叭聽每一段，再慢慢跟著念</p>
      <ul className="phrase-list">
        {chunks.map((chunk) => (
          <li key={chunk.text} className="phrase-item">
            <div className="phrase-content">
              <p className="phrase-text">{chunk.text}</p>
              {chunk.pronunciation !== chunk.text ? (
                <p className="phrase-pronunciation">{chunk.pronunciation}</p>
              ) : null}
              <p className="phrase-chinese">{chunk.chinese}</p>
            </div>
            <SpeakButton text={chunk.text} language={language} label={`播放 ${chunk.text}`} />
          </li>
        ))}
      </ul>
    </section>
  )
}
