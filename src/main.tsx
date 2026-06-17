import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProUpgradeProvider } from './context/ProUpgradeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProUpgradeProvider>
      <App />
    </ProUpgradeProvider>
  </StrictMode>,
)
