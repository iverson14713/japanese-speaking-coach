import type { ProUpgradeReason } from '../context/ProUpgradeContext'
import { showToast } from '../utils/toast'

const FEATURES = [
  '每日 5 次 AI 口說教練',
  '單次最多 8 回合',
  '完整情境練習',
  '收藏句子不限',
  '無廣告干擾',
] as const

interface ProUpgradeModalProps {
  open: boolean
  reason: ProUpgradeReason | null
  onClose: () => void
}

export function ProUpgradeModal({ open, reason, onClose }: ProUpgradeModalProps) {
  if (!open) {
    return null
  }

  const handleUpgrade = () => {
    showToast('Pro 功能準備中')
    onClose()
  }

  return (
    <div className="pro-modal" role="presentation" onClick={onClose}>
      <div
        className="pro-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        {reason === 'coach-limit' ? (
          <p className="pro-modal__hint">今日免費次數已用完</p>
        ) : null}

        <h2 id="pro-modal-title" className="pro-modal__title">
          升級 Pro，讓 AI 每天陪你多練幾次
        </h2>
        <p className="pro-modal__subtitle">出國前多練幾回，開口更有底氣。</p>

        <ul className="pro-modal__features">
          {FEATURES.map((feature) => (
            <li key={feature} className="pro-modal__feature">
              <span className="pro-modal__check" aria-hidden="true">
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button type="button" className="pro-modal__upgrade" onClick={handleUpgrade}>
          升級 Pro
        </button>
        <button type="button" className="pro-modal__later" onClick={onClose}>
          稍後再說
        </button>
      </div>
    </div>
  )
}
