import { getCurrentWeekDateKeys, getTodayDateKey } from '../utils/dateKey'

const WEEKDAY_LABELS = ['一', '二', '三', '四', '五', '六', '日']

interface WeeklyProgressProps {
  completedDates: string[]
}

export function WeeklyProgress({ completedDates }: WeeklyProgressProps) {
  const weekDates = getCurrentWeekDateKeys()
  const today = getTodayDateKey()
  const completedSet = new Set(completedDates)

  return (
    <section className="weekly-progress" aria-label="本週練習進度">
      <p className="weekly-progress-label">本週進度</p>
      <div className="weekly-progress-dots">
        {weekDates.map((dateKey, index) => {
          const isDone = completedSet.has(dateKey)
          const isToday = dateKey === today
          return (
            <div key={dateKey} className="weekly-progress-day">
              <span
                className={`weekly-dot${isDone ? ' weekly-dot--done' : ''}${isToday ? ' weekly-dot--today' : ''}`}
                aria-label={`${WEEKDAY_LABELS[index]}${isDone ? '，已完成' : ''}${isToday ? '，今天' : ''}`}
              />
              <span className={`weekly-day-label${isToday ? ' weekly-day-label--today' : ''}`}>
                {WEEKDAY_LABELS[index]}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
