interface TodayTaskCardProps {
  todayCompleted: boolean
  streakCount: number
}

export function TodayTaskCard({ todayCompleted, streakCount }: TodayTaskCardProps) {
  return (
    <article
      className={`today-task-card today-task-card--${todayCompleted ? 'done' : 'pending'}`}
      aria-label={todayCompleted ? '今日任務已完成' : '今日任務尚未完成'}
    >
      <div className="today-task-card__body">
        <h2 className="today-task-card__title">
          {todayCompleted ? '今日已完成' : '今日任務'}
        </h2>
        <p className="today-task-card__copy">
          {todayCompleted
            ? '做得好！今天又多會一句旅行口說。'
            : '今天練會一句出國會用到的話。'}
        </p>
        {!todayCompleted ? (
          <p className="today-task-card__streak">連續練習 {streakCount} 天</p>
        ) : null}
      </div>
    </article>
  )
}
