import { Capacitor } from '@capacitor/core'

export function openExternalUrl(url: string): void {
  if (!url.trim()) {
    return
  }

  const opened = window.open(url, '_blank', 'noopener,noreferrer')
  if (!opened && Capacitor.isNativePlatform()) {
    window.location.href = url
  }
}
