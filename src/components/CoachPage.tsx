import { useCallback, useEffect, useState } from 'react'
import type { Language } from '../data/types'
import { LANGUAGE_LABELS } from '../data/types'
import {
  COACH_LIMITS,
  type ChatMessage,
  type CoachPlan,
  type CustomScenarioResult,
  type SentenceCorrectionResult,
  type TopicSuggestionResult,
  continueConversation,
  correctSentence,
  isCoachMockMode,
  startCustomScenario,
  suggestTopic,
} from '../services/ai'
import {
  canStartCoachSession,
  consumeCoachSession,
  getMaxTurnsForPlan,
  getRemainingCoachSessions,
} from '../utils/coachUsageStorage'
import { LanguageSelector } from './LanguageSelector'
import { SpeakButton } from './SpeakButton'

interface CoachPageProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

const DEFAULT_PLAN: CoachPlan = 'free'

type ActivePanel = 'custom' | 'topic' | 'correction' | null

export function CoachPage({ language, onLanguageChange }: CoachPageProps) {
  const [plan] = useState<CoachPlan>(DEFAULT_PLAN)
  const [remainingSessions, setRemainingSessions] = useState(() =>
    getRemainingCoachSessions(DEFAULT_PLAN, language),
  )
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [customInput, setCustomInput] = useState('')
  const [customScenario, setCustomScenario] = useState<CustomScenarioResult | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [replyInput, setReplyInput] = useState('')
  const [userTurns, setUserTurns] = useState(0)

  const [topicResult, setTopicResult] = useState<TopicSuggestionResult | null>(null)
  const [correctionInput, setCorrectionInput] = useState('')
  const [correctionResult, setCorrectionResult] = useState<SentenceCorrectionResult | null>(null)

  const maxTurns = getMaxTurnsForPlan(plan)
  const dailyLimit = COACH_LIMITS[plan].dailySessions
  const turnsRemaining = Math.max(0, maxTurns - userTurns)
  const chatEnded = userTurns >= maxTurns

  const refreshUsage = useCallback(() => {
    setRemainingSessions(getRemainingCoachSessions(plan, language))
  }, [plan, language])

  useEffect(() => {
    refreshUsage()
    resetSessionState()
  }, [language, refreshUsage])

  function resetSessionState() {
    setActivePanel(null)
    setError(null)
    setCustomScenario(null)
    setChatMessages([])
    setReplyInput('')
    setUserTurns(0)
    setTopicResult(null)
    setCorrectionResult(null)
  }

  function requireSession(): boolean {
    if (!canStartCoachSession(plan, language)) {
      setError(`今日 AI 教練次數已用完（${plan === 'free' ? 'Free 每日 1 次' : 'Pro 每日 5 次'}）`)
      return false
    }
    return true
  }

  async function handleStartCustom() {
    const scenario = customInput.trim()
    if (!scenario) {
      setError('請先輸入想練的旅行情境')
      return
    }
    if (!requireSession()) {
      return
    }

    setLoading(true)
    setError(null)
    setActivePanel('custom')
    setTopicResult(null)
    setCorrectionResult(null)

    try {
      const result = await startCustomScenario({ language, scenario })
      consumeCoachSession(language)
      refreshUsage()

      setCustomScenario(result)
      setChatMessages([
        {
          role: 'assistant',
          text: result.openingLine,
          meaningZh: result.openingMeaningZh,
          pronunciation: result.openingPronunciation,
        },
      ])
      setUserTurns(0)
    } catch {
      setError('無法開始練習，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  async function handleSendReply() {
    const message = replyInput.trim()
    if (!message || !customScenario || chatEnded || loading) {
      return
    }

    setLoading(true)
    setError(null)

    const nextUserTurn = userTurns + 1
    const history: ChatMessage[] = [
      ...chatMessages,
      { role: 'user', text: message },
    ]

    setChatMessages(history)
    setReplyInput('')
    setUserTurns(nextUserTurn)

    try {
      const reply = await continueConversation({
        language,
        scenario: customInput.trim(),
        history,
        userMessage: message,
      })

      if (nextUserTurn < maxTurns) {
        setChatMessages([
          ...history,
          {
            role: 'assistant',
            text: reply.reply,
            meaningZh: reply.replyMeaningZh,
            pronunciation: reply.replyPronunciation,
          },
        ])
      }
    } catch {
      setError('回覆失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  async function handleSuggestTopic() {
    if (!requireSession()) {
      return
    }

    setLoading(true)
    setError(null)
    setActivePanel('topic')
    setCustomScenario(null)
    setChatMessages([])
    setCorrectionResult(null)

    try {
      const result = await suggestTopic({ language })
      consumeCoachSession(language)
      refreshUsage()
      setTopicResult(result)
    } catch {
      setError('無法產生話題，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  async function handleCorrectSentence() {
    const sentence = correctionInput.trim()
    if (!sentence) {
      setError('請先輸入想糾正的句子')
      return
    }
    if (!requireSession()) {
      return
    }

    setLoading(true)
    setError(null)
    setActivePanel('correction')
    setCustomScenario(null)
    setChatMessages([])
    setTopicResult(null)

    try {
      const result = await correctSentence({ language, sentence })
      consumeCoachSession(language)
      refreshUsage()
      setCorrectionResult(result)
    } catch {
      setError('無法糾正句子，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <header className="coach-header">
        <h1 className="coach-title">AI 口說教練</h1>
        <p className="coach-subtitle">想練什麼都可以，讓 AI 陪你模擬旅行對話</p>
      </header>

      <LanguageSelector selected={language} onSelect={onLanguageChange} />

      <div className="coach-usage-bar" role="status">
        <span className="coach-usage-text">
          今日剩餘 {remainingSessions} / {dailyLimit} 次
        </span>
        <span className="coach-usage-hint">
          {plan === 'free' ? 'Free' : 'Pro'} · 單次最多 {maxTurns} 回合
        </span>
        {isCoachMockMode() ? (
          <span className="coach-usage-badge">示範模式</span>
        ) : null}
      </div>

      {error ? (
        <p className="coach-error" role="alert">
          {error}
        </p>
      ) : null}

      <main className="app-main coach-main">
        <section className="coach-card">
          <h2 className="coach-card-title">自訂情境練習</h2>
          <p className="coach-card-desc">
            輸入你想練的旅行情境，AI 會扮演對方陪你對話。
          </p>
          <textarea
            className="coach-textarea"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="例如：我想練在日本藥妝店買眼藥水"
            rows={3}
            disabled={loading}
          />
          <button
            type="button"
            className="coach-action-button"
            onClick={handleStartCustom}
            disabled={loading}
          >
            {loading && activePanel === 'custom' ? '準備中…' : '開始練習'}
          </button>

          {activePanel === 'custom' && customScenario ? (
            <div className="coach-result">
              <p className="coach-result-label">情境：{customScenario.scenarioTitle}</p>
              <p className="coach-result-hint">{customScenario.roleDescriptionZh}</p>

              <ul className="coach-chat" aria-label="對話紀錄">
                {chatMessages.map((msg, index) => (
                  <li
                    key={`${msg.role}-${index}`}
                    className={`coach-chat-bubble coach-chat-bubble--${msg.role}`}
                  >
                    <p className="coach-chat-role">
                      {msg.role === 'assistant' ? 'AI 對方' : '你'}
                    </p>
                    <div className="coach-chat-text-row">
                      <p className="coach-chat-text">{msg.text}</p>
                      {msg.role === 'assistant' ? (
                        <SpeakButton
                          text={msg.text}
                          language={language}
                          label={`播放 ${msg.text}`}
                          size="small"
                        />
                      ) : null}
                    </div>
                    {msg.pronunciation ? (
                      <p className="coach-chat-pronunciation">{msg.pronunciation}</p>
                    ) : null}
                    {msg.meaningZh ? (
                      <p className="coach-chat-meaning">{msg.meaningZh}</p>
                    ) : null}
                  </li>
                ))}
              </ul>

              {!chatEnded ? (
                <div className="coach-reply-box">
                  <textarea
                    className="coach-textarea coach-textarea--compact"
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder={`用${LANGUAGE_LABELS[language]}回覆…`}
                    rows={2}
                    disabled={loading}
                  />
                  <div className="coach-reply-meta">
                    <span className="coach-turn-count">剩餘 {turnsRemaining} 回合</span>
                    <button
                      type="button"
                      className="coach-action-button coach-action-button--secondary"
                      onClick={handleSendReply}
                      disabled={loading || !replyInput.trim()}
                    >
                      {loading ? '送出中…' : '送出回覆'}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="coach-session-end">本次對話已結束，明天再來練吧！</p>
              )}
            </div>
          ) : null}
        </section>

        <section className="coach-card">
          <h2 className="coach-card-title">AI 幫我開話題</h2>
          <p className="coach-card-desc">
            不知道要練什麼？讓 AI 幫你產生一個旅行聊天情境。
          </p>
          <button
            type="button"
            className="coach-action-button"
            onClick={handleSuggestTopic}
            disabled={loading}
          >
            {loading && activePanel === 'topic' ? '產生中…' : '幫我開一題'}
          </button>

          {activePanel === 'topic' && topicResult ? (
            <div className="coach-result">
              <p className="coach-result-label">{topicResult.scenarioTitle}</p>
              <p className="coach-result-hint">{topicResult.scenarioDescriptionZh}</p>
              <div className="coach-highlight-box">
                <p className="coach-highlight-label">對方可能會說</p>
                <div className="coach-chat-text-row">
                  <p className="coach-highlight-text">{topicResult.openingLine}</p>
                  <SpeakButton
                    text={topicResult.openingLine}
                    language={language}
                    label={`播放 ${topicResult.openingLine}`}
                    size="small"
                  />
                </div>
                {topicResult.openingPronunciation ? (
                  <p className="coach-chat-pronunciation">{topicResult.openingPronunciation}</p>
                ) : null}
                <p className="coach-chat-meaning">{topicResult.openingMeaningZh}</p>
              </div>
              <div className="coach-highlight-box coach-highlight-box--accent">
                <p className="coach-highlight-label">你可以這樣回</p>
                <p className="coach-highlight-text">{topicResult.suggestedReply}</p>
                <p className="coach-chat-meaning">{topicResult.suggestedReplyMeaningZh}</p>
              </div>
            </div>
          ) : null}
        </section>

        <section className="coach-card">
          <h2 className="coach-card-title">糾正我的句子</h2>
          <p className="coach-card-desc">
            輸入你想說的話，AI 幫你改得更自然。
          </p>
          <textarea
            className="coach-textarea"
            value={correctionInput}
            onChange={(e) => setCorrectionInput(e.target.value)}
            placeholder="例如：I want check in hotel."
            rows={2}
            disabled={loading}
          />
          <button
            type="button"
            className="coach-action-button"
            onClick={handleCorrectSentence}
            disabled={loading}
          >
            {loading && activePanel === 'correction' ? '分析中…' : '幫我改'}
          </button>

          {activePanel === 'correction' && correctionResult ? (
            <div className="coach-result">
              <div className="coach-correction-row">
                <p className="coach-correction-label">原本</p>
                <p className="coach-correction-original">{correctionResult.original}</p>
              </div>
              <div className="coach-correction-row coach-correction-row--fixed">
                <p className="coach-correction-label">建議</p>
                <div className="coach-chat-text-row">
                  <p className="coach-correction-fixed">{correctionResult.corrected}</p>
                  <SpeakButton
                    text={correctionResult.corrected}
                    language={language}
                    label={`播放 ${correctionResult.corrected}`}
                    size="small"
                  />
                </div>
              </div>
              <p className="coach-result-hint">{correctionResult.explanationZh}</p>
              <p className="coach-tip">{correctionResult.naturalnessTipZh}</p>
            </div>
          ) : null}
        </section>
      </main>
    </>
  )
}
