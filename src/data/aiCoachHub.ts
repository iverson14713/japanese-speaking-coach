export type AiCoachHubItemId = 'live-practice' | 'pronunciation' | 'review'

export type AiCoachHubItemStatus = 'available' | 'coming-soon'

export interface AiCoachHubItem {
  id: AiCoachHubItemId
  title: string
  subtitle: string
  icon: string
  status: AiCoachHubItemStatus
}

export const AI_COACH_HUB_ITEMS: AiCoachHubItem[] = [
  {
    id: 'live-practice',
    title: 'AI 實戰練習',
    subtitle: '自由聊天與情境對話',
    icon: '🎯',
    status: 'available',
  },
  {
    id: 'pronunciation',
    title: '發音回饋',
    subtitle: '跟讀後取得發音建議',
    icon: '🗣',
    status: 'coming-soon',
  },
  {
    id: 'review',
    title: '弱點分析 / 今日複習',
    subtitle: '依練習紀錄推薦句子',
    icon: '📊',
    status: 'coming-soon',
  },
]
