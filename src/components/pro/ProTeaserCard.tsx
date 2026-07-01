import { PRO_AI_TAGLINE } from '../../constants/proEntitlements'

interface ProTeaserCardProps {
  onUpgrade: () => void
}

export function ProTeaserCard({ onUpgrade }: ProTeaserCardProps) {
  return (
    <div className="pro-teaser-card">
      <div className="pro-teaser-card__copy">
        <p className="pro-teaser-card__eyebrow">Pro AI 教練</p>
        <p className="pro-teaser-card__title">{PRO_AI_TAGLINE}</p>
        <p className="pro-teaser-card__hint">還會整理你的口說弱點，並解鎖情境實戰</p>
      </div>
      <button type="button" className="pro-teaser-card__cta" onClick={onUpgrade}>
        升級 Pro
      </button>
    </div>
  )
}
