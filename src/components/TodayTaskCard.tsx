import { useMemo } from 'react'
import { MascotAvatar } from './MascotAvatar'
import { getMascotState } from '../utils/mascotState'

interface TodayTaskCardProps {
  todayCompleted: boolean
  streakCount: number
  lastPracticeDate: string | null
}

export function TodayTaskCard({
  todayCompleted,
  streakCount,
  lastPracticeDate,
}: TodayTaskCardProps) {
  const mascotState = useMemo(
    () =>
      getMascotState({
        todayCompleted,
        streakDays: streakCount,
        lastPracticeDate,
      }),
    [todayCompleted, streakCount, lastPracticeDate],
  )

  return (
    <article
      className={`today-task-card today-task-card--${todayCompleted ? 'done' : 'pending'} today-task-card--${mascotState.mood}`}
      aria-label={mascotState.title}
    >
      <MascotAvatar state={mascotState} />
      <div className="today-task-card__body">
        <h2 className="today-task-card__title">{mascotState.title}</h2>
        <p className="today-task-card__copy">{mascotState.message}</p>
        {mascotState.showStreak && streakCount > 0 ? (
          <p className="today-task-card__streak">連續練習 {streakCount} 天</p>
        ) : null}
      </div>
    </article>
  )
}
