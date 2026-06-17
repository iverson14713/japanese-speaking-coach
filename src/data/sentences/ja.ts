import type { Sentence } from '../types'
import { firstConversationJa } from './ja/first-conversation'
import { pharmacyJa } from './ja/pharmacy'
import { directionsJa } from './ja/directions'
import { hotelJa } from './ja/hotel'
import { restaurantJa } from './ja/restaurant'
import { convenienceStoreJa } from './ja/convenience-store'
import { shoppingJa } from './ja/shopping'
import { emergencyJa } from './ja/emergency'

export const japaneseSentences: Sentence[] = [
  ...firstConversationJa,
  ...pharmacyJa,
  ...directionsJa,
  ...hotelJa,
  ...restaurantJa,
  ...convenienceStoreJa,
  ...shoppingJa,
  ...emergencyJa,
]
