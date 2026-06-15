import type { DialogueScript } from './types'

export const koreanScripts: DialogueScript[] = [
  // ── 第一次對話 ──
  {
    id: 'ko-fc-praise',
    language: 'ko',
    category: 'first-conversation',
    title: '被稱讚韓文',
    descriptionZh: '韓國人稱讚你韓文時，可以謙虛回應並延續對話。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 開場',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '한국어 잘하시네요.',
            pronunciation: 'hangugeo jalhasineyo',
            meaningZh: '你韓文說得不錯耶。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '한국어를 조금 공부하고 있어요.',
            pronunciation: 'hangugeoreul jogeum gongbuhago isseoyo',
            meaningZh: '我有學一點韓文。',
          },
        ],
      },
      {
        title: '② 謙虛回應',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '얼마나 공부하셨어요?',
            pronunciation: 'eolmana gongbuhasyeosseoyo',
            meaningZh: '你學多久了？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '아직 조금밖에 못 해요.',
            pronunciation: 'ajik jogeumbakke mot haeyo',
            meaningZh: '還只有一點點。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '아직 잘 못해요.',
            pronunciation: 'ajik jal mothaeyo',
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
            text: '그래도 정말 잘하세요.',
            pronunciation: 'geuraedo jeongmal jalhaseyo',
            meaningZh: '但是已經很不錯了。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다. 더 열심히 공부할게요.',
            pronunciation: 'gamsahamnida. deo yeolsimhi gongbuhalgeyo',
            meaningZh: '謝謝，我會繼續學。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-fc-why-study',
    language: 'ko',
    category: 'first-conversation',
    title: '為什麼學韓文',
    descriptionZh: '被問到為什麼學韓文時，可以說是為了旅行、食物或喜歡韓國文化。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 被問原因',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '왜 한국어를 공부하세요?',
            pronunciation: 'wae hangugeoreul gongbuhaseyo',
            meaningZh: '你為什麼學韓文？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '여행 때문에 공부하고 있어요.',
            pronunciation: 'yeohaeng ttaemune gongbuhago isseoyo',
            meaningZh: '我是為了旅行學韓文。',
          },
        ],
      },
      {
        title: '② 延續話題',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '한국 여행 좋아하세요?',
            pronunciation: 'hanguk yeohaeng joahaseyo',
            meaningZh: '你喜歡韓國旅行嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네, 정말 좋아해요.',
            pronunciation: 'ne, jeongmal joahaeyo',
            meaningZh: '是的，非常喜歡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '한국 음식을 좋아해요.',
            pronunciation: 'hanguk eumsigeul joahaeyo',
            meaningZh: '我喜歡韓國食物。',
          },
        ],
      },
      {
        title: '③ 結束',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '좋네요.',
            pronunciation: 'johneyo',
            meaningZh: '很棒耶。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '추천하는 음식이 있어요?',
            pronunciation: 'chucheonhaneun eumsigi isseoyo',
            meaningZh: '有推薦的食物嗎？',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-fc-first-visit',
    language: 'ko',
    category: 'first-conversation',
    title: '第一次來韓國',
    descriptionZh: '第一次來韓國時，被問是否第一次來，可以簡單回答並問推薦地點。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 被問是否第一次來',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '한국은 처음이세요?',
            pronunciation: 'hangug-eun cheoeumiseyo',
            meaningZh: '你是第一次來韓國嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네, 한국에 처음 왔어요.',
            pronunciation: 'ne, hangug-e cheoeum wasseoyo',
            meaningZh: '對，我第一次來韓國。',
          },
        ],
      },
      {
        title: '② 聊旅行',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '어디 가세요?',
            pronunciation: 'eodi gaseyo',
            meaningZh: '你要去哪裡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '서울에 가요.',
            pronunciation: 'seoure gayo',
            meaningZh: '我要去首爾。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '추천하는 곳이 있어요?',
            pronunciation: 'chucheonhaneun gosi isseoyo',
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
            text: '인사동을 추천해요.',
            pronunciation: 'insadong-eul chucheonhaeyo',
            meaningZh: '推薦仁寺洞。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다. 가 볼게요.',
            pronunciation: 'gamsahamnida. ga bolgeyo',
            meaningZh: '謝謝，我會去看看。',
          },
        ],
      },
    ],
  },
  // ── 便利商店結帳 ──
  {
    id: 'ko-cs-drink-no-bag',
    language: 'ko',
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
            text: '어서 오세요.',
            pronunciation: 'eoseo oseyo',
            meaningZh: '歡迎光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '이거 주세요.',
            pronunciation: 'igeo juseyo',
            meaningZh: '我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '네.',
            pronunciation: 'ne',
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
            text: '봉투 필요하세요?',
            pronunciation: 'bongtu piryohaseyo',
            meaningZh: '需要袋子嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '봉투는 필요 없어요.',
            pronunciation: 'bongtuneun piryo eopseoyo',
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
            text: '이천 원이에요.',
            pronunciation: 'icheon wonieyo',
            meaningZh: '兩千韓元。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '카드로 할게요.',
            pronunciation: 'kadeuro halgeyo',
            meaningZh: '我用信用卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-cs-bento-heat',
    language: 'ko',
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
            text: '어서 오세요.',
            pronunciation: 'eoseo oseyo',
            meaningZh: '歡迎光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '이거 주세요.',
            pronunciation: 'igeo juseyo',
            meaningZh: '我要這個。',
            noteZh: '指著便當或商品時可以使用。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '데워 드릴까요?',
            pronunciation: 'dewo deurilkkayo',
            meaningZh: '要幫您加熱嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네, 부탁드려요.',
            pronunciation: 'ne, butakdeuryeo',
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
            text: '봉투 필요하세요?',
            pronunciation: 'bongtu piryohaseyo',
            meaningZh: '需要袋子嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '봉투는 필요 없어요.',
            pronunciation: 'bongtuneun piryo eopseoyo',
            meaningZh: '不需要袋子。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '결제는 어떻게 하시겠어요?',
            pronunciation: 'gyeoljeneun eotteoke hasigesseoyo',
            meaningZh: '請問要怎麼付款？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '카드로 할게요.',
            pronunciation: 'kadeuro halgeyo',
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
            text: '영수증 필요하세요?',
            pronunciation: 'yeongsujeung piryohaseyo',
            meaningZh: '需要收據嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네, 주세요.',
            pronunciation: 'ne, juseyo',
            meaningZh: '好，請給我。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-cs-transit-card',
    language: 'ko',
    category: 'convenience-store',
    title: '使用 T-money 付款',
    descriptionZh: '使用交通卡或電子支付在便利商店付款。',
    estimatedMinutes: 3,
    sections: [
      {
        title: '① 結帳',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '어서 오세요.',
            pronunciation: 'eoseo oseyo',
            meaningZh: '歡迎光臨。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '이거 주세요.',
            pronunciation: 'igeo juseyo',
            meaningZh: '我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '결제는 어떻게 하시겠어요?',
            pronunciation: 'gyeoljeneun eotteoke hasigesseoyo',
            meaningZh: '請問要怎麼付款？',
          },
        ],
      },
      {
        title: '② T-money 付款',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'T-money로 할게요.',
            pronunciation: 'Timaeniro halgeyo',
            meaningZh: '我用 T-money 付款。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '여기에 대주세요.',
            pronunciation: 'yeogie daejuseyo',
            meaningZh: '請感應這裡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네.',
            pronunciation: 'ne',
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
            text: '영수증 필요하세요?',
            pronunciation: 'yeongsujeung piryohaseyo',
            meaningZh: '需要收據嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '아니요, 괜찮아요.',
            pronunciation: 'aniyo, gwaenchanayo',
            meaningZh: '不用，沒關係。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  // ── 餐廳點餐 ──
  {
    id: 'ko-rs-full-flow',
    language: 'ko',
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
            text: '어서 오세요. 몇 분이세요?',
            pronunciation: 'eoseo oseyo. myeot buniseyo',
            meaningZh: '歡迎光臨，請問幾位？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '두 명이에요.',
            pronunciation: 'du myeongieyo',
            meaningZh: '兩位。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '이쪽으로 오세요.',
            pronunciation: 'ijjogeuro oseyo',
            meaningZh: '這邊請。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
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
            text: '영어 메뉴 있어요?',
            pronunciation: 'yeongeo menyu isseoyo',
            meaningZh: '有英文菜單嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '네, 있어요.',
            pronunciation: 'ne, isseoyo',
            meaningZh: '有的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '추천 메뉴가 뭐예요?',
            pronunciation: 'chucheon menyuga mwoyeyo',
            meaningZh: '有什麼推薦的？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '이게 추천 메뉴예요.',
            pronunciation: 'ige chucheon menyuyeyo',
            meaningZh: '這個是推薦的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '이거 주세요.',
            pronunciation: 'igeo juseyo',
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
            text: '계산 부탁드려요.',
            pronunciation: 'gyesan butakdeuryeo',
            meaningZh: '請結帳。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '현금이세요, 카드세요?',
            pronunciation: 'hyeongumiseyo, kadeuseyo',
            meaningZh: '請問用現金還是信用卡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '카드로 할게요.',
            pronunciation: 'kadeuro halgeyo',
            meaningZh: '我用信用卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-rs-recommend',
    language: 'ko',
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
            text: '추천 메뉴가 뭐예요?',
            pronunciation: 'chucheon menyuga mwoyeyo',
            meaningZh: '有什麼推薦的？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '비빔밥을 추천해요.',
            pronunciation: 'bibimbabeul chucheonhaeyo',
            meaningZh: '推薦拌飯。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '이거 매워요?',
            pronunciation: 'igeo maewoyo',
            meaningZh: '這個會辣嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '조금 매워요.',
            pronunciation: 'jogeum maewoyo',
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
            text: '그럼 이거 주세요.',
            pronunciation: 'geureom igeo juseyo',
            meaningZh: '那我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '알겠습니다.',
            pronunciation: 'algesseumnida',
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
            text: '오래 기다리셨습니다.',
            pronunciation: 'orae gidarisyetseumnida',
            meaningZh: '讓您久等了。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-rs-no-ingredient',
    language: 'ko',
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
            text: '파 빼 주세요.',
            pronunciation: 'pa ppae juseyo',
            meaningZh: '請不要加蔥。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '네, 괜찮아요.',
            pronunciation: 'ne, gwaenchanayo',
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
            text: '다른 요청 사항 있으세요?',
            pronunciation: 'dareun yocheong sahang isseuseyo',
            meaningZh: '還有其他需求嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '이상이에요.',
            pronunciation: 'isangieyo',
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
            text: '알겠습니다.',
            pronunciation: 'algesseumnida',
            meaningZh: '好的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  // ── 問路交通 ──
  {
    id: 'ko-dr-station',
    language: 'ko',
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
            text: '실례합니다.',
            pronunciation: 'sillyehamnida',
            meaningZh: '不好意思。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '네.',
            pronunciation: 'ne',
            meaningZh: '是的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '역이 어디예요?',
            pronunciation: 'yeogi eodieyo',
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
            text: '쭉 가세요.',
            pronunciation: 'jjuk gaseyo',
            meaningZh: '請直走。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '그리고 오른쪽으로 가세요.',
            pronunciation: 'geurigo oreunjjogeuro gaseyo',
            meaningZh: '然後請右轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '오른쪽이죠?',
            pronunciation: 'oreunjjogijyo',
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
            text: '네, 오른쪽이에요.',
            pronunciation: 'ne, oreunjjogieyo',
            meaningZh: '對，是右邊。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '알겠습니다. 감사합니다.',
            pronunciation: 'algesseumnida. gamsahamnida',
            meaningZh: '我知道了，謝謝。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '천만에요.',
            pronunciation: 'cheonmaneyo',
            meaningZh: '不客氣。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-dr-train-gangnam',
    language: 'ko',
    category: 'directions',
    title: '搭車去江南',
    descriptionZh: '在車站詢問這班車是否到目的地。',
    estimatedMinutes: 4,
    sections: [
      {
        title: '① 詢問目的地',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '실례합니다.',
            pronunciation: 'sillyehamnida',
            meaningZh: '不好意思。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: '네, 무슨 일이세요?',
            pronunciation: 'ne, museun iriseyo',
            meaningZh: '您好，怎麼了嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '이 지하철 강남에 가요?',
            pronunciation: 'i jihacheol Gangnam-e gayo',
            meaningZh: '這班地鐵會到江南嗎？',
          },
        ],
      },
      {
        title: '② 聽回答',
        turns: [
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: '네, 가요.',
            pronunciation: 'ne, gayo',
            meaningZh: '會到。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '몇 번 선이에요?',
            pronunciation: 'myeot beon seonieyo',
            meaningZh: '請問是第幾號線？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: '2번 선이에요.',
            pronunciation: 'ibeon seonieyo',
            meaningZh: '二號線。',
          },
        ],
      },
      {
        title: '③ 確認',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '2번 선이죠?',
            pronunciation: 'ibeon seonijyo',
            meaningZh: '是二號線對吧。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '站務員',
            text: '네, 맞아요.',
            pronunciation: 'ne, majayo',
            meaningZh: '對，沒錯。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-dr-lost',
    language: 'ko',
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
            text: '실례합니다. 길을 잃었어요.',
            pronunciation: 'sillyehamnida. gireul ireosseoyo',
            meaningZh: '不好意思，我迷路了。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '어디 가고 싶으세요?',
            pronunciation: 'eodi gago sipeuseyo',
            meaningZh: '你想去哪裡？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '호텔에 가고 싶어요.',
            pronunciation: 'hotere gago sipeoyo',
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
            text: '이 길로 쭉 가세요.',
            pronunciation: 'i gillo jjuk gaseyo',
            meaningZh: '請沿著這條路直走。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '편의점 모퉁이에서 왼쪽으로 가세요.',
            pronunciation: 'pyeonuijeom motung-ieseo oenjjogeuro gaseyo',
            meaningZh: '在便利商店的轉角左轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '다시 한번 말씀해 주세요.',
            pronunciation: 'dasi hanbeon malsseumhae juseyo',
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
            text: '쭉 가서 왼쪽이에요.',
            pronunciation: 'jjuk gaseo oenjjogieyo',
            meaningZh: '直走，然後左轉。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '알겠습니다. 감사합니다.',
            pronunciation: 'algesseumnida. gamsahamnida',
            meaningZh: '我知道了，謝謝。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '조심하세요.',
            pronunciation: 'josimhaseyo',
            meaningZh: '請小心。',
          },
        ],
      },
    ],
  },
  // ── 飯店入住 ──
  {
    id: 'ko-ht-checkin',
    language: 'ko',
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
            text: '체크인 부탁드려요.',
            pronunciation: 'chekeuin butakdeuryeo',
            meaningZh: '我要辦理入住。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '성함이 어떻게 되세요?',
            pronunciation: 'seonghami eotteoke doeseyo',
            meaningZh: '請問您的名字？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: 'Wayne이에요.',
            pronunciation: 'Wayne-ieyo',
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
            text: '예약 확인할게요.',
            pronunciation: 'yeyak hwaginhalgeyo',
            meaningZh: '我確認一下預約。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '여권 부탁드려요.',
            pronunciation: 'yeogwon butakdeuryeo',
            meaningZh: '請給我護照。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네, 여기요.',
            pronunciation: 'ne, yeogiyo',
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
            text: '여기 객실 카드예요.',
            pronunciation: 'yeogi gaeksil kadeuyeyo',
            meaningZh: '這是房卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '방은 5층이에요.',
            pronunciation: 'bang-eun ocheungieyo',
            meaningZh: '房間在五樓。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-ht-luggage',
    language: 'ko',
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
            text: '짐 맡아도 돼요?',
            pronunciation: 'jim matado dwaeyo',
            meaningZh: '可以寄放行李嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '네, 괜찮아요.',
            pronunciation: 'ne, gwaenchanayo',
            meaningZh: '可以，沒問題。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
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
            text: '몇 시쯤 오세요?',
            pronunciation: 'myeot sijjeum oseyo',
            meaningZh: '您大概幾點回來？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '오후 3시쯤 올게요.',
            pronunciation: 'ohu sesijjeum olgeyo',
            meaningZh: '大概下午三點回來。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '알겠습니다.',
            pronunciation: 'algesseumnida',
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
            text: '이 번호표 가지고 계세요.',
            pronunciation: 'i beonhopyo gajigo gyeseyo',
            meaningZh: '請拿著這張號碼牌。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네, 감사합니다.',
            pronunciation: 'ne, gamsahamnida',
            meaningZh: '好的，謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-ht-wifi-checkout',
    language: 'ko',
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
            text: 'Wi-Fi 비밀번호가 뭐예요?',
            pronunciation: 'wai fai bimilbeonhoga mwoyeyo',
            meaningZh: 'Wi-Fi 密碼是什麼？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '여기 적혀 있어요.',
            pronunciation: 'yeogi jeokhyeo isseoyo',
            meaningZh: '寫在這裡。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
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
            text: '체크아웃은 몇 시예요?',
            pronunciation: 'chekeuauseun myeot siyeyo',
            meaningZh: '請問幾點退房？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '櫃台',
            text: '11시예요.',
            pronunciation: 'yeolhansiyeyo',
            meaningZh: '十一點。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '11시죠?',
            pronunciation: 'yeolhansijyo',
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
            text: '네, 맞아요.',
            pronunciation: 'ne, majayo',
            meaningZh: '對，沒錯。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '알겠습니다. 감사합니다.',
            pronunciation: 'algesseumnida. gamsahamnida',
            meaningZh: '我知道了，謝謝。',
          },
        ],
      },
    ],
  },
  // ── 購物付款 ──
  {
    id: 'ko-sh-price-buy',
    language: 'ko',
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
            text: '실례합니다, 이거 얼마예요?',
            pronunciation: 'sillyehamnida, igeo eolmayeyo',
            meaningZh: '不好意思，這個多少錢？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '삼천 원이에요.',
            pronunciation: 'samcheon wonieyo',
            meaningZh: '三千韓元。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '삼천 원이죠?',
            pronunciation: 'samcheon wonijyo',
            meaningZh: '三千韓元對吧。',
          },
        ],
      },
      {
        title: '② 決定購買',
        turns: [
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '이거 주세요.',
            pronunciation: 'igeo juseyo',
            meaningZh: '我要這個。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
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
            text: '결제는 어떻게 하시겠어요?',
            pronunciation: 'gyeoljeneun eotteoke hasigesseoyo',
            meaningZh: '請問要怎麼付款？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '카드로 할게요.',
            pronunciation: 'kadeuro halgeyo',
            meaningZh: '我用信用卡。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-sh-tax-free',
    language: 'ko',
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
            text: '실례합니다, 면세 되나요?',
            pronunciation: 'sillyehamnida, myeonse doenayo',
            meaningZh: '不好意思，可以免稅嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '네, 가능해요.',
            pronunciation: 'ne, ganeunghaeyo',
            meaningZh: '可以。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '부탁드려요.',
            pronunciation: 'butakdeuryeo',
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
            text: '여권 부탁드려요.',
            pronunciation: 'yeogwon butakdeuryeo',
            meaningZh: '請給我護照。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네, 여기요.',
            pronunciation: 'ne, yeogiyo',
            meaningZh: '好的，請。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
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
            text: '여기에 사인 부탁드려요.',
            pronunciation: 'yeogie sain butakdeuryeo',
            meaningZh: '請在這裡簽名。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네.',
            pronunciation: 'ne',
            meaningZh: '好。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝光臨。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-sh-browsing-color',
    language: 'ko',
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
            text: '뭐 찾으세요?',
            pronunciation: 'mwo chajeuseyo',
            meaningZh: '您在找什麼嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '그냥 구경하고 있어요.',
            pronunciation: 'geunyang gugyeonghago isseoyo',
            meaningZh: '我只是看看。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '알겠습니다.',
            pronunciation: 'algesseumnida',
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
            text: '다른 색 있어요?',
            pronunciation: 'dareun saek isseoyo',
            meaningZh: '有其他顏色嗎？',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '네, 있어요.',
            pronunciation: 'ne, isseoyo',
            meaningZh: '有的。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '보여 주실 수 있어요?',
            pronunciation: 'boyeo jusil su isseoyo',
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
            text: '여기요.',
            pronunciation: 'yeogiyo',
            meaningZh: '請。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  // ── 緊急求助 ──
  {
    id: 'ko-em-sick',
    language: 'ko',
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
            text: '실례합니다, 몸이 안 좋아요.',
            pronunciation: 'sillyehamnida, momi an joayo',
            meaningZh: '不好意思，我不舒服。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '괜찮으세요?',
            pronunciation: 'gwaenchaneuseyo',
            meaningZh: '你還好嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '잠깐 쉬고 싶어요.',
            pronunciation: 'jamkkan swigo sipeoyo',
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
            text: '물 필요하세요?',
            pronunciation: 'mul piryohaseyo',
            meaningZh: '需要水嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '네, 부탁드려요.',
            pronunciation: 'ne, butakdeuryeo',
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
            text: '구급차 불러 드릴까요?',
            pronunciation: 'gugeupcha bulleo deurilkkayo',
            meaningZh: '要叫救護車嗎？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '지금은 괜찮아요.',
            pronunciation: 'jigeumeun gwaenchanayo',
            meaningZh: '現在還可以。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-em-lost-wallet',
    language: 'ko',
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
            text: '실례합니다, 지갑을 잃어버렸어요.',
            pronunciation: 'sillyehamnida, jigabeul ireobeoryeosseoyo',
            meaningZh: '不好意思，我遺失了錢包。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '어디서 잃어버리셨어요?',
            pronunciation: 'eodiseo ireobeoryeosisseoyo',
            meaningZh: '你在哪裡弄丟的？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '아마 여기예요.',
            pronunciation: 'ama yeogiyeyo',
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
            text: '지갑 색이 뭐예요?',
            pronunciation: 'jigap saegi mwoyeyo',
            meaningZh: '錢包是什麼顏色？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '검은색 지갑이에요.',
            pronunciation: 'geomeunsaek jigabieyo',
            meaningZh: '是黑色錢包。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '店員',
            text: '잠시만 기다려 주세요.',
            pronunciation: 'jamsiman gidaryeo juseyo',
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
            text: '찾으면 연락드릴게요.',
            pronunciation: 'chajeumyeon yeollakdeurilgeyo',
            meaningZh: '如果找到了會聯絡您。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
  {
    id: 'ko-em-ambulance',
    language: 'ko',
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
            text: '도와주세요.',
            pronunciation: 'dowajuseyo',
            meaningZh: '請幫幫我。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '무슨 일이세요?',
            pronunciation: 'museun iriseyo',
            meaningZh: '怎麼了？',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '친구가 쓰러졌어요.',
            pronunciation: 'chinguga sseureojyeosseoyo',
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
            text: '구급차 불러 주세요.',
            pronunciation: 'gugeupcha bulleo juseyo',
            meaningZh: '請叫救護車。',
          },
          {
            speaker: 'local',
            speakerLabelZh: '當地人',
            text: '알겠습니다. 바로 불러 드릴게요.',
            pronunciation: 'algesseumnida. baro bulleo deurilgeyo',
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
            text: '여기서 기다려 주세요.',
            pronunciation: 'yeogiseo gidaryeo juseyo',
            meaningZh: '請在這裡等。',
          },
          {
            speaker: 'you',
            speakerLabelZh: '你',
            text: '감사합니다.',
            pronunciation: 'gamsahamnida',
            meaningZh: '謝謝。',
          },
        ],
      },
    ],
  },
]
