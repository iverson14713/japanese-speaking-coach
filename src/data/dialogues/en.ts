import type { DialogueScript } from './types'

export const englishScripts: DialogueScript[] = [
  // ── 第一次對話 ──
  {
    id: 'en-fc-praise',
    language: 'en',
    category: 'first-conversation',
    title: '被稱讚英文',
    descriptionZh: '當地人稱讚你英文時，可以謙虛回應並延續對話。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 開場',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Your English is really good!',
            pronunciation: 'yer EN-glish iz REE-lee good',
            meaningZh: '你英文說得不錯耶。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'THANK yoo',
            meaningZh: '謝謝。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I've been studying a little.",
            pronunciation: 'iv bin STU-dee-ing a LIT-ul',
            meaningZh: '我有學一點英文。',
          },
        ],
      },
      {
        title: '② 謙虛回應',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'How long have you been studying?',
            pronunciation: 'how long hav yoo bin STU-dee-ing',
            meaningZh: '你學多久了？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Just a little bit so far.',
            pronunciation: 'just a LIT-ul bit so FAR',
            meaningZh: '還只有一點點。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'm not very good yet.",
            pronunciation: 'im not VER-ee good yet',
            meaningZh: '我還說得不好。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: "But you're doing great!",
            pronunciation: 'but yer DOO-ing great',
            meaningZh: '但是已經很不錯了。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "Thank you. I'll keep practicing.",
            pronunciation: 'thank yoo. ill keep PRAK-tis-ing',
            meaningZh: '謝謝，我會繼續學。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-fc-why-study',
    language: 'en',
    category: 'first-conversation',
    title: '為什麼學英文',
    descriptionZh: '被問到為什麼學英文時，可以說是為了旅行、食物或喜歡美國文化。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 被問原因',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Why are you studying English?',
            pronunciation: 'why ar yoo STU-dee-ing EN-glish',
            meaningZh: '你為什麼學英文？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'm studying for travel.",
            pronunciation: 'im STU-dee-ing for TRA-vul',
            meaningZh: '我是為了旅行學英文。',
          },
        ],
      },
      {
        title: '② 延續話題',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Do you like traveling in the U.S.?',
            pronunciation: 'doo yoo like TRA-vul-ing in the U.S.',
            meaningZh: '你喜歡美國旅行嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Yes, I love it!',
            pronunciation: 'yes, i LUV it',
            meaningZh: '是的，非常喜歡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'I love American food.',
            pronunciation: 'i luv a-MER-i-kun food',
            meaningZh: '我喜歡美國食物。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: "That's great!",
            pronunciation: 'thats great',
            meaningZh: '很棒耶。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Do you have any food recommendations?',
            pronunciation: 'doo yoo hav EN-ee food re-kom-en-DAY-shuns',
            meaningZh: '有推薦的食物嗎？',
          },
        ],
      },
    ],
  },
  {
    id: 'en-fc-first-visit',
    language: 'en',
    category: 'first-conversation',
    title: '第一次來美國',
    descriptionZh: '第一次來美國時，被問是否第一次來，可以簡單回答並問推薦地點。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 被問是否第一次來',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Is this your first time in the U.S.?',
            pronunciation: 'iz this yer first time in the U.S.',
            meaningZh: '你是第一次來美國嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "Yes, it's my first time here.",
            pronunciation: 'yes, its my first time heer',
            meaningZh: '對，我第一次來美國。',
          },
        ],
      },
      {
        title: '② 聊旅行',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Where are you going?',
            pronunciation: 'wair ar yoo GO-ing',
            meaningZh: '你要去哪裡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'm going to New York.",
            pronunciation: 'im GO-ing to new YORK',
            meaningZh: '我要去紐約。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Do you have any recommendations?',
            pronunciation: 'doo yoo hav EN-ee re-kom-en-DAY-shuns',
            meaningZh: '有推薦的地方嗎？',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'I recommend Times Square.',
            pronunciation: 'i re-kom-end times square',
            meaningZh: '推薦時代廣場。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "Thank you. I'll check it out.",
            pronunciation: 'thank yoo. ill chek it out',
            meaningZh: '謝謝，我會去看看。',
          },
        ],
      },
    ],
  },
  // ── 便利商店結帳 ──
  {
    id: 'en-cs-drink-no-bag',
    language: 'en',
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
            text: 'Hi, welcome!',
            pronunciation: 'hi, WEL-kum',
            meaningZh: '歡迎光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'd like this, please.",
            pronunciation: 'id like this, pleez',
            meaningZh: '我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Sure.',
            pronunciation: 'shoor',
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
            text: 'Do you need a bag?',
            pronunciation: 'doo yoo need a bag',
            meaningZh: '需要袋子嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "No bag, please.",
            pronunciation: 'no bag, pleez',
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
            text: "That's two dollars.",
            pronunciation: 'thats too DOL-ers',
            meaningZh: '兩美元。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'll pay by card, please.",
            pronunciation: 'ill pay by card, pleez',
            meaningZh: '我用信用卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Thank you!',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-cs-bento-heat',
    language: 'en',
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
            text: 'Hi, welcome!',
            pronunciation: 'hi, WEL-kum',
            meaningZh: '歡迎光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'd like this, please.",
            pronunciation: 'id like this, pleez',
            meaningZh: '我要這個。',
            noteZh: '指著便當或商品時可以使用。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Would you like me to heat it up?',
            pronunciation: 'wood yoo like me to heet it up',
            meaningZh: '要幫您加熱嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Yes, please.',
            pronunciation: 'yes, pleez',
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
            text: 'Do you need a bag?',
            pronunciation: 'doo yoo need a bag',
            meaningZh: '需要袋子嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "No bag, please.",
            pronunciation: 'no bag, pleez',
            meaningZh: '不需要袋子。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'How would you like to pay?',
            pronunciation: 'how wood yoo like to pay',
            meaningZh: '請問要怎麼付款？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'll pay by card, please.",
            pronunciation: 'ill pay by card, pleez',
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
            text: 'Do you need a receipt?',
            pronunciation: 'doo yoo need a re-SEET',
            meaningZh: '需要收據嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Yes, please.',
            pronunciation: 'yes, pleez',
            meaningZh: '好，請給我。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Thank you!',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-cs-suica',
    language: 'en',
    category: 'convenience-store',
    title: '使用感應付款',
    descriptionZh: '使用感應支付或信用卡在便利商店付款。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 結帳',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Hi, welcome!',
            pronunciation: 'hi, WEL-kum',
            meaningZh: '歡迎光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'd like this, please.",
            pronunciation: 'id like this, pleez',
            meaningZh: '我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'How would you like to pay?',
            pronunciation: 'how wood yoo like to pay',
            meaningZh: '請問要怎麼付款？',
          },
        ],
      },
      {
        title: '② 感應付款',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'll tap my card, please.",
            pronunciation: 'ill tap my card, pleez',
            meaningZh: '我用感應付款。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Please tap here.',
            pronunciation: 'pleez tap heer',
            meaningZh: '請感應這裡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Okay.',
            pronunciation: 'oh-KAY',
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
            text: 'Do you need a receipt?',
            pronunciation: 'doo yoo need a re-SEET',
            meaningZh: '需要收據嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "No, that's fine.",
            pronunciation: 'no, thats fine',
            meaningZh: '不用，沒關係。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Thank you!',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  // ── 餐廳點餐 ──
  {
    id: 'en-rs-full-flow',
    language: 'en',
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
            text: 'Welcome! How many in your party?',
            pronunciation: 'WEL-kum! how MEN-ee in yer PAR-tee',
            meaningZh: '歡迎光臨，請問幾位？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Two, please.',
            pronunciation: 'too, pleez',
            meaningZh: '兩位。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Right this way.',
            pronunciation: 'rite this way',
            meaningZh: '這邊請。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
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
            text: 'Do you have a menu in Chinese?',
            pronunciation: 'doo yoo hav a MEN-yoo in chinese',
            meaningZh: '有中文菜單嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Yes, we do.',
            pronunciation: 'yes, we doo',
            meaningZh: '有的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'What do you recommend?',
            pronunciation: 'what doo yoo re-kom-end',
            meaningZh: '有什麼推薦的？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'I recommend this one.',
            pronunciation: 'i re-kom-end this wun',
            meaningZh: '這個是推薦的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'll have this, please.",
            pronunciation: 'ill hav this, pleez',
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
            text: 'Check, please.',
            pronunciation: 'chek, pleez',
            meaningZh: '請結帳。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Cash or card?',
            pronunciation: 'cash or card',
            meaningZh: '請問用現金還是信用卡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'll pay by card, please.",
            pronunciation: 'ill pay by card, pleez',
            meaningZh: '我用信用卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Thank you!',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-rs-recommend',
    language: 'en',
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
            text: 'What do you recommend?',
            pronunciation: 'what doo yoo re-kom-end',
            meaningZh: '有什麼推薦的？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'I recommend the burger.',
            pronunciation: 'i re-kom-end the BUR-ger',
            meaningZh: '推薦漢堡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Is it spicy?',
            pronunciation: 'iz it SPY-see',
            meaningZh: '這個會辣嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: "It's a little spicy.",
            pronunciation: 'its a LIT-ul SPY-see',
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
            text: "I'll have that, please.",
            pronunciation: 'ill hav that, pleez',
            meaningZh: '那我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Certainly.',
            pronunciation: 'SER-tun-lee',
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
            text: 'Here you go.',
            pronunciation: 'heer yoo go',
            meaningZh: '讓您久等了。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-rs-no-ingredient',
    language: 'en',
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
            text: 'No onions, please.',
            pronunciation: 'no UN-yuns, pleez',
            meaningZh: '請不要加蔥。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Sure, no problem.',
            pronunciation: 'shoor, no PROB-lum',
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
            text: 'Anything else?',
            pronunciation: 'EN-ee-thing els',
            meaningZh: '還有其他需求嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "That's all.",
            pronunciation: 'thats all',
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
            text: 'Certainly.',
            pronunciation: 'SER-tun-lee',
            meaningZh: '好的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  // ── 問路交通 ──
  {
    id: 'en-dr-station',
    language: 'en',
    category: 'directions',
    title: '問車站在哪裡',
    descriptionZh: '在路上找不到車站時，向當地人詢問方向。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 開口詢問',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Excuse me.',
            pronunciation: 'eks-KYOOZ me',
            meaningZh: '不好意思。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Yes?',
            pronunciation: 'yes',
            meaningZh: '是的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Where is the subway station?',
            pronunciation: 'wair iz the SUB-way STAY-shun',
            meaningZh: '車站在哪裡？',
          },
        ],
      },
      {
        title: '② 聽方向',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Go straight ahead.',
            pronunciation: 'go strate a-HED',
            meaningZh: '請直走。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Then turn right.',
            pronunciation: 'then turn rite',
            meaningZh: '然後請右轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Right, right?',
            pronunciation: 'rite, rite',
            meaningZh: '是右邊對吧。',
          },
        ],
      },
      {
        title: '③ 確認與道謝',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: "Yes, that's right.",
            pronunciation: 'yes, thats rite',
            meaningZh: '對，是右邊。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Got it. Thank you.',
            pronunciation: 'got it. thank yoo',
            meaningZh: '我知道了，謝謝。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: "You're welcome.",
            pronunciation: 'yer WEL-kum',
            meaningZh: '不客氣。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-dr-train-shinjuku',
    language: 'en',
    category: 'directions',
    title: '搭車去市中心',
    descriptionZh: '在車站詢問這班車是否到目的地。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 詢問目的地',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Excuse me.',
            pronunciation: 'eks-KYOOZ me',
            meaningZh: '不好意思。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: 'How can I help you?',
            pronunciation: 'how kan i help yoo',
            meaningZh: '您好，怎麼了嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Does this train go downtown?',
            pronunciation: 'duz this trayn go DOWN-town',
            meaningZh: '這班電車會到市中心嗎？',
          },
        ],
      },
      {
        title: '② 聽回答',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: 'Yes, it does.',
            pronunciation: 'yes, it duz',
            meaningZh: '會到。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Which platform is it?',
            pronunciation: 'which PLAT-form iz it',
            meaningZh: '請問是第幾月台？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: 'Platform two.',
            pronunciation: 'PLAT-form too',
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
            text: 'Platform two, right?',
            pronunciation: 'PLAT-form too, rite',
            meaningZh: '是第二月台對吧。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: "Yes, that's right.",
            pronunciation: 'yes, thats rite',
            meaningZh: '對，沒錯。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-dr-lost',
    language: 'en',
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
            text: "Excuse me. I'm lost.",
            pronunciation: 'eks-KYOOZ me. im lost',
            meaningZh: '不好意思，我迷路了。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Where do you want to go?',
            pronunciation: 'wair doo yoo want to go',
            meaningZh: '你想去哪裡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'I want to go to my hotel.',
            pronunciation: 'i want to go to my ho-TEL',
            meaningZh: '我想去飯店。',
          },
        ],
      },
      {
        title: '② 對方說明',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Go straight down this street.',
            pronunciation: 'go strate down this street',
            meaningZh: '請沿著這條路直走。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Turn left at the corner store.',
            pronunciation: 'turn left at the KOR-ner store',
            meaningZh: '在便利商店的轉角左轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Sorry, could you say that again?',
            pronunciation: 'SOR-ee, kood yoo say that a-GEN',
            meaningZh: '不好意思，請再說一次。',
          },
        ],
      },
      {
        title: '③ 慢慢確認',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Go straight, then left.',
            pronunciation: 'go strate, then left',
            meaningZh: '直走，然後左轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Got it. Thank you.',
            pronunciation: 'got it. thank yoo',
            meaningZh: '我知道了，謝謝。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Be careful.',
            pronunciation: 'be KAIR-ful',
            meaningZh: '請小心。',
          },
        ],
      },
    ],
  },
  // ── 飯店入住 ──
  {
    id: 'en-ht-checkin',
    language: 'en',
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
            text: "I'd like to check in, please.",
            pronunciation: 'id like to chek in, pleez',
            meaningZh: '我要辦理入住。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'May I have your name, please?',
            pronunciation: 'may i hav yer name, pleez',
            meaningZh: '請問您的名字？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "It's Wayne.",
            pronunciation: 'its wayn',
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
            text: 'Let me check your reservation.',
            pronunciation: 'let me chek yer re-zer-VAY-shun',
            meaningZh: '我確認一下預約。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'May I see your passport, please?',
            pronunciation: 'may i see yer PAS-port, pleez',
            meaningZh: '請給我護照。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Here you go.',
            pronunciation: 'heer yoo go',
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
            text: "Here's your room key.",
            pronunciation: 'heers yer room kee',
            meaningZh: '這是房卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'Your room is on the fifth floor.',
            pronunciation: 'yer room iz on the fifth flor',
            meaningZh: '房間在五樓。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-ht-luggage',
    language: 'en',
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
            text: 'Can I leave my luggage here?',
            pronunciation: 'kan i leev my LUG-ij heer',
            meaningZh: '可以寄放行李嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'Sure, no problem.',
            pronunciation: 'shoor, no PROB-lum',
            meaningZh: '可以，沒問題。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
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
            text: 'What time will you be back?',
            pronunciation: 'what time wil yoo be bak',
            meaningZh: '您大概幾點回來？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'll be back around three p.m.",
            pronunciation: 'ill be bak a-ROUND three P.M.',
            meaningZh: '大概下午三點回來。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'Got it.',
            pronunciation: 'got it',
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
            text: 'Please keep this ticket.',
            pronunciation: 'pleez keep this TIK-et',
            meaningZh: '請拿著這張號碼牌。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Okay, thank you.',
            pronunciation: 'oh-KAY, thank yoo',
            meaningZh: '好的，謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-ht-wifi-checkout',
    language: 'en',
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
            text: "What's the Wi-Fi password?",
            pronunciation: 'whats the WY-fy PAS-word',
            meaningZh: 'Wi-Fi 密碼是什麼？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: "It's written right here.",
            pronunciation: 'its RI-tun rite heer',
            meaningZh: '寫在這裡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
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
            text: 'What time is checkout?',
            pronunciation: 'what time iz CHEK-out',
            meaningZh: '請問幾點退房？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: 'Eleven a.m.',
            pronunciation: 'i-LEV-en A.M.',
            meaningZh: '十一點。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Eleven a.m., right?',
            pronunciation: 'i-LEV-en A.M., rite',
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
            text: "Yes, that's right.",
            pronunciation: 'yes, thats rite',
            meaningZh: '對，沒錯。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Got it. Thank you.',
            pronunciation: 'got it. thank yoo',
            meaningZh: '我知道了，謝謝。',
          },
        ],
      },
    ],
  },
  // ── 購物付款 ──
  {
    id: 'en-sh-price-buy',
    language: 'en',
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
            text: 'Excuse me, how much is this?',
            pronunciation: 'eks-KYOOZ me, how much iz this',
            meaningZh: '不好意思，這個多少錢？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: "It's thirty dollars.",
            pronunciation: 'its THUR-tee DOL-ers',
            meaningZh: '三十美元。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thirty dollars, right?',
            pronunciation: 'THUR-tee DOL-ers, rite',
            meaningZh: '三十美元對吧。',
          },
        ],
      },
      {
        title: '② 決定購買',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'll take it, please.",
            pronunciation: 'ill take it, pleez',
            meaningZh: '我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
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
            text: 'How would you like to pay?',
            pronunciation: 'how wood yoo like to pay',
            meaningZh: '請問要怎麼付款？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'll pay by card, please.",
            pronunciation: 'ill pay by card, pleez',
            meaningZh: '我用信用卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Thank you!',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-sh-tax-free',
    language: 'en',
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
            text: 'Excuse me, is tax-free shopping available?',
            pronunciation: 'eks-KYOOZ me, iz tax-free SHOP-ing a-VAY-luh-bul',
            meaningZh: '不好意思，可以免稅嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Yes, we can do that.',
            pronunciation: 'yes, we kan doo that',
            meaningZh: '可以。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Please.',
            pronunciation: 'pleez',
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
            text: 'May I see your passport, please?',
            pronunciation: 'may i see yer PAS-port, pleez',
            meaningZh: '請給我護照。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Here you go.',
            pronunciation: 'heer yoo go',
            meaningZh: '好的，請。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
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
            text: 'Please sign here.',
            pronunciation: 'pleez sine heer',
            meaningZh: '請在這裡簽名。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Okay.',
            pronunciation: 'oh-KAY',
            meaningZh: '好。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Thank you!',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-sh-browsing-color',
    language: 'en',
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
            text: 'Are you looking for something?',
            pronunciation: 'ar yoo LOOK-ing for SOM-thing',
            meaningZh: '您在找什麼嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'm just browsing.",
            pronunciation: 'im just BROW-zing',
            meaningZh: '我只是看看。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Sure, take your time.',
            pronunciation: 'shoor, take yer time',
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
            text: 'Do you have this in other colors?',
            pronunciation: 'doo yoo hav this in UH-ther KUL-ers',
            meaningZh: '有其他顏色嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Yes, we do.',
            pronunciation: 'yes, we doo',
            meaningZh: '有的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Could I see them?',
            pronunciation: 'kood i see them',
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
            text: 'Here you go.',
            pronunciation: 'heer yoo go',
            meaningZh: '請。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  // ── 緊急求助 ──
  {
    id: 'en-em-sick',
    language: 'en',
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
            text: "Excuse me, I don't feel well.",
            pronunciation: 'eks-KYOOZ me, i dont feel wel',
            meaningZh: '不好意思，我不舒服。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Are you okay?',
            pronunciation: 'ar yoo oh-KAY',
            meaningZh: '你還好嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'I need to rest a little.',
            pronunciation: 'i need to rest a LIT-ul',
            meaningZh: '我想休息一下。',
          },
        ],
      },
      {
        title: '② 說明狀況',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Do you need some water?',
            pronunciation: 'doo yoo need sum WAH-ter',
            meaningZh: '需要水嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Yes, please.',
            pronunciation: 'yes, pleez',
            meaningZh: '好，麻煩你。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Should I call an ambulance?',
            pronunciation: 'shood i kawl an AM-byoo-luns',
            meaningZh: '要叫救護車嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "I'm okay for now.",
            pronunciation: 'im oh-KAY for now',
            meaningZh: '現在還可以。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-em-lost-wallet',
    language: 'en',
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
            text: "Excuse me, I lost my wallet.",
            pronunciation: 'eks-KYOOZ me, i lost my WOL-et',
            meaningZh: '不好意思，我遺失了錢包。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'Where did you lose it?',
            pronunciation: 'wair did yoo looz it',
            meaningZh: '你在哪裡弄丟的？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Probably here.',
            pronunciation: 'PROB-uh-blee heer',
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
            text: 'What color is your wallet?',
            pronunciation: 'what KUL-er iz yer WOL-et',
            meaningZh: '錢包是什麼顏色？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: "It's a black wallet.",
            pronunciation: 'its a blak WOL-et',
            meaningZh: '是黑色錢包。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: 'One moment, please.',
            pronunciation: 'wun MOH-ment, pleez',
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
            text: "We'll contact you if we find it.",
            pronunciation: 'wel kon-TAKT yoo if we fynd it',
            meaningZh: '如果找到了會聯絡您。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'en-em-ambulance',
    language: 'en',
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
            text: 'Please help me!',
            pronunciation: 'pleez help me',
            meaningZh: '請幫幫我。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'What happened?',
            pronunciation: 'what HAP-end',
            meaningZh: '怎麼了？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'My friend collapsed.',
            pronunciation: 'my frend kuh-LAPST',
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
            text: 'Please call an ambulance.',
            pronunciation: 'pleez kawl an AM-byoo-luns',
            meaningZh: '請叫救護車。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: "Okay, I'll call right away.",
            pronunciation: 'oh-KAY, ill kawl rite a-WAY',
            meaningZh: '知道了，我馬上叫。',
          },
        ],
      },
      {
        title: '③ 等待救援',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: 'Please wait here.',
            pronunciation: 'pleez wayt heer',
            meaningZh: '請在這裡等。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Thank you.',
            pronunciation: 'thank yoo',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
]
