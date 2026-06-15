import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { PhrasePractice } from './PhrasePractice'
import { RecordButton, type RecordState } from './RecordButton'
import { WeeklyProgress } from './WeeklyProgress'
import { StreakPetCard } from './StreakPetCard'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { matchesKeyword } from '../utils/evaluateSpeech'

interface TodayPageProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

export function TodayPage({ language, onLanguageChange }: TodayPageProps) {
  const [recordState, setRecordState] = useState<RecordState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [completedToday, setCompletedToday] = useState(() => isTodayCompleted(language))
  const [streak, setStreak] = useState(() => getStreak(language))
  const [completedDates, setCompletedDates] = useState(() => getCompletedDates(language))

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
  }, [language, resetFeedback])

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
    <>
      <header className="today-header">
        <h1 className="today-title">今日練習</h1>
        <p className="today-subtitle">每天一句，出國前慢慢累積</p>
      </header>

      <LanguageSelector selected={language} onSelect={handleLanguageChange} />

      <StreakPetCard todayCompleted={completedToday} streakCount={streak} />

      <WeeklyProgress completedDates={completedDates} />

      <main className="app-main today-main">
        <SentenceCard sentence={dailySentence} language={language} mode="daily" />
        <PhrasePractice chunks={dailySentence.phraseChunks} language={language} />
        <RecordButton
          state={recordState}
          transcript={transcript}
          isCorrect={isCorrect}
          isSupported={isSupported}
          errorMessage={errorMessage}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />

        <div className="today-complete-section">
          {completedToday ? (
            <p className="today-complete-done" role="status">
              今天完成了！連續練習 {streak} 天
            </p>
          ) : (
            <button type="button" className="today-complete-button" onClick={handleCompleteToday}>
              完成今日練習
            </button>
          )}
        </div>
      </main>
    </>
  )
}
