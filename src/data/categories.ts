export const categories = [
  { id: 'first-conversation', label: '第一次對話' },
  { id: 'convenience-store', label: '便利商店' },
  { id: 'restaurant', label: '餐廳' },
  { id: 'directions', label: '問路交通' },
  { id: 'hotel', label: '飯店入住' },
  { id: 'shopping', label: '購物付款' },
  { id: 'pharmacy', label: '藥妝店/免稅' },
  { id: 'emergency', label: '緊急求助' },
] as const

export type CategoryId = (typeof categories)[number]['id']

export function getCategoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id
}
