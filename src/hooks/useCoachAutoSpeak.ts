import { useCallback, useEffect, useRef, useState } from 'react'
import type { Language } from '../data/types'
import type { ChatMessage } from '../services/ai'
import { speakText, stopSpeaking } from '../utils/speechSynthesis'

interface UseCoachAutoSpeakOptions {
  messages: ChatMessage[]
  language: Language
  enabled: boolean
  loading: boolean
}

function findLatestDialogueIndex(messages: ChatMessage[]): number {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i]
    if (msg.role === 'assistant' && msg.variant === 'dialogue' && msg.text.trim()) {
      return i
    }
  }
  return -1
}

export function useCoachAutoSpeak({
  messages,
  language,
  enabled,
  loading,
}: UseCoachAutoSpeakOptions) {
  const lastSpokenIndexRef = useRef(-1)
  const [isSpeakingState, setIsSpeakingState] = useState(false)

  const resetAutoSpeak = useCallback(() => {
    lastSpokenIndexRef.current = -1
    stopSpeaking()
    setIsSpeakingState(false)
  }, [])

  const markExistingAsSpoken = useCallback((nextMessages?: ChatMessage[]) => {
    const list = nextMessages ?? messages
    lastSpokenIndexRef.current = findLatestDialogueIndex(list)
  }, [messages])

  const stopCoachSpeech = useCallback(() => {
    stopSpeaking()
    setIsSpeakingState(false)
  }, [])

  useEffect(() => {
    if (!enabled || loading) {
      return
    }

    const targetIndex = findLatestDialogueIndex(messages)
    if (targetIndex < 0 || targetIndex <= lastSpokenIndexRef.current) {
      return
    }

    lastSpokenIndexRef.current = targetIndex
    const text = messages[targetIndex].text

    speakText(text, language, {
      silent: true,
      onStart: () => setIsSpeakingState(true),
      onEnd: () => setIsSpeakingState(false),
      onError: () => setIsSpeakingState(false),
    })
  }, [messages, language, enabled, loading])

  return {
    isSpeaking: isSpeakingState,
    resetAutoSpeak,
    markExistingAsSpoken,
    stopCoachSpeech,
  }
}
