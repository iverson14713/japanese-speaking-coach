import { useMemo, useRef } from 'react'
import { MascotAvatar } from './MascotAvatar'
import { getDailyProgressState } from '../utils/dailyProgressState'
import { isValidMascotState, type MascotState } from '../utils/mascotState'

const DAILY_HERO_GARDEN = '/images/daily-hero-bg.png'

const WEEKDAY_LABELS = ['一', '二', '三', '四', '五', '六', '日'] as const

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
  const badgeIcon = todayCompleted ? '✓' : '⏳'
  const displayMessage = todayCompleted
    ? '太棒了！小狗今天超有精神～'
    : '今天還沒練喔，我在等你開口～'
  const hintLabel =
    todayCompleted && streakCount > 0
      ? `連續練習 ${streakCount} 天`
      : todayCompleted
        ? '今天也完成練習了'
        : '每日一句，輕鬆開口'

  return (
    <article
      className={`daily-progress-card daily-progress-card--${todayCompleted ? 'done' : 'pending'} daily-progress-card--${displayMascotState.mood}`}
      aria-label="今日任務"
    >
      <div className="daily-progress-card__hero">
        <img
          className="daily-progress-card__hero-bg"
          src={DAILY_HERO_GARDEN}
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <div className="daily-progress-card__hero-overlay" aria-hidden="true" />

        <div className="daily-progress-card__hero-inner">
          <div className="daily-progress-card__mascot">
            <MascotAvatar state={displayMascotState} className="mascot-avatar--hero" />
          </div>

          <div className="daily-progress-card__body">
            <div className="daily-progress-card__title-row">
              <h2 className="daily-progress-card__title">今日任務</h2>
              <span
                className={`daily-progress-card__badge daily-progress-card__badge--${todayCompleted ? 'done' : 'pending'}`}
              >
                <span className="daily-progress-card__badge-icon" aria-hidden="true">
                  {badgeIcon}
                </span>
                {badgeLabel}
              </span>
            </div>
            <p className="daily-progress-card__copy">{displayMessage}</p>
            <p className="daily-progress-card__hint">
              <span className="daily-progress-card__hint-icon-wrap" aria-hidden="true">
                <span className="daily-progress-card__hint-icon">
                  {todayCompleted ? '✨' : '🌱'}
                </span>
              </span>
              {hintLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="daily-progress-card__progress" aria-label="本週練習進度">
        <span className="daily-progress-card__progress-label">本週進度</span>

        <div className="daily-progress-card__week-grid" role="list">
          {progress.weekProgress.map((day, index) => (
            <div key={day.dateKey} className="daily-progress-card__day" role="listitem">
              <span className="daily-progress-card__day-label">{WEEKDAY_LABELS[index]}</span>
              <span
                className={`weekly-dot${day.completed ? ' weekly-dot--done' : ''}${day.isToday ? ' weekly-dot--today' : ''}`}
                aria-label={`週${WEEKDAY_LABELS[index]}${day.completed ? '已完成' : '未完成'}${day.isToday ? '，今天' : ''}`}
              />
            </div>
          ))}
        </div>

        <p className="daily-progress-card__streak">
          連續{' '}
          <strong className="daily-progress-card__streak-num">{progress.streakDays}</strong> 天
        </p>
      </div>
    </article>
  )
}
