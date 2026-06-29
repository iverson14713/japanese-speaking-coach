import { useCallback, useEffect, useRef, useState } from 'react'
import {
  markMicrophoneDeniedForSession,
  MICROPHONE_DENIED_MESSAGE,
  requestMicrophoneForRecording,
} from '../utils/microphonePermission'

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null
}

function collectTranscript(event: SpeechRecognitionEvent): string {
  let transcript = ''
  for (let i = 0; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript
  }
  return transcript.trim()
}

interface UseSpeechRecognitionOptions {
  lang?: string
  onResult: (transcript: string) => void
  onError?: (message: string) => void
}

export function useSpeechRecognition({
  lang = 'ja-JP',
  onResult,
  onError,
}: UseSpeechRecognitionOptions) {
  const [isSupported] = useState(() => getSpeechRecognitionConstructor() !== null)
  const [isListening, setIsListening] = useState(false)
  const [interimTranscript, setInterimTranscript] = useState('')
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const transcriptRef = useRef('')
  const stoppedByUserRef = useRef(false)
  const hadErrorRef = useRef(false)
  const onResultRef = useRef(onResult)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onResultRef.current = onResult
    onErrorRef.current = onError
  }, [onResult, onError])

  useEffect(() => {
    const SpeechRecognitionAPI = getSpeechRecognitionConstructor()
    if (!SpeechRecognitionAPI) {
      return
    }

    const recognition = new SpeechRecognitionAPI()
    recognition.lang = lang
    recognition.continuous = true
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event) => {
      const transcript = collectTranscript(event)
      transcriptRef.current = transcript
      setInterimTranscript(transcript)
    }

    recognition.onerror = (event) => {
      if (event.error === 'aborted') {
        return
      }

      hadErrorRef.current = true
      setIsListening(false)
      setInterimTranscript('')

      if (event.error === 'not-allowed') {
        markMicrophoneDeniedForSession()
      }

      const message =
        event.error === 'not-allowed'
          ? MICROPHONE_DENIED_MESSAGE
          : event.error === 'no-speech'
            ? '沒有聽清楚，可以再試一次。'
            : '語音辨識發生錯誤，請再試一次。'

      onErrorRef.current?.(message)
    }

    recognition.onend = () => {
      setIsListening(false)

      if (!stoppedByUserRef.current) {
        setInterimTranscript('')
        return
      }

      stoppedByUserRef.current = false
      setInterimTranscript('')

      if (hadErrorRef.current) {
        hadErrorRef.current = false
        return
      }

      const finalTranscript = transcriptRef.current.trim()
      if (!finalTranscript) {
        onErrorRef.current?.('沒有聽清楚，可以再試一次。')
        return
      }

      onResultRef.current(finalTranscript)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.abort()
      recognitionRef.current = null
    }
  }, [lang])

  const startListening = useCallback(async () => {
    const recognition = recognitionRef.current
    if (!recognition) {
      return
    }

    const permission = await requestMicrophoneForRecording()
    if (permission.state === 'denied') {
      onErrorRef.current?.(permission.message ?? MICROPHONE_DENIED_MESSAGE)
      return
    }

    transcriptRef.current = ''
    setInterimTranscript('')
    stoppedByUserRef.current = false
    hadErrorRef.current = false

    try {
      recognition.start()
    } catch {
      recognition.abort()
      recognition.start()
    }
  }, [])

  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current
    if (!recognition) {
      return
    }

    stoppedByUserRef.current = true
    recognition.stop()
  }, [])

  return {
    isSupported,
    isListening,
    interimTranscript,
    startListening,
    stopListening,
  }
}
