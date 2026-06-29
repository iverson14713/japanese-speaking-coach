import type { Sentence } from '../data/sentences'
import type { Language } from '../data/types'
import { getPracticePhraseChunks } from '../utils/phraseChunkResolver'
import { getChunkDisplayPronunciation } from '../utils/sentenceDisplay'
import { SpeakButton } from './SpeakButton'

interface PhrasePracticeProps {
  sentence: Sentence
  language: Language
  variant?: 'default' | 'guided'
}

export function PhrasePractice({ sentence, language, variant = 'default' }: PhrasePracticeProps) {
  const chunks = getPracticePhraseChunks(sentence)

  return (
    <section
      className={`phrase-practice${variant === 'guided' ? ' phrase-practice--guided' : ''}`}
      aria-label="分段練習"
    >
      {variant === 'default' ? <h2 className="section-label">分段練習</h2> : null}
      <ul className="phrase-list">
        {chunks.map((chunk, index) => (
          <li key={`${chunk.text}-${index}`} className="phrase-row">
            {variant === 'guided' ? (
              <span className="phrase-row-step" aria-hidden="true">
                {index + 1}
              </span>
            ) : null}
            <div className="phrase-row-content">
              <p className="phrase-row-text">{chunk.text}</p>
              {(() => {
                const chunkPronunciation = getChunkDisplayPronunciation(
                  language,
                  chunk,
                  sentence,
                )
                return chunkPronunciation ? (
                  <p className="phrase-row-pronunciation">{chunkPronunciation}</p>
                ) : null
              })()}
              <p className="phrase-row-meaning">{chunk.chinese}</p>
            </div>
            <SpeakButton
              text={chunk.text}
              language={language}
              size="small"
              label={`播放第 ${index + 1} 段：${chunk.text}`}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
