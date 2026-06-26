import { useCallback, useEffect, useState } from 'react'
import type { Language } from './data/types'
import type { Sentence } from './data/sentences'
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
import { useProUpgrade } from './context/ProUpgradeContext'
import { useProEntitlement } from './hooks/useProEntitlement'
import { isAiCoachDebugMode } from './utils/aiCoachDebugMode'
import {
  canStartCoachSession,
  consumeCoachSession,
} from './utils/coachUsageStorage'
import { buildDailyCoachHandoff } from './utils/buildDailyCoachHandoff'
import {
  loadDailyCoachHandoff,
  startCoachPracticeFromDaily,
} from './utils/dailyCoachHandoffStorage'
import type { DailyCoachHandoff } from './types/dailyCoachHandoff'
import { CrossPromoProvider } from './context/CrossPromoContext'

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
  const { openProUpgrade } = useProUpgrade()
  const { coachPlan, isPro } = useProEntitlement()
  const [bootPhase, setBootPhase] = useState<BootPhase>('splash')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<AppTab>('today')
  const [language, setLanguage] = useState<Language>(() => loadLanguagePreference())
  const [dialogueCategory, setDialogueCategory] = useState<DialogueCategoryId | null>(null)
  const [dailyHandoff, setDailyHandoff] = useState<DailyCoachHandoff | null>(() =>
    loadDailyCoachHandoff(),
  )
  const [canStartAiPractice, setCanStartAiPractice] = useState(() =>
    canStartCoachSession(coachPlan, loadLanguagePreference()),
  )

  const refreshAiPracticeAvailability = useCallback(() => {
    setCanStartAiPractice(canStartCoachSession(coachPlan, language))
  }, [coachPlan, language])

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
    refreshAiPracticeAvailability()
  }

  const handleStartDailyAiPractice = useCallback(
    (sentence: Sentence) => {
      if (!isAiCoachDebugMode() && !canStartCoachSession(coachPlan, sentence.language)) {
        openProUpgrade('coach-limit')
        return
      }

      if (!isAiCoachDebugMode()) {
        consumeCoachSession(sentence.language)
        refreshAiPracticeAvailability()
      }

      const handoff = buildDailyCoachHandoff(sentence, { sessionAlreadyConsumed: true })
      startCoachPracticeFromDaily(handoff)
      setDailyHandoff(handoff)

      if (sentence.language !== language) {
        handleLanguageChange(sentence.language)
      }

      setActiveTab('coach')
    },
    [coachPlan, language, handleLanguageChange, openProUpgrade, refreshAiPracticeAvailability],
  )

  const handleDailyHandoffConsumed = useCallback(() => {
    setDailyHandoff(null)
  }, [])

  const finishOnboarding = useCallback(() => {
    markOnboardingSeen()
    setBootPhase('ready')
  }, [])

  useEffect(() => {
    syncAiCoachDebugFromUrl()
  }, [])

  useEffect(() => {
    refreshAiPracticeAvailability()
  }, [refreshAiPracticeAvailability, activeTab])

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
    <CrossPromoProvider activeTab={activeTab} dialogueCategory={dialogueCategory}>
      <div className="app">
        <AppSettingsButton onClick={() => setSettingsOpen(true)} />
        <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />

        {activeTab === 'today' ? (
          <TodayPage
            language={language}
            onLanguageChange={handleLanguageChange}
            onStartDailyAiPractice={handleStartDailyAiPractice}
            onOpenProUpgrade={() => openProUpgrade('coach-limit')}
            canStartAiPractice={canStartAiPractice}
            isPro={isPro}
          />
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
          className="coach-tab-root"
          hidden={activeTab !== 'coach'}
          aria-hidden={activeTab !== 'coach'}
        >
          <CoachPage
            language={language}
            onLanguageChange={handleLanguageChange}
            dailyHandoff={dailyHandoff}
            onDailyHandoffConsumed={handleDailyHandoffConsumed}
          />
        </div>

        <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </CrossPromoProvider>
  )
}

export default App
