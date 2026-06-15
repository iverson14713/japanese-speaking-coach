import { useState } from 'react'
import { firstConversationExamples } from '../data/conversationExamples'
import { SpeakButton } from './SpeakButton'

export function ConversationExamples() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="conversation-examples" aria-label="情境對話範例">
      {!isOpen ? (
        <div className="conversation-collapsed-card">
          <h2 className="conversation-collapsed-title">第一次聊天範例</h2>
          <p className="conversation-collapsed-desc">
            先聽日本人怎麼問，再練你可以怎麼回
          </p>
          <button
            type="button"
            className="conversation-toggle-button"
            onClick={() => setIsOpen(true)}
          >
            查看 3 組對話
          </button>
        </div>
      ) : (
        <>
          <div className="conversation-expanded-header">
            <h2 className="section-title">第一次聊天範例</h2>
            <p className="section-hint">先聽日本人怎麼問，再聽你可以怎麼回</p>
          </div>
          <div className="conversation-list">
            {firstConversationExamples.map((example, index) => (
              <article key={example.id} className="conversation-card">
                <p className="conversation-number">對話 {index + 1}</p>
                <ul className="conversation-lines">
                  {example.lines.map((line) => (
                    <li
                      key={`${example.id}-${line.role}-${line.japanese ?? line.chinese}`}
                      className={`conversation-line conversation-line--${line.role === '日本人' ? 'them' : 'you'}`}
                    >
                      <p className="conversation-role">{line.role}</p>
                      {line.japanese ? (
                        <div className="conversation-jp-row">
                          <p className="conversation-japanese">{line.japanese}</p>
                          <SpeakButton
                            text={line.japanese}
                            language="ja"
                            label={`播放 ${line.japanese}`}
                          />
                        </div>
                      ) : null}
                      <p className="conversation-chinese">{line.chinese}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <button
            type="button"
            className="conversation-toggle-button conversation-toggle-button--collapse"
            onClick={() => setIsOpen(false)}
          >
            收合對話範例
          </button>
        </>
      )}
    </section>
  )
}
