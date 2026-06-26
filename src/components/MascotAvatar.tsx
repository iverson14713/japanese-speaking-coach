import { useState } from 'react'
import type { MascotState } from '../utils/mascotState'

interface MascotAvatarProps {
  state: MascotState
}

export function MascotAvatar({ state }: MascotAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div
      className={`mascot-avatar mascot-avatar--${state.mood}`}
      aria-hidden={imageFailed ? undefined : true}
    >
      {!imageFailed ? (
        <img
          src={state.imageUrl}
          alt="今日練習狗狗夥伴"
          className="mascot-avatar__image"
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="mascot-avatar__emoji" role="img" aria-label="今日練習狗狗夥伴">
          {state.emoji}
        </span>
      )}
    </div>
  )
}
