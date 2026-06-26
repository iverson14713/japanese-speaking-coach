import { useState } from 'react'
import type { Language } from '../data/types'
import type { ChatMessage, ChatSessionInfo, CoachPracticeMode, SentenceCorrectionResult } from '../services/ai'
import { SpeakButton } from './SpeakButton'

interface UserMessageExtras {
  showCoachHelp: boolean
  coachHelpResult?: SentenceCorrectionResult
}

interface AssistantMessageExtras {
  showTranslation: boolean
  showHint: boolean
}

interface CoachChatViewProps {
  language: Language
  practiceMode: CoachPracticeMode
  phase: 'welcome' | 'active' | 'ended'
  session: ChatSessionInfo | null
  messages: ChatMessage[]
  userTurns: number
  maxTurns: number
  loading: boolean
  showQuickActions: boolean
  onStartTopic: () => void
  onFocusCustomInput: () => void
  onRequestNaturalCorrection: (userMessageIndex: number) => Promise<SentenceCorrectionResult | null>
}

function formatMessageTime(timestamp: number): string {
  const date = new Date(timestamp)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

function splitMessageLines(text: string): { primary: string; secondary?: string } {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean)
  if (lines.length <= 1) {
    return { primary: text.trim() }
  }
  return {
    primary: lines[0] ?? text.trim(),
    secondary: lines.slice(1).join('\n'),
  }
}

function CoachAvatar() {
  return (
    <div className="coach-chat-avatar" aria-hidden="true">
      <span className="coach-chat-avatar__icon">🎧</span>
    </div>
  )
}

function AssistantMeta() {
  return <p className="coach-chat-meta">AI 教練 · 現在</p>
}

