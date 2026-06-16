import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Language } from '../data/types'
import { LANGUAGE_LABELS, SPEECH_LANG } from '../data/types'
import {
  COACH_AI_SOURCE_LABELS,
  COACH_CHAT_INPUT_PLACEHOLDER,
  COACH_LIMITS,
  COACH_WELCOME_TEXT,
  type ChatMessage,
  type ChatSessionInfo,
  type CoachAiSource,
  type CoachPlan,
  type SentenceCorrectionResult,
  type TopicChatSession,
  continueConversation,
  inferUserRoleLabel,
  suggestUserReply,
  getCoachAiSource,
  getCoachLastApiError,
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
import { useCoachAutoSpeak } from '../hooks/useCoachAutoSpeak'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { showToast } from '../utils/toast'

interface CoachPageProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

const DEFAULT_PLAN: CoachPlan = 'free'

type CoachPhase = 'welcome' | 'active' | 'ended'
type ChatMode = 'custom' | 'topic' | null
type VoiceInputMode = 'zh-coach' | 'practice-language'

function createWelcomeMessages(): ChatMessage[] {
  return [{ role: 'assistant', text: COACH_WELCOME_TEXT, variant: 'welcome' }]
}

function buildScenarioMetaText(session: ChatSessionInfo): string {
  return `情境：${session.scenarioTitle}\n角色：${session.roleLabelZh}\n目標：${session.goalZh}`
}

function formatAiConnectionError(debugMode: boolean): string {
  if (!debugMode) {
    return 'AI 連線失敗，請稍後再試'
  }
  const detail = getCoachLastApiError()
  return detail ? `AI 連線失敗：${detail}` : 'AI 連線失敗，請稍後再試'
}

export function CoachPage({ language, onLanguageChange }: CoachPageProps) {
  const [plan] = useState<CoachPlan>(DEFAULT_PLAN)
  const [remainingSessions, setRemainingSessions] = useState(() =>
    getRemainingCoachSessions(DEFAULT_PLAN, language),
  )
  const [phase, setPhase] = useState<CoachPhase>('welcome')
  const [chatMode, setChatMode] = useState<ChatMode>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [scenarioKey, setScenarioKey] = useState('')
  const [topicSession, setTopicSession] = useState<TopicChatSession | null>(null)
  const [sessionInfo, setSessionInfo] = useState<ChatSessionInfo | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>(createWelcomeMessages)
  const [input, setInput] = useState('')
  const [userTurns, setUserTurns] = useState(0)
  const [customHints, setCustomHints] = useState<TopicChatSession['hints']>([])
  const [awaitingCustomInput, setAwaitingCustomInput] = useState(false)
  const [voiceInputMode, setVoiceInputMode] = useState<VoiceInputMode>('zh-coach')
  const [autoSpeakEnabled] = useState(true)

  const [debugMode, setDebugMode] = useState(() => isAiCoachDebugMode())
  const [aiSource, setAiSource] = useState<CoachAiSource>(() => getCoachAiSource())
  const titleTapRef = useRef({ count: 0, lastTapAt: 0 })
  const inputRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const handleSpeechResult = useCallback((transcript: string) => {
    if (!transcript.trim()) {
      showToast('沒有聽清楚，可以再試一次')
      return
    }
    setInput(transcript)
    inputRef.current?.focus()
  }, [])

  const handleSpeechError = useCallback((message: string) => {
    if (message.includes('權限')) {
      showToast(message)
      return
    }
    showToast('沒有聽清楚，可以再試一次')
  }, [])

  const speechRecognitionLang =
    voiceInputMode === 'zh-coach' ? 'zh-TW' : SPEECH_LANG[language]

  const { isSupported: isSpeechInputSupported, isListening, interimTranscript, startListening, stopListening } =
    useSpeechRecognition({
      lang: speechRecognitionLang,
      onResult: handleSpeechResult,
      onError: handleSpeechError,
    })

  const { isSpeaking, resetAutoSpeak, stopCoachSpeech } = useCoachAutoSpeak({
    messages,
    language,
    enabled: autoSpeakEnabled,
    loading,
  })

  const maxTurns = getMaxTurnsForPlan(plan)
  const dailyLimit = COACH_LIMITS[plan].dailySessions
  const inputDisabled = loading || phase === 'ended' || (phase === 'active' && userTurns >= maxTurns)

  const syncDebugState = useCallback(() => {
    const active = isAiCoachDebugMode()
    setDebugMode(active)
    return active
  }, [])

  const refreshUsage = useCallback(() => {
    setRemainingSessions(getRemainingCoachSessions(plan, language))
  }, [plan, language])

  const refreshAiSource = useCallback(() => {
    setAiSource(getCoachAiSource())
  }, [])

  useEffect(() => {
    syncAiCoachDebugFromUrl()
    syncDebugState()
    refreshUsage()
    refreshAiSource()
  }, [syncDebugState, refreshUsage, refreshAiSource])

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
    resetToWelcome()
  }, [language, refreshUsage])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading, phase])

  useEffect(() => {
    if (isListening && inputDisabled) {
      stopListening()
    }
  }, [isListening, inputDisabled, stopListening])

  function resetToWelcome() {
    stopCoachSpeech()
    resetAutoSpeak()
    setPhase('welcome')
    setChatMode(null)
    setError(null)
    setTopicSession(null)
    setSessionInfo(null)
    setMessages(createWelcomeMessages())
    setInput('')
    setUserTurns(0)
    setScenarioKey('')
    setCustomHints([])
    setAwaitingCustomInput(false)
  }

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

  function getDialogueHint(turnIndex: number) {
    if (chatMode === 'topic' && topicSession) {
      return topicSession.hints[turnIndex]
    }
    if (chatMode === 'custom' && customHints.length > 0) {
      return customHints[turnIndex]
    }
    return undefined
  }

  async function beginCustomScenario(scenario: string) {
    if (!requireSession()) {
      return
    }

    setLoading(true)
    setError(null)

    const userMessage: ChatMessage = { role: 'user', text: scenario }
    setMessages((current) => [...current.filter((m) => m.variant !== 'welcome'), userMessage])

    try {
      const result = await startCustomScenario({ language, scenario })
      consumeCoachSession(language)
      refreshUsage()

      const info: ChatSessionInfo = {
        scenarioTitle: result.scenarioTitle,
        roleLabelZh: result.roleLabelZh,
        goalZh: result.goalZh,
      }

      setChatMode('custom')
      setScenarioKey(result.scenarioTitle)
      setSessionInfo(info)
      setCustomHints(result.hints)
      setPhase('active')
      setUserTurns(0)
      setInput('')

      setMessages((current) => [
        ...current,
        { role: 'assistant', text: result.introZh, variant: 'scenario-meta' },
        {
          role: 'assistant',
          text: result.openingLine,
          meaningZh: result.openingMeaningZh,
          pronunciation: result.openingPronunciation,
          variant: 'dialogue',
          hint: result.hints[0],
        },
      ])
    } catch {
      setError(formatAiConnectionError(debugMode))
      setMessages(createWelcomeMessages())
      setPhase('welcome')
    } finally {
      setLoading(false)
      refreshAiSource()
    }
  }

  async function beginTopicChat() {
    if (!requireSession()) {
      return
    }

    setLoading(true)
    setError(null)

    const userMessage: ChatMessage = { role: 'user', text: '幫我開一個話題' }
    setMessages((current) => [...current.filter((m) => m.variant !== 'welcome'), userMessage])

    try {
      const result = await startTopicChat({ language })
      consumeCoachSession(language)
      refreshUsage()

      const info: ChatSessionInfo = {
        scenarioTitle: result.scenarioTitle,
        roleLabelZh: result.roleLabelZh,
        goalZh: result.goalZh,
      }

      setChatMode('topic')
      setTopicSession(result)
      setScenarioKey(result.scenarioTitle)
      setSessionInfo(info)
      setPhase('active')
      setUserTurns(0)
      setInput('')

      setMessages((current) => [
        ...current,
        { role: 'assistant', text: buildScenarioMetaText(info), variant: 'scenario-meta' },
        {
          role: 'assistant',
          text: result.openingLine,
          meaningZh: result.openingMeaningZh,
          pronunciation: result.openingPronunciation,
          variant: 'dialogue',
          hint: result.hints[0],
        },
      ])
    } catch {
      setError(formatAiConnectionError(debugMode))
      setMessages(createWelcomeMessages())
      setPhase('welcome')
    } finally {
      setLoading(false)
      refreshAiSource()
    }
  }

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) {
      return
    }

    if (phase === 'welcome') {
      setInput('')
      await beginCustomScenario(text)
      return
    }

    if (phase === 'ended' || userTurns >= maxTurns || !sessionInfo) {
      return
    }

    setLoading(true)
    setError(null)

    const previousMessages = messages
    const previousUserTurns = userTurns

    const nextUserTurn = userTurns + 1
    const history: ChatMessage[] = [...messages, { role: 'user', text }]
    setMessages(history)
    setInput('')
    setUserTurns(nextUserTurn)

    try {
      const reply = await continueConversation({
        language,
        scenario: scenarioKey,
        roleLabelZh: sessionInfo.roleLabelZh,
        goalZh: sessionInfo.goalZh,
        maxTurns,
        currentTurn: nextUserTurn,
        plan,
        history,
        userMessage: text,
      })

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: reply.reply,
          meaningZh: reply.replyMeaningZh,
          pronunciation: reply.replyPronunciation,
          coachingZh: reply.coachingZh,
          guidanceZh: reply.guidanceZh,
          variant: 'dialogue',
          hint: reply.hint ?? getDialogueHint(nextUserTurn),
        },
      ])

      if (nextUserTurn >= maxTurns) {
        setPhase('ended')
      }
    } catch {
      setError(formatAiConnectionError(debugMode))
      setMessages(previousMessages)
      setUserTurns(previousUserTurns)
      setInput(text)
    } finally {
      setLoading(false)
      refreshAiSource()
    }
  }

  async function handleRequestNaturalCorrection(
    userMessageIndex: number,
  ): Promise<SentenceCorrectionResult | null> {
    const userMessage = messages[userMessageIndex]
    if (!userMessage || userMessage.role !== 'user') {
      return null
    }
    try {
      if (!sessionInfo) {
        return null
      }
      return await suggestUserReply({
        language,
        userInput: userMessage.text,
        currentScenario: sessionInfo.scenarioTitle,
        aiRole: sessionInfo.roleLabelZh,
        userRole: inferUserRoleLabel(sessionInfo.scenarioTitle, sessionInfo.goalZh),
        goal: sessionInfo.goalZh,
        history: messages,
      })
    } catch {
      setError(formatAiConnectionError(debugMode))
      return null
    }
  }

  function handleFocusCustomInput() {
    const promptMessage: ChatMessage = {
      role: 'assistant',
      text: '好的，在下方輸入你想練的旅行情境吧！',
      variant: 'scenario-meta',
    }
    setMessages((current) => {
      const withoutWelcome = current.filter((m) => m.variant !== 'welcome')
      const alreadyPrompted = withoutWelcome.some(
        (m) => m.variant === 'scenario-meta' && m.text.includes('在下方輸入'),
      )
      if (alreadyPrompted) {
        return current
      }
      return [...current.filter((m) => m.variant !== 'welcome'), promptMessage]
    })
    setAwaitingCustomInput(true)
    inputRef.current?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void handleSend()
    }
  }

  function handleMicClick() {
    if (inputDisabled) {
      return
    }

    if (isListening) {
      stopListening()
      return
    }

    if (!isSpeechInputSupported) {
      showToast('目前裝置不支援語音輸入，請先使用打字回覆')
      return
    }

    if (isSpeaking) {
      stopCoachSpeech()
    }

    startListening()
  }

  const inputPlaceholder = COACH_CHAT_INPUT_PLACEHOLDER

  return (
    <div className="coach-page">
      <header className="coach-header coach-header--compact">
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
      </header>

      <LanguageSelector selected={language} onSelect={onLanguageChange} />

      {debugMode ? (
        <div className="coach-debug-bar" role="status">
          <span className="coach-debug-badge">測試模式</span>
          <span className="coach-debug-source">AI Source: {COACH_AI_SOURCE_LABELS[aiSource]}</span>
          <span className="coach-debug-source">
            自動朗讀：{autoSpeakEnabled ? '開' : '關'}
          </span>
          <button type="button" className="coach-debug-off" onClick={handleDisableDebugMode}>
            關閉
          </button>
        </div>
      ) : null}

      <div className="coach-usage-bar coach-usage-bar--compact" role="status">
        <p className="coach-usage-text">
          {debugMode
            ? '今日 AI 練習能量：不限次數'
            : `今日 AI 練習能量：${remainingSessions} / ${dailyLimit}`}
        </p>
        {import.meta.env.DEV && isCoachMockMode() ? (
          <span className="coach-usage-badge">Mock 模式</span>
        ) : null}
      </div>

      {error ? (
        <p className="coach-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="coach-chat-shell">
        <CoachChatView
          language={language}
          phase={phase}
          session={sessionInfo}
          messages={messages}
          userTurns={userTurns}
          maxTurns={maxTurns}
          loading={loading}
          showQuickActions={phase === 'welcome' && !awaitingCustomInput}
          onStartTopic={() => void beginTopicChat()}
          onFocusCustomInput={handleFocusCustomInput}
          onRequestNaturalCorrection={handleRequestNaturalCorrection}
        />
        <div ref={chatEndRef} />
      </div>

      <div className="coach-input-fixed">
        {isListening ? (
          <div className="coach-voice-card" role="status" aria-live="polite">
            <div className="coach-voice-card-header">
              <span className="pulse-dot" aria-hidden="true" />
              <span className="coach-voice-card-title">正在聽你說...</span>
              <button type="button" className="coach-voice-stop" onClick={stopListening}>
                停止
              </button>
            </div>
            {interimTranscript ? (
              <p className="coach-voice-card-transcript">{interimTranscript}</p>
            ) : (
              <p className="coach-voice-card-hint">還沒聽到內容，請靠近麥克風再說一次</p>
            )}
          </div>
        ) : null}

        <div className="coach-voice-mode-bar" role="group" aria-label="語音輸入模式">
          <button
            type="button"
            className={`coach-voice-mode${voiceInputMode === 'zh-coach' ? ' coach-voice-mode--active' : ''}`}
            onClick={() => setVoiceInputMode('zh-coach')}
            disabled={inputDisabled || isListening}
          >
            中文問教練
          </button>
          <button
            type="button"
            className={`coach-voice-mode${voiceInputMode === 'practice-language' ? ' coach-voice-mode--active' : ''}`}
            onClick={() => setVoiceInputMode('practice-language')}
            disabled={inputDisabled || isListening}
          >
            練習{LANGUAGE_LABELS[language]}
          </button>
        </div>

        <div className="coach-input-row">
          <input
            ref={inputRef}
            type="text"
            className="coach-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={inputPlaceholder}
            disabled={inputDisabled}
            aria-label="輸入訊息"
          />
          <button
            type="button"
            className={`coach-chat-mic${isListening ? ' coach-chat-mic--active' : ''}`}
            onClick={handleMicClick}
            disabled={inputDisabled}
            aria-label={isListening ? '停止語音輸入' : '語音輸入'}
            aria-pressed={isListening}
          >
            {isListening ? (
              <span className="coach-chat-mic-label">停止</span>
            ) : (
              <span className="coach-chat-mic-icon" aria-hidden="true">
                🎙
              </span>
            )}
          </button>
          <button
            type="button"
            className="coach-chat-send"
            onClick={() => void handleSend()}
            disabled={inputDisabled || isListening || !input.trim()}
          >
            {loading ? '…' : '送出'}
          </button>
        </div>
      </div>
    </div>
  )
}
