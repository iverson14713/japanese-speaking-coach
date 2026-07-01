interface CoachCompletionUpgradeCardProps {
  onUpgrade: () => void
  onDismiss: () => void
}

export function CoachCompletionUpgradeCard({
  onUpgrade,
  onDismiss,
}: CoachCompletionUpgradeCardProps) {
  return (
    <div className="coach-completion-upgrade" role="region" aria-label="練習完成提示">
      <p className="coach-completion-upgrade__title">今天練得不錯！</p>
      <p className="coach-completion-upgrade__text">
        想繼續練嗎？Pro 每天 15 回合，不限場次，還會幫你整理錯誤。
      </p>
      <div className="coach-completion-upgrade__actions">
        <button type="button" className="coach-completion-upgrade__primary" onClick={onUpgrade}>
          升級 Pro
        </button>
        <button type="button" className="coach-completion-upgrade__secondary" onClick={onDismiss}>
          明天再練
        </button>
      </div>
    </div>
  )
}
