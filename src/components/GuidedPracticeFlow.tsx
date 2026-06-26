import { useEffect, useState } from 'react'
import type { Sentence } from '../data/sentences'
import type { Language } from '../data/types'
import { speakText } from '../utils/speechSynthesis'
import { PhrasePractice } from './PhrasePractice'
import { RecordButton, type RecordState } from './RecordButton'

type PracticeStepId = 'listen' | 'segments' | 'record'

const PRACTICE_STEPS: { id: PracticeStepId; label: string }[] = [
  { id: 'listen', label: '先聽' },
  { id: 'segments', label: '分段' },
  { id: 'record', label: '跟讀' },
]

interface GuidedPracticeFlowProps {
  sentence: Sentence
  language: Language
  recordState: RecordState
  transcript: string
  isCorrect: boolean
  isSupported: boolean
  errorMessage: string | null
  completedToday: boolean
  streakCount: number
  freezeCards?: number
  onPressStart: () => void
  onPressEnd: () => void
  onCompleteToday: () => void
}

export function GuidedPracticeFlow({
  sentence,
  language,
  recordState,
  transcript,
  isCorrect,
  isSupported,
  errorMessage,
  completedToday,
  streakCount,
  freezeCards = 0,
  onPressStart,
  onPressEnd,
  onCompleteToday,
}: GuidedPracticeFlowProps) {
  const [activeStep, setActiveStep] = useState<PracticeStepId>('listen')
  const isRecordStep = activeStep === 'record'

  useEffect(() => {
    setActiveStep('listen')
  }, [sentence.id, language])

  return (
    <section className="guided-practice" aria-label="今日練習流程">
      <div className="practice-step-tabs" role="tablist" aria-label="練習步驟">
        {PRACTICE_STEPS.map((step, index) => {
          const isActive = activeStep === step.id
          return (
            <button
              key={step.id}
              type="button"
              role="tab"
              id={`practice-tab-${step.id}`}
              aria-selected={isActive}
              aria-controls={`practice-panel-${step.id}`}
              className={`practice-step-tab${isActive ? ' practice-step-tab--active' : ''}`}
              onClick={() => setActiveStep(step.id)}
            >
              <span className="practice-step-tab__num">{index + 1}</span>
              <span className="practice-step-tab__label">{step.label}</span>
            </button>
          )
        })}
      </div>

      <div className="practice-step-panel">
        {activeStep === 'listen' ? (
          <div
            id="practice-panel-listen"
            role="tabpanel"
            aria-labelledby="practice-tab-listen"
            className="practice-step-content"
          >
            <p className="practice-step-content__hint">先熟悉語調，不用急著開口</p>
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
          </div>
        ) : null}

        {activeStep === 'segments' ? (
          <div
            id="practice-panel-segments"
            role="tabpanel"
            aria-labelledby="practice-tab-segments"
            className="practice-step-content"
          >
            <p className="practice-step-content__hint">一段一段跟著念</p>
            <PhrasePractice sentence={sentence} language={language} variant="guided" />
          </div>
        ) : null}

        {activeStep === 'record' ? (
          <div
            id="practice-panel-record"
            role="tabpanel"
            aria-labelledby="practice-tab-record"
            className="practice-step-content"
          >
            <p className="practice-step-content__hint">按住麥克風，試著說出完整句子</p>
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
          </div>
        ) : null}
      </div>

      <div className="guided-practice__footer">
        {completedToday ? (
          <div className="today-complete-done today-complete-done--inline" role="status">
            <span className="today-complete-done__icon" aria-hidden="true">
              ✓
            </span>
            <span className="today-complete-done__copy">
              <strong>今日練習完成</strong>
              連續練習 {streakCount} 天
              {freezeCards > 0 ? ` · 補練卡 x${freezeCards}` : ''}
            </span>
          </div>
        ) : (
          <button
            type="button"
            className={`today-complete-button today-complete-button--inline${isRecordStep ? ' today-complete-button--emphasized' : ' today-complete-button--muted'}`}
            onClick={onCompleteToday}
          >
            完成今日練習
          </button>
        )}
      </div>
    </section>
  )
}
