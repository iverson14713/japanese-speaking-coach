import type { Language } from '../data/types'

export interface SpeakableSource {
  text?: string
  sentence?: string
  targetText?: string
  originalText?: string
  target?: string
  corrected?: string
  reply?: string
  pronunciation?: string
  helperText?: string
  meaningZh?: string
  explanationZh?: string
}

const JAPANESE_RE = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/
const KOREAN_RE = /[\uAC00-\uD7AF]/
const CJK_RE = /[\u4E00-\u9FFF]/
const LATIN_RE = /[A-Za-z]/

const TEACHING_HINT_MARKERS = ['你可以試著說一次', '使用時機：', '使用時機:'] as const

function hasJapanese(text: string): boolean {
  return JAPANESE_RE.test(text)
}

function hasKorean(text: string): boolean {
  return KOREAN_RE.test(text)
}

function hasChinese(text: string): boolean {
  return CJK_RE.test(text)
}

function isTeachingHint(line: string): boolean {
  return TEACHING_HINT_MARKERS.some((marker) => line.includes(marker))
}

function extractJapanese(text: string): string {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean)

  for (const line of lines) {
    if (!hasJapanese(line) || isTeachingHint(line)) {
      continue
    }
    const match = line.match(
      /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3000-\u303F、。！？!?…「」『』（）・\s]+/,
    )
    if (match?.[0]?.trim()) {
      return match[0].trim()
    }
  }

  const match = text.match(
    /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF][\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3000-\u303F、。！？!?…「」『』（）・\s]*/,
  )
  return match?.[0]?.trim() ?? ''
}

function extractKorean(text: string): string {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean)

  for (const line of lines) {
    if (!hasKorean(line) || isTeachingHint(line)) {
      continue
    }
    const match = line.match(/^[\uAC00-\uD7AF\u1100-\u11FF\s,.!?？！…]+/)
    if (match?.[0]?.trim()) {
      return match[0].trim()
    }
  }

  const match = text.match(/[\uAC00-\uD7AF][\uAC00-\uD7AF\s,.!?？！…]*/)
  return match?.[0]?.trim() ?? ''
}

function extractEnglish(text: string): string {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean)

  for (const line of lines) {
    if (isTeachingHint(line) || hasJapanese(line) || hasKorean(line)) {
      continue
    }
    if (hasChinese(line) && !LATIN_RE.test(line)) {
      continue
    }
    if (LATIN_RE.test(line)) {
      return line.replace(/[\u4E00-\u9FFF]+/g, '').replace(/\s+/g, ' ').trim()
    }
  }

  if (!hasJapanese(text) && !hasKorean(text) && LATIN_RE.test(text)) {
    return text.replace(/[\u4E00-\u9FFF]+/g, '').replace(/\s+/g, ' ').trim()
  }

  return ''
}

function extractTargetLanguageText(raw: string, language: Language): string {
  const trimmed = raw.trim()
  if (!trimmed) {
    return ''
  }

  switch (language) {
    case 'ja':
      return extractJapanese(trimmed)
    case 'ko':
      return extractKorean(trimmed)
    case 'en':
      return extractEnglish(trimmed)
  }
}

function pickExplicitText(source: SpeakableSource): string {
  return (
    source.sentence?.trim() ||
    source.targetText?.trim() ||
    source.originalText?.trim() ||
    source.target?.trim() ||
    source.corrected?.trim() ||
    source.reply?.trim() ||
    source.text?.trim() ||
    ''
  )
}

export function getSpeakableText(source: string | SpeakableSource, language: Language): string {
  const raw = typeof source === 'string' ? source : pickExplicitText(source)
  return extractTargetLanguageText(raw, language)
}
