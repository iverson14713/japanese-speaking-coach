export type CoachHubCardStatus = 'available' | 'coming-soon' | 'pro-locked'

interface CoachHubCardProps {
  title: string
  subtitle: string
  icon: string
  status: CoachHubCardStatus
  onClick?: () => void
}

export function CoachHubCard({ title, subtitle, icon, status, onClick }: CoachHubCardProps) {
  const locked = status === 'coming-soon'
  const proLocked = status === 'pro-locked'
  const disabled = locked

  return (
    <button
      type="button"
      className={`coach-hub-card${locked ? ' coach-hub-card--locked' : ''}${proLocked ? ' coach-hub-card--pro' : ''}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <span className="coach-hub-card__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="coach-hub-card__copy">
        <span className="coach-hub-card__title">{title}</span>
        <span className="coach-hub-card__desc">{subtitle}</span>
      </span>
      {locked ? (
        <span className="coach-hub-card__badge">即將推出</span>
      ) : proLocked ? (
        <span className="coach-hub-card__badge coach-hub-card__badge--pro">Pro</span>
      ) : (
        <span className="coach-hub-card__chevron" aria-hidden="true">
          ›
        </span>
      )}
    </button>
  )
}
