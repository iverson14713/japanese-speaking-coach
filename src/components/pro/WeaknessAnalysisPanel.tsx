import type { Language } from '../../data/types'
import { SpeakButton } from '../SpeakButton'
import type { WeaknessAnalysisResult } from '../../utils/weaknessAnalysis'

interface WeaknessAnalysisPanelProps {
  language: Language
  analysis: WeaknessAnalysisResult
  onClose: () => void
}

export function WeaknessAnalysisPanel({
  language,
  analysis,
  onClose,
}: WeaknessAnalysisPanelProps) {
  return (
    <div className="weakness-panel" role="dialog" aria-modal="true" aria-labelledby="weakness-panel-title">
      <div className="weakness-panel__header">
        <h2 id="weakness-panel-title" className="weakness-panel__title">
          今日弱點分析
        </h2>
        <button type="button" className="weakness-panel__close" onClick={onClose} aria-label="關閉">
          ✕
        </button>
      </div>

      {!analysis.hasData ? (
        <p className="weakness-panel__empty">
          今天還沒有足夠的 AI 對話紀錄。先完成幾回合口說練習，再來看弱點整理吧。
        </p>
      ) : (
        <div className="weakness-panel__sections">
          {analysis.commonMistakes.length > 0 ? (
            <section className="weakness-panel__section">
              <h3 className="weakness-panel__section-title">常見錯誤</h3>
              <ul className="weakness-panel__list">
                {analysis.commonMistakes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {analysis.naturalPhrases.length > 0 ? (
            <section className="weakness-panel__section">
              <h3 className="weakness-panel__section-title">更自然說法</h3>
              <ul className="weakness-panel__phrase-list">
                {analysis.naturalPhrases.map((item) => (
                  <li key={item.foreign} className="weakness-panel__phrase-item">
                    <div className="weakness-panel__phrase-row">
                      <p className="weakness-panel__phrase-text">{item.foreign}</p>
                      <SpeakButton text={item.foreign} language={language} size="small" />
                    </div>
                    {item.meaningZh ? (
                      <p className="weakness-panel__phrase-meaning">{item.meaningZh}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {analysis.reviewSentences.length > 0 ? (
            <section className="weakness-panel__section">
              <h3 className="weakness-panel__section-title">建議複習句</h3>
              <ul className="weakness-panel__phrase-list">
                {analysis.reviewSentences.map((item) => (
                  <li key={item.foreign} className="weakness-panel__phrase-item">
                    <div className="weakness-panel__phrase-row">
                      <p className="weakness-panel__phrase-text">{item.foreign}</p>
                      <SpeakButton text={item.foreign} language={language} size="small" />
                    </div>
                    {item.meaningZh ? (
                      <p className="weakness-panel__phrase-meaning">{item.meaningZh}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      )}
    </div>
  )
}
