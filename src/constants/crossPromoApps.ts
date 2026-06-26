export interface CrossPromoApp {
  id: string
  name: string
  description: string
  icon: string
  appStoreUrl: string
}

export const CURRENT_APP_PROMO_ID = 'travel-coach'

export const crossPromoApps: CrossPromoApp[] = [
  {
    id: 'lovequest',
    name: 'LoveQuest 情侶日常',
    description: '情侶互動、紀念日、每日戀愛任務',
    icon: '/icons/lovequest.png',
    appStoreUrl: 'https://apps.apple.com/tw/app/id6772859319',
  },
  {
    id: 'petcare',
    name: 'PetCare 寵物日記',
    description: '喝水、尿尿、體重與 AI 照護紀錄',
    icon: '/icons/petcare.png',
    appStoreUrl: 'https://apps.apple.com/tw/app/id6772930939',
  },
  {
    id: 'ai-meme',
    name: 'AI 有點嘴',
    description: '輸入問題，讓 AI 用不同人格吐槽分析',
    icon: '/icons/ai-meme.png',
    appStoreUrl: 'https://apps.apple.com/tw/app/id6779218310',
  },
  {
    id: 'travel-split',
    name: '旅分帳',
    description: '旅行分帳、多人結算、誰該付下一筆',
    icon: '/icons/travel-split.png',
    appStoreUrl: 'https://apps.apple.com/tw/app/id6782799669',
  },
  {
    id: 'personal-news',
    name: 'AI 個人新聞台',
    description: '把新聞變成 AI 主播稿，快速掌握重點',
    icon: '/icons/personal-news.png',
    appStoreUrl: 'https://apps.apple.com/tw/app/id6782586682',
  },
]

export function getAvailableCrossPromoApps(): CrossPromoApp[] {
  return crossPromoApps.filter(
    (app) => app.id !== CURRENT_APP_PROMO_ID && app.appStoreUrl.trim().length > 0,
  )
}
