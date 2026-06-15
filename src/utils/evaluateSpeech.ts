function normalize(text: string): string {
  return text.replace(/\s+/g, '').toLowerCase()
}

export function matchesKeyword(transcript: string, keywords: string[]): boolean {
  if (!transcript.trim()) {
    return false
  }

  const normalizedTranscript = normalize(transcript)
  return keywords.some((keyword) => normalizedTranscript.includes(normalize(keyword)))
}
