export const FREE_MAX_FREEZE_CARDS = 1
export const PRO_MAX_FREEZE_CARDS = 3

export const STREAK_MILESTONE_DAYS = [5, 10, 15, 30] as const

export type StreakMilestoneDay = (typeof STREAK_MILESTONE_DAYS)[number]

export const STREAK_MILESTONE_MESSAGES: Record<StreakMilestoneDay, string> = {
  5: '連續練習 5 天！你開始養成旅行開口的節奏了。',
  10: '連續練習 10 天！送你 1 張補練卡，忙碌一天也不怕中斷。',
  15: '連續練習 15 天！你已解鎖稱號：敢開口旅行者。',
  30: '連續練習 30 天！旅行口說習慣養成成功。',
}

export const STREAK_MILESTONE_MODAL_DAYS = new Set<StreakMilestoneDay>([15, 30])

export const STREAK_FREEZE_USED_MESSAGE = '已使用 1 張補練卡，連續練習保住了。'
export const STREAK_RESET_MESSAGE = '沒關係，今天重新開始，小狗還在等你。'

export function getMaxFreezeCards(isPro: boolean): number {
  return isPro ? PRO_MAX_FREEZE_CARDS : FREE_MAX_FREEZE_CARDS
}
