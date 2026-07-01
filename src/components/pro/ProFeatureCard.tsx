interface ProFeatureCardProps {
  title: string
  subtitle: string
  icon: string
  locked?: boolean
  badge?: string
  onClick: () => void
}

export function ProFeatureCard({
  title,
  subtitle,
  icon,
  locked = false,
  badge,
  onClick,
}: ProFeatureCardProps) {
  return (
    <button
      type="button"
      className={`pro-feature-card${locked ? ' pro-feature-card--locked' : ''}`}
      onClick={onClick}
      aria-label={locked ? `${title}（Pro 功能）` : title}
    >
      <span className="pro-feature-card__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="pro-feature-card__copy">
        <span className="pro-feature-card__title-row">
          <span className="pro-feature-card__title">{title}</span>
          {locked ? (
            <span className="pro-feature-card__pro-badge">Pro</span>
          ) : badge ? (
            <span className="pro-feature-card__badge">{badge}</span>
          ) : null}
        </span>
        <span className="pro-feature-card__subtitle">{subtitle}</span>
      </span>
      <span className="pro-feature-card__chevron" aria-hidden="true">
        {locked ? '🔒' : '›'}
      </span>
    </button>
  )
}
