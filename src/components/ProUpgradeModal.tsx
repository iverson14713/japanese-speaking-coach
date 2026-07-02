import { useEffect, useState } from 'react'
import type { ProUpgradeReason } from '../context/ProUpgradeContext'
import {
  ADVANCED_CHALLENGE_UNLOCK_FEATURES,
  getProUpgradeCopy,
  PRO_UNLOCK_FEATURES,
} from '../constants/proEntitlements'
import { PRO_PRICE_FALLBACK, type ProProductDisplayPrices } from '../constants/proProducts'
import { useProEntitlement } from '../hooks/useProEntitlement'
import { fetchProProductPrices } from '../services/proEntitlement'
import { showToast } from '../utils/toast'

const DEFAULT_PRICES: ProProductDisplayPrices = {
  monthly: PRO_PRICE_FALLBACK.monthly,
  yearly: PRO_PRICE_FALLBACK.yearly,
  yearlySavingsLabel: PRO_PRICE_FALLBACK.yearlySavingsLabel,
}

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
  const [prices, setPrices] = useState<ProProductDisplayPrices>(DEFAULT_PRICES)

  useEffect(() => {
    if (!open) {
      return
    }

    let cancelled = false
    void fetchProProductPrices()
      .then((nextPrices) => {
        if (!cancelled) {
          setPrices(nextPrices)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPrices(DEFAULT_PRICES)
        }
      })

    return () => {
      cancelled = true
    }
  }, [open])

  if (!open) {
    return null
  }

  const isBusy = loadingAction !== null
  const copy = getProUpgradeCopy(reason)
  const unlockFeatures =
    reason === 'advanced-challenge' ? ADVANCED_CHALLENGE_UNLOCK_FEATURES : PRO_UNLOCK_FEATURES

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
          {copy.title}
        </h2>
        <p className="pro-modal__subtitle">{copy.subtitle}</p>

        <p className="pro-modal__section-label">Pro 解鎖</p>
        <ul className="pro-modal__features">
          {unlockFeatures.map((feature) => (
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
            className="pro-modal__upgrade pro-modal__plan-btn"
            onClick={() => void handlePurchase('monthly')}
            disabled={isBusy}
          >
            <span className="pro-modal__plan-label">
              {loadingAction === 'monthly' ? '處理中…' : '升級 Pro'}
            </span>
            {loadingAction !== 'monthly' ? (
              <span className="pro-modal__plan-price">{prices.monthly}</span>
            ) : null}
          </button>

          <button
            type="button"
            className="pro-modal__upgrade pro-modal__upgrade--secondary pro-modal__plan-btn pro-modal__plan-btn--yearly"
            onClick={() => void handlePurchase('yearly')}
            disabled={isBusy}
          >
            <span className="pro-modal__plan-badges" aria-hidden="true">
              <span className="pro-modal__plan-badge">推薦</span>
            </span>
            <span className="pro-modal__plan-label">
              {loadingAction === 'yearly' ? '處理中…' : '年費升級'}
            </span>
            {loadingAction !== 'yearly' ? (
              <>
                <span className="pro-modal__plan-price">{prices.yearly}</span>
                <span className="pro-modal__plan-savings">{prices.yearlySavingsLabel}</span>
              </>
            ) : null}
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
          {copy.dismissLabel}
        </button>
      </div>
    </div>
  )
}
