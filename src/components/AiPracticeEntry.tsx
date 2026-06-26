import { isAiCoachDebugMode } from '../utils/aiCoachDebugMode'

interface AiPracticeEntryProps {
  completed: boolean
  canStart: boolean
  isPro: boolean
  onStart: () => void
  onUpgrade: () => void
}

export function AiPracticeEntry({
  completed,
  canStart,
  isPro,
  onStart,
  onUpgrade,
}: AiPracticeEntryProps) {
  const debugMode = isAiCoachDebugMode()
  const limitReached = !debugMode && !canStart && !isPro

  const title = limitReached ? '升級 Pro 繼續實戰' : '用 AI 實戰一下'
  const desc = completed
    ? 'AI 實戰完成'
    : limitReached
      ? '今天 AI 練習次數用完了'
      : isPro || debugMode
        ? '進入 AI 情境練習'
        : '用今天這句練一回合'

  const handleClick = () => {
    if (completed) {
      return
    }
    if (limitReached) {
      onUpgrade()
      return
    }
    onStart()
  }

  return (
    <button
      type="button"
      className={`ai-practice-entry${completed ? ' ai-practice-entry--done' : ''}${limitReached ? ' ai-practice-entry--upgrade' : ''}`}
      onClick={handleClick}
      disabled={completed}
      aria-disabled={completed}
    >
      <span className="ai-practice-entry__icon" aria-hidden="true">
        {completed ? '✓' : limitReached ? '✨' : '🎯'}
      </span>
      <span className="ai-practice-entry__copy">
        <span className="ai-practice-entry__title">{title}</span>
        <span className="ai-practice-entry__desc">{desc}</span>
      </span>
      {!completed ? (
        <span className="ai-practice-entry__chevron" aria-hidden="true">
          ›
        </span>
      ) : null}
    </button>
  )
}
