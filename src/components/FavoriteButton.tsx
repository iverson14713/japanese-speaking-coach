import type { FavoriteSentenceInput } from '../types/favoriteSentence'
import { useFavoriteSentence } from '../hooks/useFavoriteSentence'

interface FavoriteButtonProps {
  favorite: FavoriteSentenceInput
  className?: string
  label?: string
}

export function FavoriteButton({ favorite, className = '', label }: FavoriteButtonProps) {
  const { favorited, toggle } = useFavoriteSentence(favorite)
  const ariaLabel = label ?? (favorited ? '取消收藏' : '加入收藏')

  return (
    <button
      type="button"
      className={`favorite-button${favorited ? ' favorite-button--active' : ''}${className ? ` ${className}` : ''}`}
      onClick={(event) => {
        event.stopPropagation()
        toggle()
      }}
      aria-label={ariaLabel}
      aria-pressed={favorited}
    >
      <span className="favorite-button__icon" aria-hidden="true">
        {favorited ? '♥' : '♡'}
      </span>
    </button>
  )
}
