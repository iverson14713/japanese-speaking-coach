import { useMemo, useState, useEffect } from 'react'
import type { Language } from '../../data/types'
import type { FavoriteSentence } from '../../types/favoriteSentence'
import { suggestUserReply } from '../../services/ai'
import type { SentenceCorrectionResult } from '../../services/ai'
import { SpeakButton } from '../SpeakButton'

const REVIEW_QUESTION_COUNT = 5

interface FavoriteReviewOverlayProps {
  open: boolean
  language: Language
  favorites: FavoriteSentence[]
  onClose: () => void
}

function pickReviewFavorites(favorites: FavoriteSentence[], count: number): FavoriteSentence[] {
  const shuffled = [...favorites].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function FavoriteReviewOverlay({
  open,
  language,
  favorites,
  onClose,
}: FavoriteReviewOverlayProps) {
  const questions = useMemo(() => pickReviewFavorites(favorites, REVIEW_QUESTION_COUNT), [favorites, open])
  const [index, setIndex] = useState(0)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SentenceCorrectionResult | null>(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }
    setIndex(0)
    setInput('')
    setLoading(false)
    setResult(null)
    setFinished(false)
  }, [open, favorites])

  if (!open) {
    return null
  }

  const current = questions[index]
  const total = questions.length

  function resetForNext() {
    setInput('')
    setResult(null)
  }

  async function handleSubmit() {
    if (!current || !input.trim() || loading) {
      return
    }

    setLoading(true)
    try {
      const feedback = await suggestUserReply({
        language,
        userInput: input.trim(),
        currentScenario: '收藏句複習',
        aiRole: '語言教練',
        userRole: '學習者',
        goal: `用${language === 'en' ? '英文' : language === 'ja' ? '日文' : '韓文'}說出：${current.chinese}`,
        history: [],
      })
      setResult(feedback)
    } finally {
      setLoading(false)
    }
  }

  function handleNext() {
    if (index + 1 >= total) {
      setFinished(true)
      return
    }
    setIndex((value) => value + 1)
    resetForNext()
  }

  function handleRestart() {
    setIndex(0)
    setFinished(false)
    resetForNext()
  }

  return (
    <div className="favorite-review-overlay" role="presentation" onClick={onClose}>
      <div
        className="favorite-review-overlay__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="favorite-review-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="favorite-review-overlay__header">
          <h2 id="favorite-review-title" className="favorite-review-overlay__title">
            收藏句 AI 複習
          </h2>
          <button type="button" className="favorite-review-overlay__close" onClick={onClose} aria-label="關閉">
            ✕
          </button>
        </div>

        {favorites.length < 1 ? (
          <p className="favorite-review-overlay__empty">先收藏幾句想練的句子，再來複習吧。</p>
        ) : finished ? (
          <div className="favorite-review-overlay__done">
            <p className="favorite-review-overlay__done-title">本輪複習完成！</p>
            <p className="favorite-review-overlay__done-text">今天先練到這裡，明天可以再從收藏句複習。</p>
            <button type="button" className="favorite-review-overlay__primary" onClick={handleRestart}>
              再練一輪
            </button>
          </div>
        ) : current ? (
          <>
            <p className="favorite-review-overlay__progress">
              第 {index + 1} / {total} 題
            </p>
            <p className="favorite-review-overlay__prompt-label">請用目標語言說出：</p>
            <p className="favorite-review-overlay__prompt">{current.chinese}</p>

            {!result ? (
              <>
                <input
                  type="text"
                  className="favorite-review-overlay__input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="輸入你的回答..."
                  disabled={loading}
                />
                <button
                  type="button"
                  className="favorite-review-overlay__primary"
                  onClick={() => void handleSubmit()}
                  disabled={loading || !input.trim()}
                >
                  {loading ? '分析中…' : '送出'}
                </button>
              </>
            ) : (
              <div className="favorite-review-overlay__feedback">
                <p className="favorite-review-overlay__feedback-label">建議說法</p>
                <div className="favorite-review-overlay__feedback-row">
                  <p className="favorite-review-overlay__feedback-text">{result.corrected}</p>
                  <SpeakButton text={result.corrected} language={language} size="small" />
                </div>
                {result.meaningZh ? (
                  <p className="favorite-review-overlay__feedback-meaning">{result.meaningZh}</p>
                ) : null}
                <p className="favorite-review-overlay__feedback-tip">{result.explanationZh}</p>
                <button type="button" className="favorite-review-overlay__primary" onClick={handleNext}>
                  {index + 1 >= total ? '完成複習' : '下一題'}
                </button>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}
