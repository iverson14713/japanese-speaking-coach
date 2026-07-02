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
import { scoreTranslationChallenge } from '../../utils/translationChallengeScore'
import { speakText, stopSpeaking } from '../../utils/speechSynthesis'
import { showToast } from '../../utils/toast'
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
  const hasAutoPlayedAnswerRef = useRef(false)
  const autoPlayTimeoutRef = useRef<number | null>(null)

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
    if (autoPlayTimeoutRef.current !== null) {
      window.clearTimeout(autoPlayTimeoutRef.current)
      autoPlayTimeoutRef.current = null
    }
    hasAutoPlayedAnswerRef.current = false
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
    if (autoPlayTimeoutRef.current !== null) {
      window.clearTimeout(autoPlayTimeoutRef.current)
      autoPlayTimeoutRef.current = null
    }
    hasAutoPlayedAnswerRef.current = false
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
    if (autoPlayTimeoutRef.current !== null) {
      window.clearTimeout(autoPlayTimeoutRef.current)
      autoPlayTimeoutRef.current = null
    }
    hasAutoPlayedAnswerRef.current = false
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

  const scenarioLabel = useMemo(
    () => TRANSLATION_SCENARIOS.find((item) => item.id === scenario)?.label ?? '旅行情境',
    [scenario],
  )

  const progressPercent = useMemo(() => {
    if (questions.length === 0) return 0
    const current = Math.min(questionIndex + 1, questions.length)
    return Math.round((current / questions.length) * 100)
  }, [questionIndex, questions.length])

  const lastAnswer = answers.length > 0 ? answers[answers.length - 1] : null
  const perQuestionFeedback = useMemo(() => {
    if (!currentQuestion || !lastAnswer) {
      return null
    }
    if (lastAnswer.skipped) {
      return '這題先跳過也沒關係，下一題再試一次。'
    }
    const score = scoreTranslationChallenge(lastAnswer.userAnswer, currentQuestion)
    return score.feedback
  }, [currentQuestion, lastAnswer])

  useEffect(() => {
    if (status !== 'perQuestionResult' || !currentQuestion?.answer) {
      return
    }

    if (hasAutoPlayedAnswerRef.current) {
      return
    }
    hasAutoPlayedAnswerRef.current = true

    if (autoPlayTimeoutRef.current !== null) {
      window.clearTimeout(autoPlayTimeoutRef.current)
      autoPlayTimeoutRef.current = null
    }

    const answer = currentQuestion.answer
    const lang = language
    autoPlayTimeoutRef.current = window.setTimeout(() => {
      autoPlayTimeoutRef.current = null
      speakText(answer, lang)
    }, 420)

    return () => {
      if (autoPlayTimeoutRef.current !== null) {
        window.clearTimeout(autoPlayTimeoutRef.current)
        autoPlayTimeoutRef.current = null
      }
    }
  }, [status, currentQuestion, language])

  const shareReport = async () => {
    if (!report) {
      return
    }
    const lines = [
      'AI 翻譯教練｜本輪練習報告',
      report.overall,
      '',
      `有效作答率：${averageAnsweredRatio}%（5 題）`,
      `目標語言：${LANGUAGE_LABELS[language]}`,
      '',
      '3 句更自然說法：',
      ...report.moreNaturalPhrases.map((item) => `- ${item}`),
      '',
      `鼓勵一句：${report.encouragement}`,
      '',
      'Japanese Speaking Coach',
    ]
    const text = lines.join('\n')

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI 翻譯教練｜本輪練習報告',
          text,
        })
        return
      }
    } catch {
      // fall through to clipboard
    }

    try {
      await navigator.clipboard.writeText(text)
      showToast('已複製報告文字，可直接貼上分享')
    } catch {
      showToast('分享失敗，請手動截圖分享')
    }
  }

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
              <div className="translation-coach-progress">
                <div className="translation-coach-progress__row">
                  <span className="translation-coach-progress__label">
                    第 {questionIndex + 1} / {questions.length} 題
                  </span>
                  <span className="translation-coach-progress__pill">{scenarioLabel}</span>
                </div>
                <div className="translation-coach-progress__bar" aria-hidden="true">
                  <span
                    className="translation-coach-progress__bar-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="translation-coach-question-card">
                <p className="translation-coach-question-card__label">中文題目</p>
                <p className="translation-coach-question-card__chinese">{currentQuestion.chinese}</p>
              </div>

              <div className="translation-coach-recorder-card">
                <div className="translation-coach-recorder-card__top">
                  <div className="translation-coach-timer-pill" aria-hidden="true">
                    <span className="translation-coach-timer-pill__ring" />
                    <span className="translation-coach-timer-pill__text">{secondsLeft}s</span>
                  </div>
                  <div className="translation-coach-recorder-card__status">
                    <span className="translation-coach-dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="translation-coach-recorder-card__label">
                      {status === 'micStarting' ? '正在啟動麥克風…' : '正在聽你說…'}
                    </span>
                  </div>
                </div>

                <p className="translation-coach-recorder-card__hint">慢慢說，AI 會在結束後幫你整理</p>

                {interimDisplay ? (
                  <p className="translation-challenge-recording__transcript translation-coach-transcript">
                    {interimDisplay}
                  </p>
                ) : (
                  <p className="translation-challenge-recording__hint translation-coach-transcript">
                    不用急，講完整句子也可以
                  </p>
                )}
              </div>

              <div className="translation-coach-actions">
                <button
                  type="button"
                  className="translation-challenge-primary"
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
            <section className="translation-coach-result" aria-live="polite">
              <div className="translation-coach-progress">
                <div className="translation-coach-progress__row">
                  <span className="translation-coach-progress__label">
                    第 {questionIndex + 1} / {questions.length} 題
                  </span>
                  <span className="translation-coach-progress__pill">{scenarioLabel}</span>
                </div>
                <div className="translation-coach-progress__bar" aria-hidden="true">
                  <span
                    className="translation-coach-progress__bar-fill"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="translation-coach-result-card">
                <p className="translation-coach-result-card__label">中文題目</p>
                <p className="translation-coach-result-card__chinese">{currentQuestion.chinese}</p>

                <p className="translation-coach-result-card__label">你的回答</p>
                <p className="translation-coach-result-card__user">
                  {answers[answers.length - 1]?.userAnswer?.trim()
                    ? answers[answers.length - 1].userAnswer
                    : answers[answers.length - 1]?.skipped
                      ? '（已跳過）'
                      : '（沒有辨識到內容）'}
                </p>

                <div className="translation-coach-result-card__answer-header">
                  <p className="translation-coach-result-card__label">標準答案</p>
                  <FavoriteButton
                    favorite={buildFavoriteFromChallengeQuestion(currentQuestion)}
                    className="favorite-button--challenge-result"
                  />
                </div>
                <p className="translation-coach-result-card__answer">{currentQuestion.answer}</p>
                {currentQuestion.romanization ? (
                  <p className="translation-challenge-result__romanization">{currentQuestion.romanization}</p>
                ) : null}

                {perQuestionFeedback ? (
                  <p className="translation-coach-result-card__feedback">{perQuestionFeedback}</p>
                ) : null}

                <button
                  type="button"
                  className="translation-challenge-listen"
                  onClick={() => speakText(currentQuestion.answer, language)}
                >
                  🔊 再聽一次
                </button>
              </div>

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
              <div className="translation-coach-report__header">
                <p className="translation-coach-report__title">本輪 AI 翻譯教練報告</p>
                <p className="translation-coach-report__summary">{report.overall}</p>
              </div>

              <div className="translation-coach-report__grid">
                <div className="translation-coach-report-card">
                  <p className="translation-coach-report-card__title">成績摘要</p>
                  <div className="translation-coach-report-metrics">
                    <div>
                      <p className="translation-coach-report-metrics__label">有效作答率</p>
                      <p className="translation-coach-report-metrics__value">{averageAnsweredRatio}%</p>
                    </div>
                    <div>
                      <p className="translation-coach-report-metrics__label">完成題數</p>
                      <p className="translation-coach-report-metrics__value">5 / 5</p>
                    </div>
                    <div>
                      <p className="translation-coach-report-metrics__label">目標語言</p>
                      <p className="translation-coach-report-metrics__value">{LANGUAGE_LABELS[language]}</p>
                    </div>
                  </div>
                </div>

                <div className="translation-coach-report-card">
                  <p className="translation-coach-report-card__title">你的常見問題</p>
                  <ul className="translation-coach-report__list">
                    {report.commonIssues.slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="translation-coach-report-card">
                  <p className="translation-coach-report-card__title">3 句更自然說法</p>
                  <ul className="translation-coach-report__phrases">
                    {report.moreNaturalPhrases.slice(0, 3).map((item) => (
                      <li key={item} className="translation-coach-report__phrase">
                        <span className="translation-coach-report__phrase-text">{item}</span>
                        <button
                          type="button"
                          className="translation-coach-report__phrase-play"
                          onClick={() => speakText(item, language)}
                          aria-label="播放句子"
                        >
                          🔊
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="translation-coach-report-card">
                  <p className="translation-coach-report-card__title">建議複習</p>
                  <p className="translation-coach-report-card__text">{report.reviewSuggestion}</p>
                </div>

                <div className="translation-coach-report-encourage">
                  <p className="translation-coach-report-encourage__label">鼓勵一句</p>
                  <p className="translation-coach-report-encourage__text">{report.encouragement}</p>
                </div>

                <div className="translation-coach-share-card" aria-label="可分享成績卡">
                  <p className="translation-coach-share-card__brand">Japanese Speaking Coach</p>
                  <p className="translation-coach-share-card__title">AI 翻譯教練</p>
                  <p className="translation-coach-share-card__summary">{report.averagePerformance}</p>
                  <div className="translation-coach-share-card__meta">
                    <span>有效作答率 {averageAnsweredRatio}%</span>
                    <span>·</span>
                    <span>{LANGUAGE_LABELS[language]}</span>
                  </div>
                  <div className="translation-coach-share-card__phrases">
                    {report.moreNaturalPhrases.slice(0, 3).map((item) => (
                      <div key={item} className="translation-coach-share-card__phrase">
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="translation-coach-share-card__encourage">{report.encouragement}</p>
                </div>
              </div>

              <div className="translation-coach-report__share-actions">
                <button type="button" className="translation-challenge-primary" onClick={() => void shareReport()}>
                  分享結果
                </button>
                <button
                  type="button"
                  className="translation-challenge-secondary"
                  onClick={() => showToast('你可以直接截圖上方成績卡分享')}
                >
                  儲存成績卡
                </button>
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

