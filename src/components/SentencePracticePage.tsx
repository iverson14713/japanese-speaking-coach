import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CategoryId } from '../data/categories'
import {
  getCategoriesForLanguage,
  getDefaultCategory,
  getLibraryHint,
  getSentencesByCategory,
  SPEECH_LANG,
  type Language,
} from '../data/sentences'
import { LanguageSelector } from './LanguageSelector'
import { CategorySelector } from './CategorySelector'
import { SentenceCard } from './SentenceCard'
import { WordBreakdown } from './WordBreakdown'
import { CrossPromoSection } from './CrossPromoSection'
import { PhrasePractice } from './PhrasePractice'
import { RecordButton, type RecordState } from './RecordButton'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { matchesKeyword } from '../utils/evaluateSpeech'

interface SentencePracticePageProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

export function SentencePracticePage({
  language,
  onLanguageChange,
}: SentencePracticePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(() =>
    getDefaultCategory(language),
  )
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [recordState, setRecordState] = useState<RecordState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const availableCategories = useMemo(() => getCategoriesForLanguage(language), [language])

  const categorySentences = useMemo(
    () => getSentencesByCategory(language, selectedCategory),
    [language, selectedCategory],
  )

  const currentSentence = categorySentences[sentenceIndex]

  const handleRecognitionResult = useCallback(
    (text: string) => {
      if (!currentSentence) {
        return
      }
      setTranscript(text)
      setIsCorrect(matchesKeyword(text, currentSentence.keywords))
      setErrorMessage(null)
      setRecordState('feedback')
    },
    [currentSentence],
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

  const resetFeedback = () => {
    setTranscript('')
    setIsCorrect(false)
    setErrorMessage(null)
    setRecordState('idle')
  }

  useEffect(() => {
    setSelectedCategory(getDefaultCategory(language))
    setSentenceIndex(0)
    setTranscript('')
    setIsCorrect(false)
    setErrorMessage(null)
    setRecordState('idle')
  }, [language])

  const handleLanguageChange = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage)
    setSelectedCategory(getDefaultCategory(nextLanguage))
    setSentenceIndex(0)
    resetFeedback()
  }

  const handleCategoryChange = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId)
    setSentenceIndex(0)
    resetFeedback()
  }

  const handlePrevSentence = () => {
    if (sentenceIndex > 0) {
      setSentenceIndex((prev) => prev - 1)
      resetFeedback()
    }
  }

  const handleNextSentence = () => {
    if (sentenceIndex < categorySentences.length - 1) {
      setSentenceIndex((prev) => prev + 1)
      resetFeedback()
    }
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

  if (!currentSentence) {
    return null
  }

  return (
    <>
      <header className="app-header">
        <p className="app-subtitle">英文、日文、韓文旅行口說都能練</p>
        <h1 className="app-title">旅行口說教練</h1>
      </header>

      <LanguageSelector selected={language} onSelect={handleLanguageChange} />
      <p className="library-hint">{getLibraryHint(language)}</p>

      <CategorySelector
        selected={selectedCategory}
        availableCategories={availableCategories}
        onSelect={handleCategoryChange}
      />

      <main className="app-main">
        <SentenceCard sentence={currentSentence} language={language} />
        <PhrasePractice sentence={currentSentence} language={language} />
        <RecordButton
          state={recordState}
          transcript={transcript}
          isCorrect={isCorrect}
          isSupported={isSupported}
          errorMessage={errorMessage}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />
        <WordBreakdown key={currentSentence.id} words={currentSentence.wordBreakdown} />
      </main>

      <footer className="app-footer">
        <div className="nav-buttons">
          <button
            type="button"
            className="nav-button"
            onClick={handlePrevSentence}
            disabled={sentenceIndex === 0}
          >
            上一句
          </button>
          <p className="sentence-position">第 {sentenceIndex + 1} 句</p>
          <button
            type="button"
            className="nav-button nav-button--primary"
            onClick={handleNextSentence}
            disabled={sentenceIndex >= categorySentences.length - 1}
          >
            下一句
          </button>
        </div>
      </footer>

      <CrossPromoSection tab="library" />
    </>
  )
}
