import type { Sentence } from '../data/sentences'
import type { Language } from '../data/types'
import { getCategoryLabel } from '../data/categories'
import {
  getSentenceDisplayHelper,
  getSentenceDisplayPronunciation,
} from '../utils/sentenceDisplay'
import { speakText } from '../utils/speechSynthesis'
import { buildFavoriteFromSentence } from '../utils/favoriteSentenceBuilders'
import { FavoriteButton } from './FavoriteButton'

interface SentenceCardProps {
  sentence: Sentence
  language: Language
  mode?: 'default' | 'daily'
}

export function SentenceCard({ sentence, language, mode = 'default' }: SentenceCardProps) {
  const label = mode === 'daily' ? '今日句子' : getCategoryLabel(sentence.category)
  const isDaily = mode === 'daily'
  const pronunciationLine = getSentenceDisplayPronunciation(sentence)
  const helperLine = getSentenceDisplayHelper(sentence)

  return (
    <section
      className={`sentence-card${isDaily ? ' sentence-card--daily' : ''}`}
      aria-label="練習句子"
    >
      <FavoriteButton
        favorite={buildFavoriteFromSentence(sentence)}
        className="favorite-button--sentence-card"
      />

      {isDaily ? (
        <div className="sentence-card__header">
          <span className="sentence-card__header-icon" aria-hidden="true">
            💬
          </span>
          <h2 className="sentence-card__header-title">今日句子</h2>
        </div>
      ) : (
        <p className="sentence-label">{label}</p>
      )}

      <p className="sentence-target">{sentence.targetText}</p>

      {!isDaily && helperLine ? <p className="sentence-helper">{helperLine}</p> : null}
      {pronunciationLine ? <p className="sentence-pronunciation">{pronunciationLine}</p> : null}
      {isDaily && helperLine ? (
        <p className="sentence-helper sentence-helper--compact">{helperLine}</p>
      ) : null}

      <p className="sentence-chinese">{sentence.meaningZh}</p>
      <p className="sentence-usage">
        <span className="sentence-usage__label">使用時機</span>
        {sentence.usageNoteZh}
      </p>

      {isDaily ? (
        <div className="sentence-meta-tags" aria-label="句子標籤">
          <span className="sentence-meta-tag">難度：初級</span>
          <span className="sentence-meta-tag sentence-meta-tag--accent">旅行實用度：高</span>
          <span className="sentence-meta-tag">場景：{getCategoryLabel(sentence.category)}</span>
        </div>
      ) : null}

      {!isDaily ? (
        <button
          type="button"
          className="listen-button"
          onClick={() => speakText(sentence, language)}
          aria-label="先聽一次練習句"
        >
          🔊 先聽一次
        </button>
      ) : null}
    </section>
  )
}
