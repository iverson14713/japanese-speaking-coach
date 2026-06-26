import { getCurrentWeekDateKeys, getTodayDateKey } from '../utils/dateKey'

interface WeeklyProgressProps {
  completedDates: string[]
  streakCount: number
}

export function WeeklyProgress({ completedDates, streakCount }: WeeklyProgressProps) {
  const weekDates = getCurrentWeekDateKeys()
  const today = getTodayDateKey()
  const completedSet = new Set(completedDates)

  return (
    <section className="weekly-progress weekly-progress--compact" aria-label="本週練習進度">
      <span className="weekly-progress-label">本週進度</span>
      <div className="weekly-progress-dots" role="list">
        {weekDates.map((dateKey) => {
          const isDone = completedSet.has(dateKey)
          const isToday = dateKey === today
          return (
            <span
              key={dateKey}
              role="listitem"
              className={`weekly-dot${isDone ? ' weekly-dot--done' : ''}${isToday ? ' weekly-dot--today' : ''}`}
              aria-label={`${isDone ? '已完成' : '未完成'}${isToday ? '，今天' : ''}`}
            />
          )
        })}
      </div>
      <span className="weekly-progress-streak">連續 {streakCount} 天</span>
    </section>
  )
}
