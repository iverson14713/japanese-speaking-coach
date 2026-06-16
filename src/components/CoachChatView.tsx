import { useState, type KeyboardEvent } from 'react'
import type { Language } from '../data/types'
import {
  REPLY_PLACEHOLDERS,
  type ChatHint,
  type ChatMessage,
  type ChatSessionInfo,
  type SentenceCorrectionResult,
} from '../services/ai'
import { SpeakButton } from './SpeakButton'

interface AssistantMessageExtras {
  showTranslation: boolean
  showHint: boolean
  showNatural: boolean
  naturalResult?: SentenceCorrectionResult
}

interface CoachChatViewProps {
  language: Language
  session: ChatSessionInfo
  messages: ChatMessage[]
  userTurns: number
  maxTurns: number
  replyInput: string
  loading: boolean
  hints?: ChatHint[]
  onReplyInputChange: (value: string) => void
  onSendReply: () => void
  onRequestNaturalCorrection: (userMessageIndex: number) => Promise<SentenceCorrectionResult | null>
}

function getHintForAssistantIndex(hints: ChatHint[] | undefined, messageIndex: number): ChatHint | undefined {
  if (!hints) {
    return undefined
  }
  const hintIndex = Math.floor(messageIndex / 2)
  return hints[hintIndex]
}

function getPreviousUserMessage(messages: ChatMessage[], beforeIndex: number): string | undefined {
  for (let i = beforeIndex - 1; i >= 0; i--) {
    if (messages[i].role === 'user') {
      return messages[i].text
    }
  }
  return undefined
}

export function CoachChatView({
  language,
  session,
  messages,
  userTurns,
  maxTurns,
  replyInput,
  loading,
  hints,
  onReplyInputChange,
  onSendReply,
  onRequestNaturalCorrection,
}: CoachChatViewProps) {
  const [extras, setExtras] = useState<Record<number, AssistantMessageExtras>>({})
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  const chatEnded = userTurns >= maxTurns
  const currentTurn = Math.min(userTurns + 1, maxTurns)

  function getExtras(index: number): AssistantMessageExtras {
    return extras[index] ?? { showTranslation: false, showHint: false, showNatural: false }
  }

  function updateExtras(index: number, patch: Partial<AssistantMessageExtras>) {
    setExtras((current) => ({
      ...current,
      [index]: { ...getExtras(index), ...patch },
    }))
  }

  async function handleNaturalCorrection(messageIndex: number) {
    const userText = getPreviousUserMessage(messages, messageIndex)
    if (!userText) {
      return
    }

    setActionLoading(messageIndex)
    try {
      const result = await onRequestNaturalCorrection(messageIndex)
      if (result) {
        updateExtras(messageIndex, { showNatural: true, naturalResult: result })
      }
    } finally {
      setActionLoading(null)
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault()
      onSendReply()
    }
  }

  return (
    <div className="coach-chat-view">
      <div className="coach-chat-session">
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

      <ul className="coach-chat coach-chat--live" aria-label="對話紀錄">
        {messages.map((msg, index) => {
          if (msg.role === 'user') {
            return (
              <li key={`user-${index}`} className="coach-chat-bubble coach-chat-bubble--user">
                <p className="coach-chat-role">你</p>
                <p className="coach-chat-text">{msg.text}</p>
              </li>
            )
          }

          const messageExtras = getExtras(index)
          const hint = getHintForAssistantIndex(hints, index)
          const previousUserText = getPreviousUserMessage(messages, index)

          return (
            <li key={`assistant-${index}`} className="coach-chat-bubble coach-chat-bubble--assistant">
              <p className="coach-chat-role">AI</p>
              <div className="coach-chat-text-row">
                <p className="coach-chat-text">{msg.text}</p>
                <SpeakButton
                  text={msg.text}
                  language={language}
                  label={`播放 ${msg.text}`}
                  size="small"
                />
              </div>
              {msg.pronunciation && messageExtras.showTranslation ? (
                <p className="coach-chat-pronunciation">{msg.pronunciation}</p>
              ) : null}
              {msg.meaningZh && messageExtras.showTranslation ? (
                <p className="coach-chat-meaning">{msg.meaningZh}</p>
              ) : null}

              <div className="coach-chat-actions">
                <button
                  type="button"
                  className={`coach-chat-action${messageExtras.showTranslation ? ' coach-chat-action--active' : ''}`}
                  onClick={() =>
                    updateExtras(index, { showTranslation: !messageExtras.showTranslation })
                  }
                >
                  翻譯
                </button>
                {hint ? (
                  <button
                    type="button"
                    className={`coach-chat-action${messageExtras.showHint ? ' coach-chat-action--active' : ''}`}
                    onClick={() => updateExtras(index, { showHint: !messageExtras.showHint })}
                  >
                    提示
                  </button>
                ) : null}
                {previousUserText ? (
                  <button
                    type="button"
                    className={`coach-chat-action${messageExtras.showNatural ? ' coach-chat-action--active' : ''}`}
                    onClick={() => handleNaturalCorrection(index)}
                    disabled={actionLoading === index}
                  >
                    {actionLoading === index ? '處理中…' : '更自然說法'}
                  </button>
                ) : null}
              </div>

              {messageExtras.showHint && hint ? (
                <div className="coach-chat-inline-hint">
                  <p className="coach-chat-inline-hint-label">建議回覆</p>
                  <p className="coach-chat-inline-hint-text">{hint.text}</p>
                  <p className="coach-chat-inline-hint-meaning">{hint.meaningZh}</p>
                </div>
              ) : null}

              {messageExtras.showNatural && messageExtras.naturalResult ? (
                <div className="coach-chat-inline-hint coach-chat-inline-hint--natural">
                  <p className="coach-chat-inline-hint-label">更自然的說法</p>
                  <p className="coach-chat-inline-hint-text">{messageExtras.naturalResult.corrected}</p>
                  <p className="coach-chat-inline-hint-meaning">
                    {messageExtras.naturalResult.explanationZh}
                  </p>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>

      {!chatEnded ? (
        <div className="coach-chat-input-bar">
          <input
            type="text"
            className="coach-chat-input"
            value={replyInput}
            onChange={(e) => onReplyInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={REPLY_PLACEHOLDERS[language]}
            disabled={loading}
            aria-label="輸入回覆"
          />
          <button
            type="button"
            className="coach-chat-send"
            onClick={onSendReply}
            disabled={loading || !replyInput.trim()}
          >
            {loading ? '…' : '送出'}
          </button>
        </div>
      ) : (
        <p className="coach-session-end">本次對話已結束，明天再來練吧！</p>
      )}
    </div>
  )
}
