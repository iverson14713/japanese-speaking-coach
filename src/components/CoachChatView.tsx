import { useState } from 'react'
import type { Language } from '../data/types'
import type { ChatMessage, ChatSessionInfo, SentenceCorrectionResult } from '../services/ai'
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

export function CoachChatView({
  language,
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

  const chatEnded = phase === 'ended' || userTurns >= maxTurns
  const currentTurn = phase === 'welcome' ? 0 : Math.min(userTurns + 1, maxTurns)

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
      {session && phase !== 'welcome' ? (
        <div className="coach-chat-session coach-chat-session--compact">
          <p className="coach-chat-session-row">
            <span className="coach-chat-session-label">情境</span>
            {session.scenarioTitle}
          </p>
          <p className="coach-chat-session-row">
            <span className="coach-chat-session-label">角色</span>
            {session.roleLabelZh}
          </p>
          <p className="coach-chat-session-row">
            <span className="coach-chat-session-label">目標</span>
            {session.goalZh}
          </p>
          <p className="coach-chat-turn-badge" aria-live="polite">
            第 {chatEnded ? maxTurns : currentTurn} / {maxTurns} 回合
          </p>
        </div>
      ) : null}

      <ul className="coach-chat coach-chat--live" aria-label="對話紀錄">
        {messages.map((msg, index) => {
          if (msg.role === 'user') {
            const messageExtras = getUserExtras(index)
            const showCoachHelpAction = phase === 'active' || phase === 'ended'

            return (
              <li key={`user-${index}`} className="coach-chat-bubble coach-chat-bubble--user">
                <p className="coach-chat-role">你</p>
                <p className="coach-chat-text">{msg.text}</p>
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
                            text={messageExtras.coachHelpResult.corrected}
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
              </li>
            )
          }

          const variant = msg.variant ?? 'dialogue'
          const messageExtras = getAssistantExtras(index)
          const isDialogue = variant === 'dialogue'

          return (
            <li
              key={`assistant-${index}`}
              className={`coach-chat-bubble coach-chat-bubble--assistant${variant === 'welcome' ? ' coach-chat-bubble--welcome' : ''}`}
            >
              <p className="coach-chat-role">AI 教練</p>
              {msg.coachingZh ? (
                <p className="coach-chat-coaching">{msg.coachingZh}</p>
              ) : null}
              {isDialogue ? (
                <div className="coach-chat-text-row">
                  <p className="coach-chat-text">{msg.text}</p>
                  <SpeakButton
                    text={msg.text}
                    language={language}
                    label={`播放 ${msg.text}`}
                    size="small"
                  />
                </div>
              ) : (
                <p className={`coach-chat-text${variant === 'welcome' ? ' coach-chat-text--welcome' : ''}`}>
                  {msg.text}
                </p>
              )}

              {isDialogue && msg.pronunciation && messageExtras.showTranslation ? (
                <p className="coach-chat-pronunciation">{msg.pronunciation}</p>
              ) : null}
              {isDialogue && msg.meaningZh && messageExtras.showTranslation ? (
                <p className="coach-chat-meaning">{msg.meaningZh}</p>
              ) : null}

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
                    幫我開一個話題
                  </button>
                  <button
                    type="button"
                    className="coach-quick-action coach-quick-action--outline"
                    onClick={onFocusCustomInput}
                    disabled={loading}
                  >
                    我想自己輸入情境
                  </button>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>

      {chatEnded && phase !== 'welcome' ? (
        <p className="coach-session-end">本次對話已結束，明天再來練吧！</p>
      ) : null}
    </div>
  )
}
