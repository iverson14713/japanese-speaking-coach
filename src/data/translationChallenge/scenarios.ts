import type { CategoryId } from '../categories'
import type { TranslationScenarioId } from './types'

export interface TranslationScenarioOption {
  id: TranslationScenarioId
  label: string
  description: string
}

export const TRANSLATION_SCENARIOS: TranslationScenarioOption[] = [
  { id: 'travel-common', label: '旅行常用', description: '各種出國會用到的句子' },
  { id: 'airport', label: '機場', description: '入境、問路、第一次開口' },
  { id: 'hotel', label: '飯店', description: '入住、退房、設施詢問' },
  { id: 'restaurant', label: '餐廳', description: '點餐、結帳、口味需求' },
  { id: 'shopping', label: '購物', description: '詢價、付款、免稅' },
  { id: 'traffic', label: '交通', description: '問路、搭車、轉乘' },
  { id: 'emergency', label: '緊急狀況', description: '求助、身體不適、緊急用語' },
]

export const DEFAULT_TRANSLATION_SCENARIO: TranslationScenarioId = 'travel-common'

const CATEGORY_SCENARIOS: Record<CategoryId, TranslationScenarioId[]> = {
  'first-conversation': ['airport', 'travel-common'],
  'convenience-store': ['travel-common', 'shopping'],
  restaurant: ['restaurant', 'travel-common'],
  directions: ['traffic', 'travel-common'],
  hotel: ['hotel', 'travel-common'],
  shopping: ['shopping', 'travel-common'],
  pharmacy: ['travel-common', 'shopping'],
  emergency: ['emergency', 'travel-common'],
}

export function getScenariosForCategory(category: CategoryId): TranslationScenarioId[] {
  return CATEGORY_SCENARIOS[category]
}
