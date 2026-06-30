import { useCallback, useState } from 'react'
import type { FavoriteSentence } from '../types/favoriteSentence'
import { LANGUAGE_LABELS } from '../data/types'
import { FavoriteButton } from './FavoriteButton'
import { SpeakButton } from './SpeakButton'
import { RecordButton, type RecordState } from './RecordButton'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { SPEECH_LANG } from '../data/sentences'
import { matchesKeyword } from '../utils/evaluateSpeech'

interface FavoriteSentenceCardProps {
  favorite: FavoriteSentence
  onPracticeInLibrary?: (favorite: FavoriteSentence) => void
}

export function FavoriteSentenceCard({ favorite, onPracticeInLibrary }: FavoriteSentenceCardProps) {
  const [recordState, setRecordState] = useState<RecordState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [practiceOpen, setPracticeOpen] = useState(false)

  const keywords = [favorite.answer, ...favorite.answer.split(/\s+/).filter(Boolean)]

  const handleRecognitionResult = useCallback(
    (text: string) => {
      setTranscript(text)
      setIsCorrect(matchesKeyword(text, keywords))
      setErrorMessage(null)
      setRecordState('feedback')
    },
    [keywords],
  )

  const handleRecognitionError = useCallback((message: string) => {
    setTranscript('')
    setIsCorrect(false)
    setErrorMessage(message)
    setRecordState('feedback')
  }, [])

  const { isSupported, startListening, stopListening } = useSpeechRecognition({
    lang: SPEECH_LANG[favorite.language],
    onResult: handleRecognitionResult,
    onError: handleRecognitionError,
  })

  const resetPractice = () => {
    setTranscript('')
    setIsCorrect(false)
    setErrorMessage(null)
    setRecordState('idle')
  }

  const handlePressStart = () => {
    if (!isSupported || recordState === 'recording' || recordState === 'processing') {
      return
    }
    resetPractice()
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

  const handlePracticeClick = () => {
    if (favorite.source === 'sentence' && favorite.categoryId && onPracticeInLibrary) {
      onPracticeInLibrary(favorite)
      return
    }
    setPracticeOpen((current) => !current)
  }

  return (
    <article className="favorite-sentence-card">
      <div className="favorite-sentence-card__top">
        <div className="favorite-sentence-card__meta">
          <span className="favorite-sentence-card__lang">{LANGUAGE_LABELS[favorite.language]}</span>
          <span className="favorite-sentence-card__scenario">{favorite.scenario}</span>
        </div>
        <FavoriteButton favorite={favorite} className="favorite-button--card" />
      </div>

      <p className="favorite-sentence-card__answer">{favorite.answer}</p>
      {favorite.romanization ? (
        <p className="favorite-sentence-card__romanization">{favorite.romanization}</p>
      ) : null}
      <p className="favorite-sentence-card__chinese">{favorite.chinese}</p>

      <div className="favorite-sentence-card__actions">
        <SpeakButton
          text={favorite.answer}
          language={favorite.language}
          label={`播放 ${favorite.answer}`}
          size="small"
        />
        <button type="button" className="favorite-sentence-card__practice" onClick={handlePracticeClick}>
          {favorite.source === 'sentence' && favorite.categoryId ? '前往練習' : practiceOpen ? '收合跟讀' : '跟讀練習'}
        </button>
      </div>

      {practiceOpen && (favorite.source !== 'sentence' || !favorite.categoryId) ? (
        <div className="favorite-sentence-card__practice-panel">
          <RecordButton
            state={recordState}
            transcript={transcript}
            isCorrect={isCorrect}
            isSupported={isSupported}
            errorMessage={errorMessage}
            onPressStart={handlePressStart}
            onPressEnd={handlePressEnd}
          />
        </div>
      ) : null}
    </article>
  )
}
