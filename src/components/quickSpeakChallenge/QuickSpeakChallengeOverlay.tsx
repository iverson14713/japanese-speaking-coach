import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Language } from '../../data/types'
import { LANGUAGE_LABELS, SPEECH_LANG } from '../../data/types'
import {
  DEFAULT_TRANSLATION_SCENARIO,
  EXP_PER_QUESTION,
  QUESTIONS_PER_ROUND,
  TRANSLATION_SCENARIOS,
  pickRoundQuestions,
  type TranslationChallengeQuestion,
  type TranslationChallengeRoundResult,
  type TranslationScenarioId,
} from '../../data/translationChallenge'
import { getQuickSpeakAnswerTimeSeconds } from '../../data/quickSpeakChallenge'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useRecordPracticeCompletion } from '../../hooks/useRecordPracticeCompletion'
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition'
import { scoreTranslationChallenge } from '../../utils/translationChallengeScore'
import { recordTranslationChallengeRound } from '../../utils/translationChallengeStorage'
import { speakText, stopSpeaking } from '../../utils/speechSynthesis'
import { LanguageSelector } from '../LanguageSelector'
import { FavoriteButton } from '../FavoriteButton'
import { buildFavoriteFromChallengeQuestion } from '../../utils/favoriteSentenceBuilders'

type ChallengeStatus = 'idle' | 'listening' | 'processing' | 'result' | 'error' | 'summary'

interface QuickSpeakChallengeOverlayProps {
  open: boolean
  initialLanguage: Language
  onClose: () => void
  onPracticeRecorded?: () => void
}

