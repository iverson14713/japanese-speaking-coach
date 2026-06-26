import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CoachPlan } from '../services/ai/types'
import {
  getProStatus,
  initializeProEntitlement,
  purchaseMonthly,
  purchaseYearly,
  refreshProStatus as refreshProStatusService,
  restorePurchases,
  setProStatus,
  subscribeProStatus,
  type PurchaseOutcome,
  type RestoreOutcome,
} from '../services/proEntitlement'

interface ProEntitlementContextValue {
  isPro: boolean
  coachPlan: CoachPlan
  refreshProStatus: () => Promise<boolean>
  purchaseMonthly: () => Promise<PurchaseOutcome>
  purchaseYearly: () => Promise<PurchaseOutcome>
  restorePurchases: () => Promise<RestoreOutcome>
  setDebugProStatus: (enabled: boolean) => void
}

const ProEntitlementContext = createContext<ProEntitlementContextValue | null>(null)

export function ProEntitlementProvider({ children }: { children: ReactNode }) {
  const [isPro, setIsPro] = useState(() => getProStatus())

  useEffect(() => {
    void initializeProEntitlement().then(setIsPro)
    return subscribeProStatus(setIsPro)
  }, [])

  const refreshProStatus = useCallback(async () => {
    const next = await refreshProStatusService()
    setIsPro(next)
    return next
  }, [])

  const handlePurchaseMonthly = useCallback(async () => {
    const result = await purchaseMonthly()
    setIsPro(getProStatus())
    return result
  }, [])

  const handlePurchaseYearly = useCallback(async () => {
    const result = await purchaseYearly()
    setIsPro(getProStatus())
    return result
  }, [])

  const handleRestorePurchases = useCallback(async () => {
    const result = await restorePurchases()
    setIsPro(getProStatus())
    return result
  }, [])

  const setDebugProStatus = useCallback((enabled: boolean) => {
    setProStatus(enabled)
    setIsPro(getProStatus())
  }, [])

  const value = useMemo(
    () => ({
      isPro,
      coachPlan: (isPro ? 'pro' : 'free') as CoachPlan,
      refreshProStatus,
      purchaseMonthly: handlePurchaseMonthly,
      purchaseYearly: handlePurchaseYearly,
      restorePurchases: handleRestorePurchases,
      setDebugProStatus,
    }),
    [
      isPro,
      refreshProStatus,
      handlePurchaseMonthly,
      handlePurchaseYearly,
      handleRestorePurchases,
      setDebugProStatus,
    ],
  )

  return <ProEntitlementContext.Provider value={value}>{children}</ProEntitlementContext.Provider>
}

export function useProEntitlement(): ProEntitlementContextValue {
  const context = useContext(ProEntitlementContext)
  if (!context) {
    throw new Error('useProEntitlement must be used within ProEntitlementProvider')
  }
  return context
}
