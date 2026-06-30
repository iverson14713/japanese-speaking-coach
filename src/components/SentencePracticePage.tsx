import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CategoryId } from '../data/categories'
import { getCategoryLabel } from '../data/categories'
import {
  getCategoriesForLanguage,
  getDefaultCategory,
  getLibraryHint,
  getSentencesByCategory,
  SPEECH_LANG,
  type Language,
} from '../data/sentences'
import type { FavoriteSentence } from '../types/favoriteSentence'
import { LanguageSelector } from './LanguageSelector'
import { CategorySelector } from './CategorySelector'
import { SentenceCard } from './SentenceCard'
import { WordBreakdown } from './WordBreakdown'
import { CrossPromoSection } from './CrossPromoSection'
import { PhrasePractice } from './PhrasePractice'
import { RecordButton, type RecordState } from './RecordButton'
import { LibrarySegmentControl, type LibrarySegment } from './LibrarySegmentControl'
import { FavoriteSentenceCard } from './FavoriteSentenceCard'
import { FavoritesEmptyState } from './FavoritesEmptyState'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { matchesKeyword } from '../utils/evaluateSpeech'
import { useRecordPracticeCompletion } from '../hooks/useRecordPracticeCompletion'
import { getFavoriteSentencesByLanguage } from '../utils/favoriteSentenceStorage'
import { useFavoriteSentencesRevision } from '../hooks/useFavoriteSentence'
import {
  getRecentPracticeEntries,
  recordRecentPractice,
  subscribeRecentPractice,
} from '../utils/recentPracticeStorage'

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
  const [librarySegment, setLibrarySegment] = useState<LibrarySegment>('all')
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [recordState, setRecordState] = useState<RecordState>('idle')
  const [transcript, setTranscript] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const recordPractice = useRecordPracticeCompletion(language)
  const favoritesRevision = useFavoriteSentencesRevision()
  const [recentRevision, setRecentRevision] = useState(0)

  useEffect(() => subscribeRecentPractice(() => setRecentRevision((value) => value + 1)), [])

  const favoriteSentences = useMemo(
    () => getFavoriteSentencesByLanguage(language),
    [language, favoritesRevision],
  )

  const recentSentences = useMemo(() => {
    return getRecentPracticeEntries(language)
      .map((entry) => {
        const sentences = getSentencesByCategory(language, entry.categoryId as CategoryId)
        const sentence = sentences.find((item) => item.id === entry.sentenceId)
        return sentence ?? null
      })
      .filter((sentence): sentence is NonNullable<typeof sentence> => sentence !== null)
  }, [language, recentRevision])

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

      if (matchesKeyword(text, currentSentence.keywords)) {
        recordPractice()
        recordRecentPractice(language, currentSentence.id, currentSentence.category)
      }
    },
    [currentSentence, language, recordPractice],
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
    setLibrarySegment('all')
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

  const handlePracticeFromFavorite = (favorite: FavoriteSentence) => {
    if (!favorite.categoryId || typeof favorite.sentenceId !== 'number') {
      return
    }

    setLibrarySegment('all')
    setSelectedCategory(favorite.categoryId)
    const sentences = getSentencesByCategory(language, favorite.categoryId)
    const index = sentences.findIndex((item) => item.id === favorite.sentenceId)
    setSentenceIndex(index >= 0 ? index : 0)
    resetFeedback()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePracticeRecent = (categoryId: CategoryId, sentenceId: number) => {
    setLibrarySegment('all')
    setSelectedCategory(categoryId)
    const sentences = getSentencesByCategory(language, categoryId)
    const index = sentences.findIndex((item) => item.id === sentenceId)
    setSentenceIndex(index >= 0 ? index : 0)
    resetFeedback()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (librarySegment === 'all' && !currentSentence) {
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

      <LibrarySegmentControl selected={librarySegment} onSelect={setLibrarySegment} />

      {librarySegment === 'all' ? (
        <>
          <CategorySelector
            selected={selectedCategory}
            availableCategories={availableCategories}
            onSelect={handleCategoryChange}
          />

          <main className="app-main">
            {currentSentence ? (
              <>
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
              </>
            ) : null}
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
        </>
      ) : null}

      {librarySegment === 'favorites' ? (
        <main className="app-main library-list-main">
          {favoriteSentences.length === 0 ? (
            <FavoritesEmptyState />
          ) : (
            <div className="library-list">
              {favoriteSentences.map((favorite) => (
                <FavoriteSentenceCard
                  key={favorite.id}
                  favorite={favorite}
                  onPracticeInLibrary={handlePracticeFromFavorite}
                />
              ))}
            </div>
          )}
        </main>
      ) : null}

      {librarySegment === 'recent' ? (
        <main className="app-main library-list-main">
          {recentSentences.length === 0 ? (
            <div className="favorites-empty" role="status">
              <span className="favorites-empty__icon" aria-hidden="true">
                🕐
              </span>
              <p className="favorites-empty__title">還沒有最近練習</p>
              <p className="favorites-empty__text">在「全部」完成跟讀後，最近練習的句子會出現在這裡。</p>
            </div>
          ) : (
            <div className="library-list">
              {recentSentences.map((sentence) => (
                <article key={`${sentence.language}-${sentence.id}`} className="favorite-sentence-card">
                  <div className="favorite-sentence-card__top">
                    <div className="favorite-sentence-card__meta">
                      <span className="favorite-sentence-card__scenario">
                        {getCategoryLabel(sentence.category)}
                      </span>
                    </div>
                  </div>
                  <p className="favorite-sentence-card__answer">{sentence.targetText}</p>
                  <p className="favorite-sentence-card__chinese">{sentence.meaningZh}</p>
                  <div className="favorite-sentence-card__actions">
                    <button
                      type="button"
                      className="favorite-sentence-card__practice"
                      onClick={() => handlePracticeRecent(sentence.category, sentence.id)}
                    >
                      繼續練習
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      ) : null}

      <CrossPromoSection />
    </>
  )
}
