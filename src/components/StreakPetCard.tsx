import { useMemo } from 'react'
import { getTodayDateKey } from '../utils/dateKey'

const INCOMPLETE_MESSAGES = [
  '今天不開口，到了日本我只能幫你搖尾巴。',
  '再偷懶一天，我們出國就只能用眼神交流了。',
  '你今天還沒練，我已經把行李收起來了。',
  '只要一句就好，不然我會有點失望喔。',
]

const COMPLETE_MESSAGES = [
  '做得好！今天又多會一句旅行口說。',
  '連續累積中，出國時你會更敢開口。',
  '不錯喔，今天的你比昨天更像旅人了。',
  '小夥伴恢復元氣！明天也一起練一句。',
]

const PET_EMOJI = {
  dog: { idle: '🐶💤', active: '🐶✨' },
  cat: { idle: '🐱😿', active: '🐱😺' },
} as const

function pickDailyMessage(messages: string[], seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0
  }
  return messages[Math.abs(hash) % messages.length]
}

export type PetType = 'dog' | 'cat'

interface StreakPetCardProps {
  todayCompleted: boolean
  streakCount: number
  petType?: PetType
}

export function StreakPetCard({
  todayCompleted,
  streakCount,
  petType = 'dog',
}: StreakPetCardProps) {
  const dateSeed = getTodayDateKey()

  const quote = useMemo(
    () =>
      pickDailyMessage(
        todayCompleted ? COMPLETE_MESSAGES : INCOMPLETE_MESSAGES,
        `${dateSeed}:${todayCompleted ? 'done' : 'todo'}`,
      ),
    [todayCompleted, dateSeed],
  )

  const petEmoji = todayCompleted ? PET_EMOJI[petType].active : PET_EMOJI[petType].idle

  return (
    <article
      className={`streak-pet-card streak-pet-card--${todayCompleted ? 'active' : 'idle'}`}
      aria-label={todayCompleted ? '今日練習已完成' : '今日尚未練習'}
    >
      <div className="streak-pet-emoji" aria-hidden="true">
        {petEmoji}
      </div>
      <div className="streak-pet-body">
        <h2 className="streak-pet-title">
          {todayCompleted ? '今日已完成' : '今日還沒練習'}
        </h2>
        <p className="streak-pet-quote">{quote}</p>
        {todayCompleted ? (
          <p className="streak-pet-streak">🔥 連續練習 {streakCount} 天</p>
        ) : (
          <>
            <p className="streak-pet-sub">完成今日一句，讓小夥伴恢復元氣</p>
            <p className="streak-pet-hint">往下完成今日句子</p>
          </>
        )}
      </div>
    </article>
  )
}
