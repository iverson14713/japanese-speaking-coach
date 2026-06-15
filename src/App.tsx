import { useCallback, useState } from 'react'
import { sentences } from './data/sentences'
import { SentenceCard } from './components/SentenceCard'
import { WordBreakdown } from './components/WordBreakdown'
import { RecordButton, type RecordState } from './components/RecordButton'
import { useSpeechRecognition } from './hooks/useSpeechRecognition'
import { matchesKeyword } from './utils/evaluateSpeech'

function App() {
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [recordState, setRecordState] = useState<RecordState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const currentSentence = sentences[sentenceIndex]

  const handleRecognitionResult = useCallback(
    (text: string) => {
      setTranscript(text)
      setIsCorrect(matchesKeyword(text, currentSentence.keywords))
      setErrorMessage(null)
      setRecordState('feedback')
    },
    [currentSentence.keywords],
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

  const handleNextSentence = () => {
    setSentenceIndex((prev) => (prev + 1) % sentences.length)
    resetFeedback()
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

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-subtitle">每天一句，輕鬆開口</p>
        <h1 className="app-title">日文口說教練</h1>
      </header>

      <main className="app-main">
        <SentenceCard sentence={currentSentence} />
        <WordBreakdown words={currentSentence.words} />
        <RecordButton
          state={recordState}
          transcript={transcript}
          isCorrect={isCorrect}
          isSupported={isSupported}
          errorMessage={errorMessage}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />
      </main>

      <footer className="app-footer">
        <button type="button" className="next-button" onClick={handleNextSentence}>
          換一句
        </button>
        <p className="sentence-counter">
          {sentenceIndex + 1} / {sentences.length}
        </p>
      </footer>
    </div>
  )
}

export default App
