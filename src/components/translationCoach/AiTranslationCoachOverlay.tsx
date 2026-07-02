import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Language } from '../../data/types'
import { LANGUAGE_LABELS, SPEECH_LANG } from '../../data/types'
import {
  DEFAULT_TRANSLATION_SCENARIO,
  QUESTIONS_PER_ROUND,
  TRANSLATION_SCENARIOS,
  pickRoundQuestions,
  type TranslationChallengeQuestion,
  type TranslationScenarioId,
} from '../../data/translationChallenge'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import { generateTranslationCoachReport } from '../../services/ai/coachService'
import type { TranslationCoachReport, TranslationCoachReportItem } from '../../services/ai/types'
import { speakText, stopSpeaking } from '../../utils/speechSynthesis'
import { LanguageSelector } from '../LanguageSelector'
import { FavoriteButton } from '../FavoriteButton'
import { buildFavoriteFromChallengeQuestion } from '../../utils/favoriteSentenceBuilders'

type CoachStatus =
  | 'setup'
  | 'micStarting'
  | 'listening'
  | 'processing'
  | 'perQuestionResult'
  | 'aiLoading'
  | 'aiReport'
  | 'error'

const ANSWER_MAX_SECONDS = 12

interface AnswerRecord {
  questionId: string
  chinese: string
  standardAnswer: string
  romanization?: string
  userAnswer: string
  skipped: boolean
}

interface AiTranslationCoachOverlayProps {
  open: boolean
  initialLanguage: Language
  onClose: () => void
}

