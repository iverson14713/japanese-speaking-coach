import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { ProUpgradeModal } from '../components/ProUpgradeModal'

export type ProUpgradeReason = 'coach-limit' | 'pro-feature' | 'favorites-limit'

interface ProUpgradeContextValue {
  openProUpgrade: (reason?: ProUpgradeReason) => void
  closeProUpgrade: () => void
  isProUpgradeOpen: boolean
  proUpgradeReason: ProUpgradeReason | null
}

const ProUpgradeContext = createContext<ProUpgradeContextValue | null>(null)

export function ProUpgradeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState<ProUpgradeReason | null>(null)

  const openProUpgrade = useCallback((nextReason?: ProUpgradeReason) => {
    setReason(nextReason ?? null)
    setIsOpen(true)
  }, [])

  const closeProUpgrade = useCallback(() => {
    setIsOpen(false)
  }, [])

  const value = useMemo(
    () => ({
      openProUpgrade,
      closeProUpgrade,
      isProUpgradeOpen: isOpen,
      proUpgradeReason: reason,
    }),
    [openProUpgrade, closeProUpgrade, isOpen, reason],
  )

  return (
    <ProUpgradeContext.Provider value={value}>
      {children}
      <ProUpgradeModal open={isOpen} reason={reason} onClose={closeProUpgrade} />
    </ProUpgradeContext.Provider>
  )
}

export function useProUpgrade(): ProUpgradeContextValue {
  const context = useContext(ProUpgradeContext)
  if (!context) {
    throw new Error('useProUpgrade must be used within ProUpgradeProvider')
  }
  return context
}
