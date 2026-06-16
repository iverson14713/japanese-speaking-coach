import { useCallback, useEffect, useRef, useState } from 'react'

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
      transcriptRef.current = collectTranscript(event)
    }

    recognition.onerror = (event) => {
      if (event.error === 'aborted') {
        return
      }

      hadErrorRef.current = true
      setIsListening(false)

      const message =
        event.error === 'not-allowed'
          ? '麥克風權限被拒絕，請允許使用麥克風後再試。'
          : event.error === 'no-speech'
            ? '沒有聽到聲音，請再試一次。'
            : '語音辨識發生錯誤，請再試一次。'

      onErrorRef.current?.(message)
    }

    recognition.onend = () => {
      setIsListening(false)

      if (!stoppedByUserRef.current) {
        return
      }

      stoppedByUserRef.current = false

      if (hadErrorRef.current) {
        hadErrorRef.current = false
        return
      }

      onResultRef.current(transcriptRef.current)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.abort()
      recognitionRef.current = null
    }
  }, [lang])

  const startListening = useCallback(() => {
    const recognition = recognitionRef.current
    if (!recognition) {
      return
    }

    transcriptRef.current = ''
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
    startListening,
    stopListening,
  }
}
