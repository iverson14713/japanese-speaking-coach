import { useProEntitlement } from '../hooks/useProEntitlement'
import { useCrossPromo } from '../context/CrossPromoContext'
import { CrossPromoCard } from './CrossPromoCard'

export function CrossPromoSection() {
  const { isPro } = useProEntitlement()
  const { currentApp } = useCrossPromo()

  if (isPro || !currentApp) {
    return null
  }

  return <CrossPromoCard key={currentApp.id} app={currentApp} />
}
