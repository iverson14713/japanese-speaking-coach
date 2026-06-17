import type { Sentence } from '../types'
import { firstConversationKo } from './ko/first-conversation'
import { pharmacyKo } from './ko/pharmacy'
import { directionsKo } from './ko/directions'
import { hotelKo } from './ko/hotel'
import { restaurantKo } from './ko/restaurant'
import { convenienceStoreKo } from './ko/convenience-store'
import { shoppingKo } from './ko/shopping'
import { emergencyKo } from './ko/emergency'

export const koreanSentences: Sentence[] = [
  ...firstConversationKo,
  ...pharmacyKo,
  ...directionsKo,
  ...hotelKo,
  ...restaurantKo,
  ...convenienceStoreKo,
  ...shoppingKo,
  ...emergencyKo,
]
