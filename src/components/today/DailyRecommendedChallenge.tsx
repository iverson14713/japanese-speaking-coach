interface DailyRecommendedChallengeProps {
  onStart: () => void
}

export function DailyRecommendedChallenge({ onStart }: DailyRecommendedChallengeProps) {
  return (
    <button type="button" className="daily-recommended-challenge" onClick={onStart}>
      <span className="daily-recommended-challenge__eyebrow">今日推薦挑戰</span>
      <span className="daily-recommended-challenge__row">
        <span className="daily-recommended-challenge__icon" aria-hidden="true">
          ⚡
        </span>
        <span className="daily-recommended-challenge__copy">
          <span className="daily-recommended-challenge__title">3 秒開口挑戰</span>
          <span className="daily-recommended-challenge__desc">看到中文，倒數後直接開講</span>
        </span>
        <span className="daily-recommended-challenge__chevron" aria-hidden="true">
          ›
        </span>
      </span>
    </button>
  )
}
