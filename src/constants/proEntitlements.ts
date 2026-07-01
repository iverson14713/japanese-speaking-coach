import type { ProUpgradeReason } from '../context/ProUpgradeContext'

export const FREE_FAVORITE_LIMIT = 20

export const PRO_AI_TAGLINE = '每天 15 回合 AI 陪練，不限場次，聊開了也能繼續練。'

export const PRO_UNLOCK_FEATURES = [
  '每天 15 回合 AI 陪練',
  '不限場次，聊開了也能繼續',
  'AI 逐句糾正與自然說法',
  '今日弱點分析',
  '收藏句子 AI 複習',
  'AI 情境實戰',
  '收藏不限',
] as const

export const FREE_ENTITLEMENTS = [
  '每天 1 場 AI 實戰，共 5 回合',
  '收藏最多 20 句',
  '每日句子、基礎句庫與情境句子',
] as const

export interface ProUpgradeCopy {
  title: string
  subtitle: string
  dismissLabel: string
}

export function getProUpgradeCopy(reason: ProUpgradeReason | null): ProUpgradeCopy {
  switch (reason) {
    case 'coach-limit':
      return {
        title: '今日免費 AI 實戰已完成',
        subtitle:
          '免費版每天可練 5 回合。升級 Pro 後，每天 15 回合、不限場次，還能解鎖弱點分析與情境實戰。',
        dismissLabel: '明天再練',
      }
    case 'favorites-limit':
      return {
        title: '收藏已達上限',
        subtitle: `免費版最多收藏 ${FREE_FAVORITE_LIMIT} 句。升級 Pro 可無限收藏，並解鎖收藏句 AI 複習。`,
        dismissLabel: '稍後再說',
      }
    case 'weakness-analysis':
      return {
        title: '解鎖今日弱點分析',
        subtitle: 'Pro 會根據今日 AI 對話，整理常見錯誤、更自然說法與建議複習句。',
        dismissLabel: '稍後再說',
      }
    case 'favorite-review':
      return {
        title: '解鎖收藏句 AI 複習',
        subtitle: 'Pro 可從收藏句產生 5 題口說複習，AI 會糾正並提供更自然說法。',
        dismissLabel: '稍後再說',
      }
    case 'scenario-roleplay':
      return {
        title: '解鎖 AI 情境實戰',
        subtitle: '讓 AI 扮演店員、櫃台或路人，陪你練真實對話，每次回覆都有教練回饋。',
        dismissLabel: '稍後再說',
      }
    case 'advanced-challenge':
      return {
        title: '解鎖進階口說挑戰',
        subtitle: 'Pro 可使用開口翻譯挑戰等進階模式，搭配更多 AI 陪練功能。',
        dismissLabel: '稍後再說',
      }
    case 'pro-feature':
    default:
      return {
        title: '升級 Pro AI 教練',
        subtitle: PRO_AI_TAGLINE,
        dismissLabel: '稍後再說',
      }
  }
}
