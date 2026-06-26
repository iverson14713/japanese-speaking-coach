import type { CategoryId } from '../data/categories'
import type { Language } from '../data/types'

export interface DailyCoachHandoff {
  source: 'dailyPractice'
  sentenceId: number
  language: Language
  targetText: string
  meaningZh: string
  category: CategoryId
  usageNoteZh: string
  pronunciation: string
  scenarioTitle: string
  roleLabelZh: string
  goalZh: string
  openingLine: string
  openingMeaningZh: string
  openingPronunciation?: string
  scenarioPrompt: string
  sessionAlreadyConsumed: boolean
  createdAt: number
}
