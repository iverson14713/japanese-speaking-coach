import type { Language } from '../data/types'
import { LANGUAGE_LABELS } from '../data/types'
import {
  dialogueScenarios,
  hasDialoguesForLanguage,
  hasScriptsForCategory,
  type DialogueCategoryId,
} from '../data/dialogues'
import { LanguageSelector } from './LanguageSelector'

interface DialoguePageProps {
  language: Language
  onLanguageChange: (language: Language) => void
  onSelectScenario: (category: DialogueCategoryId) => void
}

export function DialoguePage({ language, onLanguageChange, onSelectScenario }: DialoguePageProps) {
  const hasContent = hasDialoguesForLanguage(language)

  return (
    <>
      <header className="dialogue-header">
        <h1 className="dialogue-title">情境對話</h1>
        <p className="dialogue-subtitle">先聽對方怎麼問，再練你可以怎麼回</p>
      </header>

      <LanguageSelector selected={language} onSelect={onLanguageChange} />

      <main className="app-main dialogue-main">
        {!hasContent ? (
          <div className="dialogue-coming-soon" role="status">
            <p className="dialogue-coming-soon-text">
              {LANGUAGE_LABELS[language]}情境對話準備中
            </p>
            <p className="dialogue-coming-soon-hint">目前可先使用日文情境對話</p>
          </div>
        ) : (
          <ul className="scenario-list">
            {dialogueScenarios.map((scenario) => {
              const isAvailable = hasScriptsForCategory(language, scenario.category)

              if (isAvailable) {
                return (
                  <li key={scenario.category}>
                    <button
                      type="button"
                      className="scenario-card"
                      onClick={() => onSelectScenario(scenario.category)}
                    >
                      <span className="scenario-card-name">{scenario.name}</span>
                      <span className="scenario-card-desc">「{scenario.descriptionZh}」</span>
                    </button>
                  </li>
                )
              }

              return (
                <li key={scenario.category}>
                  <div className="scenario-card scenario-card--upcoming" aria-disabled="true">
                    <span className="scenario-card-name">{scenario.name}</span>
                    <span className="scenario-card-desc">「{scenario.descriptionZh}」</span>
                    <span className="scenario-card-badge">即將補齊</span>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </>
  )
}
