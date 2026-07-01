import { useCallback, useEffect, useState } from 'react'
import type { FavoriteSentenceInput } from '../types/favoriteSentence'
import {
  isFavoriteSentence,
  subscribeFavoriteSentences,
  toggleFavoriteSentence,
} from '../utils/favoriteSentenceStorage'

interface UseFavoriteSentenceOptions {
  isPro?: boolean
  onFavoriteLimitReached?: () => void
}

export function useFavoriteSentence(input: FavoriteSentenceInput, options?: UseFavoriteSentenceOptions) {
  const [favorited, setFavorited] = useState(() => isFavoriteSentence(input.id))

  useEffect(() => {
    const sync = () => {
      setFavorited(isFavoriteSentence(input.id))
    }
    sync()
    return subscribeFavoriteSentences(sync)
  }, [input.id])

  const toggle = useCallback(() => {
    const next = toggleFavoriteSentence(input, { isPro: options?.isPro })
    if (next === 'limit-reached') {
      options?.onFavoriteLimitReached?.()
      return
    }
    setFavorited(next)
  }, [input, options?.isPro, options?.onFavoriteLimitReached])

  return { favorited, toggle }
}

export function useFavoriteSentencesRevision(): number {
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    return subscribeFavoriteSentences(() => {
      setRevision((current) => current + 1)
    })
  }, [])

  return revision
}
