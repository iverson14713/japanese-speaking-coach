import type { Language } from '../data/types'

const STORAGE_KEY = 'travel-speaking-coach-language'
const SUPPORTED_LANGUAGES: Language[] = ['en', 'ja', 'ko']
export const DEFAULT_LANGUAGE: Language = 'en'

function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'ja' || value === 'ko'
}

export function loadLanguagePreference(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && isLanguage(stored)) {
      return stored
    }
  } catch {
    // Ignore storage read errors and fall back to default.
  }
  return DEFAULT_LANGUAGE
}

export function saveLanguagePreference(language: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {
    // Ignore storage write errors.
  }
}

export function getLanguageOptions(): Language[] {
  return SUPPORTED_LANGUAGES
}
