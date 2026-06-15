import type { Language } from '../types'

export type DialogueCategoryId =
  | 'first-conversation'
  | 'convenience-store'
  | 'restaurant'
  | 'directions'
  | 'hotel'
  | 'shopping'
  | 'emergency'

export type DialogueSpeaker = 'local' | 'you'

export interface DialogueTurn {
  speaker: DialogueSpeaker
  speakerLabelZh: string
  text: string
  pronunciation?: string
  meaningZh: string
  noteZh?: string
}

export interface DialogueSection {
  title: string
  turns: DialogueTurn[]
}

export interface DialogueScript {
  id: string
  language: Language
  category: DialogueCategoryId
  title: string
  descriptionZh: string
  estimatedMinutes?: number
  sections?: DialogueSection[]
}

export interface DialogueScenario {
  category: DialogueCategoryId
  name: string
  descriptionZh: string
}

export const dialogueScenarios: DialogueScenario[] = [
  {
    category: 'first-conversation',
    name: '第一次對話',
    descriptionZh: '被稱讚、被問為什麼學語言時使用',
  },
  {
    category: 'convenience-store',
    name: '便利商店結帳',
    descriptionZh: '進店招呼、結帳、袋子與加熱時使用',
  },
  {
    category: 'restaurant',
    name: '餐廳點餐',
    descriptionZh: '入座、點餐、請店員推薦時使用',
  },
  {
    category: 'directions',
    name: '問路交通',
    descriptionZh: '問車站、搭車、迷路時使用',
  },
  {
    category: 'hotel',
    name: '飯店入住',
    descriptionZh: '辦理入住、寄放行李時使用',
  },
  {
    category: 'shopping',
    name: '購物付款',
    descriptionZh: '問價格、刷卡付款時使用',
  },
  {
    category: 'emergency',
    name: '緊急求助',
    descriptionZh: '身體不適、需要幫忙時使用',
  },
]
