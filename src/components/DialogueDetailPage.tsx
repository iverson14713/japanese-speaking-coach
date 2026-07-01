import { useState } from 'react'
import type { Language } from '../data/types'
import {
  getDialogueScenario,
  getScriptsByCategory,
  type DialogueCategoryId,
} from '../data/dialogues'
import { useProUpgrade } from '../context/ProUpgradeContext'
import { useRecordPracticeCompletion } from '../hooks/useRecordPracticeCompletion'
import { ProFeatureCard } from './pro/ProFeatureCard'
import { DialogueScriptCard } from './DialogueScriptCard'

interface DialogueDetailPageProps {
  language: Language
  category: DialogueCategoryId
  isPro: boolean
  onBack: () => void
  onStartAiScenarioRoleplay: (payload: {
    scenarioTitle: string
    scenarioPrompt: string
  }) => void
}

export function DialogueDetailPage({
  language,
  category,
  isPro,
  onBack,
  onStartAiScenarioRoleplay,
}: DialogueDetailPageProps) {
  const { openProUpgrade } = useProUpgrade()
  const [expandedScriptId, setExpandedScriptId] = useState<string | null>(null)
  const recordPractice = useRecordPracticeCompletion(language)
  const scenario = getDialogueScenario(category)
  const scripts = getScriptsByCategory(language, category)

  if (!scenario) {
    return null
  }

  if (scripts.length === 0) {
    return (
      <>
        <header className="dialogue-detail-header">
          <button type="button" className="dialogue-back-button" onClick={onBack}>
            ← 返回情境列表
          </button>
          <h1 className="dialogue-detail-title">{scenario.name}</h1>
        </header>
        <main className="app-main dialogue-detail-main">
          <div className="dialogue-coming-soon" role="status">
            <p className="dialogue-coming-soon-text">此情境劇本準備中</p>
            <p className="dialogue-coming-soon-hint">可先練習其他已有劇本的情境</p>
          </div>
        </main>
      </>
    )
  }

  const handleToggle = (scriptId: string) => {
    setExpandedScriptId((current) => (current === scriptId ? null : scriptId))
  }

  const handleAiScenarioClick = () => {
    if (!isPro) {
      openProUpgrade('scenario-roleplay')
      return
    }
    onStartAiScenarioRoleplay({
      scenarioTitle: scenario.name,
      scenarioPrompt: `旅行情境：${scenario.name}。${scenario.descriptionZh}。請扮演情境中的當地人，陪我練習真實對話。`,
    })
  }

  return (
    <>
      <header className="dialogue-detail-header">
        <button type="button" className="dialogue-back-button" onClick={onBack}>
          ← 返回情境列表
        </button>
        <h1 className="dialogue-detail-title">{scenario.name}</h1>
        <p className="dialogue-detail-desc">「{scenario.descriptionZh}」</p>
      </header>

      <main className="app-main dialogue-detail-main">
        <div className="dialogue-detail-pro-entry">
          <ProFeatureCard
            title="AI 情境實戰"
            subtitle="讓 AI 扮演店員、櫃台或路人，陪你練真實對話"
            icon="🎭"
            locked={!isPro}
            onClick={handleAiScenarioClick}
          />
        </div>

        <div className="script-list">
          {scripts.map((script) => (
            <DialogueScriptCard
              key={script.id}
              script={script}
              language={language}
              isExpanded={expandedScriptId === script.id}
              onToggle={() => handleToggle(script.id)}
              onCompletePractice={() => {
                recordPractice()
              }}
            />
          ))}
        </div>
      </main>
    </>
  )
}
