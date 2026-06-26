/**
 * Microphone permission for hold-to-record practice.
 *
 * - Web / Vercel / Safari: browser site permission; closing and reopening the tab may
 *   prompt again. Do not call getUserMedia during app init.
 * - iOS App / TestFlight: the system dialog uses NSMicrophoneUsageDescription from
 *   ios/App/App/Info.plist. Permission is requested only when the user presses record.
 *
 * Speaker playback (speechSynthesis) does not use this module.
 */

export const MICROPHONE_DENIED_MESSAGE =
  '麥克風權限已關閉，請到系統或瀏覽器設定中開啟麥克風權限，才能使用跟讀練習。'

export type MicrophonePermissionState = 'granted' | 'prompt' | 'denied' | 'unsupported'

let sessionMicDenied = false

function isPermissionDeniedError(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError')
  )
}

async function queryMicrophonePermission(): Promise<PermissionState | null> {
  if (!navigator.permissions?.query) {
    return null
  }

  try {
    const status = await navigator.permissions.query({ name: 'microphone' as PermissionName })
    return status.state
  } catch {
    return null
  }
}

/**
 * Request microphone access for recording. Call only from an explicit user gesture
 * (e.g. pointer down on「按住跟讀」), never on app launch or tab change.
 */
export async function requestMicrophoneForRecording(): Promise<{
  state: MicrophonePermissionState
  message?: string
}> {
  if (sessionMicDenied) {
    return { state: 'denied', message: MICROPHONE_DENIED_MESSAGE }
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    return { state: 'unsupported' }
  }

  const permissionState = await queryMicrophonePermission()

  if (permissionState === 'denied') {
    sessionMicDenied = true
    return { state: 'denied', message: MICROPHONE_DENIED_MESSAGE }
  }

  if (permissionState === 'granted') {
    return { state: 'granted' }
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach((track) => track.stop())
    return { state: 'granted' }
  } catch (error) {
    if (isPermissionDeniedError(error)) {
      sessionMicDenied = true
      return { state: 'denied', message: MICROPHONE_DENIED_MESSAGE }
    }
    return { state: 'prompt' }
  }
}

export function markMicrophoneDeniedForSession(): void {
  sessionMicDenied = true
}
