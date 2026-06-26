import { isAiCoachDebugMode } from '../utils/aiCoachDebugMode'

interface AiPracticeEntryProps {
  completed: boolean
  canStart: boolean
  isPro: boolean
  todayCompleted: boolean
  onStart: () => void
  onUpgrade: () => void
}

export function AiPracticeEntry({
  completed,
  canStart,
  isPro,
  todayCompleted,
  onStart,
  onUpgrade,
}: AiPracticeEntryProps) {
  const debugMode = isAiCoachDebugMode()
  const limitReached = !debugMode && !canStart && !isPro

  const title = completed
    ? 'AI 實戰完成'
    : limitReached
      ? '升級 Pro 繼續實戰'
      : todayCompleted
        ? '用 AI 實戰一下'
        : '練完後，用 AI 實戰一下'

  const desc = completed
    ? '今天這句已經實戰過了'
    : limitReached
      ? '今天 AI 練習次數用完了'
      : todayCompleted
        ? '讓 AI 用今天這句陪你練一回合'
        : '完成今日練習後再來挑戰'

  const isSubtle = !completed && !limitReached && !todayCompleted

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
      className={`ai-practice-entry${completed ? ' ai-practice-entry--done' : ''}${limitReached ? ' ai-practice-entry--upgrade' : ''}${isSubtle ? ' ai-practice-entry--subtle' : ''}${todayCompleted && !completed && !limitReached ? ' ai-practice-entry--ready' : ''}`}
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
