import { useCallback, useMemo, useState } from 'react'
import { categories, type CategoryId } from './data/categories'
import { getSentencesByCategory } from './data/sentences'
import { CategorySelector } from './components/CategorySelector'
import { SentenceCard } from './components/SentenceCard'
import { WordBreakdown } from './components/WordBreakdown'
import { PhrasePractice } from './components/PhrasePractice'
import { ConversationExamples } from './components/ConversationExamples'
import { RecordButton, type RecordState } from './components/RecordButton'
import { useSpeechRecognition } from './hooks/useSpeechRecognition'
import { matchesKeyword } from './utils/evaluateSpeech'

function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(categories[0].id)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [recordState, setRecordState] = useState<RecordState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const categorySentences = useMemo(
    () => getSentencesByCategory(selectedCategory),
    [selectedCategory],
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
    lang: 'ja-JP',
    onResult: handleRecognitionResult,
    onError: handleRecognitionError,
  })

  const resetFeedback = () => {
    setTranscript('')
    setIsCorrect(false)
    setErrorMessage(null)
    setRecordState('idle')
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
        <p className="app-subtitle">第一次去日本，也敢開口</p>
        <h1 className="app-title">日本旅行口說教練</h1>
      </header>

      <CategorySelector selected={selectedCategory} onSelect={handleCategoryChange} />

      <main className="app-main">
        <SentenceCard sentence={currentSentence} />
        <WordBreakdown words={currentSentence.wordBreakdown} />
        <PhrasePractice chunks={currentSentence.phraseChunks} />
        <RecordButton
          state={recordState}
          transcript={transcript}
          isCorrect={isCorrect}
          isSupported={isSupported}
          errorMessage={errorMessage}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />
        {selectedCategory === 'first-conversation' && <ConversationExamples />}
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
