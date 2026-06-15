import type { PhraseChunk } from '../data/sentences'
import { StepHeader } from './StepHeader'
import { SpeakButton } from './SpeakButton'

interface PhrasePracticeProps {
  chunks: PhraseChunk[]
}

export function PhrasePractice({ chunks }: PhrasePracticeProps) {
  return (
    <section className="phrase-practice" aria-label="拆音練習">
      <StepHeader step="②" title="分段跟讀" />
      <p className="section-hint">點喇叭聽每一段，再慢慢跟著念</p>
      <ul className="phrase-list">
        {chunks.map((chunk) => (
          <li key={chunk.japanese} className="phrase-item">
            <div className="phrase-content">
              <p className="phrase-japanese">{chunk.japanese}</p>
              <p className="phrase-romaji">{chunk.romaji}</p>
              <p className="phrase-chinese">{chunk.chinese}</p>
            </div>
            <SpeakButton text={chunk.japanese} label={`播放 ${chunk.japanese}`} />
          </li>
        ))}
      </ul>
    </section>
  )
}
