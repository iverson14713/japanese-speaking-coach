import { useState } from 'react'
import type { Language } from '../data/types'
import {
  getDialogueScenario,
  getScriptsByCategory,
  type DialogueCategoryId,
} from '../data/dialogues'
import { DialogueScriptCard } from './DialogueScriptCard'

interface DialogueDetailPageProps {
  language: Language
  category: DialogueCategoryId
  onBack: () => void
}

export function DialogueDetailPage({ language, category, onBack }: DialogueDetailPageProps) {
  const [expandedScriptId, setExpandedScriptId] = useState<string | null>(null)
  const scenario = getDialogueScenario(category)
  const scripts = getScriptsByCategory(language, category)

  if (!scenario) {
    return null
  }

  const handleToggle = (scriptId: string) => {
    setExpandedScriptId((current) => (current === scriptId ? null : scriptId))
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
        {scripts.length === 0 ? (
          <div className="dialogue-coming-soon" role="status">
            <p className="dialogue-coming-soon-text">此情境完整劇本準備中</p>
            <p className="dialogue-coming-soon-hint">可先練習其他已有劇本的情境</p>
          </div>
        ) : (
          <div className="script-list">
            {scripts.map((script) => (
              <DialogueScriptCard
                key={script.id}
                script={script}
                language={language}
                isExpanded={expandedScriptId === script.id}
                onToggle={() => handleToggle(script.id)}
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
