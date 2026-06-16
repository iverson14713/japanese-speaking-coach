import { useCallback, useEffect, useState } from 'react'
import type { Language } from './data/types'
import { syncAiCoachDebugFromUrl } from './utils/aiCoachDebugMode'
import { loadLanguagePreference, saveLanguagePreference } from './utils/languagePreferenceStorage'
import type { DialogueCategoryId } from './data/dialogues'
import { BottomTabBar, type AppTab } from './components/BottomTabBar'
import { TodayPage } from './components/TodayPage'
import { SentencePracticePage } from './components/SentencePracticePage'
import { DialoguePage } from './components/DialoguePage'
import { DialogueDetailPage } from './components/DialogueDetailPage'
import { CoachPage } from './components/CoachPage'

function App() {
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

  useEffect(() => {
    syncAiCoachDebugFromUrl()
  }, [])

  return (
    <div className="app">
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
