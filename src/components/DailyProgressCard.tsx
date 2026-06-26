import { useMemo, useRef } from 'react'
import { MascotAvatar } from './MascotAvatar'
import { getDailyProgressState } from '../utils/dailyProgressState'
import { isValidMascotState, type MascotState } from '../utils/mascotState'

interface DailyProgressCardProps {
  todayCompleted: boolean
  streakCount: number
  lastPracticeDate: string | null
  completedDates: string[]
}

function toMascotState(progress: ReturnType<typeof getDailyProgressState>): MascotState {
  return {
    mood: progress.mascotMood,
    image: progress.mascotImage,
    imageUrl: progress.mascotImageUrl,
    emoji: progress.mascotEmoji,
    title: progress.title,
    message: progress.message,
    showStreak: false,
  }
}

export function DailyProgressCard({
  todayCompleted,
  streakCount,
  lastPracticeDate,
  completedDates,
}: DailyProgressCardProps) {
  const progress = useMemo(
    () =>
      getDailyProgressState({
        todayCompleted,
        streakDays: streakCount,
        lastPracticeDate,
        completedDates,
      }),
    [todayCompleted, streakCount, lastPracticeDate, completedDates],
  )

  const mascotState = useMemo(() => toMascotState(progress), [progress])

  const stableMascotRef = useRef(mascotState)
  if (isValidMascotState(mascotState)) {
    stableMascotRef.current = mascotState
  }
  const displayMascotState = isValidMascotState(mascotState)
    ? mascotState
    : stableMascotRef.current

  const badgeLabel = todayCompleted ? '已完成' : '等待中'
  const displayMessage = todayCompleted
    ? '太棒了！小狗今天超有精神～'
    : '今天還沒練喔，我在等你開口～'
  const hintLabel =
    todayCompleted && streakCount > 0
      ? `🔥 連續練習 ${streakCount} 天`
      : todayCompleted
        ? '今天也完成練習了'
        : '每天一句，輕鬆開口'

  return (
    <article
      className={`daily-progress-card daily-progress-card--${todayCompleted ? 'done' : 'pending'} daily-progress-card--${displayMascotState.mood}`}
      aria-label="今日任務"
    >
      <div className="daily-progress-card__atmosphere" aria-hidden="true">
        <span className="daily-progress-card__cloud daily-progress-card__cloud--1" />
        <span className="daily-progress-card__cloud daily-progress-card__cloud--2" />
        <span className="daily-progress-card__glow" />
      </div>

      <div className="daily-progress-card__main">
        <div className="daily-progress-card__scene" aria-hidden="false">
          <div className="daily-progress-card__scene-ground" aria-hidden="true">
            <span className="daily-progress-card__halo" />
            <span className="daily-progress-card__grass" />
            <span className="daily-progress-card__petal daily-progress-card__petal--1" />
            <span className="daily-progress-card__petal daily-progress-card__petal--2" />
            <span className="daily-progress-card__petal daily-progress-card__petal--3" />
            <span className="daily-progress-card__spark daily-progress-card__spark--1" />
            <span className="daily-progress-card__spark daily-progress-card__spark--2" />
          </div>
          <MascotAvatar state={displayMascotState} className="mascot-avatar--scene" />
        </div>

        <div className="daily-progress-card__body">
          <div className="daily-progress-card__header">
            <h2 className="daily-progress-card__title">今日任務</h2>
            <span
              className={`daily-progress-card__badge daily-progress-card__badge--${todayCompleted ? 'done' : 'pending'}`}
            >
              {badgeLabel}
            </span>
          </div>
          <p className="daily-progress-card__copy">{displayMessage}</p>
          <p className="daily-progress-card__hint">
            <span className="daily-progress-card__hint-icon" aria-hidden="true">
              {todayCompleted ? '✨' : '🌱'}
            </span>
            {hintLabel}
          </p>
        </div>
      </div>

      <div className="daily-progress-card__week" aria-label="本週練習進度">
        <span className="daily-progress-card__week-label">本週進度</span>
        <div className="daily-progress-card__week-dots" role="list">
          {progress.weekProgress.map((day) => (
            <span
              key={day.dateKey}
              role="listitem"
              className={`weekly-dot${day.completed ? ' weekly-dot--done' : ''}${day.isToday ? ' weekly-dot--today' : ''}`}
              aria-label={`${day.completed ? '已完成' : '未完成'}${day.isToday ? '，今天' : ''}`}
            />
          ))}
        </div>
        <span className="daily-progress-card__week-streak">連續 {progress.streakDays} 天</span>
      </div>
    </article>
  )
}
