import { useCallback, useEffect, useState } from 'react'
import type { Language } from '../data/types'
import type { CoachAiSource } from '../services/ai'
import { COACH_AI_SOURCE_LABELS } from '../services/ai'
import {
  applyDebugStreakCount,
  getClaimedMilestones,
  getLastPracticeDate,
  getStreak,
  getStreakFreezeCards,
  isTodayCompleted,
  resetDebugStreakData,
} from '../utils/dailyPracticeStorage'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { showToast } from '../utils/toast'

interface DeveloperModePanelProps {
  open: boolean
  language: Language
  aiSource: CoachAiSource
  autoSpeakEnabled: boolean
  isPro: boolean
  onClose: () => void
  onTogglePro: () => void
  onDisableDebugMode: () => void
}

const STREAK_QUICK_VALUES = [0, 5, 10, 15, 30] as const

export function DeveloperModePanel({
  open,
  language,
  aiSource,
  autoSpeakEnabled,
  isPro,
  onClose,
  onTogglePro,
  onDisableDebugMode,
}: DeveloperModePanelProps) {
  const [streakInput, setStreakInput] = useState('0')
  const [streakCount, setStreakCount] = useState(0)
  const [lastPracticeDate, setLastPracticeDate] = useState<string | null>(null)
  const [freezeCards, setFreezeCards] = useState(0)
  const [todayCompleted, setTodayCompleted] = useState(false)
  const [claimedMilestones, setClaimedMilestones] = useState<number[]>([])

  useBodyScrollLock(open)

  const refreshStreakState = useCallback(() => {
    setStreakCount(getStreak(language))
    setLastPracticeDate(getLastPracticeDate(language))
    setFreezeCards(getStreakFreezeCards(language))
    setTodayCompleted(isTodayCompleted(language))
    setClaimedMilestones(getClaimedMilestones(language))
    setStreakInput(String(getStreak(language)))
  }, [language])

  useEffect(() => {
    if (open) {
      refreshStreakState()
    }
  }, [open, refreshStreakState])

  if (!open) {
    return null
  }

  const applyStreakCount = (count: number) => {
    applyDebugStreakCount(language, count)
    refreshStreakState()
    showToast(`已設定連續練習為 ${Math.max(0, Math.floor(count))} 天`)
  }

  const handleApplyStreak = () => {
    const parsed = Number(streakInput)
    if (!Number.isFinite(parsed) || parsed < 0) {
      showToast('請輸入 0 以上的整數')
      return
    }
    applyStreakCount(parsed)
  }

  const handleResetStreak = () => {
    resetDebugStreakData(language)
    refreshStreakState()
    showToast('已重置連續練習資料')
  }

  return (
    <div className="dev-modal" role="presentation" onClick={onClose}>
      <div
        className="dev-modal__card dev-panel-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dev-panel-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="dev-panel-modal__header">
          <h2 id="dev-panel-title" className="dev-modal__title">
            開發者模式
          </h2>
          <button type="button" className="dev-panel-modal__close" onClick={onClose} aria-label="關閉">
            ×
          </button>
        </div>

        <div className="dev-panel-modal__body">
          <section className="dev-panel-section">
            <h3 className="dev-panel-section__title">AI 教練測試</h3>
            <dl className="dev-panel-stats">
              <div className="dev-panel-stats__row">
                <dt>AI Source</dt>
                <dd>{COACH_AI_SOURCE_LABELS[aiSource]}</dd>
              </div>
              <div className="dev-panel-stats__row">
                <dt>自動朗讀</dt>
                <dd>{autoSpeakEnabled ? '開' : '關'}</dd>
              </div>
              <div className="dev-panel-stats__row">
                <dt>Pro</dt>
                <dd>{isPro ? '開' : '關'}</dd>
              </div>
            </dl>
            <div className="dev-panel-actions">
              <button type="button" className="dev-panel-button" onClick={onTogglePro}>
                {isPro ? '關閉測試 Pro' : '開啟測試 Pro'}
              </button>
              <button
                type="button"
                className="dev-panel-button dev-panel-button--danger"
                onClick={onDisableDebugMode}
              >
                關閉開發者模式
              </button>
            </div>
          </section>

          <section className="dev-panel-section">
            <h3 className="dev-panel-section__title">連續練習測試</h3>
            <dl className="dev-panel-stats">
              <div className="dev-panel-stats__row">
                <dt>目前連續天數</dt>
                <dd>{streakCount} 天</dd>
              </div>
              <div className="dev-panel-stats__row">
                <dt>lastPracticeDate</dt>
                <dd>{lastPracticeDate ?? '—'}</dd>
              </div>
              <div className="dev-panel-stats__row">
                <dt>補練卡</dt>
                <dd>x{freezeCards}</dd>
              </div>
              <div className="dev-panel-stats__row">
                <dt>今天已完成</dt>
                <dd>{todayCompleted ? '是' : '否'}</dd>
              </div>
              <div className="dev-panel-stats__row">
                <dt>claimedMilestones</dt>
                <dd>{claimedMilestones.length > 0 ? claimedMilestones.join(', ') : '—'}</dd>
              </div>
            </dl>

            <label className="dev-modal__field">
              <span className="dev-modal__label">設定連續練習天數</span>
              <input
                type="number"
                min={0}
                step={1}
                className="dev-modal__input"
                value={streakInput}
                onChange={(event) => setStreakInput(event.target.value)}
              />
            </label>
            <button type="button" className="dev-panel-button dev-panel-button--primary" onClick={handleApplyStreak}>
              套用
            </button>

            <div className="dev-panel-quick">
              {STREAK_QUICK_VALUES.map((value) => (
                <button
                  key={value}
                  type="button"
                  className="dev-panel-quick__button"
                  onClick={() => applyStreakCount(value)}
                >
                  設為 {value} 天
                </button>
              ))}
            </div>

            <button
              type="button"
              className="dev-panel-button dev-panel-button--danger dev-panel-button--full"
              onClick={handleResetStreak}
            >
              重置連續練習資料
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
