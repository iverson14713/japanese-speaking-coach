interface TodayTaskCardProps {
  todayCompleted: boolean
  streakCount: number
}

export function TodayTaskCard({ todayCompleted, streakCount }: TodayTaskCardProps) {
  return (
    <article
      className={`today-task-card today-task-card--${todayCompleted ? 'done' : 'pending'}`}
      aria-label={todayCompleted ? '今日旅行口說任務已完成' : '今日旅行口說任務尚未完成'}
    >
      <div className="today-task-card__badge" aria-hidden="true">
        {todayCompleted ? '✓' : '◎'}
      </div>
      <div className="today-task-card__body">
        <p className="today-task-card__eyebrow">今日旅行口說任務</p>
        <p className="today-task-card__mission">今天練會這一句，出國時用得上。</p>

        <div className="today-task-card__status">
          <h2 className="today-task-card__status-title">
            {todayCompleted ? '今日已完成' : '今日尚未完成'}
          </h2>
          <p className="today-task-card__status-copy">
            {todayCompleted
              ? '做得好！今天又多會一句旅行口說。'
              : '今天花 30 秒，練會一句出國會用到的話。'}
          </p>
          {todayCompleted ? (
            <p className="today-task-card__streak">連續練習 {streakCount} 天</p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
