export const PRO_PRODUCT_IDS = {
  monthly: 'com.wayne.travelcoach.pro.monthly',
  yearly: 'com.wayne.travelcoach.pro.yearly',
} as const

export type ProProductId = (typeof PRO_PRODUCT_IDS)[keyof typeof PRO_PRODUCT_IDS]

export const PRO_PRODUCT_ID_LIST: ProProductId[] = [
  PRO_PRODUCT_IDS.monthly,
  PRO_PRODUCT_IDS.yearly,
]
