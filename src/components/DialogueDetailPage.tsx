import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (scripts.length === 0) {
      onBack()
    }
  }, [scripts.length, onBack])

  if (!scenario || scripts.length === 0) {
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
      </main>
    </>
  )
}
