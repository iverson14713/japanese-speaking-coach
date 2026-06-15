export type RecordState = 'idle' | 'recording' | 'processing' | 'feedback'

interface RecordButtonProps {
  state: RecordState
  transcript: string
  isCorrect: boolean
  isSupported: boolean
  errorMessage: string | null
  onPressStart: () => void
  onPressEnd: () => void
}

export function RecordButton({
  state,
  transcript,
  isCorrect,
  isSupported,
  errorMessage,
  onPressStart,
  onPressEnd,
}: RecordButtonProps) {
  const isRecording = state === 'recording'
  const isProcessing = state === 'processing'
  const isActive = isRecording || isProcessing

  const feedbackMessage = errorMessage
    ? errorMessage
    : isCorrect
      ? '很好！這句大致正確。'
      : '我聽得不是很清楚，可以再念一次。'

  return (
    <div className="record-section">
      {!isSupported && (
        <p className="unsupported-message" role="alert">
          此瀏覽器不支援語音辨識，請使用 Chrome 桌面版測試。
        </p>
      )}

      <button
        type="button"
        className={`record-button${isActive ? ' recording' : ''}`}
        disabled={!isSupported}
        onPointerDown={(e) => {
          if (!isSupported) {
            return
          }
          e.preventDefault()
          onPressStart()
        }}
        onPointerUp={onPressEnd}
        onPointerLeave={isRecording ? onPressEnd : undefined}
        onPointerCancel={onPressEnd}
        aria-pressed={isActive}
        aria-label="按住跟著念"
        aria-disabled={!isSupported}
      >
        <span className="record-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </svg>
        </span>
        <span className="record-label">按住跟著念</span>
      </button>

      {isActive && (
        <p className="status-message listening" role="status">
          <span className="pulse-dot" aria-hidden="true" />
          {isProcessing ? '辨識中…' : '正在聽你說…'}
        </p>
      )}

      {state === 'feedback' && (
        <div className="feedback-area" role="status">
          {transcript && (
            <p className="transcript-message">
              我聽到：<span className="transcript-text">{transcript}</span>
            </p>
          )}
          <div
            className={`feedback-card${isCorrect && !errorMessage ? '' : ' feedback-card--retry'}`}
          >
            <p className="feedback-avatar">{isCorrect && !errorMessage ? '🌸' : '💬'}</p>
            <p className="feedback-text">
              <strong>AI 小老師：</strong>
              {feedbackMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
