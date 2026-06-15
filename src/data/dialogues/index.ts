import type { Language } from '../types'
import { japaneseScripts } from './ja'
import { englishScripts } from './en'
import { koreanScripts } from './ko'
import { dialogueScenarios, type DialogueCategoryId, type DialogueScript, type DialogueScenario } from './types'

export type {
  DialogueCategoryId,
  DialogueScript,
  DialogueScenario,
  DialogueSection,
  DialogueSpeaker,
  DialogueTurn,
} from './types'
export { dialogueScenarios } from './types'

const allScripts: DialogueScript[] = [...japaneseScripts, ...englishScripts, ...koreanScripts]

export function hasDialoguesForLanguage(language: Language): boolean {
  return allScripts.some((s) => s.language === language)
}

export function getScriptsByCategory(
  language: Language,
  category: DialogueCategoryId,
): DialogueScript[] {
  return allScripts.filter((s) => s.language === language && s.category === category)
}

export function hasScriptsForCategory(language: Language, category: DialogueCategoryId): boolean {
  return getScriptsByCategory(language, category).length > 0
}

export function getDialogueScenario(category: DialogueCategoryId): DialogueScenario | undefined {
  return dialogueScenarios.find((s) => s.category === category)
}

export function countScriptTurns(script: DialogueScript): number {
  if (!script.sections) {
    return 0
  }
  return script.sections.reduce((total, section) => total + section.turns.length, 0)
}
