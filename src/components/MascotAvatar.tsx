import { useEffect, useState } from 'react'
import type { MascotState } from '../utils/mascotState'

interface MascotAvatarProps {
  state: MascotState
}

type ImageStatus = 'loading' | 'loaded' | 'error'

export function MascotAvatar({ state }: MascotAvatarProps) {
  const [imageStatus, setImageStatus] = useState<ImageStatus>('loading')

  useEffect(() => {
    setImageStatus('loading')
  }, [state.imageUrl])

  const showFallback = imageStatus === 'error'

  return (
    <div className={`mascot-avatar mascot-avatar--${state.mood}`}>
      {!showFallback ? (
        <img
          key={state.imageUrl}
          src={state.imageUrl}
          alt="今日練習狗狗夥伴"
          className={`mascot-avatar__image${imageStatus === 'loaded' ? ' mascot-avatar__image--loaded' : ''}`}
          width={72}
          height={72}
          decoding="async"
          fetchPriority="high"
          onLoad={() => setImageStatus('loaded')}
          onError={() => setImageStatus('error')}
        />
      ) : null}
      {showFallback ? (
        <span className="mascot-avatar__emoji" role="img" aria-label="今日練習狗狗夥伴">
          {state.emoji}
        </span>
      ) : null}
    </div>
  )
}
