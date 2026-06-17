import { useCallback, useEffect, useState } from 'react'
import type { Language } from './data/types'
import { matchLegalRoute } from './constants/legal'
import { usePathname } from './hooks/usePathname'
import { syncAiCoachDebugFromUrl } from './utils/aiCoachDebugMode'
import { loadLanguagePreference, saveLanguagePreference } from './utils/languagePreferenceStorage'
import { hasSeenOnboarding, markOnboardingSeen } from './utils/onboardingStorage'
import type { DialogueCategoryId } from './data/dialogues'
import { BottomTabBar, type AppTab } from './components/BottomTabBar'
import { AppSettingsButton } from './components/AppSettingsButton'
import { SettingsModal } from './components/legal/SettingsModal'
import { TodayPage } from './components/TodayPage'
import { SentencePracticePage } from './components/SentencePracticePage'
import { DialoguePage } from './components/DialoguePage'
import { DialogueDetailPage } from './components/DialogueDetailPage'
import { CoachPage } from './components/CoachPage'
import { SplashScreen } from './components/SplashScreen'
import { Onboarding } from './components/Onboarding'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { SupportPage } from './pages/SupportPage'
import { DeleteDataPage } from './pages/DeleteDataPage'

const SPLASH_DURATION_MS = 1200

type BootPhase = 'splash' | 'onboarding' | 'ready'

function App() {
  const pathname = usePathname()
  const legalRoute = matchLegalRoute(pathname)

  if (legalRoute === 'privacy') {
    return <PrivacyPage />
  }
  if (legalRoute === 'terms') {
    return <TermsPage />
  }
  if (legalRoute === 'support') {
    return <SupportPage />
  }
  if (legalRoute === 'deleteData') {
    return <DeleteDataPage />
  }

  return <MainApp />
}

function MainApp() {
  const [bootPhase, setBootPhase] = useState<BootPhase>('splash')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<AppTab>('today')
  const [language, setLanguage] = useState<Language>(() => loadLanguagePreference())
  const [dialogueCategory, setDialogueCategory] = useState<DialogueCategoryId | null>(null)

  const handleLanguageChange = useCallback((nextLanguage: Language) => {
    setLanguage(nextLanguage)
    saveLanguagePreference(nextLanguage)
    setDialogueCategory(null)
  }, [])

  const handleDialogueBack = useCallback(() => {
    setDialogueCategory(null)
  }, [])

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab)
    if (tab !== 'dialogue') {
      setDialogueCategory(null)
    }
  }

  const finishOnboarding = useCallback(() => {
    markOnboardingSeen()
    setBootPhase('ready')
  }, [])

  useEffect(() => {
    syncAiCoachDebugFromUrl()
  }, [])

  useEffect(() => {
    let cancelled = false
    const timer = window.setTimeout(() => {
      if (!cancelled) {
        setBootPhase(hasSeenOnboarding() ? 'ready' : 'onboarding')
      }
    }, SPLASH_DURATION_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  if (bootPhase === 'splash') {
    return <SplashScreen />
  }

  if (bootPhase === 'onboarding') {
    return <Onboarding onComplete={finishOnboarding} />
  }

  return (
    <div className="app">
      <AppSettingsButton onClick={() => setSettingsOpen(true)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {activeTab === 'today' ? (
        <TodayPage language={language} onLanguageChange={handleLanguageChange} />
      ) : activeTab === 'library' ? (
        <SentencePracticePage language={language} onLanguageChange={handleLanguageChange} />
      ) : activeTab === 'dialogue' ? (
        dialogueCategory ? (
          <DialogueDetailPage
            key={`${language}-${dialogueCategory}`}
            language={language}
            category={dialogueCategory}
            onBack={handleDialogueBack}
          />
        ) : (
          <DialoguePage
            language={language}
            onLanguageChange={handleLanguageChange}
            onSelectScenario={setDialogueCategory}
          />
        )
      ) : null}

      <div
        className={activeTab === 'coach' ? 'coach-tab-root' : 'coach-tab-root coach-tab-root--hidden'}
        aria-hidden={activeTab !== 'coach'}
      >
        <CoachPage language={language} onLanguageChange={handleLanguageChange} />
      </div>

      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

export default App
