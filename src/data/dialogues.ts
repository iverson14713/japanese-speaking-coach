import type { Language } from './types'

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
    descriptionZh: '被稱讚日文、被問為什麼學日文時使用',
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

const japaneseScripts: DialogueScript[] = [
  {
    id: 'ja-cs-bento-heat',
    language: 'ja',
    category: 'convenience-store',
    title: '買便當並請店員加熱',
    descriptionZh:
      '在便利商店買便當時，店員可能會問要不要加熱、要不要袋子、以及付款方式。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 結帳開始',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'いらっしゃいませ。',
            pronunciation: 'irasshaimase',
            meaningZh: '歡迎光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'これをください。',
            pronunciation: 'kore o kudasai',
            meaningZh: '我要這個。',
            noteZh: '指著便當或商品時可以使用。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '温めますか？',
            pronunciation: 'atatamemasu ka',
            meaningZh: '要幫您加熱嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい、お願いします。',
            pronunciation: 'hai, onegaishimasu',
            meaningZh: '好，麻煩你了。',
          },
        ],
      },
      {
        title: '② 袋子與付款',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '袋は必要ですか？',
            pronunciation: 'fukuro wa hitsuyou desu ka',
            meaningZh: '需要袋子嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '袋はいりません。',
            pronunciation: 'fukuro wa irimasen',
            meaningZh: '不需要袋子。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'お支払いはどうしますか？',
            pronunciation: 'oshiharai wa dou shimasu ka',
            meaningZh: '請問要怎麼付款？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'カードでお願いします。',
            pronunciation: 'kaado de onegaishimasu',
            meaningZh: '我用信用卡付款。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'レシートは必要ですか？',
            pronunciation: 'reshiito wa hitsuyou desu ka',
            meaningZh: '需要收據嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい、ください。',
            pronunciation: 'hai, kudasai',
            meaningZh: '好，請給我。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'ありがとうございました。',
            pronunciation: 'arigatou gozaimashita',
            meaningZh: '謝謝光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'ありがとうございます。',
            pronunciation: 'arigatou gozaimasu',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ja-rs-full-flow',
    language: 'ja',
    category: 'restaurant',
    title: '入店、點餐、結帳',
    descriptionZh: '從進餐廳、店員詢問幾位、點推薦餐點，到最後結帳的完整流程。',
    estimatedMinutes: 5,
    sections: [
      {
        title: '① 入店',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'いらっしゃいませ。何名様ですか？',
            pronunciation: 'irasshaimase. nan mei sama desu ka',
            meaningZh: '歡迎光臨，請問幾位？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '二人です。',
            pronunciation: 'futari desu',
            meaningZh: '兩位。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'こちらへどうぞ。',
            pronunciation: 'kochira e douzo',
            meaningZh: '這邊請。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'ありがとうございます。',
            pronunciation: 'arigatou gozaimasu',
            meaningZh: '謝謝。',
          },
        ],
      },
      {
        title: '② 點餐',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '英語のメニューはありますか？',
            pronunciation: 'eigo no menyuu wa arimasu ka',
            meaningZh: '有英文菜單嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'はい、あります。',
            pronunciation: 'hai, arimasu',
            meaningZh: '有的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'おすすめは何ですか？',
            pronunciation: 'osusume wa nan desu ka',
            meaningZh: '有什麼推薦的？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'こちらがおすすめです。',
            pronunciation: 'kochira ga osusume desu',
            meaningZh: '這個是推薦的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'これをお願いします。',
            pronunciation: 'kore o onegaishimasu',
            meaningZh: '我要這個。',
          },
        ],
      },
      {
        title: '③ 結帳',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'お会計をお願いします。',
            pronunciation: 'okaikei o onegaishimasu',
            meaningZh: '請結帳。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'お支払いは現金ですか、カードですか？',
            pronunciation: 'oshiharai wa genkin desu ka, kaado desu ka',
            meaningZh: '請問用現金還是信用卡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'カードでお願いします。',
            pronunciation: 'kaado de onegaishimasu',
            meaningZh: '我用信用卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'ありがとうございました。',
            pronunciation: 'arigatou gozaimashita',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  {
    id: 'ja-ht-checkin-wifi',
    language: 'ja',
    category: 'hotel',
    title: '入住、寄放行李、問 Wi-Fi',
    descriptionZh: '到飯店櫃台辦理入住，確認預約姓名、寄放行李，以及詢問 Wi-Fi。',
    estimatedMinutes: 5,
    sections: [
      {
        title: '① 辦理入住',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'チェックインをお願いします。',
            pronunciation: 'chekkuin o onegaishimasu',
            meaningZh: '我要辦理入住。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'お名前をお願いします。',
            pronunciation: 'onamae o onegaishimasu',
            meaningZh: '請問您的名字？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Wayneです。',
            pronunciation: 'Wayne desu',
            meaningZh: '我是 Wayne。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '予約を確認します。',
            pronunciation: 'yoyaku o kakunin shimasu',
            meaningZh: '我確認一下預約。',
          },
        ],
      },
      {
        title: '② 寄放行李',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '荷物を預けてもいいですか？',
            pronunciation: 'nimotsu o azuketemo ii desu ka',
            meaningZh: '可以寄放行李嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'はい、大丈夫です。',
            pronunciation: 'hai, daijoubu desu',
            meaningZh: '可以，沒問題。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'ありがとうございます。',
            pronunciation: 'arigatou gozaimasu',
            meaningZh: '謝謝。',
          },
        ],
      },
      {
        title: '③ Wi-Fi 與退房',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Wi-Fiのパスワードは何ですか？',
            pronunciation: 'wai fai no pasuwaado wa nan desu ka',
            meaningZh: 'Wi-Fi 密碼是什麼？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'こちらに書いてあります。',
            pronunciation: 'kochira ni kaite arimasu',
            meaningZh: '寫在這裡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'チェックアウトは何時ですか？',
            pronunciation: 'chekkuauto wa nan ji desu ka',
            meaningZh: '請問幾點退房？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '十一時です。',
            pronunciation: 'juuichi ji desu',
            meaningZh: '十一點。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'わかりました。ありがとうございます。',
            pronunciation: 'wakarimashita. arigatou gozaimasu',
            meaningZh: '我知道了，謝謝。',
          },
        ],
      },
    ],
  },
]

const allScripts: DialogueScript[] = [...japaneseScripts]

export function hasDialoguesForLanguage(language: Language): boolean {
  return allScripts.some((s) => s.language === language)
}

export function getScriptsByCategory(
  language: Language,
  category: DialogueCategoryId,
): DialogueScript[] {
  return allScripts.filter((s) => s.language === language && s.category === category)
}

export function getDialogueScenario(category: DialogueCategoryId): DialogueScenario | undefined {
  return dialogueScenarios.find((s) => s.category === category)
}

export function countScriptTurns(script: DialogueScript): number {
  if (!script.sections) {
    return 0
  }
  return script.sections.reduce((total, section) => total + section.turns.length, 0)
}
