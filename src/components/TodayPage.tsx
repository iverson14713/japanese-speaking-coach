import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Sentence } from '../data/sentences'
import { SPEECH_LANG, type Language } from '../data/sentences'
import { getDailySentence } from '../utils/dailySentence'
import {
  getCompletedDates,
  getLastPracticeDate,
  getStreak,
  getStreakFreezeCards,
  isTodayCompleted,
} from '../utils/dailyPracticeStorage'
import { LanguageSelector } from './LanguageSelector'
import { SentenceCard } from './SentenceCard'
import { GuidedPracticeFlow } from './GuidedPracticeFlow'
import { DailyProgressCard } from './DailyProgressCard'
import { AiPracticeEntry } from './AiPracticeEntry'
import { CrossPromoSection } from './CrossPromoSection'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { isDailyAiPracticeComplete } from '../utils/dailyAiPracticeCompletion'
import { getTodayDateKey } from '../utils/dateKey'
import { useRecordPracticeCompletion } from '../hooks/useRecordPracticeCompletion'
import { stopSpeaking } from '../utils/speechSynthesis'

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
  const [transcript, setTranscript] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [completedToday, setCompletedToday] = useState(() => isTodayCompleted(language))
  const [streak, setStreak] = useState(() => getStreak(language))
  const [lastPracticeDate, setLastPracticeDate] = useState(() => getLastPracticeDate(language))
  const [completedDates, setCompletedDates] = useState(() => getCompletedDates(language))
  const [freezeCards, setFreezeCards] = useState(() => getStreakFreezeCards(language))
  const [aiPracticeCompleted, setAiPracticeCompleted] = useState(false)

  const recordPractice = useRecordPracticeCompletion(language)
  const dailySentence = useMemo(() => getDailySentence(language), [language])

  const refreshProgress = useCallback(() => {
    setCompletedToday(isTodayCompleted(language))
    setStreak(getStreak(language))
    setLastPracticeDate(getLastPracticeDate(language))
    setCompletedDates(getCompletedDates(language))
    setFreezeCards(getStreakFreezeCards(language))
  }, [language])

  const applyPracticeResult = useCallback(
    (result: ReturnType<typeof recordPractice>) => {
      if (!result.isNewCompletion) {
        return
      }
      setCompletedToday(true)
      setStreak(result.streak)
      setLastPracticeDate(getTodayDateKey())
      setCompletedDates(getCompletedDates(language))
      setFreezeCards(result.freezeCards)
    },
    [language],
  )

  const resetRepeatState = useCallback(() => {
    setTranscript('')
    setErrorMessage(null)
  }, [])

  useEffect(() => {
    refreshProgress()
    resetRepeatState()
    if (dailySentence) {
      setAiPracticeCompleted(isDailyAiPracticeComplete(language, dailySentence.id))
    }
  }, [language, resetRepeatState, dailySentence, refreshProgress])

  const handleRecognitionResult = useCallback((text: string) => {
    setTranscript(text)
    setErrorMessage(null)
  }, [])

  const handleRecognitionError = useCallback((message: string) => {
    setTranscript('')
    setErrorMessage(message)
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

  useEffect(() => {
    resetRepeatState()
    return () => {
      stopListening()
    }
  }, [language, dailySentence?.id, resetRepeatState, stopListening])

  const handleToggleListening = useCallback(() => {
    if (!isSupported) {
      return
    }

    if (isListening) {
      stopListening()
      return
    }

    resetRepeatState()
    stopSpeaking()
    void startListening()
  }, [isSupported, isListening, resetRepeatState, startListening, stopListening])

  const handleRetryRepeat = useCallback(() => {
    if (isListening) {
      stopListening()
    }
    resetRepeatState()
  }, [isListening, resetRepeatState, stopListening])

  const handleCompleteToday = () => {
    applyPracticeResult(recordPractice())
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

      <LanguageSelector selected={language} onSelect={onLanguageChange} />

      <DailyProgressCard
        todayCompleted={completedToday}
        streakCount={streak}
        lastPracticeDate={lastPracticeDate}
        completedDates={completedDates}
        freezeCards={freezeCards}
      />

      <main className="app-main today-main">
        <SentenceCard sentence={dailySentence} language={language} mode="daily" />

        <GuidedPracticeFlow
          sentence={dailySentence}
          language={language}
          isSpeechSupported={isSupported}
          isListening={isListening}
          interimTranscript={interimTranscript}
          transcript={transcript}
          errorMessage={errorMessage}
          completedToday={completedToday}
          streakCount={streak}
          freezeCards={freezeCards}
          onToggleListening={handleToggleListening}
          onRetryRepeat={handleRetryRepeat}
          onCompleteToday={handleCompleteToday}
        />

        <AiPracticeEntry
          completed={aiPracticeCompleted}
          canStart={canStartAiPractice}
          isPro={isPro}
          todayCompleted={completedToday}
          onStart={() => onStartDailyAiPractice(dailySentence)}
          onUpgrade={onOpenProUpgrade}
        />

        <CrossPromoSection />
      </main>
    </div>
  )
}