export function QuickSpeakChallengeOverlay({
  open,
  initialLanguage,
  onClose,
  onPracticeRecorded,
}: QuickSpeakChallengeOverlayProps) {
  const answerTimeSeconds = getQuickSpeakAnswerTimeSeconds('normal')

  const [language, setLanguage] = useState(initialLanguage)
  const [scenario, setScenario] = useState<TranslationScenarioId>(DEFAULT_TRANSLATION_SCENARIO)
  const [status, setStatus] = useState<ChallengeStatus>('idle')
  const [questions, setQuestions] = useState<TranslationChallengeQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [countdown, setCountdown] = useState(answerTimeSeconds)
  const [transcript, setTranscript] = useState('')
  const [speechError, setSpeechError] = useState<string | null>(null)
  const [roundResults, setRoundResults] = useState<TranslationChallengeRoundResult[]>([])
  const [currentResult, setCurrentResult] = useState<TranslationChallengeRoundResult | null>(null)
  const [summaryExp, setSummaryExp] = useState(0)
  const [streakAfterRound, setStreakAfterRound] = useState<number | null>(null)
  const [practiceRecorded, setPracticeRecorded] = useState(false)

  const recordPractice = useRecordPracticeCompletion(language)
  const statusRef = useRef<ChallengeStatus>('idle')
  const countdownRef = useRef(answerTimeSeconds)
  const answerEndedRef = useRef(false)
  const finishCalledRef = useRef(false)
  const questionSessionRef = useRef(0)
  const micStartedRef = useRef(false)
  const latestTranscriptRef = useRef('')
  const currentQuestion = questions[questionIndex]

  useBodyScrollLock(open)

  useEffect(() => {
    statusRef.current = status
  }, [status])

  useEffect(() => {
    if (open) {
      setLanguage(initialLanguage)
    }
  }, [open, initialLanguage])

  const handleRecognitionResult = useCallback((text: string) => {
    latestTranscriptRef.current = text
    setTranscript(text)
    setSpeechError(null)
  }, [])

  const handleRecognitionError = useCallback((message: string) => {
    latestTranscriptRef.current = ''
    setTranscript('')
    setSpeechError(message)

    if (statusRef.current === 'listening' && !answerEndedRef.current) {
      stopListeningRef.current()
      setStatus('error')
    }
  }, [])

  const {
    isSupported,
    isListening,
    interimTranscript,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    lang: SPEECH_LANG[language],
    onResult: handleRecognitionResult,
    onError: handleRecognitionError,
  })

  const stopListeningRef = useRef(stopListening)
  stopListeningRef.current = stopListening

  const startListeningRef = useRef(startListening)
  startListeningRef.current = startListening

  const resetQuestionRuntime = useCallback(() => {
    countdownRef.current = answerTimeSeconds
    setCountdown(answerTimeSeconds)
    answerEndedRef.current = false
    finishCalledRef.current = false
    micStartedRef.current = false
    latestTranscriptRef.current = ''
    setTranscript('')
    setSpeechError(null)
    setCurrentResult(null)
  }, [answerTimeSeconds])

  const resetSession = useCallback(() => {
    stopListeningRef.current()
    questionSessionRef.current += 1
    setStatus('idle')
    setQuestions([])
    setQuestionIndex(0)
    countdownRef.current = answerTimeSeconds
    setCountdown(answerTimeSeconds)
    setTranscript('')
    setSpeechError(null)
    setRoundResults([])
    setCurrentResult(null)
    setSummaryExp(0)
    setStreakAfterRound(null)
    setPracticeRecorded(false)
    answerEndedRef.current = false
    finishCalledRef.current = false
    micStartedRef.current = false
    latestTranscriptRef.current = ''
    stopSpeaking()
  }, [answerTimeSeconds])

  const handleClose = useCallback(() => {
    stopListeningRef.current()
    stopSpeaking()
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) {
      resetSession()
    }
  }, [open, resetSession])

  const finishChallenge = useCallback(
    (heardText: string) => {
      if (!currentQuestion || finishCalledRef.current || !answerEndedRef.current) {
        return
      }
      finishCalledRef.current = true

      const scoreResult = scoreTranslationChallenge(heardText, currentQuestion)
      const exp = Math.round((scoreResult.score / 100) * EXP_PER_QUESTION)
      const result: TranslationChallengeRoundResult = {
        questionId: currentQuestion.id,
        transcript: heardText,
        score: scoreResult.score,
        feedback: scoreResult.feedback,
        exp,
      }

      setCurrentResult(result)
      setRoundResults((current) => [...current, result])
      setStatus('result')
    },
    [currentQuestion],
  )

  const beginQuestion = useCallback(() => {
    questionSessionRef.current += 1
    resetQuestionRuntime()
    stopSpeaking()
    setStatus('listening')
  }, [resetQuestionRuntime])

  useEffect(() => {
    if (status !== 'listening' || !currentQuestion) {
      return
    }

    if (micStartedRef.current) {
      return
    }
    micStartedRef.current = true

    void startListeningRef.current()
  }, [status, currentQuestion, questionIndex])

  useEffect(() => {
    if (status !== 'listening') {
      return
    }

    const sessionId = questionSessionRef.current

    if (countdownRef.current <= 0) {
      return
    }

    const timer = window.setTimeout(() => {
      if (questionSessionRef.current !== sessionId || statusRef.current !== 'listening') {
        return
      }

      const next = countdownRef.current - 1
      countdownRef.current = next
      setCountdown(next)

      if (next <= 0) {
        answerEndedRef.current = true
        stopListeningRef.current()
        setStatus('processing')
      }
    }, 1000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [status, countdown, currentQuestion, questionIndex])

  useEffect(() => {
    if (status !== 'processing' || isListening) {
      return
    }

    if (!answerEndedRef.current || finishCalledRef.current) {
      return
    }

    const heardText = (latestTranscriptRef.current || transcript || interimTranscript).trim()
    finishChallenge(heardText)
  }, [status, isListening, transcript, interimTranscript, finishChallenge])

  useEffect(() => {
    if (status !== 'result' || !currentQuestion) {
      return
    }

    speakText(currentQuestion.answer, language)
  }, [status, currentQuestion, language])

  const startRound = () => {
    const picked = pickRoundQuestions(language, scenario, QUESTIONS_PER_ROUND)
    if (picked.length === 0) {
      return
    }

    setQuestions(picked)
    setQuestionIndex(0)
    setRoundResults([])
    beginQuestion()
  }

  const beginRetry = () => {
    if (!currentQuestion) {
      return
    }
    setRoundResults((current) => current.slice(0, -1))
    beginQuestion()
  }

  const goToNextQuestion = () => {
    if (questionIndex + 1 >= questions.length) {
      const totalExp = roundResults.reduce((sum, item) => sum + item.exp, 0)
      const stats = recordTranslationChallengeRound(totalExp)
      setSummaryExp(stats.todayExp)

      if (!practiceRecorded) {
        const practiceResult = recordPractice({ silent: true })
        setStreakAfterRound(practiceResult.streak)
        setPracticeRecorded(true)
        onPracticeRecorded?.()
      }

      setStatus('summary')
      return
    }

    setQuestionIndex((current) => current + 1)
    beginQuestion()
  }

  const averageScore = useMemo(() => {
    if (roundResults.length === 0) {
      return 0
    }
    return Math.round(
      roundResults.reduce((sum, item) => sum + item.score, 0) / roundResults.length,
    )
  }, [roundResults])

  const roundExp = useMemo(
    () => roundResults.reduce((sum, item) => sum + item.exp, 0),
    [roundResults],
  )

  if (!open) {
    return null
  }

  return (
    <div className="translation-challenge-overlay quick-speak-overlay" role="presentation">
      <div className="translation-challenge-overlay__panel" role="dialog" aria-modal="true">
        <header className="translation-challenge-overlay__header">
          <button
            type="button"
            className="translation-challenge-overlay__close"
            onClick={handleClose}
            aria-label="關閉"
          >
            ×
          </button>
          <h2 className="translation-challenge-overlay__title">5 秒開口挑戰</h2>
          <p className="translation-challenge-overlay__subtitle">
            看到中文，{answerTimeSeconds} 秒內說出{LANGUAGE_LABELS[language]}
          </p>
        </header>

        <div className="translation-challenge-overlay__body">
          {status === 'idle' ? (
            <section className="translation-challenge-setup">
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
                每輪 {QUESTIONS_PER_ROUND} 題 · 題目出現後立刻開麥 · 每題 {answerTimeSeconds} 秒回答
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
                開始挑戰
              </button>
            </section>
          ) : null}

          {status === 'listening' && currentQuestion ? (
            <section
              className="translation-challenge-play translation-challenge-play--recording quick-speak-answering"
              aria-live="polite"
            >
              <p className="translation-challenge-play__meta">
                第 {questionIndex + 1} / {questions.length} 題
              </p>
              <p className="translation-challenge-play__prompt-label">中文題目</p>
              <p className="translation-challenge-play__chinese">{currentQuestion.chinese}</p>

              <div className="translation-challenge-countdown" aria-hidden="true">
                <span className="translation-challenge-countdown__num">{countdown}</span>
              </div>

              <p className="translation-challenge-play__hint">
                請在 {answerTimeSeconds} 秒內說出外語
              </p>

              <div className="translation-challenge-recording">
                <span className="pulse-dot" aria-hidden="true" />
                <span className="translation-challenge-recording__label">正在聽你說…</span>
              </div>

              {interimTranscript ? (
                <p className="translation-challenge-recording__transcript">{interimTranscript}</p>
              ) : (
                <p className="translation-challenge-recording__hint">靠近麥克風，直接開口回答</p>
              )}
            </section>
          ) : null}

          {status === 'processing' ? (
            <section className="translation-challenge-play quick-speak-answering" aria-live="polite">
              <p className="translation-challenge-play__hint">正在整理你的回答…</p>
              <div className="translation-challenge-recording">
                <span className="pulse-dot" aria-hidden="true" />
                <span className="translation-challenge-recording__label">處理中</span>
              </div>
            </section>
          ) : null}

          {status === 'error' ? (
            <section className="translation-challenge-setup">
              <p className="translation-challenge-setup__warning" role="alert">
                {speechError ?? '麥克風或語音辨識發生錯誤，請再試一次。'}
              </p>
              <div className="translation-challenge-result__actions">
                <button type="button" className="translation-challenge-secondary" onClick={resetSession}>
                  返回設定
                </button>
                <button type="button" className="translation-challenge-primary" onClick={beginQuestion}>
                  再試一次
                </button>
              </div>
            </section>
          ) : null}

          {status === 'result' && currentQuestion && currentResult ? (
            <section className="translation-challenge-result">
              <p className="translation-challenge-result__timeup">時間到！來看看標準說法</p>
              <p className="translation-challenge-result__score">{currentResult.score} 分</p>

              <div className="translation-challenge-result__card">
                <p className="translation-challenge-result__label">中文題目</p>
                <p className="translation-challenge-result__chinese">{currentQuestion.chinese}</p>

                <p className="translation-challenge-result__label">你的回答</p>
                <p className="translation-challenge-result__heard">
                  {currentResult.transcript || '（沒有辨識到內容）'}
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
                  <p className="translation-challenge-result__romanization">
                    {currentQuestion.romanization}
                  </p>
                ) : null}

                <p className="translation-challenge-result__label">AI 回饋</p>
                <p className="translation-challenge-result__feedback">{currentResult.feedback}</p>

                <button
                  type="button"
                  className="translation-challenge-listen"
                  onClick={() => speakText(currentQuestion.answer, language)}
                >
                  🔊 播放標準答案
                </button>
              </div>

              <div className="translation-challenge-result__actions">
                <button type="button" className="translation-challenge-secondary" onClick={beginRetry}>
                  再挑戰一次
                </button>
                <button type="button" className="translation-challenge-primary" onClick={goToNextQuestion}>
                  {questionIndex + 1 >= questions.length ? '查看結算' : '下一題'}
                </button>
              </div>
            </section>
          ) : null}

          {status === 'summary' ? (
            <section className="translation-challenge-summary">
              <p className="translation-challenge-summary__title">本輪結算</p>
              <dl className="translation-challenge-summary__stats">
                <div>
                  <dt>完成題數</dt>
                  <dd>{roundResults.length} 題</dd>
                </div>
                <div>
                  <dt>平均分數</dt>
                  <dd>{averageScore} 分</dd>
                </div>
                <div>
                  <dt>本輪 EXP</dt>
                  <dd>+{roundExp}</dd>
                </div>
                <div>
                  <dt>今日挑戰 EXP</dt>
                  <dd>{summaryExp}</dd>
                </div>
                {streakAfterRound !== null ? (
                  <div>
                    <dt>連續練習</dt>
                    <dd>{streakAfterRound} 天</dd>
                  </div>
                ) : null}
              </dl>

              <div className="translation-challenge-result__actions">
                <button type="button" className="translation-challenge-secondary" onClick={resetSession}>
                  重新選擇情境
                </button>
                <button type="button" className="translation-challenge-primary" onClick={handleClose}>
                  完成
                </button>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  )
}
