import type { PhraseChunk } from '../data/sentences'
import type { Language } from '../data/types'
import { SpeakButton } from './SpeakButton'

interface PhrasePracticeProps {
  chunks: PhraseChunk[]
  language: Language
}

export function PhrasePractice({ chunks, language }: PhrasePracticeProps) {
  return (
    <section className="phrase-practice" aria-label="分段練習">
      <h2 className="section-label">分段練習</h2>
      <ul className="phrase-list">
        {chunks.map((chunk) => (
          <li key={chunk.text} className="phrase-row">
            <div className="phrase-row-content">
              <p className="phrase-row-text">{chunk.text}</p>
              <p className="phrase-row-meaning">{chunk.chinese}</p>
            </div>
            <SpeakButton
              text={chunk.text}
              language={language}
              size="small"
              label={`播放 ${chunk.text}`}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
