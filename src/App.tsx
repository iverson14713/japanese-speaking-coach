import { useCallback, useMemo, useState } from 'react'
import type { CategoryId } from './data/categories'
import {
  getCategoriesForLanguage,
  getDefaultCategory,
  getSentencesByCategory,
  SPEECH_LANG,
  type Language,
} from './data/sentences'
import { LanguageSelector } from './components/LanguageSelector'
import { CategorySelector } from './components/CategorySelector'
import { SentenceCard } from './components/SentenceCard'
import { WordBreakdown } from './components/WordBreakdown'
import { PhrasePractice } from './components/PhrasePractice'
import { ConversationExamples } from './components/ConversationExamples'
import { RecordButton, type RecordState } from './components/RecordButton'
import { useSpeechRecognition } from './hooks/useSpeechRecognition'
import { matchesKeyword } from './utils/evaluateSpeech'

function App() {
  const [language, setLanguage] = useState<Language>('ja')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(() =>
    getDefaultCategory('ja'),
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

  const handleLanguageChange = (nextLanguage: Language) => {
    setLanguage(nextLanguage)
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
    <div className="app">
      <header className="app-header">
        <p className="app-subtitle">出國前，先練會真的用得到的句子</p>
        <h1 className="app-title">旅行口說教練</h1>
      </header>

      <LanguageSelector selected={language} onSelect={handleLanguageChange} />

      <CategorySelector
        selected={selectedCategory}
        availableCategories={availableCategories}
        onSelect={handleCategoryChange}
      />

      <main className="app-main">
        <SentenceCard sentence={currentSentence} language={language} />
        <PhrasePractice chunks={currentSentence.phraseChunks} language={language} />
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
        {language === 'ja' && selectedCategory === 'first-conversation' && (
          <ConversationExamples />
        )}
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
          <button
            type="button"
            className="nav-button nav-button--primary"
            onClick={handleNextSentence}
            disabled={sentenceIndex >= categorySentences.length - 1}
          >
            下一句
          </button>
        </div>
        <p className="sentence-counter">
          {sentenceIndex + 1} / {categorySentences.length}
        </p>
      </footer>
    </div>
  )
}

export default App
