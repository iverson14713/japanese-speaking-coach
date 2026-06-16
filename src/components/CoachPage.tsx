import { useCallback, useEffect, useRef, useState } from 'react'
import type { Language } from '../data/types'
import {
  COACH_LIMITS,
  type ChatMessage,
  type ChatSessionInfo,
  type CoachPlan,
  type CustomScenarioResult,
  type SentenceCorrectionResult,
  type TopicChatSession,
  continueConversation,
  correctSentence,
  isCoachMockMode,
  startCustomScenario,
  startTopicChat,
} from '../services/ai'
import {
  canStartCoachSession,
  consumeCoachSession,
  getMaxTurnsForPlan,
  getRemainingCoachSessions,
} from '../utils/coachUsageStorage'
import {
  disableAiCoachDebugMode,
  isAiCoachDebugMode,
  registerTitleTapForDebug,
  syncAiCoachDebugFromUrl,
} from '../utils/aiCoachDebugMode'
import { CoachChatView } from './CoachChatView'
import { LanguageSelector } from './LanguageSelector'
import { SpeakButton } from './SpeakButton'

interface CoachPageProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

const DEFAULT_PLAN: CoachPlan = 'free'

type ActivePanel = 'custom' | 'topic' | 'correction' | null
type ChatMode = 'custom' | 'topic' | null

