import type { CrossPromoApp } from '../constants/crossPromoApps'
import { openExternalUrl } from '../utils/openExternalUrl'

interface CrossPromoCardProps {
  app: CrossPromoApp
}

export function CrossPromoCard({ app }: CrossPromoCardProps) {
  const handleOpen = () => {
    openExternalUrl(app.appStoreUrl)
  }

  return (
    <section className="cross-promo-section" aria-label="推薦 App">
      <p className="cross-promo-section__title">更多 Wayne 的 App</p>

      <button type="button" className="cross-promo-card" onClick={handleOpen}>
        <img
          className="cross-promo-card__icon"
          src={app.icon}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
        />

        <span className="cross-promo-card__body">
          <span className="cross-promo-card__name">{app.name}</span>
          <span className="cross-promo-card__description">{app.description}</span>
        </span>

        <span className="cross-promo-card__tag" aria-hidden="true">
          推薦
        </span>

        <span className="cross-promo-card__chevron" aria-hidden="true">
          ›
        </span>
      </button>
    </section>
  )
}
