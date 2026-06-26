import { useState } from 'react'
import type { ProUpgradeReason } from '../context/ProUpgradeContext'
import { useProEntitlement } from '../hooks/useProEntitlement'
import { showToast } from '../utils/toast'

const FEATURES = [
  '每日 5 次 AI 口說教練',
  '單次最多 8 回合',
  '自由聊天與情境練習都能用',
  '不會說時可用中文問教練',
  '句庫收藏不限',
] as const

interface ProUpgradeModalProps {
  open: boolean
  reason: ProUpgradeReason | null
  onClose: () => void
}

export function ProUpgradeModal({ open, reason, onClose }: ProUpgradeModalProps) {
  const { purchaseMonthly, purchaseYearly, restorePurchases } = useProEntitlement()
  const [loadingAction, setLoadingAction] = useState<
    'monthly' | 'yearly' | 'restore' | null
  >(null)

  if (!open) {
    return null
  }

  const isBusy = loadingAction !== null

  const handlePurchase = async (plan: 'monthly' | 'yearly') => {
    if (isBusy) {
      return
    }

    setLoadingAction(plan)
    try {
      const result = plan === 'monthly' ? await purchaseMonthly() : await purchaseYearly()
      switch (result.status) {
        case 'success':
          showToast(result.message)
          onClose()
          break
        case 'cancelled':
          break
        case 'not_available':
        case 'failed':
          showToast(result.message)
          break
      }
    } finally {
      setLoadingAction(null)
    }
  }

  const handleRestore = async () => {
    if (isBusy) {
      return
    }

    setLoadingAction('restore')
    try {
      const result = await restorePurchases()
      switch (result.status) {
        case 'restored':
          showToast(result.message)
          onClose()
          break
        case 'none':
        case 'failed':
          showToast(result.message)
          break
      }
    } finally {
      setLoadingAction(null)
    }
  }

  const title = reason === 'coach-limit' ? '今天 AI 練習次數用完了' : '升級 Pro'
  const subtitle = '升級 Pro，讓 AI 教練每天陪你多練幾回。'

  return (
    <div className="pro-modal" role="presentation" onClick={onClose}>
      <div
        className="pro-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="pro-modal-title" className="pro-modal__title">
          {title}
        </h2>
        <p className="pro-modal__subtitle">{subtitle}</p>

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

        <div className="pro-modal__plans">
          <button
            type="button"
            className="pro-modal__upgrade"
            onClick={() => void handlePurchase('monthly')}
            disabled={isBusy}
          >
            {loadingAction === 'monthly' ? '處理中…' : '月費升級'}
          </button>
          <button
            type="button"
            className="pro-modal__upgrade pro-modal__upgrade--secondary"
            onClick={() => void handlePurchase('yearly')}
            disabled={isBusy}
          >
            {loadingAction === 'yearly' ? '處理中…' : '年費升級'}
          </button>
        </div>

        <button
          type="button"
          className="pro-modal__restore"
          onClick={() => void handleRestore()}
          disabled={isBusy}
        >
          {loadingAction === 'restore' ? '恢復中…' : '恢復購買'}
        </button>
        <button type="button" className="pro-modal__later" onClick={onClose} disabled={isBusy}>
          稍後再說
        </button>
      </div>
    </div>
  )
}
