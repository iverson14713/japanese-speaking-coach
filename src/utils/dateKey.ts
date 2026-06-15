export function formatDateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getTodayDateKey(): string {
  return formatDateKey(new Date())
}

export function getYesterdayDateKey(): string {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return formatDateKey(date)
}

export function getCurrentWeekDateKeys(): string[] {
  const now = new Date()
  const weekday = now.getDay()
  const mondayOffset = weekday === 0 ? -6 : 1 - weekday
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset)

  const keys: string[] = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    keys.push(formatDateKey(day))
  }
  return keys
}
