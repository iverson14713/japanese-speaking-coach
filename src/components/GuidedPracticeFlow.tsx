import type { Sentence } from '../data/sentences'
import type { Language } from '../data/types'
import { speakText } from '../utils/speechSynthesis'
import { PhrasePractice } from './PhrasePractice'
import { RecordButton, type RecordState } from './RecordButton'

interface GuidedPracticeFlowProps {
  sentence: Sentence
  language: Language
  recordState: RecordState
  transcript: string
  isCorrect: boolean
  isSupported: boolean
  errorMessage: string | null
  onPressStart: () => void
  onPressEnd: () => void
}

export function GuidedPracticeFlow({
  sentence,
  language,
  recordState,
  transcript,
  isCorrect,
  isSupported,
  errorMessage,
  onPressStart,
  onPressEnd,
}: GuidedPracticeFlowProps) {
  return (
    <section className="guided-practice" aria-label="今日練習流程">
      <div className="guided-practice__intro">
        <h2 className="guided-practice__title">練習流程</h2>
        <p className="guided-practice__subtitle">跟著三步驟，慢慢開口</p>
      </div>

      <ol className="guided-practice__steps">
        <li className="practice-step">
          <div className="practice-step__header">
            <span className="practice-step__num" aria-hidden="true">
              1
            </span>
            <div className="practice-step__heading">
              <h3 className="practice-step__title">先聽一次</h3>
              <p className="practice-step__hint">熟悉語調與節奏，不用急著開口</p>
            </div>
          </div>
          <button
            type="button"
            className="practice-step__listen-btn"
            onClick={() => speakText(sentence, language)}
            aria-label="先聽一次練習句"
          >
            <span className="practice-step__listen-icon" aria-hidden="true">
              🔊
            </span>
            播放今日句子
          </button>
        </li>

        <li className="practice-step">
          <div className="practice-step__header">
            <span className="practice-step__num" aria-hidden="true">
              2
            </span>
            <div className="practice-step__heading">
              <h3 className="practice-step__title">分段跟讀</h3>
              <p className="practice-step__hint">拆成小段，一段一段跟著念</p>
            </div>
          </div>
          <PhrasePractice chunks={sentence.phraseChunks} language={language} variant="guided" />
        </li>

        <li className="practice-step practice-step--last">
          <div className="practice-step__header">
            <span className="practice-step__num" aria-hidden="true">
              3
            </span>
            <div className="practice-step__heading">
              <h3 className="practice-step__title">整句跟讀</h3>
              <p className="practice-step__hint">按住麥克風，試著說出完整句子</p>
            </div>
          </div>
          <RecordButton
            variant="guided"
            state={recordState}
            transcript={transcript}
            isCorrect={isCorrect}
            isSupported={isSupported}
            errorMessage={errorMessage}
            onPressStart={onPressStart}
            onPressEnd={onPressEnd}
          />
        </li>
      </ol>
    </section>
  )
}
