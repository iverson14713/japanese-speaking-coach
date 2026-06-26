import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProEntitlementProvider } from './hooks/useProEntitlement'
import { ProUpgradeProvider } from './context/ProUpgradeContext'
import { StreakMilestoneProvider } from './context/StreakMilestoneContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProEntitlementProvider>
      <StreakMilestoneProvider>
        <ProUpgradeProvider>
          <App />
        </ProUpgradeProvider>
      </StreakMilestoneProvider>
    </ProEntitlementProvider>
  </StrictMode>,
)
