import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { DialogueCategoryId } from '../data/dialogues'
import type { AppTab } from '../components/BottomTabBar'
import type { CrossPromoApp } from '../constants/crossPromoApps'
import { getAvailableCrossPromoApps } from '../constants/crossPromoApps'
import {
  getCrossPromoAppAtIndex,
  getCrossPromoSurface,
  getInitialPromoIndex,
  type CrossPromoSurface,
} from '../utils/crossPromoSelection'

interface CrossPromoContextValue {
  currentApp: CrossPromoApp | null
}

const CrossPromoContext = createContext<CrossPromoContextValue | null>(null)

interface CrossPromoProviderProps {
  activeTab: AppTab
  dialogueCategory: DialogueCategoryId | null
  children: ReactNode
}

export function CrossPromoProvider({
  activeTab,
  dialogueCategory,
  children,
}: CrossPromoProviderProps) {
  const [promoIndex, setPromoIndex] = useState(() => getInitialPromoIndex())
  const pendingAdvanceRef = useRef<Set<CrossPromoSurface>>(new Set())
  const prevSurfaceRef = useRef<CrossPromoSurface | null>(null)

  useEffect(() => {
    const surface = getCrossPromoSurface(activeTab, dialogueCategory)
    const prev = prevSurfaceRef.current

    if (prev === null) {
      prevSurfaceRef.current = surface
      return
    }

    if (surface !== null && pendingAdvanceRef.current.has(surface)) {
      const apps = getAvailableCrossPromoApps()
      if (apps.length > 0) {
        setPromoIndex((current) => (current + 1) % apps.length)
      }
      pendingAdvanceRef.current.delete(surface)
    }

    if (prev !== surface) {
      if (prev !== null) {
        pendingAdvanceRef.current.add(prev)
      }

      if (prev !== null && surface !== null && prev !== surface) {
        pendingAdvanceRef.current.delete(surface)
      }
    }

    prevSurfaceRef.current = surface
  }, [activeTab, dialogueCategory])

  const currentApp = useMemo(() => getCrossPromoAppAtIndex(promoIndex), [promoIndex])

  const value = useMemo(
    () => ({
      currentApp,
    }),
    [currentApp],
  )

  return <CrossPromoContext.Provider value={value}>{children}</CrossPromoContext.Provider>
}

export function useCrossPromo(): CrossPromoContextValue {
  const context = useContext(CrossPromoContext)
  if (!context) {
    throw new Error('useCrossPromo must be used within CrossPromoProvider')
  }
  return context
}
