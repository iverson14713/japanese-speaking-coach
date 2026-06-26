import { useMemo } from 'react'
import { useProEntitlement } from '../hooks/useProEntitlement'
import { pickCrossPromoApp, type CrossPromoTab } from '../utils/crossPromoSelection'
import { CrossPromoCard } from './CrossPromoCard'

interface CrossPromoSectionProps {
  tab: CrossPromoTab
}

export function CrossPromoSection({ tab }: CrossPromoSectionProps) {
  const { isPro } = useProEntitlement()
  const app = useMemo(() => pickCrossPromoApp(tab), [tab])

  if (isPro || !app) {
    return null
  }

  return <CrossPromoCard app={app} />
}