export function CoachChatView({
  language,
  practiceMode,
  phase,
  session,
  messages,
  userTurns,
  maxTurns,
  loading,
  showQuickActions,
  onStartTopic,
  onFocusCustomInput,
  onRequestNaturalCorrection,
}: CoachChatViewProps) {
  const [assistantExtras, setAssistantExtras] = useState<Record<number, AssistantMessageExtras>>({})
  const [userExtras, setUserExtras] = useState<Record<number, UserMessageExtras>>({})
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  const chatEnded =
    practiceMode === 'scenario-practice' && (phase === 'ended' || userTurns >= maxTurns)
  const currentTurn = phase === 'welcome' ? 0 : Math.min(userTurns + 1, maxTurns)
  const showSessionPanel =
    practiceMode === 'scenario-practice' && session && phase !== 'welcome'

  function getAssistantExtras(index: number): AssistantMessageExtras {
    return assistantExtras[index] ?? { showTranslation: false, showHint: false }
  }

  function getUserExtras(index: number): UserMessageExtras {
    return userExtras[index] ?? { showCoachHelp: false }
  }

  async function handleCoachSpeakHelp(userIndex: number) {
    setActionLoading(userIndex)
    try {
      const result = await onRequestNaturalCorrection(userIndex)
      if (result) {
        setUserExtras((current) => ({
          ...current,
          [userIndex]: { showCoachHelp: true, coachHelpResult: result },
        }))
      }
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="coach-chat-view">
      {showSessionPanel ? (
        <div className="coach-scenario-card">
          <p className="coach-scenario-card__row">
            <span className="coach-scenario-card__label">情境</span>
            <span>{session.scenarioTitle}</span>
          </p>
          <p className="coach-scenario-card__row">
            <span className="coach-scenario-card__label">角色</span>
            <span>{session.roleLabelZh}</span>
          </p>
          <p className="coach-scenario-card__row">
            <span className="coach-scenario-card__label">目標</span>
            <span>{session.goalZh}</span>
          </p>
          <p className="coach-scenario-card__turn" aria-live="polite">
            第 {chatEnded ? maxTurns : currentTurn} / {maxTurns} 回合
          </p>
        </div>
      ) : null}

      <ul className="coach-chat coach-chat--live" aria-label="對話紀錄">
        {messages.map((msg, index) => {
          if (msg.role === 'user') {
            const messageExtras = getUserExtras(index)
            const showCoachHelpAction =
              practiceMode === 'free-chat'
                ? phase === 'active'
                : phase === 'active' || phase === 'ended'

            return (
              <li key={`user-${index}`} className="coach-chat-item coach-chat-item--user">
                {msg.createdAt ? (
                  <span className="coach-chat-time" aria-hidden="true">
                    {formatMessageTime(msg.createdAt)}
                  </span>
                ) : null}
                <div className="coach-chat-bubble coach-chat-bubble--user">
                  <p className="coach-chat-text coach-chat-text--user">{msg.text}</p>
                  {showCoachHelpAction ? (
                    <>
                      <div className="coach-chat-actions">
                        <button
                          type="button"
                          className={`coach-chat-action${messageExtras.showCoachHelp ? ' coach-chat-action--active' : ''}`}
                          onClick={() => handleCoachSpeakHelp(index)}
                          disabled={actionLoading === index}
                        >
                          {actionLoading === index ? '處理中…' : '教練幫我說'}
                        </button>
                      </div>
                      {messageExtras.showCoachHelp && messageExtras.coachHelpResult ? (
                        <div className="coach-chat-inline-hint coach-chat-inline-hint--natural">
                          <p className="coach-chat-inline-hint-label">教練幫你說</p>
                          <div className="coach-chat-text-row">
                            <p className="coach-chat-inline-hint-text">
                              {messageExtras.coachHelpResult.corrected}
                            </p>
                            <SpeakButton
                              text={{ corrected: messageExtras.coachHelpResult.corrected }}
                              language={language}
                              label={`播放 ${messageExtras.coachHelpResult.corrected}`}
                              size="small"
                            />
                          </div>
                          {messageExtras.coachHelpResult.pronunciation && language !== 'en' ? (
                            <p className="coach-chat-pronunciation">
                              {messageExtras.coachHelpResult.pronunciation}
                            </p>
                          ) : null}
                          {messageExtras.coachHelpResult.meaningZh ? (
                            <p className="coach-chat-inline-hint-meaning">
                              {messageExtras.coachHelpResult.meaningZh}
                            </p>
                          ) : null}
                          <p className="coach-chat-inline-hint-meaning">
                            {messageExtras.coachHelpResult.explanationZh}
                          </p>
                          {messageExtras.coachHelpResult.naturalnessTipZh ? (
                            <p className="coach-chat-guidance">
                              {messageExtras.coachHelpResult.naturalnessTipZh}
                            </p>
                          ) : null}
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </li>
            )
          }

          const variant = msg.variant ?? 'dialogue'
          const messageExtras = getAssistantExtras(index)
          const isDialogue = variant === 'dialogue'
          const isWelcome = variant === 'welcome'
          const isScenarioMeta = variant === 'scenario-meta'
          const welcomeParts = isWelcome ? splitMessageLines(msg.text) : null

          return (
            <li
              key={`assistant-${index}`}
              className={`coach-chat-item coach-chat-item--assistant${isWelcome ? ' coach-chat-item--welcome' : ''}`}
            >
              <CoachAvatar />
              <div className="coach-chat-bubble coach-chat-bubble--assistant">
                <AssistantMeta />

                {msg.coachingZh ? (
                  <p className="coach-chat-coaching">{msg.coachingZh}</p>
                ) : null}

                {isDialogue ? (
                  <>
                    <div className="coach-chat-text-row">
                      <p className="coach-chat-text coach-chat-text--primary">{msg.text}</p>
                      <SpeakButton
                        text={msg}
                        language={language}
                        label={`播放 ${msg.text}`}
                        size="small"
                      />
                    </div>
                    {messageExtras.showTranslation && msg.pronunciation ? (
                      <p className="coach-chat-pronunciation">{msg.pronunciation}</p>
                    ) : null}
                    {messageExtras.showTranslation && msg.meaningZh ? (
                      <p className="coach-chat-meaning">{msg.meaningZh}</p>
                    ) : null}
                  </>
                ) : isWelcome && welcomeParts ? (
                  <div className="coach-chat-welcome">
                    <p className="coach-chat-text coach-chat-text--primary">{welcomeParts.primary}</p>
                    {welcomeParts.secondary ? (
                      <p className="coach-chat-text coach-chat-text--secondary">{welcomeParts.secondary}</p>
                    ) : null}
                  </div>
                ) : (
                  <p
                    className={`coach-chat-text${isScenarioMeta ? ' coach-chat-text--meta' : ''}`}
                  >
                    {msg.text}
                  </p>
                )}

                {isDialogue && msg.guidanceZh ? (
                  <p className="coach-chat-guidance">{msg.guidanceZh}</p>
                ) : null}

                {isDialogue ? (
                  <>
                    <div className="coach-chat-actions">
                      <button
                        type="button"
                        className={`coach-chat-action${messageExtras.showTranslation ? ' coach-chat-action--active' : ''}`}
                        onClick={() =>
                          setAssistantExtras((current) => ({
                            ...current,
                            [index]: {
                              ...getAssistantExtras(index),
                              showTranslation: !messageExtras.showTranslation,
                            },
                          }))
                        }
                      >
                        翻譯
                      </button>
                      {msg.hint ? (
                        <button
                          type="button"
                          className={`coach-chat-action${messageExtras.showHint ? ' coach-chat-action--active' : ''}`}
                          onClick={() =>
                            setAssistantExtras((current) => ({
                              ...current,
                              [index]: {
                                ...getAssistantExtras(index),
                                showHint: !messageExtras.showHint,
                              },
                            }))
                          }
                        >
                          提示
                        </button>
                      ) : null}
                    </div>

                    {messageExtras.showHint && msg.hint ? (
                      <div className="coach-chat-inline-hint">
                        <p className="coach-chat-inline-hint-label">建議回覆</p>
                        <p className="coach-chat-inline-hint-text">{msg.hint.text}</p>
                        <p className="coach-chat-inline-hint-meaning">{msg.hint.meaningZh}</p>
                      </div>
                    ) : null}
                  </>
                ) : null}

                {showQuickActions && variant === 'welcome' ? (
                  <div className="coach-quick-actions">
                    <button
                      type="button"
                      className="coach-quick-action"
                      onClick={onStartTopic}
                      disabled={loading}
                    >
                      <span aria-hidden="true">💬</span>
                      幫我開一個話題
                    </button>
                    <button
                      type="button"
                      className="coach-quick-action coach-quick-action--outline"
                      onClick={onFocusCustomInput}
                      disabled={loading}
                    >
                      <span aria-hidden="true">✏️</span>
                      我想自己輸入情境
                    </button>
                  </div>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>

      {chatEnded ? (
        <p className="coach-session-end">本次對話已結束，明天再來練吧！</p>
      ) : null}
    </div>
  )
}
