import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { Language } from '../data/types'
import { LANGUAGE_LABELS, SPEECH_LANG } from '../data/types'
import {
  COACH_AI_SOURCE_LABELS,
  COACH_CHAT_INPUT_PLACEHOLDERS,
  COACH_FREE_CHAT_WELCOME,
  COACH_LIMITS,
  COACH_SCENARIO_WELCOME,
  type ChatMessage,
  type ChatSessionInfo,
  type CoachAiSource,
  type CoachPracticeMode,
  type SentenceCorrectionResult,
  type TopicChatSession,
  continueConversation,
  continueFreeChat,
  detectScenarioStartRequest,
  inferUserRoleLabel,
  suggestUserReply,
  getCoachAiSource,
  getCoachLastApiError,
  isCoachMockMode,
  startCustomScenario,
  startDailyPracticeScenario,
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
import { useProUpgrade } from '../context/ProUpgradeContext'
import { useProEntitlement } from '../hooks/useProEntitlement'
import {
  buildCoachChatSnapshot,
  clearCoachChatSnapshotForMode,
  clearCoachLearningSummary,
  loadCoachLearningSummary,
  loadCoachPracticeModePreference,
  readInitialCoachState,
  saveCoachPracticeModePreference,
  saveCoachChatSnapshot,
  saveCoachLearningSummary,
  takeRecentHistoryForApi,
} from '../utils/aiCoachChatStorage'
import { buildDailyScenarioKey } from '../utils/buildDailyCoachHandoff'
import {
  isDailyAiPracticeComplete,
  markDailyAiPracticeComplete,
} from '../utils/dailyAiPracticeCompletion'
import { clearDailyCoachHandoff } from '../utils/dailyCoachHandoffStorage'
import type { DailyCoachHandoff } from '../types/dailyCoachHandoff'

interface CoachPageProps {
  language: Language
  onLanguageChange: (language: Language) => void
  dailyHandoff: DailyCoachHandoff | null
  onDailyHandoffConsumed: () => void
}

type CoachPhase = 'welcome' | 'active' | 'ended'
type ChatMode = 'custom' | 'topic' | null
type VoiceInputMode = 'zh-coach' | 'practice-language'

function createWelcomeMessages(mode: CoachPracticeMode, lang: Language): ChatMessage[] {
  const text = mode === 'free-chat' ? COACH_FREE_CHAT_WELCOME[lang] : COACH_SCENARIO_WELCOME
  return [{ role: 'assistant', text, variant: 'welcome' }]
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

export function CoachPage({
  language,
  onLanguageChange,
  dailyHandoff,
  onDailyHandoffConsumed,
}: CoachPageProps) {
  const { openProUpgrade } = useProUpgrade()
  const { coachPlan, isPro, setDebugProStatus } = useProEntitlement()
  const plan = coachPlan
  const initialModeRef = useRef(loadCoachPracticeModePreference(language))
  const initialCoachStateRef = useRef(readInitialCoachState(language, initialModeRef.current))
  const initialCoach = initialCoachStateRef.current

  const [remainingSessions, setRemainingSessions] = useState(() =>
    getRemainingCoachSessions(plan, language),
  )
  const [phase, setPhase] = useState<CoachPhase>(initialCoach.phase)
  const [practiceMode, setPracticeMode] = useState<CoachPracticeMode>(initialCoach.practiceMode)
  const [chatMode, setChatMode] = useState<ChatMode>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [scenarioKey, setScenarioKey] = useState(initialCoach.scenarioKey)
  const [topicSession, setTopicSession] = useState<TopicChatSession | null>(null)
  const [sessionInfo, setSessionInfo] = useState<ChatSessionInfo | null>(initialCoach.sessionInfo)
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    initialCoach.hasStoredChat
      ? initialCoach.messages
      : createWelcomeMessages('free-chat', language),
  )
  const [input, setInput] = useState('')
  const [userTurns, setUserTurns] = useState(initialCoach.userTurns)
  const [customHints, setCustomHints] = useState<TopicChatSession['hints']>([])
  const [awaitingCustomInput, setAwaitingCustomInput] = useState(false)
  const [voiceInputMode, setVoiceInputMode] = useState<VoiceInputMode>('zh-coach')
  const [autoSpeakEnabled] = useState(true)

  const [debugMode, setDebugMode] = useState(() => isAiCoachDebugMode())
  const [aiSource, setAiSource] = useState<CoachAiSource>(() => getCoachAiSource())
  const titleTapRef = useRef({ count: 0, lastTapAt: 0 })
  const inputRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const chatShellRef = useRef<HTMLDivElement>(null)
  const prevLanguageRef = useRef(language)
  const prevModeRef = useRef<CoachPracticeMode>(initialCoach.practiceMode)
  const skipNextSaveRef = useRef(true)
  const shouldAutoScrollRef = useRef(true)
  const dailyHandoffKeyRef = useRef<string | null>(null)

  const scrollToBottom = useCallback((behavior: ScrollBehavior) => {
    const el = chatShellRef.current
    if (!el) {
      return
    }
    el.scrollTo({ top: el.scrollHeight, behavior })
  }, [])

  const queueScrollToBottom = useCallback(
    (behavior: ScrollBehavior) => {
      // Wait for DOM/layout (buttons/TTS/viewport) to settle.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (shouldAutoScrollRef.current) {
            scrollToBottom(behavior)
          }
          window.setTimeout(() => {
            if (shouldAutoScrollRef.current) {
              scrollToBottom(behavior)
            }
          }, 160)
        })
      })
    },
    [scrollToBottom],
  )

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

  const { isSpeaking, resetAutoSpeak, markExistingAsSpoken, stopCoachSpeech } = useCoachAutoSpeak({
    messages,
    language,
    enabled: autoSpeakEnabled,
    loading,
  })

  const maxTurns = getMaxTurnsForPlan(plan)
  const dailyLimit = COACH_LIMITS[plan].dailySessions
  const scenarioEnded = phase === 'ended' || (phase === 'active' && userTurns >= maxTurns)
  const isDailyLimitReached = !debugMode && !canStartCoachSession(plan, language)
  const shouldPromptProUpgrade =
    !debugMode &&
    !isPro &&
    ((isDailyLimitReached && phase === 'welcome') ||
      (practiceMode === 'scenario-practice' && scenarioEnded))
  const inputDisabled = loading

  const promptProUpgradeIfNeeded = useCallback((): boolean => {
    if (!shouldPromptProUpgrade) {
      return false
    }
    openProUpgrade('coach-limit')
    return true
  }, [shouldPromptProUpgrade, openProUpgrade])

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
    refreshUsage()
  }, [plan, refreshUsage])

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
    if (initialCoach.hasStoredChat) {
      markExistingAsSpoken(initialCoach.messages)
    }
  }, [initialCoach.hasStoredChat, initialCoach.messages, markExistingAsSpoken])

  useEffect(() => {
    if (prevLanguageRef.current === language) {
      return
    }

    prevLanguageRef.current = language
    skipNextSaveRef.current = true
    refreshUsage()

    const preferredMode = loadCoachPracticeModePreference(language)
    const nextCoach = readInitialCoachState(language, preferredMode)
    stopCoachSpeech()
    resetAutoSpeak()

    if (!nextCoach.hasStoredChat) {
      setPracticeMode(preferredMode)
      resetToWelcome(preferredMode)
      return
    }

    setPracticeMode(nextCoach.practiceMode)
    setPhase(nextCoach.phase)
    setChatMode(nextCoach.practiceMode === 'scenario-practice' ? 'custom' : null)
    setError(null)
    setTopicSession(null)
    setSessionInfo(nextCoach.sessionInfo)
    setScenarioKey(nextCoach.scenarioKey)
    setUserTurns(nextCoach.userTurns)
    setCustomHints([])
    setAwaitingCustomInput(false)
    setMessages(nextCoach.messages)
    markExistingAsSpoken(nextCoach.messages)
  }, [language, refreshUsage, resetAutoSpeak, stopCoachSpeech])

  const persistCoachChat = useCallback((override?: { mode?: CoachPracticeMode }) => {
    const mode = override?.mode ?? practiceMode
    saveCoachChatSnapshot(
      buildCoachChatSnapshot({
        language,
        practiceMode: mode,
        phase,
        sessionInfo,
        scenarioKey,
        userTurns,
        messages,
      }),
    )
  }, [language, practiceMode, phase, sessionInfo, scenarioKey, userTurns, messages])

  useEffect(() => {
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false
      return
    }
    persistCoachChat()
  }, [persistCoachChat])

  useEffect(() => {
    return () => {
      persistCoachChat()
    }
  }, [persistCoachChat])

  const updateLearningSummary = useCallback(
    (nextMessages: ChatMessage[]) => {
      const recentUsers = nextMessages.filter((m) => m.role === 'user').slice(-10)
      const usedChineseHelp = recentUsers.some((m) => /[\u4e00-\u9fff]/.test(m.text))
      const scenario = sessionInfo?.scenarioTitle
      const modeLabel = practiceMode === 'free-chat' ? '自由聊天' : '情境練習'
      const summary = [
        `偏好模式：${modeLabel}`,
        `偏好語言：${language === 'en' ? '英文' : language === 'ja' ? '日文' : '韓文'}`,
        scenario ? `常練情境：${scenario}` : null,
        `中文求助：${usedChineseHelp ? '常用' : '偶爾/較少'}`,
        '下次建議：用 1 句簡短自我介紹＋1 句反問，把對話接起來。',
      ]
        .filter(Boolean)
        .join('\n')
      saveCoachLearningSummary(language, summary)
    },
    [language, practiceMode, sessionInfo],
  )

  function handleClearChat() {
    stopCoachSpeech()
    resetAutoSpeak()
    clearCoachChatSnapshotForMode(language, practiceMode)
    clearCoachLearningSummary(language)
    setPhase('welcome')
    setChatMode(null)
    setError(null)
    setTopicSession(null)
    setSessionInfo(null)
    setMessages(createWelcomeMessages(practiceMode, language))
    setInput('')
    setUserTurns(0)
    setScenarioKey('')
    setCustomHints([])
    setAwaitingCustomInput(false)
  }

  useEffect(() => {
    if (!shouldAutoScrollRef.current) {
      return
    }
    queueScrollToBottom('smooth')
  }, [messages, loading, phase, queueScrollToBottom])

  useEffect(() => {
    const viewport = window.visualViewport
    if (!viewport) {
      return
    }

    const handleViewportChange = () => {
      if (!shouldAutoScrollRef.current) {
        return
      }
      queueScrollToBottom('auto')
    }

    viewport.addEventListener('resize', handleViewportChange)
    viewport.addEventListener('scroll', handleViewportChange)
    return () => {
      viewport.removeEventListener('resize', handleViewportChange)
      viewport.removeEventListener('scroll', handleViewportChange)
    }
  }, [queueScrollToBottom])

  useEffect(() => {
    if (isListening && inputDisabled) {
      stopListening()
    }
  }, [isListening, inputDisabled, stopListening])

  function resetToWelcome(modeOverride?: CoachPracticeMode) {
    stopCoachSpeech()
    resetAutoSpeak()
    const mode = modeOverride ?? practiceMode
    setPracticeMode(mode)
    setPhase('welcome')
    setChatMode(null)
    setError(null)
    setTopicSession(null)
    setSessionInfo(null)
    setMessages(createWelcomeMessages(mode, language))
    setInput('')
    setUserTurns(0)
    setScenarioKey('')
    setCustomHints([])
    setAwaitingCustomInput(false)
  }

  function handleChatScroll() {
    const container = chatShellRef.current
    if (!container) {
      return
    }
    const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight
    shouldAutoScrollRef.current = distanceToBottom < 120
  }

  function handlePracticeModeChange(mode: CoachPracticeMode) {
    if (mode === practiceMode || loading) {
      return
    }

    // Save current mode chat before switching.
    persistCoachChat({ mode: practiceMode })
    saveCoachPracticeModePreference(language, mode)
    prevModeRef.current = mode
    skipNextSaveRef.current = true

    stopCoachSpeech()
    resetAutoSpeak()
    setPracticeMode(mode)

    const nextCoach = readInitialCoachState(language, mode)
    if (!nextCoach.hasStoredChat) {
      setPhase('welcome')
      setChatMode(null)
      setError(null)
      setTopicSession(null)
      setSessionInfo(null)
      setScenarioKey('')
      setUserTurns(0)
      setCustomHints([])
      setAwaitingCustomInput(false)
      setMessages(createWelcomeMessages(mode, language))
      setInput('')
      markExistingAsSpoken(createWelcomeMessages(mode, language))
      return
    }

    setPhase(nextCoach.phase)
    setChatMode(mode === 'scenario-practice' ? 'custom' : null)
    setError(null)
    setTopicSession(null)
    setSessionInfo(nextCoach.sessionInfo)
    setScenarioKey(nextCoach.scenarioKey)
    setUserTurns(nextCoach.userTurns)
    setCustomHints([])
    setAwaitingCustomInput(false)
    setMessages(nextCoach.messages)
    setInput('')
    markExistingAsSpoken(nextCoach.messages)
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
    setDebugProStatus(false)
    setDebugMode(false)
    refreshUsage()
  }

  function requireSession(): boolean {
    if (isAiCoachDebugMode()) {
      return true
    }
    if (!canStartCoachSession(plan, language)) {
      openProUpgrade('coach-limit')
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

  async function beginDailyPracticeScenario(handoff: DailyCoachHandoff) {
    setLoading(true)
    setError(null)
    shouldAutoScrollRef.current = true

    persistCoachChat({ mode: practiceMode })
    clearCoachChatSnapshotForMode(handoff.language, 'scenario-practice')
    saveCoachPracticeModePreference(handoff.language, 'scenario-practice')
    stopCoachSpeech()
    resetAutoSpeak()
    prevModeRef.current = 'scenario-practice'
    skipNextSaveRef.current = true
    setPracticeMode('scenario-practice')

    try {
      const result = await startDailyPracticeScenario(handoff)

      if (!handoff.sessionAlreadyConsumed && !isAiCoachDebugMode()) {
        consumeCoachSession(handoff.language)
        refreshUsage()
      }

      const info: ChatSessionInfo = {
        scenarioTitle: result.scenarioTitle,
        roleLabelZh: result.roleLabelZh,
        goalZh: result.goalZh,
      }

      setChatMode('custom')
      setScenarioKey(buildDailyScenarioKey(handoff.sentenceId))
      setSessionInfo(info)
      setCustomHints(result.hints)
      setPhase('active')
      setUserTurns(0)
      setInput('')
      setAwaitingCustomInput(false)
      setTopicSession(null)

      const nextMessages: ChatMessage[] = [
        {
          role: 'user',
          text: `今日實戰：${handoff.scenarioTitle}`,
          createdAt: Date.now(),
          mode: 'scenario-practice',
        },
        {
          role: 'assistant',
          text: buildScenarioMetaText(info),
          variant: 'scenario-meta',
          mode: 'scenario-practice',
        },
        {
          role: 'assistant',
          text: result.openingLine,
          meaningZh: result.openingMeaningZh,
          pronunciation: result.openingPronunciation,
          variant: 'dialogue',
          hint: result.hints[0],
          createdAt: Date.now(),
          mode: 'scenario-practice',
        },
      ]

      setMessages(nextMessages)
      markExistingAsSpoken(nextMessages)
      queueScrollToBottom('smooth')
    } catch {
      setError(formatAiConnectionError(debugMode))
      setMessages(createWelcomeMessages('scenario-practice', handoff.language))
      setPhase('welcome')
      setChatMode(null)
      setSessionInfo(null)
      setScenarioKey('')
    } finally {
      setLoading(false)
      refreshAiSource()
      skipNextSaveRef.current = false
    }
  }

  async function beginCustomScenario(scenario: string) {
    if (!requireSession()) {
      return
    }

    setLoading(true)
    setError(null)
    setPracticeMode('scenario-practice')

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
      setMessages(createWelcomeMessages('scenario-practice', language))
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
    setPracticeMode('scenario-practice')

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
      setMessages(createWelcomeMessages('scenario-practice', language))
      setPhase('welcome')
    } finally {
      setLoading(false)
      refreshAiSource()
    }
  }

  useEffect(() => {
    if (!dailyHandoff || dailyHandoff.language !== language) {
      return
    }

    const handoffKey = `${dailyHandoff.language}:${dailyHandoff.sentenceId}:${dailyHandoff.createdAt}`
    if (dailyHandoffKeyRef.current === handoffKey) {
      return
    }
    dailyHandoffKeyRef.current = handoffKey

    void beginDailyPracticeScenario(dailyHandoff)
    clearDailyCoachHandoff()
    onDailyHandoffConsumed()
  }, [dailyHandoff, language, onDailyHandoffConsumed])

  useEffect(() => {
    if (phase !== 'ended' || !scenarioKey.startsWith('daily:')) {
      return
    }

    const sentenceId = Number(scenarioKey.replace('daily:', ''))
    if (!Number.isFinite(sentenceId)) {
      return
    }

    if (!isDailyAiPracticeComplete(language, sentenceId)) {
      markDailyAiPracticeComplete(language, sentenceId)
      showToast('AI 實戰完成')
    }
  }, [phase, scenarioKey, language])

  async function handleFreeChatSend(text: string) {
    const scenarioRequest = detectScenarioStartRequest(text)
    if (scenarioRequest) {
      if (scenarioRequest.type === 'topic') {
        await beginTopicChat()
      } else {
        await beginCustomScenario(scenarioRequest.scenario)
      }
      return
    }

    if (phase === 'welcome' && !requireSession()) {
      return
    }

    setLoading(true)
    setError(null)
    shouldAutoScrollRef.current = true

    const previousMessages = messages
    const isFirstMessage = phase === 'welcome'
    const userMessage: ChatMessage = {
      role: 'user',
      text,
      createdAt: Date.now(),
      mode: 'free-chat',
    }
    const history: ChatMessage[] = isFirstMessage
      ? [...messages.filter((message) => message.variant !== 'welcome'), userMessage]
      : [...messages, userMessage]

    if (isFirstMessage) {
      consumeCoachSession(language)
      refreshUsage()
      setPhase('active')
    }

    setMessages(history)
    queueScrollToBottom('auto')

    try {
      const apiHistory = takeRecentHistoryForApi(history)
      const learningSummary = loadCoachLearningSummary(language)
      const reply = await continueFreeChat({
        language,
        history: apiHistory,
        userMessage: text,
        learningSummary,
      })

      setMessages((current) => {
        const next = [
        ...current,
        {
          role: 'assistant',
          text: reply.reply,
          meaningZh: reply.replyMeaningZh,
          pronunciation: reply.replyPronunciation,
          coachingZh: reply.coachingZh,
          guidanceZh: reply.guidanceZh,
          variant: 'dialogue',
          createdAt: Date.now(),
          mode: 'free-chat',
        },
      ] as ChatMessage[]
        updateLearningSummary(next)
        return next
      })
      queueScrollToBottom('smooth')
    } catch {
      setError(formatAiConnectionError(debugMode))
      setMessages(previousMessages)
      if (isFirstMessage) {
        setPhase('welcome')
      }
      setInput(text)
    } finally {
      setLoading(false)
      refreshAiSource()
    }
  }

  async function handleSend() {
    if (loading || isListening) {
      return
    }

    if (promptProUpgradeIfNeeded()) {
      return
    }

    const text = input.trim()
    if (!text) {
      return
    }

    setInput('')
    shouldAutoScrollRef.current = true

    if (practiceMode === 'free-chat') {
      await handleFreeChatSend(text)
      return
    }

    if (phase === 'welcome') {
      const scenarioRequest = detectScenarioStartRequest(text)
      if (scenarioRequest?.type === 'topic') {
        await beginTopicChat()
        return
      }
      await beginCustomScenario(text)
      return
    }

    if (phase === 'ended' || userTurns >= maxTurns || !sessionInfo) {
      if (promptProUpgradeIfNeeded()) {
        return
      }
      return
    }

    setLoading(true)
    setError(null)
    shouldAutoScrollRef.current = true

    const previousMessages = messages
    const previousUserTurns = userTurns

    const nextUserTurn = userTurns + 1
    const history: ChatMessage[] = [
      ...messages,
      { role: 'user', text, createdAt: Date.now(), mode: 'scenario-practice' },
    ]
    setMessages(history)
    setUserTurns(nextUserTurn)
    queueScrollToBottom('auto')

    try {
      const apiHistory = takeRecentHistoryForApi(history)
      const learningSummary = loadCoachLearningSummary(language)
      const reply = await continueConversation({
        language,
        scenario: scenarioKey,
        roleLabelZh: sessionInfo.roleLabelZh,
        goalZh: sessionInfo.goalZh,
        maxTurns,
        currentTurn: nextUserTurn,
        plan,
        history: apiHistory,
        userMessage: text,
        practiceMode: 'scenario-practice',
        learningSummary,
      })

      setMessages((current) => {
        const next = [
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
          createdAt: Date.now(),
          mode: 'scenario-practice',
        },
        ] as ChatMessage[]
        updateLearningSummary(next)
        return next
      })
      queueScrollToBottom('smooth')

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
    if (promptProUpgradeIfNeeded()) {
      return null
    }

    const userMessage = messages[userMessageIndex]
    if (!userMessage || userMessage.role !== 'user') {
      return null
    }
    try {
      if (practiceMode === 'free-chat') {
        return await suggestUserReply({
          language,
          userInput: userMessage.text,
          currentScenario: '自由聊天',
          aiRole: '語言教練',
          userRole: '學習者',
          goal: '自由對話練習',
          history: messages,
        })
      }
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
    if (loading) {
      return
    }

    if (promptProUpgradeIfNeeded()) {
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

  const inputPlaceholder = shouldPromptProUpgrade
    ? '今日次數已用完'
    : COACH_CHAT_INPUT_PLACEHOLDERS[language]

  function handleQuickStartTopic() {
    if (promptProUpgradeIfNeeded()) {
      return
    }
    void beginTopicChat()
  }

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

      <LanguageSelector selected={language} onSelect={onLanguageChange} variant="coach" />

      <div className="coach-practice-mode-bar" role="group" aria-label="練習模式">
        <button
          type="button"
          className={`coach-practice-mode${practiceMode === 'free-chat' ? ' coach-practice-mode--active' : ''}`}
          onClick={() => handlePracticeModeChange('free-chat')}
          disabled={loading || isListening}
        >
          <span className="coach-practice-mode__icon" aria-hidden="true">
            💬
          </span>
          自由聊天
        </button>
        <button
          type="button"
          className={`coach-practice-mode${practiceMode === 'scenario-practice' ? ' coach-practice-mode--active' : ''}`}
          onClick={() => handlePracticeModeChange('scenario-practice')}
          disabled={loading || isListening}
        >
          <span className="coach-practice-mode__icon" aria-hidden="true">
            💼
          </span>
          情境練習
        </button>
      </div>

      {debugMode ? (
        <div className="coach-debug-bar" role="status">
          <span className="coach-debug-badge">測試模式</span>
          <span className="coach-debug-source">AI Source: {COACH_AI_SOURCE_LABELS[aiSource]}</span>
          <span className="coach-debug-source">
            自動朗讀：{autoSpeakEnabled ? '開' : '關'}
          </span>
          <span className="coach-debug-source">Pro：{isPro ? '開' : '關'}</span>
          <button
            type="button"
            className="coach-debug-off"
            onClick={() => setDebugProStatus(!isPro)}
          >
            {isPro ? '關閉測試 Pro' : '開啟測試 Pro'}
          </button>
          <button type="button" className="coach-debug-off" onClick={handleDisableDebugMode}>
            關閉測試
          </button>
        </div>
      ) : null}

      <div className="coach-energy-card" role="status">
        <div className="coach-energy-card__content">
          <span className="coach-energy-card__icon" aria-hidden="true">
            ⚡
          </span>
          <div className="coach-energy-card__text">
            <p className="coach-energy-card__title">
              {debugMode
                ? '測試模式：不限次數'
                : `今日能量 ${remainingSessions} / ${dailyLimit}`}
            </p>
            {!debugMode ? (
              <p className="coach-energy-card__hint">每日重置，好好練習吧！</p>
            ) : null}
          </div>
        </div>
        <div className="coach-energy-card__actions">
          {import.meta.env.DEV && isCoachMockMode() ? (
            <span className="coach-usage-badge">Mock</span>
          ) : null}
          <button
            type="button"
            className="coach-clear-chat"
            onClick={handleClearChat}
            disabled={loading}
          >
            <span className="coach-clear-chat__icon" aria-hidden="true">
              ↺
            </span>
            清除
          </button>
        </div>
      </div>

      {error ? (
        <p className="coach-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="coach-chat-shell" ref={chatShellRef} onScroll={handleChatScroll}>
        <CoachChatView
          language={language}
          practiceMode={practiceMode}
          phase={phase}
          session={sessionInfo}
          messages={messages}
          userTurns={userTurns}
          maxTurns={maxTurns}
          loading={loading}
          showQuickActions={practiceMode === 'scenario-practice' && phase === 'welcome' && !awaitingCustomInput}
          onStartTopic={handleQuickStartTopic}
          onFocusCustomInput={handleFocusCustomInput}
          onRequestNaturalCorrection={handleRequestNaturalCorrection}
        />
        <div className="coach-chat-spacer" aria-hidden="true" />
        <div ref={chatEndRef} />
      </div>

      <div className="coach-input-fixed">
        <div className="coach-composer">
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
            className={`coach-chat-input${shouldPromptProUpgrade ? ' coach-chat-input--limit-hint' : ''}`}
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
            disabled={loading || isListening}
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
            className={`coach-chat-send${shouldPromptProUpgrade ? ' coach-chat-send--upgrade-prompt' : ''}`}
            onClick={() => void handleSend()}
            disabled={loading || isListening || (!shouldPromptProUpgrade && !input.trim())}
            aria-label={loading ? '送出中' : '送出'}
          >
            {loading ? (
              <span className="coach-chat-send__label">…</span>
            ) : (
              <svg
                className="coach-chat-send__icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                width={18}
                height={18}
                aria-hidden="true"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            )}
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}
