import { showToast } from '../utils/toast'

export function AiPracticeEntry() {
  const handleClick = () => {
    showToast('AI 實戰功能準備中')
  }

  return (
    <button type="button" className="ai-practice-entry" onClick={handleClick}>
      <span className="ai-practice-entry__icon" aria-hidden="true">
        🎯
      </span>
      <span className="ai-practice-entry__copy">
        <span className="ai-practice-entry__title">用 AI 實戰一下</span>
        <span className="ai-practice-entry__desc">讓 AI 用今天這句陪你模擬一回合</span>
      </span>
      <span className="ai-practice-entry__chevron" aria-hidden="true">
        ›
      </span>
    </button>
  )
}
