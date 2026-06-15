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
  // ── 第一次對話 ──
  {
    id: 'ja-fc-praise',
    language: 'ja',
    category: 'first-conversation',
    title: '被稱讚日文',
    descriptionZh: '日本人稱讚你日文時，可以謙虛回應並延續對話。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 開場',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: '日本語、上手ですね。',
            pronunciation: 'nihongo, jouzu desu ne',
            meaningZh: '你日文說得不錯耶。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'ありがとうございます。',
            pronunciation: 'arigatou gozaimasu',
            meaningZh: '謝謝。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '日本語を少し勉強しています。',
            pronunciation: 'nihongo o sukoshi benkyou shiteimasu',
            meaningZh: '我有學一點日文。',
          },
        ],
      },
      {
        title: '② 謙虛回應',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'どのくらい勉強していますか？',
            pronunciation: 'dono kurai benkyou shiteimasu ka',
            meaningZh: '你學多久了？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'まだ少しだけです。',
            pronunciation: 'mada sukoshi dake desu',
            meaningZh: '還只有一點點。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'まだ上手ではありません。',
            pronunciation: 'mada jouzu dewa arimasen',
            meaningZh: '我還說得不好。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'でも、とてもいいですよ。',
            pronunciation: 'demo, totemo ii desu yo',
            meaningZh: '但是已經很不錯了。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'ありがとうございます。もっと勉強します。',
            pronunciation: 'arigatou gozaimasu. motto benkyou shimasu',
            meaningZh: '謝謝，我會繼續學。',
          },
        ],
      },
    ],
  },
  {
    id: 'ja-fc-why-study',
    language: 'ja',
    category: 'first-conversation',
    title: '為什麼學日文',
    descriptionZh: '被問到為什麼學日文時，可以說是為了旅行、食物或喜歡日本文化。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 被問原因',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'どうして日本語を勉強しているんですか？',
            pronunciation: 'doushite nihongo o benkyou shiteirun desu ka',
            meaningZh: '你為什麼學日文？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '旅行のために勉強しています。',
            pronunciation: 'ryokou no tame ni benkyou shiteimasu',
            meaningZh: '我是為了旅行學日文。',
          },
        ],
      },
      {
        title: '② 延續話題',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: '日本旅行が好きですか？',
            pronunciation: 'nihon ryokou ga suki desu ka',
            meaningZh: '你喜歡日本旅行嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい、とても好きです。',
            pronunciation: 'hai, totemo suki desu',
            meaningZh: '是的，非常喜歡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '日本の食べ物が好きです。',
            pronunciation: 'nihon no tabemono ga suki desu',
            meaningZh: '我喜歡日本食物。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'いいですね。',
            pronunciation: 'ii desu ne',
            meaningZh: '很棒耶。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'おすすめの食べ物はありますか？',
            pronunciation: 'osusume no tabemono wa arimasu ka',
            meaningZh: '有推薦的食物嗎？',
          },
        ],
      },
    ],
  },
  {
    id: 'ja-fc-first-visit',
    language: 'ja',
    category: 'first-conversation',
    title: '第一次來日本',
    descriptionZh: '第一次來日本時，被問是否第一次來，可以簡單回答並問推薦地點。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 被問是否第一次來',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: '日本は初めてですか？',
            pronunciation: 'nihon wa hajimete desu ka',
            meaningZh: '你是第一次來日本嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい、初めて日本に来ました。',
            pronunciation: 'hai, hajimete nihon ni kimashita',
            meaningZh: '對，我第一次來日本。',
          },
        ],
      },
      {
        title: '② 聊旅行',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'どこに行きますか？',
            pronunciation: 'doko ni ikimasu ka',
            meaningZh: '你要去哪裡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '東京に行きます。',
            pronunciation: 'toukyou ni ikimasu',
            meaningZh: '我要去東京。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'おすすめの場所はありますか？',
            pronunciation: 'osusume no basho wa arimasu ka',
            meaningZh: '有推薦的地方嗎？',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: '浅草がおすすめです。',
            pronunciation: 'asakusa ga osusume desu',
            meaningZh: '推薦淺草。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'ありがとうございます。行ってみます。',
            pronunciation: 'arigatou gozaimasu. itte mimasu',
            meaningZh: '謝謝，我會去看看。',
          },
        ],
      },
    ],
  },
  // ── 便利商店結帳 ──
  {
    id: 'ja-cs-drink-no-bag',
    language: 'ja',
    category: 'convenience-store',
    title: '買飲料，不需要袋子',
    descriptionZh: '買飲料或小商品時，最基本的便利商店結帳流程。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 結帳',
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
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'はい。',
            pronunciation: 'hai',
            meaningZh: '好的。',
          },
        ],
      },
      {
        title: '② 袋子',
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
        ],
      },
      {
        title: '③ 付款',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '二百円です。',
            pronunciation: 'nihyaku en desu',
            meaningZh: '兩百日圓。',
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
    id: 'ja-cs-bento-heat',
    language: 'ja',
    category: 'convenience-store',
    title: '買便當，請店員加熱',
    descriptionZh: '在便利商店買便當時，店員常會問要不要加熱。',
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
    id: 'ja-cs-suica',
    language: 'ja',
    category: 'convenience-store',
    title: '使用 Suica 付款',
    descriptionZh: '使用交通卡或電子支付在便利商店付款。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 結帳',
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
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'お支払いはどうしますか？',
            pronunciation: 'oshiharai wa dou shimasu ka',
            meaningZh: '請問要怎麼付款？',
          },
        ],
      },
      {
        title: '② Suica 付款',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Suicaでお願いします。',
            pronunciation: 'suika de onegaishimasu',
            meaningZh: '我用 Suica 付款。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'こちらにタッチしてください。',
            pronunciation: 'kochira ni tacchi shite kudasai',
            meaningZh: '請感應這裡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい。',
            pronunciation: 'hai',
            meaningZh: '好。',
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
            text: 'いいえ、大丈夫です。',
            pronunciation: 'iie, daijoubu desu',
            meaningZh: '不用，沒關係。',
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
  // ── 餐廳點餐 ──
  {
    id: 'ja-rs-full-flow',
    language: 'ja',
    category: 'restaurant',
    title: '入店、點餐、結帳',
    descriptionZh: '從進餐廳、店員詢問幾位、點餐，到最後結帳的完整流程。',
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
    id: 'ja-rs-recommend',
    language: 'ja',
    category: 'restaurant',
    title: '詢問推薦餐點',
    descriptionZh: '不知道要點什麼時，可以請店員推薦。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 詢問推薦',
        turns: [
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
            text: 'ラーメンがおすすめです。',
            pronunciation: 'raamen ga osusume desu',
            meaningZh: '推薦拉麵。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'これは辛いですか？',
            pronunciation: 'kore wa karai desu ka',
            meaningZh: '這個會辣嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '少し辛いです。',
            pronunciation: 'sukoshi karai desu',
            meaningZh: '有一點辣。',
          },
        ],
      },
      {
        title: '② 點餐',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'じゃあ、これをお願いします。',
            pronunciation: 'jaa, kore o onegaishimasu',
            meaningZh: '那我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'かしこまりました。',
            pronunciation: 'kashikomarimashita',
            meaningZh: '好的。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'お待たせしました。',
            pronunciation: 'omatase shimashita',
            meaningZh: '讓您久等了。',
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
    id: 'ja-rs-no-ingredient',
    language: 'ja',
    category: 'restaurant',
    title: '不吃某種食材',
    descriptionZh: '點餐時想告訴店員不要蔥、不要辣或有不吃的東西。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 詢問能否調整',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'ネギを抜いてください。',
            pronunciation: 'negi o nuite kudasai',
            meaningZh: '請不要加蔥。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'はい、大丈夫です。',
            pronunciation: 'hai, daijoubu desu',
            meaningZh: '好，可以。',
          },
        ],
      },
      {
        title: '② 確認',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '他にご希望はありますか？',
            pronunciation: 'hoka ni gokibou wa arimasu ka',
            meaningZh: '還有其他需求嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '以上です。',
            pronunciation: 'ijou desu',
            meaningZh: '這樣就好。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'かしこまりました。',
            pronunciation: 'kashikomarimashita',
            meaningZh: '好的。',
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
  // ── 問路交通 ──
  {
    id: 'ja-dr-station',
    language: 'ja',
    category: 'directions',
    title: '問車站在哪裡',
    descriptionZh: '在路上找不到車站時，向日本人詢問方向。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 開口詢問',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'すみません。',
            pronunciation: 'sumimasen',
            meaningZh: '不好意思。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'はい。',
            pronunciation: 'hai',
            meaningZh: '是的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '駅はどこですか？',
            pronunciation: 'eki wa doko desu ka',
            meaningZh: '車站在哪裡？',
          },
        ],
      },
      {
        title: '② 聽方向',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'まっすぐ行ってください。',
            pronunciation: 'massugu itte kudasai',
            meaningZh: '請直走。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'そして、右に曲がってください。',
            pronunciation: 'soshite, migi ni magatte kudasai',
            meaningZh: '然後請右轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '右ですね。',
            pronunciation: 'migi desu ne',
            meaningZh: '是右邊對吧。',
          },
        ],
      },
      {
        title: '③ 確認與道謝',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'はい、右です。',
            pronunciation: 'hai, migi desu',
            meaningZh: '對，是右邊。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'わかりました。ありがとうございます。',
            pronunciation: 'wakarimashita. arigatou gozaimasu',
            meaningZh: '我知道了，謝謝。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'どういたしまして。',
            pronunciation: 'dou itashimashite',
            meaningZh: '不客氣。',
          },
        ],
      },
    ],
  },
  {
    id: 'ja-dr-train-shinjuku',
    language: 'ja',
    category: 'directions',
    title: '搭車去新宿',
    descriptionZh: '在車站詢問這班車是否到目的地。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 詢問目的地',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'すみません。',
            pronunciation: 'sumimasen',
            meaningZh: '不好意思。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: 'はい、どうしましたか？',
            pronunciation: 'hai, dou shimashita ka',
            meaningZh: '您好，怎麼了嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'この電車は新宿に行きますか？',
            pronunciation: 'kono densha wa shinjuku ni ikimasu ka',
            meaningZh: '這班電車會到新宿嗎？',
          },
        ],
      },
      {
        title: '② 聽回答',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: 'はい、行きます。',
            pronunciation: 'hai, ikimasu',
            meaningZh: '會到。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '何番線ですか？',
            pronunciation: 'nan ban sen desu ka',
            meaningZh: '請問是第幾月台？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: '二番線です。',
            pronunciation: 'ni ban sen desu',
            meaningZh: '第二月台。',
          },
        ],
      },
      {
        title: '③ 確認',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '二番線ですね。',
            pronunciation: 'ni ban sen desu ne',
            meaningZh: '是第二月台對吧。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: 'はい、そうです。',
            pronunciation: 'hai, sou desu',
            meaningZh: '對，沒錯。',
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
    id: 'ja-dr-lost',
    language: 'ja',
    category: 'directions',
    title: '迷路求助',
    descriptionZh: '迷路時向路人求助，並請對方說慢一點。',
    estimatedMinutes: 5,
    sections: [
      {
        title: '① 表達迷路',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'すみません。道に迷いました。',
            pronunciation: 'sumimasen. michi ni mayoimashita',
            meaningZh: '不好意思，我迷路了。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'どこに行きたいですか？',
            pronunciation: 'doko ni ikitai desu ka',
            meaningZh: '你想去哪裡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'ホテルに行きたいです。',
            pronunciation: 'hoteru ni ikitai desu',
            meaningZh: '我想去飯店。',
          },
        ],
      },
      {
        title: '② 對方說明',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'この道をまっすぐ行ってください。',
            pronunciation: 'kono michi o massugu itte kudasai',
            meaningZh: '請沿著這條路直走。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'コンビニの角を左に曲がってください。',
            pronunciation: 'konbini no kado o hidari ni magatte kudasai',
            meaningZh: '在便利商店的轉角左轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'すみません、もう一度お願いします。',
            pronunciation: 'sumimasen, mou ichido onegaishimasu',
            meaningZh: '不好意思，請再說一次。',
          },
        ],
      },
      {
        title: '③ 慢慢確認',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'まっすぐ行って、左です。',
            pronunciation: 'massugu itte, hidari desu',
            meaningZh: '直走，然後左轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'わかりました。ありがとうございます。',
            pronunciation: 'wakarimashita. arigatou gozaimasu',
            meaningZh: '我知道了，謝謝。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: '気をつけて。',
            pronunciation: 'ki o tsukete',
            meaningZh: '請小心。',
          },
        ],
      },
    ],
  },
  // ── 飯店入住 ──
  {
    id: 'ja-ht-checkin',
    language: 'ja',
    category: 'hotel',
    title: '辦理入住',
    descriptionZh: '到飯店櫃台辦理入住，確認姓名與護照。',
    estimatedMinutes: 5,
    sections: [
      {
        title: '① 開始入住',
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
        ],
      },
      {
        title: '② 確認預約',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '予約を確認します。',
            pronunciation: 'yoyaku o kakunin shimasu',
            meaningZh: '我確認一下預約。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'パスポートをお願いします。',
            pronunciation: 'pasupooto o onegaishimasu',
            meaningZh: '請給我護照。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい、どうぞ。',
            pronunciation: 'hai, douzo',
            meaningZh: '好的，請。',
          },
        ],
      },
      {
        title: '③ 完成入住',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'こちらがルームキーです。',
            pronunciation: 'kochira ga ruumu kii desu',
            meaningZh: '這是房卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'お部屋は五階です。',
            pronunciation: 'oheya wa go kai desu',
            meaningZh: '房間在五樓。',
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
    id: 'ja-ht-luggage',
    language: 'ja',
    category: 'hotel',
    title: '寄放行李',
    descriptionZh: '還不能入住或退房後，向櫃台詢問是否可以寄放行李。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 詢問寄放',
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
        title: '② 確認時間',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '何時ごろ戻りますか？',
            pronunciation: 'nan ji goro modorimasu ka',
            meaningZh: '您大概幾點回來？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '午後三時ごろ戻ります。',
            pronunciation: 'gogo san ji goro modorimasu',
            meaningZh: '大概下午三點回來。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'わかりました。',
            pronunciation: 'wakarimashita',
            meaningZh: '知道了。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'こちらの番号札をお持ちください。',
            pronunciation: 'kochira no bangou fuda o omochi kudasai',
            meaningZh: '請拿著這張號碼牌。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい、ありがとうございます。',
            pronunciation: 'hai, arigatou gozaimasu',
            meaningZh: '好的，謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ja-ht-wifi-checkout',
    language: 'ja',
    category: 'hotel',
    title: '問 Wi-Fi 與退房時間',
    descriptionZh: '入住後詢問 Wi-Fi 密碼和退房時間。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 問 Wi-Fi',
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
            text: 'ありがとうございます。',
            pronunciation: 'arigatou gozaimasu',
            meaningZh: '謝謝。',
          },
        ],
      },
      {
        title: '② 問退房',
        turns: [
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
            text: '十一時ですね。',
            pronunciation: 'juuichi ji desu ne',
            meaningZh: '十一點對吧。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'はい、そうです。',
            pronunciation: 'hai, sou desu',
            meaningZh: '對，沒錯。',
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
  // ── 購物付款 ──
  {
    id: 'ja-sh-price-buy',
    language: 'ja',
    category: 'shopping',
    title: '問價格並購買',
    descriptionZh: '在商店看到想買的商品，詢問價格後購買。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 問價格',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'すみません、これはいくらですか？',
            pronunciation: 'sumimasen, kore wa ikura desu ka',
            meaningZh: '不好意思，這個多少錢？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '三千円です。',
            pronunciation: 'san zen en desu',
            meaningZh: '三千日圓。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '三千円ですね。',
            pronunciation: 'san zen en desu ne',
            meaningZh: '三千日圓對吧。',
          },
        ],
      },
      {
        title: '② 決定購買',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'これをください。',
            pronunciation: 'kore o kudasai',
            meaningZh: '我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'ありがとうございます。',
            pronunciation: 'arigatou gozaimasu',
            meaningZh: '謝謝。',
          },
        ],
      },
      {
        title: '③ 付款',
        turns: [
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
    id: 'ja-sh-tax-free',
    language: 'ja',
    category: 'shopping',
    title: '免稅購物',
    descriptionZh: '購物時詢問是否可以免稅，並出示護照。',
    estimatedMinutes: 5,
    sections: [
      {
        title: '① 詢問免稅',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'すみません、免税できますか？',
            pronunciation: 'sumimasen, menzei dekimasu ka',
            meaningZh: '不好意思，可以免稅嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'はい、できます。',
            pronunciation: 'hai, dekimasu',
            meaningZh: '可以。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'お願いします。',
            pronunciation: 'onegaishimasu',
            meaningZh: '麻煩你。',
          },
        ],
      },
      {
        title: '② 出示護照',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'パスポートをお願いします。',
            pronunciation: 'pasupooto o onegaishimasu',
            meaningZh: '請給我護照。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい、どうぞ。',
            pronunciation: 'hai, douzo',
            meaningZh: '好的，請。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'ありがとうございます。',
            pronunciation: 'arigatou gozaimasu',
            meaningZh: '謝謝。',
          },
        ],
      },
      {
        title: '③ 結帳',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'こちらにサインをお願いします。',
            pronunciation: 'kochira ni sain o onegaishimasu',
            meaningZh: '請在這裡簽名。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい。',
            pronunciation: 'hai',
            meaningZh: '好。',
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
    id: 'ja-sh-browsing-color',
    language: 'ja',
    category: 'shopping',
    title: '只是看看與找其他顏色',
    descriptionZh: '店員靠近介紹時，表示只是看看，或詢問是否有其他顏色。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 只是看看',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '何かお探しですか？',
            pronunciation: 'nanika osagashi desu ka',
            meaningZh: '您在找什麼嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '見ているだけです。',
            pronunciation: 'mite iru dake desu',
            meaningZh: '我只是看看。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'わかりました。',
            pronunciation: 'wakarimashita',
            meaningZh: '了解。',
          },
        ],
      },
      {
        title: '② 問其他顏色',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '他の色はありますか？',
            pronunciation: 'hoka no iro wa arimasu ka',
            meaningZh: '有其他顏色嗎？',
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
            text: '見せてもらえますか？',
            pronunciation: 'misete moraemasu ka',
            meaningZh: '可以讓我看一下嗎？',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'どうぞ。',
            pronunciation: 'douzo',
            meaningZh: '請。',
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
  // ── 緊急求助 ──
  {
    id: 'ja-em-sick',
    language: 'ja',
    category: 'emergency',
    title: '身體不舒服',
    descriptionZh: '旅行中身體不舒服時，向身邊的人求助。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 求助',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'すみません、気分が悪いです。',
            pronunciation: 'sumimasen, kibun ga warui desu',
            meaningZh: '不好意思，我不舒服。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: '大丈夫ですか？',
            pronunciation: 'daijoubu desu ka',
            meaningZh: '你還好嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '少し休みたいです。',
            pronunciation: 'sukoshi yasumitai desu',
            meaningZh: '我想休息一下。',
          },
        ],
      },
      {
        title: '② 說明狀況',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: '水が必要ですか？',
            pronunciation: 'mizu ga hitsuyou desu ka',
            meaningZh: '需要水嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'はい、お願いします。',
            pronunciation: 'hai, onegaishimasu',
            meaningZh: '好，麻煩你。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: '救急車を呼びますか？',
            pronunciation: 'kyuukyuusha o yobimasu ka',
            meaningZh: '要叫救護車嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '今は大丈夫です。',
            pronunciation: 'ima wa daijoubu desu',
            meaningZh: '現在還可以。',
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
    id: 'ja-em-lost-wallet',
    language: 'ja',
    category: 'emergency',
    title: '錢包遺失',
    descriptionZh: '錢包不見時，向店員或站務員求助。',
    estimatedMinutes: 5,
    sections: [
      {
        title: '① 說明問題',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'すみません、財布をなくしました。',
            pronunciation: 'sumimasen, saifu o nakushimashita',
            meaningZh: '不好意思，我遺失了錢包。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'どこでなくしましたか？',
            pronunciation: 'doko de nakushimashita ka',
            meaningZh: '你在哪裡弄丟的？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'たぶん、ここです。',
            pronunciation: 'tabun, koko desu',
            meaningZh: '可能是在這裡。',
          },
        ],
      },
      {
        title: '② 提供資訊',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '財布の色は何色ですか？',
            pronunciation: 'saifu no iro wa nani iro desu ka',
            meaningZh: '錢包是什麼顏色？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '黒い財布です。',
            pronunciation: 'kuroi saifu desu',
            meaningZh: '是黑色錢包。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '少々お待ちください。',
            pronunciation: 'shoushou omachi kudasai',
            meaningZh: '請稍等。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '見つかったら連絡します。',
            pronunciation: 'mitsukattara renraku shimasu',
            meaningZh: '如果找到了會聯絡您。',
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
    id: 'ja-em-ambulance',
    language: 'ja',
    category: 'emergency',
    title: '請幫忙叫救護車',
    descriptionZh: '緊急醫療狀況時，請對方幫忙叫救護車。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 立刻求助',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '助けてください。',
            pronunciation: 'tasukete kudasai',
            meaningZh: '請幫幫我。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'どうしましたか？',
            pronunciation: 'dou shimashita ka',
            meaningZh: '怎麼了？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '友達が倒れました。',
            pronunciation: 'tomodachi ga taoremashita',
            meaningZh: '我的朋友倒下了。',
          },
        ],
      },
      {
        title: '② 請叫救護車',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '救急車を呼んでください。',
            pronunciation: 'kyuukyuusha o yonde kudasai',
            meaningZh: '請叫救護車。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'わかりました。すぐ呼びます。',
            pronunciation: 'wakarimashita. sugu yobimasu',
            meaningZh: '知道了，我馬上叫。',
          },
        ],
      },
      {
        title: '③ 等待救援',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '日本人',
            text: 'ここで待ってください。',
            pronunciation: 'koko de matte kudasai',
            meaningZh: '請在這裡等。',
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

export function hasScriptsForCategory(language: Language, category: DialogueCategoryId): boolean {
  return getScriptsByCategory(language, category).length > 0
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
