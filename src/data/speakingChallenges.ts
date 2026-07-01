export type SpeakingChallengeId = 'quick-speak' | 'translation' | 'timed-sprint' | 'survival'

export type SpeakingChallengeStatus = 'available' | 'coming-soon'

export interface SpeakingChallengeOption {
  id: SpeakingChallengeId
  title: string
  subtitle: string
  icon: string
  status: SpeakingChallengeStatus
}

export const SPEAKING_CHALLENGES: SpeakingChallengeOption[] = [
  {
    id: 'quick-speak',
    title: '5 秒開口挑戰',
    subtitle: '看到中文，5 秒內說出外語',
    icon: '⚡',
    status: 'available',
  },
  {
    id: 'translation',
    title: '開口翻譯挑戰',
    subtitle: '中翻外語，一輪 5 題限時練習（Pro）',
    icon: '🎮',
    status: 'available',
  },
  {
    id: 'timed-sprint',
    title: '限時口說闖關',
    subtitle: '連續闖關，愈快愈高分',
    icon: '⏱',
    status: 'coming-soon',
  },
  {
    id: 'survival',
    title: '生存情境對話',
    subtitle: '在情境中撐越久越好',
    icon: '🛡',
    status: 'coming-soon',
  },
]

export const DAILY_RECOMMENDED_CHALLENGE_ID: SpeakingChallengeId = 'quick-speak'
