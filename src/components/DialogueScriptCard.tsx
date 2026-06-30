import type { Language } from '../data/types'
import { countScriptTurns, type DialogueScript } from '../data/dialogues'
import { SpeakButton } from './SpeakButton'
import { FavoriteButton } from './FavoriteButton'
import { buildFavoriteFromDialogueTurn } from '../utils/favoriteSentenceBuilders'

interface DialogueScriptCardProps {
  script: DialogueScript
  language: Language
  isExpanded: boolean
  onToggle: () => void
  onCompletePractice: () => void
}

export function DialogueScriptCard({
  script,
  language,
  isExpanded,
  onToggle,
  onCompletePractice,
}: DialogueScriptCardProps) {
  const turnCount = countScriptTurns(script)

  return (
    <article className={`script-card${isExpanded ? ' script-card--expanded' : ''}`}>
      <div className="script-card-summary">
        <h2 className="script-card-title">{script.title}</h2>
        <p className="script-card-desc">{script.descriptionZh}</p>
        <div className="script-card-meta">
          {script.estimatedMinutes ? (
            <span className="script-card-meta-item">約 {script.estimatedMinutes} 分鐘</span>
          ) : null}
          <span className="script-card-meta-item">{turnCount} 句</span>
        </div>
        <button type="button" className="script-toggle-button" onClick={onToggle}>
          {isExpanded ? '收合' : '展開練習'}
        </button>
      </div>

      {isExpanded && script.sections ? (
        <div className="script-card-body">
          {script.sections.map((section) => (
            <section key={section.title} className="script-section">
              <h3 className="script-section-title">{section.title}</h3>
              <ul className="dialogue-turns">
                {section.turns.map((turn, turnIndex) => (
                  <li
                    key={`${script.id}-${section.title}-${turnIndex}`}
                    className={`dialogue-turn dialogue-turn--${turn.speaker}`}
                  >
                    <FavoriteButton
                      favorite={buildFavoriteFromDialogueTurn(script, section.title, turnIndex, turn)}
                      className="favorite-button--dialogue-turn"
                    />
                    <p className="dialogue-turn-role">{turn.speakerLabelZh}</p>
                    <div className="dialogue-turn-text-row">
                      <p className="dialogue-turn-text">{turn.text}</p>
                      <SpeakButton
                        text={turn.text}
                        language={language}
                        label={`播放 ${turn.text}`}
                        size="small"
                      />
                    </div>
                    {turn.pronunciation ? (
                      <p className="dialogue-turn-pronunciation">{turn.pronunciation}</p>
                    ) : null}
                    <p className="dialogue-turn-meaning">{turn.meaningZh}</p>
                    {turn.noteZh ? <p className="dialogue-turn-note">{turn.noteZh}</p> : null}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <div className="script-card-complete">
            <button type="button" className="script-complete-button" onClick={onCompletePractice}>
              完成情境練習
            </button>
          </div>
        </div>
      ) : null}
    </article>
  )
}
