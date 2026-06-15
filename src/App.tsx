import { useState } from 'react'
import type { Language } from './data/types'
import type { DialogueCategoryId } from './data/dialogues'
import { BottomTabBar, type AppTab } from './components/BottomTabBar'
import { SentencePracticePage } from './components/SentencePracticePage'
import { DialoguePage } from './components/DialoguePage'
import { DialogueDetailPage } from './components/DialogueDetailPage'

function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('practice')
  const [language, setLanguage] = useState<Language>('ja')
  const [dialogueCategory, setDialogueCategory] = useState<DialogueCategoryId | null>(null)

  const handleTabChange = (tab: AppTab) => {
    setActiveTab(tab)
    if (tab === 'practice') {
      setDialogueCategory(null)
    }
  }

  return (
    <div className="app">
      {activeTab === 'practice' ? (
        <SentencePracticePage language={language} onLanguageChange={setLanguage} />
      ) : dialogueCategory ? (
        <DialogueDetailPage
          language={language}
          category={dialogueCategory}
          onBack={() => setDialogueCategory(null)}
        />
      ) : (
        <DialoguePage
          language={language}
          onLanguageChange={setLanguage}
          onSelectScenario={setDialogueCategory}
        />
      )}

      <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}

export default App
