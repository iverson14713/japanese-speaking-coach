import type { FavoriteSentenceInput } from '../types/favoriteSentence'
import { useProUpgrade } from '../context/ProUpgradeContext'
import { useProEntitlement } from '../hooks/useProEntitlement'
import { useFavoriteSentence } from '../hooks/useFavoriteSentence'

interface FavoriteButtonProps {
  favorite: FavoriteSentenceInput
  className?: string
  label?: string
}

export function FavoriteButton({ favorite, className = '', label }: FavoriteButtonProps) {
  const { isPro } = useProEntitlement()
  const { openProUpgrade } = useProUpgrade()
  const { favorited, toggle } = useFavoriteSentence(favorite, {
    isPro,
    onFavoriteLimitReached: () => openProUpgrade('favorites-limit'),
  })
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
