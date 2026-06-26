import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Sentence } from '../data/sentences'
import { SPEECH_LANG, type Language } from '../data/sentences'
import { getDailySentence } from '../utils/dailySentence'
import {
  completeToday,
  getCompletedDates,
  getStreak,
  isTodayCompleted,
} from '../utils/dailyPracticeStorage'
import { LanguageSelector } from './LanguageSelector'
import { SentenceCard } from './SentenceCard'
import { GuidedPracticeFlow } from './GuidedPracticeFlow'
import { WeeklyProgress } from './WeeklyProgress'
import { TodayTaskCard } from './TodayTaskCard'
import { AiPracticeEntry } from './AiPracticeEntry'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { matchesKeyword } from '../utils/evaluateSpeech'
import type { RecordState } from './RecordButton'
import { isDailyAiPracticeComplete } from '../utils/dailyAiPracticeCompletion'

interface TodayPageProps {
  language: Language
  onLanguageChange: (language: Language) => void
  onStartDailyAiPractice: (sentence: Sentence) => void
  onOpenProUpgrade: () => void
  canStartAiPractice: boolean
  isPro: boolean
}

export function TodayPage({
  language,
  onLanguageChange,
  onStartDailyAiPractice,
  onOpenProUpgrade,
  canStartAiPractice,
  isPro,
}: TodayPageProps) {
  const [recordState, setRecordState] = useState<RecordState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [completedToday, setCompletedToday] = useState(() => isTodayCompleted(language))
  const [streak, setStreak] = useState(() => getStreak(language))
  const [completedDates, setCompletedDates] = useState(() => getCompletedDates(language))
  const [aiPracticeCompleted, setAiPracticeCompleted] = useState(false)

  const dailySentence = useMemo(() => getDailySentence(language), [language])

  const resetFeedback = useCallback(() => {
    setTranscript('')
    setIsCorrect(false)
    setErrorMessage(null)
    setRecordState('idle')
  }, [])

  useEffect(() => {
    setCompletedToday(isTodayCompleted(language))
    setStreak(getStreak(language))
    setCompletedDates(getCompletedDates(language))
    resetFeedback()
    if (dailySentence) {
      setAiPracticeCompleted(isDailyAiPracticeComplete(language, dailySentence.id))
    }
  }, [language, resetFeedback, dailySentence])

  const handleRecognitionResult = useCallback(
    (text: string) => {
      if (!dailySentence) {
        return
      }
      setTranscript(text)
      setIsCorrect(matchesKeyword(text, dailySentence.keywords))
      setErrorMessage(null)
      setRecordState('feedback')
    },
    [dailySentence],
  )

  const handleRecognitionError = useCallback((message: string) => {
    setTranscript('')
    setIsCorrect(false)
    setErrorMessage(message)
    setRecordState('feedback')
  }, [])

  const { isSupported, startListening, stopListening } = useSpeechRecognition({
    lang: SPEECH_LANG[language],
    onResult: handleRecognitionResult,
    onError: handleRecognitionError,
  })

  const handleLanguageChange = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage)
  }

  const handlePressStart = () => {
    if (!isSupported || recordState === 'recording' || recordState === 'processing') {
      return
    }
    resetFeedback()
    setRecordState('recording')
    startListening()
  }

  const handlePressEnd = () => {
    if (recordState !== 'recording') {
      return
    }
    setRecordState('processing')
    stopListening()
  }

  const handleCompleteToday = () => {
    const result = completeToday(language)
    setCompletedToday(true)
    setStreak(result.streak)
    setCompletedDates(getCompletedDates(language))
  }

  if (!dailySentence) {
    return null
  }

  return (
    <div className="today-page">
      <header className="today-header">
        <h1 className="today-title">今日練習</h1>
        <p className="today-subtitle">出國前，每天練一句</p>
      </header>

      <LanguageSelector selected={language} onSelect={handleLanguageChange} />

      <TodayTaskCard todayCompleted={completedToday} streakCount={streak} />

      <WeeklyProgress completedDates={completedDates} streakCount={streak} />

      <main className="app-main today-main">
        <SentenceCard sentence={dailySentence} language={language} mode="daily" />

        <AiPracticeEntry
          completed={aiPracticeCompleted}
          canStart={canStartAiPractice}
          isPro={isPro}
          onStart={() => onStartDailyAiPractice(dailySentence)}
          onUpgrade={onOpenProUpgrade}
        />

        <GuidedPracticeFlow
          sentence={dailySentence}
          language={language}
          recordState={recordState}
          transcript={transcript}
          isCorrect={isCorrect}
          isSupported={isSupported}
          errorMessage={errorMessage}
          completedToday={completedToday}
          streakCount={streak}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
          onCompleteToday={handleCompleteToday}
        />
      </main>
    </div>
  )
}
