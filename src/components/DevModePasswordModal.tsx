import { useEffect, useRef, useState } from 'react'
import { DEV_MODE_PASSWORD } from '../constants/devMode'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

interface DevModePasswordModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function DevModePasswordModal({ open, onClose, onSuccess }: DevModePasswordModalProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) {
      setPassword('')
      setError(null)
      return
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 50)

    return () => {
      window.clearTimeout(timer)
    }
  }, [open])

  if (!open) {
    return null
  }

  const handleSubmit = () => {
    if (password !== DEV_MODE_PASSWORD) {
      setError('密碼錯誤')
      return
    }

    setError(null)
    onSuccess()
  }

  return (
    <div className="dev-modal" role="presentation" onClick={onClose}>
      <div
        className="dev-modal__card dev-password-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dev-password-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="dev-password-title" className="dev-modal__title">
          開發者模式密碼
        </h2>
        <p className="dev-modal__subtitle">請輸入密碼以進入開發者模式。</p>

        <label className="dev-modal__field">
          <span className="dev-modal__label">密碼</span>
          <input
            ref={inputRef}
            type="password"
            className="dev-modal__input"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              if (error) {
                setError(null)
              }
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleSubmit()
              }
            }}
            autoComplete="off"
            enterKeyHint="done"
          />
        </label>

        {error ? (
          <p className="dev-modal__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="dev-modal__actions">
          <button type="button" className="dev-modal__button dev-modal__button--secondary" onClick={onClose}>
            取消
          </button>
          <button type="button" className="dev-modal__button" onClick={handleSubmit}>
            確認
          </button>
        </div>
      </div>
    </div>
  )
}
