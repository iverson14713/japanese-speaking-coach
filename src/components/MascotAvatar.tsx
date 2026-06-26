import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  DEFAULT_MASCOT_IMAGE_URL,
  getMascotFallbackImageUrl,
  getMascotImageUrl,
  type MascotState,
} from '../utils/mascotState'

interface MascotAvatarProps {
  state: MascotState
  className?: string
}

function resolveImageUrl(state: MascotState): string {
  const fromImageField = getMascotImageUrl(state.image)
  const url = state.imageUrl || fromImageField
  if (!url || typeof url !== 'string' || url.includes('undefined') || url.includes('[object')) {
    return DEFAULT_MASCOT_IMAGE_URL
  }
  return url
}

function isImageReady(img: HTMLImageElement | null): boolean {
  return Boolean(img && img.complete && img.naturalWidth > 0)
}

export function MascotAvatar({ state, className }: MascotAvatarProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [src, setSrc] = useState(() => resolveImageUrl(state))
  const [showEmoji, setShowEmoji] = useState(false)

  useEffect(() => {
    setSrc(resolveImageUrl(state))
    setShowEmoji(false)
  }, [state.image, state.imageUrl])

  useLayoutEffect(() => {
    if (isImageReady(imgRef.current)) {
      setShowEmoji(false)
    }
  }, [src])

  const handleError = () => {
    const fallbackPng = getMascotFallbackImageUrl(state.mood)
    if (src !== fallbackPng && state.image.endsWith('.webp')) {
      setSrc(fallbackPng)
      setShowEmoji(false)
      return
    }
    const fallbackSrc = DEFAULT_MASCOT_IMAGE_URL
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc)
      setShowEmoji(false)
      return
    }
    setShowEmoji(true)
  }

  const handleLoad = () => {
    setShowEmoji(false)
  }

  return (
    <div className={`mascot-avatar mascot-avatar--${state.mood}${className ? ` ${className}` : ''}`}>
      {showEmoji ? (
        <span className="mascot-avatar__emoji" role="img" aria-label="今日練習狗狗夥伴">
          {state.emoji}
        </span>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt="今日練習狗狗夥伴"
          className="mascot-avatar__image"
          width={72}
          height={72}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  )
}
