interface CoachHubCardProps {
  title: string
  subtitle: string
  icon: string
  status: 'available' | 'coming-soon'
  onClick?: () => void
}

export function CoachHubCard({ title, subtitle, icon, status, onClick }: CoachHubCardProps) {
  const locked = status === 'coming-soon'

  return (
    <button
      type="button"
      className={`coach-hub-card${locked ? ' coach-hub-card--locked' : ''}`}
      onClick={locked ? undefined : onClick}
      disabled={locked}
      aria-disabled={locked}
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
      ) : (
        <span className="coach-hub-card__chevron" aria-hidden="true">
          ›
        </span>
      )}
    </button>
  )
}
