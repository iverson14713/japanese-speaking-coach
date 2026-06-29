interface GuidedRepeatButtonProps {
  isSupported: boolean
  isListening: boolean
  interimTranscript: string
  transcript: string
  targetText?: string
  pronunciation?: string | null
  errorMessage: string | null
  onToggleListening: () => void
  onRetry: () => void
}

export function GuidedRepeatButton({
  isSupported,
  isListening,
  interimTranscript,
  transcript,
  targetText,
  pronunciation,
  errorMessage,
  onToggleListening,
  onRetry,
}: GuidedRepeatButtonProps) {
  const hasResult = Boolean(transcript) && !isListening && !errorMessage
  const hasError = Boolean(errorMessage) && !isListening

  return (
    <div className="guided-repeat">
      {!isSupported ? (
        <p className="guided-repeat__unsupported" role="alert">
          目前裝置不支援語音跟讀，請先使用播放練習。
        </p>
      ) : null}

      <button
        type="button"
        className={`guided-repeat__button${isListening ? ' guided-repeat__button--listening' : ''}`}
        disabled={!isSupported}
        onClick={onToggleListening}
        aria-pressed={isListening}
        aria-label={isListening ? '停止跟讀' : '開始跟讀'}
      >
        <span className="guided-repeat__icon" aria-hidden="true">
          {isListening ? (
            <span className="guided-repeat__pulse-dot" />
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          )}
        </span>
        <span className="guided-repeat__label">
          {isListening ? '停止跟讀' : '點一下開始跟讀'}
        </span>
      </button>

      {isListening ? (
        <div className="guided-repeat__live" role="status" aria-live="polite">
          <p className="guided-repeat__live-title">
            <span className="pulse-dot" aria-hidden="true" />
            正在聽你說…
          </p>
          {interimTranscript ? (
            <p className="guided-repeat__live-text">{interimTranscript}</p>
          ) : (
            <p className="guided-repeat__live-hint">靠近麥克風，試著說出完整句子</p>
          )}
        </div>
      ) : null}

      {hasResult ? (
        <div className="guided-repeat__result" role="status">
          <p className="guided-repeat__success">很好，完成整句跟讀</p>
          {targetText ? (
            <div className="guided-repeat__reference">
              <p className="guided-repeat__reference-target">{targetText}</p>
              {pronunciation ? (
                <p className="guided-repeat__reference-pronunciation">{pronunciation}</p>
              ) : null}
            </div>
          ) : null}
          <p className="guided-repeat__transcript">
            我聽到：<span>{transcript}</span>
          </p>
          <button type="button" className="guided-repeat__retry" onClick={onRetry}>
            再練一次
          </button>
        </div>
      ) : null}

      {hasError ? (
        <div className="guided-repeat__error" role="alert">
          <p>{errorMessage}</p>
          <button type="button" className="guided-repeat__retry" onClick={onRetry}>
            再試一次
          </button>
        </div>
      ) : null}
    </div>
  )
}