export function AiTranslationCoachOverlay({
  open,
  initialLanguage,
  onClose,
}: AiTranslationCoachOverlayProps) {
  const [language, setLanguage] = useState(initialLanguage)
  const [scenario, setScenario] = useState<TranslationScenarioId>(DEFAULT_TRANSLATION_SCENARIO)
  const [status, setStatus] = useState<CoachStatus>('setup')
  const [questions, setQuestions] = useState<TranslationChallengeQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(ANSWER_MAX_SECONDS)
  const [interimDisplay, setInterimDisplay] = useState('')
  const [finalTranscript, setFinalTranscript] = useState('')
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [report, setReport] = useState<TranslationCoachReport | null>(null)

  const statusRef = useRef(status)
  statusRef.current = status

  const sessionRef = useRef(0)
  const questionSessionRef = useRef(0)
  const micStartedRef = useRef(false)
  const hasStartedListeningRef = useRef(false)
  const finishCalledRef = useRef(false)
  const latestTranscriptRef = useRef('')
  const stopListeningRef = useRef<() => void>(() => undefined)

  const currentQuestion = questions[questionIndex]

  useBodyScrollLock(open)

  useEffect(() => {
    if (open) {
      setLanguage(initialLanguage)
    }
  }, [open, initialLanguage])

  const handleRecognitionError = useCallback((message: string) => {
    setSpeechError(message)
    setFinalTranscript('')
    latestTranscriptRef.current = ''
    if (statusRef.current === 'listening' || statusRef.current === 'micStarting') {
      stopListeningRef.current()
      setStatus('error')
    }
  }, [])

  const { isSupported, isListening, interimTranscript, startListening, stopListening } =
    useSpeechRecognition({
      lang: SPEECH_LANG[language],
      onResult: (text) => {
        latestTranscriptRef.current = text
        setFinalTranscript(text)
        setSpeechError(null)
      },
      onError: handleRecognitionError,
    })

  stopListeningRef.current = stopListening

  useEffect(() => {
    setInterimDisplay(interimTranscript)
  }, [interimTranscript])

  const resetAll = useCallback(() => {
    sessionRef.current += 1
    questionSessionRef.current += 1
    micStartedRef.current = false
    hasStartedListeningRef.current = false
    finishCalledRef.current = false
    latestTranscriptRef.current = ''

    stopListeningRef.current()
    stopSpeaking()

    setStatus('setup')
    setQuestions([])
    setQuestionIndex(0)
    setSecondsLeft(ANSWER_MAX_SECONDS)
    setInterimDisplay('')
    setFinalTranscript('')
    setSpeechError(null)
    setAnswers([])
    setReport(null)
  }, [])

  useEffect(() => {
    if (!open) {
      resetAll()
    }
  }, [open, resetAll])

  const beginQuestion = useCallback(() => {
    questionSessionRef.current += 1
    micStartedRef.current = false
    hasStartedListeningRef.current = false
    finishCalledRef.current = false
    latestTranscriptRef.current = ''
    setSecondsLeft(ANSWER_MAX_SECONDS)
    setInterimDisplay('')
    setFinalTranscript('')
    setSpeechError(null)
    stopSpeaking()
    setStatus('micStarting')
  }, [])

  const startRound = () => {
    const picked = pickRoundQuestions(language, scenario, QUESTIONS_PER_ROUND)
    if (picked.length === 0) {
      return
    }
    setQuestions(picked)
    setQuestionIndex(0)
    setAnswers([])
    setReport(null)
    beginQuestion()
  }

  useEffect(() => {
    if (status !== 'micStarting' || !currentQuestion) {
      return
    }

    if (micStartedRef.current) {
      return
    }
    micStartedRef.current = true

    const runSession = questionSessionRef.current
    void (async () => {
      try {
        await startListening()
      } catch {
        if (questionSessionRef.current !== runSession) {
          return
        }
        setSpeechError('麥克風啟動失敗，請再試一次。')
        setStatus('error')
      }
    })()
  }, [status, currentQuestion, startListening])

  useEffect(() => {
    if (status !== 'micStarting') {
      return
    }
    if (isListening) {
      hasStartedListeningRef.current = true
      setStatus('listening')
    }
  }, [status, isListening])

  useEffect(() => {
    if (status !== 'listening') {
      return
    }

    const runSession = questionSessionRef.current
    const timer = window.setTimeout(() => {
      if (questionSessionRef.current !== runSession) {
        return
      }
      setSecondsLeft((current) => {
        if (current <= 1) {
          stopListeningRef.current()
          setStatus('processing')
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [status, secondsLeft])

  const stopAndProcess = useCallback(
    (reason: 'manual' | 'timeout' | 'skip') => {
      if (!currentQuestion) {
        return
      }
      if (finishCalledRef.current) {
        return
      }
      finishCalledRef.current = true

      if (reason === 'skip') {
        stopListeningRef.current()
        setStatus('processing')
        setFinalTranscript('')
        latestTranscriptRef.current = ''
        return
      }

      stopListeningRef.current()
      setStatus('processing')
    },
    [currentQuestion],
  )

  useEffect(() => {
    if (status !== 'processing') {
      return
    }
    if (isListening) {
      return
    }
    if (!currentQuestion) {
      return
    }
    if (!hasStartedListeningRef.current && finishCalledRef.current) {
      // mic never started; treat as error
      setSpeechError('麥克風尚未啟動完成，請再試一次。')
      setStatus('error')
      return
    }

    const runSession = questionSessionRef.current
    const timer = window.setTimeout(() => {
      if (questionSessionRef.current !== runSession) {
        return
      }
      const userAnswer = (latestTranscriptRef.current || finalTranscript || interimTranscript).trim()
      const record: AnswerRecord = {
        questionId: currentQuestion.id,
        chinese: currentQuestion.chinese,
        standardAnswer: currentQuestion.answer,
        romanization: currentQuestion.romanization ?? undefined,
        userAnswer,
        skipped: false,
      }
      setAnswers((current) => [...current, record])
      setStatus('perQuestionResult')
    }, 500)

    return () => window.clearTimeout(timer)
  }, [status, isListening, currentQuestion, finalTranscript, interimTranscript])

  const handleSkip = () => {
    if (!currentQuestion) {
      return
    }
    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      chinese: currentQuestion.chinese,
      standardAnswer: currentQuestion.answer,
      romanization: currentQuestion.romanization ?? undefined,
      userAnswer: '',
      skipped: true,
    }
    setAnswers((current) => [...current, record])
    stopListeningRef.current()
    setStatus('perQuestionResult')
  }

  const goNext = async () => {
    stopSpeaking()

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((current) => current + 1)
      beginQuestion()
      return
    }

    // Round finished (5 questions) → call AI once
    setStatus('aiLoading')
    try {
      const scenarioLabel = TRANSLATION_SCENARIOS.find((item) => item.id === scenario)?.label ?? '旅行情境'
      const items: TranslationCoachReportItem[] = answers.map((item) => ({
        chinese: item.chinese,
        userAnswer: item.userAnswer,
        standardAnswer: item.standardAnswer,
      }))
      const result = await generateTranslationCoachReport({
        language,
        scenarioLabel,
        items,
      })
      setReport(result)
      setStatus('aiReport')
    } catch (error) {
      setSpeechError(error instanceof Error ? error.message : 'AI 產生報告失敗，請再試一次。')
      setStatus('error')
    }
  }

  const averageAnsweredRatio = useMemo(() => {
    if (answers.length === 0) return 0
    const spoken = answers.filter((item) => !item.skipped && item.userAnswer.trim()).length
    return Math.round((spoken / answers.length) * 100)
  }, [answers])

  if (!open) {
    return null
  }

  return (
    <div className="translation-challenge-overlay translation-coach-overlay" role="presentation">
      <div className="translation-challenge-overlay__panel" role="dialog" aria-modal="true">
        <header className="translation-challenge-overlay__header">
          <button
            type="button"
            className="translation-challenge-overlay__close"
            onClick={() => {
              stopSpeaking()
              stopListeningRef.current()
              onClose()
            }}
            aria-label="關閉"
          >
            ×
          </button>
          <h2 className="translation-challenge-overlay__title">AI 翻譯教練</h2>
          <p className="translation-challenge-overlay__subtitle">
            中翻外語，一輪 5 題深度練習
          </p>
        </header>

        <div className="translation-challenge-overlay__body">
          {status === 'setup' ? (
            <section className="translation-challenge-setup translation-coach-setup">
              <LanguageSelector selected={language} onSelect={setLanguage} variant="coach" />

              <div className="translation-challenge-setup__scenarios">
                <p className="translation-challenge-setup__label">選擇情境</p>
                <div className="translation-challenge-scenario-grid">
                  {TRANSLATION_SCENARIOS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`translation-challenge-scenario${scenario === item.id ? ' translation-challenge-scenario--active' : ''}`}
                      onClick={() => setScenario(item.id)}
                    >
                      <span className="translation-challenge-scenario__label">{item.label}</span>
                      <span className="translation-challenge-scenario__desc">{item.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="translation-challenge-setup__hint">
                每輪 5 題 · 每題最多 {ANSWER_MAX_SECONDS} 秒 · 你可以慢慢說，AI 會在結束後幫你整理
              </p>

              {!isSupported ? (
                <p className="translation-challenge-setup__warning" role="alert">
                  目前裝置不支援語音輸入，請先使用播放練習。
                </p>
              ) : null}

              <button
                type="button"
                className="translation-challenge-primary"
                onClick={startRound}
                disabled={!isSupported}
              >
                開始練習
              </button>
            </section>
          ) : null}

          {(status === 'micStarting' || status === 'listening') && currentQuestion ? (
            <section className="translation-coach-play" aria-live="polite">
              <p className="translation-challenge-play__meta">
                第 {questionIndex + 1} / {questions.length} 題
              </p>
              <p className="translation-challenge-play__prompt-label">中文題目</p>
              <p className="translation-challenge-play__chinese">{currentQuestion.chinese}</p>

              <p className="translation-coach-play__hint">慢慢說，AI 會在結束後幫你整理</p>

              <div className="translation-coach-timer">
                <span className="translation-coach-timer__label">剩餘</span>
                <span className="translation-coach-timer__value">{secondsLeft}s</span>
              </div>

              <div className="translation-challenge-recording">
                <span className="pulse-dot" aria-hidden="true" />
                <span className="translation-challenge-recording__label">
                  {status === 'micStarting' ? '正在啟動麥克風…' : '正在聽你說…'}
                </span>
              </div>

              {interimDisplay ? (
                <p className="translation-challenge-recording__transcript">{interimDisplay}</p>
              ) : (
                <p className="translation-challenge-recording__hint">不用急，講完整句子也可以</p>
              )}

              <div className="translation-coach-actions">
                <button
                  type="button"
                  className="translation-challenge-secondary"
                  onClick={() => stopAndProcess('manual')}
                  disabled={status !== 'listening'}
                >
                  我說完了
                </button>
                <button
                  type="button"
                  className="translation-challenge-secondary"
                  onClick={handleSkip}
                  disabled={status !== 'listening' && status !== 'micStarting'}
                >
                  跳過
                </button>
              </div>
            </section>
          ) : null}

          {status === 'processing' ? (
            <section className="translation-coach-play" aria-live="polite">
              <p className="translation-coach-play__hint">正在整理你的回答…</p>
              <div className="translation-challenge-recording">
                <span className="pulse-dot" aria-hidden="true" />
                <span className="translation-challenge-recording__label">處理中</span>
              </div>
            </section>
          ) : null}

          {status === 'perQuestionResult' && currentQuestion ? (
            <section className="translation-challenge-result translation-coach-result">
              <p className="translation-challenge-result__label">中文題目</p>
              <p className="translation-challenge-result__chinese">{currentQuestion.chinese}</p>

              <p className="translation-challenge-result__label">你的回答</p>
              <p className="translation-challenge-result__heard">
                {answers[answers.length - 1]?.userAnswer?.trim()
                  ? answers[answers.length - 1].userAnswer
                  : answers[answers.length - 1]?.skipped
                    ? '（已跳過）'
                    : '（沒有辨識到內容）'}
              </p>

              <div className="translation-challenge-result__answer-row">
                <p className="translation-challenge-result__label">標準答案</p>
                <FavoriteButton
                  favorite={buildFavoriteFromChallengeQuestion(currentQuestion)}
                  className="favorite-button--challenge-result"
                />
              </div>
              <p className="translation-challenge-result__answer">{currentQuestion.answer}</p>
              {currentQuestion.romanization ? (
                <p className="translation-challenge-result__romanization">{currentQuestion.romanization}</p>
              ) : null}

              <button
                type="button"
                className="translation-challenge-listen"
                onClick={() => speakText(currentQuestion.answer, language)}
              >
                🔊 播放標準答案
              </button>

              <div className="translation-challenge-result__actions">
                <button type="button" className="translation-challenge-primary" onClick={() => void goNext()}>
                  {questionIndex + 1 >= questions.length ? '完成並產生報告' : '下一題'}
                </button>
              </div>
            </section>
          ) : null}

          {status === 'aiLoading' ? (
            <section className="translation-coach-report" aria-live="polite">
              <p className="translation-coach-report__title">本輪 AI 翻譯教練報告</p>
              <p className="translation-coach-report__hint">AI 正在整理你的常見錯誤與更自然說法…</p>
            </section>
          ) : null}

          {status === 'aiReport' && report ? (
            <section className="translation-coach-report">
              <p className="translation-coach-report__title">本輪 AI 翻譯教練報告</p>
              <p className="translation-coach-report__overall">{report.overall}</p>

              <div className="translation-challenge-result__card">
                <p className="translation-challenge-result__label">平均表現</p>
                <p className="translation-challenge-result__heard">{report.averagePerformance}</p>

                <p className="translation-challenge-result__label">你最常錯的地方</p>
                <ul className="translation-coach-report__list">
                  {report.commonIssues.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="translation-challenge-result__label">3 句更自然說法</p>
                <ul className="translation-coach-report__list">
                  {report.moreNaturalPhrases.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="translation-challenge-result__label">建議複習句</p>
                <p className="translation-challenge-result__heard">{report.reviewSuggestion}</p>

                <p className="translation-challenge-result__label">鼓勵一句</p>
                <p className="translation-challenge-result__heard">{report.encouragement}</p>

                <p className="translation-coach-report__mini">
                  本輪有效作答率：{averageAnsweredRatio}% · 目標語言：{LANGUAGE_LABELS[language]}
                </p>
              </div>

              <div className="translation-challenge-result__actions">
                <button type="button" className="translation-challenge-secondary" onClick={resetAll}>
                  再練一輪
                </button>
                <button
                  type="button"
                  className="translation-challenge-primary"
                  onClick={() => {
                    stopSpeaking()
                    stopListeningRef.current()
                    onClose()
                  }}
                >
                  完成
                </button>
              </div>
            </section>
          ) : null}

          {status === 'error' ? (
            <section className="translation-challenge-setup">
              <p className="translation-challenge-setup__warning" role="alert">
                {speechError ?? '發生錯誤，請再試一次。'}
              </p>
              <div className="translation-challenge-result__actions">
                <button type="button" className="translation-challenge-secondary" onClick={resetAll}>
                  返回設定
                </button>
                <button
                  type="button"
                  className="translation-challenge-primary"
                  onClick={() => {
                    if (!isSupported) {
                      return
                    }
                    if (questions.length === 0) {
                      startRound()
                    } else {
                      beginQuestion()
                    }
                  }}
                >
                  再試一次
                </button>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  )
}

