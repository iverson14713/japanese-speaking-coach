export const categories = [
  { id: 'first-conversation', label: '第一次對話', tag: '入門必學' },
  { id: 'convenience-store', label: '便利商店', tag: '實用會話' },
  { id: 'restaurant', label: '餐廳', tag: '實用會話' },
  { id: 'directions', label: '問路交通', tag: '旅行高頻' },
  { id: 'hotel', label: '飯店入住', tag: '旅行高頻' },
  { id: 'shopping', label: '購物付款', tag: '旅行高頻' },
  { id: 'pharmacy', label: '藥妝店/免稅', tag: '出國必備' },
  { id: 'emergency', label: '緊急求助', tag: '緊急必備' },
] as const

export type CategoryId = (typeof categories)[number]['id']

export function getCategoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id
}

export function getCategoryTag(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.tag ?? ''
}
