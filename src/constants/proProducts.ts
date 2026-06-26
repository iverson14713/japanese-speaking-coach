export const PRO_PRODUCT_IDS = {
  monthly: 'com.wayne.travelcoach.pro.monthly',
  yearly: 'com.wayne.travelcoach.pro.yearly',
} as const

export type ProProductId = (typeof PRO_PRODUCT_IDS)[keyof typeof PRO_PRODUCT_IDS]

export const PRO_PRODUCT_ID_LIST: ProProductId[] = [
  PRO_PRODUCT_IDS.monthly,
  PRO_PRODUCT_IDS.yearly,
]

/** Display fallback when StoreKit / IAP localized price is unavailable (e.g. web). */
export const PRO_PRICE_FALLBACK = {
  monthly: 'NT$60 / 月',
  yearly: 'NT$590 / 年',
  yearlySavingsLabel: '約省 NT$130',
} as const

export interface ProProductDisplayPrices {
  monthly: string
  yearly: string
  yearlySavingsLabel: string
}
