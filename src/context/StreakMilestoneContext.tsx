import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  STREAK_MILESTONE_MESSAGES,
  type StreakMilestoneDay,
} from '../constants/streakConfig'

interface StreakMilestoneContextValue {
  showMilestone: (milestone: StreakMilestoneDay) => void
}

const StreakMilestoneContext = createContext<StreakMilestoneContextValue | null>(null)

export function StreakMilestoneProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<StreakMilestoneDay[]>([])
  const [activeMilestone, setActiveMilestone] = useState<StreakMilestoneDay | null>(null)

  const showMilestone = useCallback((milestone: StreakMilestoneDay) => {
    setQueue((current) => [...current, milestone])
  }, [])

  useEffect(() => {
    if (activeMilestone !== null || queue.length === 0) {
      return
    }

    const [next, ...rest] = queue
    setActiveMilestone(next)
    setQueue(rest)
  }, [activeMilestone, queue])

  const handleClose = useCallback(() => {
    setActiveMilestone(null)
  }, [])

  const value = useMemo(() => ({ showMilestone }), [showMilestone])

  return (
    <StreakMilestoneContext.Provider value={value}>
      {children}
      <StreakMilestoneModal milestone={activeMilestone} onClose={handleClose} />
    </StreakMilestoneContext.Provider>
  )
}

interface StreakMilestoneModalProps {
  milestone: StreakMilestoneDay | null
  onClose: () => void
}

function StreakMilestoneModal({ milestone, onClose }: StreakMilestoneModalProps) {
  if (!milestone) {
    return null
  }

  const message = STREAK_MILESTONE_MESSAGES[milestone]
  const title =
    milestone === 15 ? '稱號解鎖' : milestone === 30 ? '習慣養成徽章' : '連續練習里程碑'

  return (
    <div className="streak-milestone-modal" role="presentation" onClick={onClose}>
      <div
        className="streak-milestone-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="streak-milestone-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="streak-milestone-modal__emoji" aria-hidden="true">
          {milestone === 30 ? '🏅' : '🎖️'}
        </span>
        <h2 id="streak-milestone-title" className="streak-milestone-modal__title">
          {title}
        </h2>
        <p className="streak-milestone-modal__message">{message}</p>
        <button type="button" className="streak-milestone-modal__button" onClick={onClose}>
          太好了
        </button>
      </div>
    </div>
  )
}

export function useStreakMilestone(): StreakMilestoneContextValue {
  const context = useContext(StreakMilestoneContext)
  if (!context) {
    throw new Error('useStreakMilestone must be used within StreakMilestoneProvider')
  }
  return context
}