export function CoachPage({ language, onLanguageChange }: CoachPageProps) {
  const [plan] = useState<CoachPlan>(DEFAULT_PLAN)
  const [remainingSessions, setRemainingSessions] = useState(() =>
    getRemainingCoachSessions(DEFAULT_PLAN, language),
  )
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)
  const [chatMode, setChatMode] = useState<ChatMode>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [customInput, setCustomInput] = useState('')
  const [customScenario, setCustomScenario] = useState<CustomScenarioResult | null>(null)
  const [topicSession, setTopicSession] = useState<TopicChatSession | null>(null)
  const [sessionInfo, setSessionInfo] = useState<ChatSessionInfo | null>(null)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [replyInput, setReplyInput] = useState('')
  const [userTurns, setUserTurns] = useState(0)

  const [correctionInput, setCorrectionInput] = useState('')
  const [correctionResult, setCorrectionResult] = useState<SentenceCorrectionResult | null>(null)
  const [debugMode, setDebugMode] = useState(() => isAiCoachDebugMode())
  const titleTapRef = useRef({ count: 0, lastTapAt: 0 })

  const maxTurns = getMaxTurnsForPlan(plan)
  const dailyLimit = COACH_LIMITS[plan].dailySessions

  const syncDebugState = useCallback(() => {
    const active = isAiCoachDebugMode()
    setDebugMode(active)
    return active
  }, [])

  const refreshUsage = useCallback(() => {
    setRemainingSessions(getRemainingCoachSessions(plan, language))
  }, [plan, language])

  useEffect(() => {
    syncAiCoachDebugFromUrl()
    syncDebugState()
    refreshUsage()
  }, [syncDebugState, refreshUsage])

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncDebugState()
        refreshUsage()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [syncDebugState, refreshUsage])

  useEffect(() => {
    refreshUsage()
    resetSessionState()
  }, [language, refreshUsage])

  function handleTitleTap() {
    const { nextState, activated } = registerTitleTapForDebug(titleTapRef.current)
    titleTapRef.current = nextState
    if (activated) {
      setDebugMode(true)
      setError(null)
      refreshUsage()
    }
  }

  function handleDisableDebugMode() {
    disableAiCoachDebugMode()
    setDebugMode(false)
    refreshUsage()
  }

  function resetChatOnly() {
    setChatMode(null)
    setCustomScenario(null)
    setTopicSession(null)
    setSessionInfo(null)
    setChatMessages([])
    setReplyInput('')
    setUserTurns(0)
    setActivePanel(null)
  }

  function resetSessionState() {
    setActivePanel(null)
    setChatMode(null)
    setError(null)
    setCustomScenario(null)
    setTopicSession(null)
    setSessionInfo(null)
    setChatMessages([])
    setReplyInput('')
    setUserTurns(0)
    setCorrectionResult(null)
  }

  function requireSession(): boolean {
    if (isAiCoachDebugMode()) {
      return true
    }
    if (!canStartCoachSession(plan, language)) {
      setError(`今日 AI 教練次數已用完（${plan === 'free' ? 'Free 每日 1 次' : 'Pro 每日 5 次'}）`)
      return false
    }
    return true
  }

  function getScenarioKey(): string {
    if (chatMode === 'topic' && topicSession) {
      return topicSession.scenarioTitle
    }
    return customInput.trim()
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
    setChatMode('custom')
    setTopicSession(null)
    setCorrectionResult(null)

    try {
      const result = await startCustomScenario({ language, scenario })
      consumeCoachSession(language)
      refreshUsage()

      setCustomScenario(result)
      setSessionInfo({
        scenarioTitle: result.scenarioTitle,
        roleLabelZh: result.roleDescriptionZh.match(/扮演(.+?)，/)?.[1] ?? '當地人',
        goalZh: scenario,
      })
      setChatMessages([
        {
          role: 'assistant',
          text: result.openingLine,
          meaningZh: result.openingMeaningZh,
          pronunciation: result.openingPronunciation,
        },
      ])
      setUserTurns(0)
      setReplyInput('')
    } catch {
      setError('無法開始練習，請稍後再試')
      setChatMode(null)
    } finally {
      setLoading(false)
    }
  }

  async function handleSendReply() {
    const message = replyInput.trim()
    if (!message || !sessionInfo || userTurns >= maxTurns || loading) {
      return
    }

    setLoading(true)
    setError(null)

    const nextUserTurn = userTurns + 1
    const history: ChatMessage[] = [...chatMessages, { role: 'user', text: message }]

    setChatMessages(history)
    setReplyInput('')
    setUserTurns(nextUserTurn)

    try {
      const reply = await continueConversation({
        language,
        scenario: getScenarioKey(),
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

  async function handleStartTopic() {
    if (!requireSession()) {
      return
    }

    setLoading(true)
    setError(null)
    setActivePanel('topic')
    setChatMode('topic')
    setCustomScenario(null)
    setCorrectionResult(null)

    try {
      const result = await startTopicChat({ language })
      consumeCoachSession(language)
      refreshUsage()

      setTopicSession(result)
      setSessionInfo({
        scenarioTitle: result.scenarioTitle,
        roleLabelZh: result.roleLabelZh,
        goalZh: result.goalZh,
      })
      setChatMessages([
        {
          role: 'assistant',
          text: result.openingLine,
          meaningZh: result.openingMeaningZh,
          pronunciation: result.openingPronunciation,
        },
      ])
      setUserTurns(0)
      setReplyInput('')
    } catch {
      setError('無法產生話題，請稍後再試')
      setChatMode(null)
    } finally {
      setLoading(false)
    }
  }

  async function handleRequestNaturalCorrection(assistantMessageIndex: number): Promise<SentenceCorrectionResult | null> {
    for (let i = assistantMessageIndex - 1; i >= 0; i--) {
      const message = chatMessages[i]
      if (message.role === 'user') {
        try {
          return await correctSentence({ language, sentence: message.text })
        } catch {
          setError('無法分析句子，請稍後再試')
          return null
        }
      }
    }
    return null
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
    setChatMode(null)
    setSessionInfo(null)
    setChatMessages([])

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

  const showChat = sessionInfo && chatMode && (chatMode === 'topic' || customScenario)

  return (
    <>
      <header className="coach-header">
        <h1
          className="coach-title coach-title--tappable"
          onClick={handleTitleTap}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleTitleTap()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="AI 口說教練"
        >
          AI 口說教練
        </h1>
        <p className="coach-subtitle">想練什麼都可以，讓 AI 陪你模擬旅行對話</p>
      </header>

      <LanguageSelector selected={language} onSelect={onLanguageChange} />

      {debugMode ? (
        <div className="coach-debug-bar" role="status">
          <span className="coach-debug-badge">測試模式</span>
          <button type="button" className="coach-debug-off" onClick={handleDisableDebugMode}>
            關閉
          </button>
        </div>
      ) : null}

      <div className="coach-usage-bar" role="status">
        <p className="coach-usage-text">
          {debugMode
            ? '今日 AI 練習能量：不限次數'
            : `今日 AI 練習能量：${remainingSessions} / ${dailyLimit}`}
        </p>
        <p className="coach-usage-hint">
          {debugMode
            ? `測試中 · 單次最多 ${maxTurns} 回合`
            : plan === 'free'
              ? `Free 每天可練 ${dailyLimit} 次，單次最多 ${maxTurns} 回合`
              : `Pro 每天可練 ${dailyLimit} 次，單次最多 ${maxTurns} 回合`}
        </p>
        {import.meta.env.DEV && isCoachMockMode() ? (
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
            disabled={loading || (!debugMode && chatMode === 'custom' && !!customScenario)}
          />
          {(!showChat || chatMode !== 'custom' || debugMode) ? (
            <button
              type="button"
              className="coach-action-button"
              onClick={() => {
                if (debugMode && chatMode === 'custom' && customScenario) {
                  resetChatOnly()
                }
                void handleStartCustom()
              }}
              disabled={loading}
            >
              {loading && activePanel === 'custom'
                ? '準備中…'
                : debugMode && chatMode === 'custom' && customScenario
                  ? '重新開始'
                  : '開始練習'}
            </button>
          ) : null}

          {chatMode === 'custom' && sessionInfo && customScenario ? (
            <div className="coach-result">
              <CoachChatView
                language={language}
                session={sessionInfo}
                messages={chatMessages}
                userTurns={userTurns}
                maxTurns={maxTurns}
                replyInput={replyInput}
                loading={loading}
                onReplyInputChange={setReplyInput}
                onSendReply={handleSendReply}
                onRequestNaturalCorrection={handleRequestNaturalCorrection}
              />
            </div>
          ) : null}
        </section>

        <section className="coach-card">
          <h2 className="coach-card-title">AI 幫我開話題</h2>
          <p className="coach-card-desc">
            不知道要練什麼？讓 AI 幫你產生一個旅行聊天情境。
          </p>
          {(!showChat || chatMode !== 'topic' || debugMode) ? (
            <button
              type="button"
              className="coach-action-button"
              onClick={() => {
                if (debugMode && chatMode === 'topic' && topicSession) {
                  resetChatOnly()
                }
                void handleStartTopic()
              }}
              disabled={loading}
            >
              {loading && activePanel === 'topic'
                ? '產生中…'
                : debugMode && chatMode === 'topic' && topicSession
                  ? '重新開一題'
                  : '幫我開一題'}
            </button>
          ) : null}

          {chatMode === 'topic' && sessionInfo && topicSession ? (
            <div className="coach-result">
              <CoachChatView
                language={language}
                session={sessionInfo}
                messages={chatMessages}
                userTurns={userTurns}
                maxTurns={maxTurns}
                replyInput={replyInput}
                loading={loading}
                hints={topicSession.hints}
                onReplyInputChange={setReplyInput}
                onSendReply={handleSendReply}
                onRequestNaturalCorrection={handleRequestNaturalCorrection}
              />
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
            {loading && activePanel === 'correction' ? '糾正中…' : '開始糾正'}
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
