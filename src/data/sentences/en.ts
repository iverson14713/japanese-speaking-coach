import type { Sentence } from '../types'
import { firstConversationEn } from './en/first-conversation'
import { pharmacyEn } from './en/pharmacy'
import { directionsEn } from './en/directions'
import { hotelEn } from './en/hotel'
import { restaurantEn } from './en/restaurant'
import { convenienceStoreEn } from './en/convenience-store'
import { shoppingEn } from './en/shopping'
import { emergencyEn } from './en/emergency'

export const englishSentences: Sentence[] = [
  ...firstConversationEn,
  ...pharmacyEn,
  ...directionsEn,
  ...hotelEn,
  ...restaurantEn,
  ...convenienceStoreEn,
  ...shoppingEn,
  ...emergencyEn,
]
