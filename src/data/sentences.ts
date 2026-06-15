import type { CategoryId } from './categories'

export interface WordBreakdown {
  word: string
  meaning: string
}

export interface PhraseChunk {
  japanese: string
  romaji: string
  chinese: string
}

export interface Sentence {
  id: number
  category: CategoryId
  japanese: string
  kana: string
  romaji: string
  meaningZh: string
  usageNoteZh: string
  wordBreakdown: WordBreakdown[]
  phraseChunks: PhraseChunk[]
  keywords: string[]
}

export const sentences: Sentence[] = [
  // ── 第一次對話（13 句）──
  {
    id: 1,
    category: 'first-conversation',
    japanese: 'はじめまして',
    kana: 'はじめまして',
    romaji: 'hajimemashite',
    meaningZh: '初次見面',
    usageNoteZh: '第一次見面、向日本人自我介紹時使用',
    wordBreakdown: [{ word: 'はじめまして', meaning: '初次見面（禮貌問候）' }],
    phraseChunks: [{ japanese: 'はじめまして', romaji: 'hajimemashite', chinese: '初次見面' }],
    keywords: ['はじめまして', '初めまして'],
  },
  {
    id: 2,
    category: 'first-conversation',
    japanese: '台湾から来ました',
    kana: 'たいわんから きました',
    romaji: 'Taiwan kara kimashita',
    meaningZh: '我來自台灣',
    usageNoteZh: '自我介紹時說明自己來自哪裡',
    wordBreakdown: [
      { word: '台湾', meaning: '台灣' },
      { word: 'から', meaning: '從' },
      { word: '来ました', meaning: '來了' },
    ],
    phraseChunks: [
      { japanese: '台湾から', romaji: 'Taiwan kara', chinese: '來自台灣' },
      { japanese: '来ました', romaji: 'kimashita', chinese: '我來了' },
    ],
    keywords: ['台湾', 'たいわん', '来ました', 'きました'],
  },
  {
    id: 3,
    category: 'first-conversation',
    japanese: '日本語を少し勉強しています',
    kana: 'にほんごを すこし べんきょうしています',
    romaji: 'nihongo o sukoshi benkyou shiteimasu',
    meaningZh: '我有學一點日文',
    usageNoteZh: '當日本人問你怎麼會說日文、或稱讚你日文時使用',
    wordBreakdown: [
      { word: '日本語を', meaning: '日文' },
      { word: '少し', meaning: '一點點' },
      { word: '勉強しています', meaning: '正在學習' },
    ],
    phraseChunks: [
      { japanese: '日本語を', romaji: 'nihongo o', chinese: '日文' },
      { japanese: '少し', romaji: 'sukoshi', chinese: '一點點' },
      { japanese: '勉強しています', romaji: 'benkyou shiteimasu', chinese: '正在學習' },
    ],
    keywords: ['勉強しています', 'べんきょう', '少し', '日本語'],
  },
  {
    id: 4,
    category: 'first-conversation',
    japanese: '日本語はあまり話せません',
    kana: 'にほんごは あまり はなせません',
    romaji: 'nihongo wa amari hanasemasen',
    meaningZh: '我不太會日文',
    usageNoteZh: '向日本人說明自己日文不好，請對方諒解',
    wordBreakdown: [
      { word: '日本語', meaning: '日文' },
      { word: 'あまり', meaning: '不太' },
      { word: '話せません', meaning: '不會說' },
    ],
    phraseChunks: [
      { japanese: '日本語は', romaji: 'nihongo wa', chinese: '日文' },
      { japanese: 'あまり話せません', romaji: 'amari hanasemasen', chinese: '不太會說' },
    ],
    keywords: ['話せません', 'はなせません', '日本語'],
  },
  {
    id: 5,
    category: 'first-conversation',
    japanese: 'ゆっくり話してください',
    kana: 'ゆっくり はなしてください',
    romaji: 'yukkuri hanashite kudasai',
    meaningZh: '請說慢一點',
    usageNoteZh: '聽不懂時請對方放慢說話速度',
    wordBreakdown: [
      { word: 'ゆっくり', meaning: '慢慢地' },
      { word: '話してください', meaning: '請說' },
    ],
    phraseChunks: [
      { japanese: 'ゆっくり', romaji: 'yukkuri', chinese: '慢慢地' },
      { japanese: '話してください', romaji: 'hanashite kudasai', chinese: '請說' },
    ],
    keywords: ['ゆっくり', '話して', 'はなして'],
  },
  {
    id: 6,
    category: 'first-conversation',
    japanese: '初めて日本に来ました',
    kana: 'はじめて にほんに きました',
    romaji: 'hajimete nihon ni kimashita',
    meaningZh: '我是第一次來日本',
    usageNoteZh: '第一次去日本旅行時，自我介紹或聊天可用',
    wordBreakdown: [
      { word: '初めて', meaning: '第一次' },
      { word: '日本に', meaning: '到日本' },
      { word: '来ました', meaning: '來了' },
    ],
    phraseChunks: [
      { japanese: '初めて', romaji: 'hajimete', chinese: '第一次' },
      { japanese: '日本に', romaji: 'nihon ni', chinese: '到日本' },
      { japanese: '来ました', romaji: 'kimashita', chinese: '來了' },
    ],
    keywords: ['初めて', 'はじめて', '来ました', '日本'],
  },
  {
    id: 7,
    category: 'first-conversation',
    japanese: '日本の食べ物が好きです',
    kana: 'にほんの たべものが すきです',
    romaji: 'nihon no tabemono ga suki desu',
    meaningZh: '我喜歡日本的食物',
    usageNoteZh: '第一次聊天時很安全、好延伸的話題',
    wordBreakdown: [
      { word: '日本の', meaning: '日本的' },
      { word: '食べ物が', meaning: '食物' },
      { word: '好きです', meaning: '喜歡' },
    ],
    phraseChunks: [
      { japanese: '日本の', romaji: 'nihon no', chinese: '日本的' },
      { japanese: '食べ物が', romaji: 'tabemono ga', chinese: '食物' },
      { japanese: '好きです', romaji: 'suki desu', chinese: '喜歡' },
    ],
    keywords: ['食べ物', 'たべもの', '好きです', 'すき'],
  },
  {
    id: 8,
    category: 'first-conversation',
    japanese: '台湾が好きですか',
    kana: 'たいわんが すきですか',
    romaji: 'Taiwan ga suki desu ka',
    meaningZh: '你喜歡台灣嗎？',
    usageNoteZh: '想反問對方、延續對話時使用',
    wordBreakdown: [
      { word: '台湾が', meaning: '台灣' },
      { word: '好きですか', meaning: '喜歡嗎？' },
    ],
    phraseChunks: [
      { japanese: '台湾が', romaji: 'Taiwan ga', chinese: '台灣' },
      { japanese: '好きですか', romaji: 'suki desu ka', chinese: '喜歡嗎？' },
    ],
    keywords: ['台湾', 'たいわん', '好きですか', 'すき'],
  },
  {
    id: 9,
    category: 'first-conversation',
    japanese: '旅行のために勉強しています',
    kana: 'りょこうの ために べんきょうしています',
    romaji: 'ryokou no tame ni benkyou shiteimasu',
    meaningZh: '我是為了旅行而學日文',
    usageNoteZh: '當對方問你「為什麼學日文？」時使用',
    wordBreakdown: [
      { word: '旅行のために', meaning: '為了旅行' },
      { word: '勉強しています', meaning: '正在學習' },
    ],
    phraseChunks: [
      { japanese: '旅行のために', romaji: 'ryokou no tame ni', chinese: '為了旅行' },
      { japanese: '勉強しています', romaji: 'benkyou shiteimasu', chinese: '正在學習' },
    ],
    keywords: ['旅行', '勉強しています', 'ために'],
  },
  {
    id: 10,
    category: 'first-conversation',
    japanese: 'お話してくれてありがとうございます',
    kana: 'おはなししてくれて ありがとうございます',
    romaji: 'ohanashi shite kurete arigatou gozaimasu',
    meaningZh: '謝謝你跟我聊天',
    usageNoteZh: '聊天結束時，感謝對方願意跟你說話',
    wordBreakdown: [
      { word: 'お話してくれて', meaning: '跟我聊天' },
      { word: 'ありがとうございます', meaning: '謝謝' },
    ],
    phraseChunks: [
      { japanese: 'お話してくれて', romaji: 'ohanashi shite kurete', chinese: '跟我聊天' },
      { japanese: 'ありがとうございます', romaji: 'arigatou gozaimasu', chinese: '謝謝' },
    ],
    keywords: ['ありがとう', '話して', 'はなして'],
  },
  {
    id: 11,
    category: 'first-conversation',
    japanese: 'よろしくお願いします',
    kana: 'よろしく おねがいします',
    romaji: 'yoroshiku onegaishimasu',
    meaningZh: '很高興認識你',
    usageNoteZh: '自我介紹結尾時說，表示請多關照',
    wordBreakdown: [
      { word: 'よろしく', meaning: '請多關照' },
      { word: 'お願いします', meaning: '拜託了' },
    ],
    phraseChunks: [
      { japanese: 'よろしく', romaji: 'yoroshiku', chinese: '請多關照' },
      { japanese: 'お願いします', romaji: 'onegaishimasu', chinese: '拜託了' },
    ],
    keywords: ['よろしく', 'お願いします', 'ねがい'],
  },
  {
    id: 12,
    category: 'first-conversation',
    japanese: '写真を撮ってもいいですか',
    kana: 'しゃしんを とっても いいですか',
    romaji: 'shashin o totte mo ii desu ka',
    meaningZh: '可以拍照嗎？',
    usageNoteZh: '想拍風景或合照前，禮貌地詢問對方',
    wordBreakdown: [
      { word: '写真を', meaning: '照片' },
      { word: '撮ってもいいですか', meaning: '可以拍嗎？' },
    ],
    phraseChunks: [
      { japanese: '写真を', romaji: 'shashin o', chinese: '照片' },
      { japanese: '撮ってもいいですか', romaji: 'totte mo ii desu ka', chinese: '可以拍嗎？' },
    ],
    keywords: ['写真', 'しゃしん', '撮って', 'とって'],
  },
  {
    id: 13,
    category: 'first-conversation',
    japanese: 'まだ上手ではありません',
    kana: 'まだ じょうずでは ありません',
    romaji: 'mada jouzu dewa arimasen',
    meaningZh: '我還說得不好',
    usageNoteZh: '謙虛表示自己日文還不太好',
    wordBreakdown: [
      { word: 'まだ', meaning: '還' },
      { word: '上手ではありません', meaning: '不擅長、還不好' },
    ],
    phraseChunks: [
      { japanese: 'まだ', romaji: 'mada', chinese: '還' },
      { japanese: '上手ではありません', romaji: 'jouzu dewa arimasen', chinese: '還不好' },
    ],
    keywords: ['上手ではありません', 'じょうず', 'まだ'],
  },

  // ── 便利商店（8 句）──
  {
    id: 14,
    category: 'convenience-store',
    japanese: 'これをください',
    kana: 'これを ください',
    romaji: 'kore o kudasai',
    meaningZh: '我要這個',
    usageNoteZh: '便利商店結帳時，指著商品說',
    wordBreakdown: [
      { word: 'これ', meaning: '這個' },
      { word: 'ください', meaning: '請給我' },
    ],
    phraseChunks: [
      { japanese: 'これを', romaji: 'kore o', chinese: '這個' },
      { japanese: 'ください', romaji: 'kudasai', chinese: '請給我' },
    ],
    keywords: ['ください', 'これ'],
  },
  {
    id: 15,
    category: 'convenience-store',
    japanese: '袋はいりません',
    kana: 'ふくろは いりません',
    romaji: 'fukuro wa irimasen',
    meaningZh: '不需要袋子',
    usageNoteZh: '便利商店店員問要不要袋子時',
    wordBreakdown: [
      { word: '袋', meaning: '袋子' },
      { word: 'いりません', meaning: '不需要' },
    ],
    phraseChunks: [
      { japanese: '袋は', romaji: 'fukuro wa', chinese: '袋子' },
      { japanese: 'いりません', romaji: 'irimasen', chinese: '不需要' },
    ],
    keywords: ['いりません', '袋', 'ふくろ'],
  },
  {
    id: 16,
    category: 'convenience-store',
    japanese: '温めてください',
    kana: 'あたためて ください',
    romaji: 'atatamete kudasai',
    meaningZh: '請幫我加熱',
    usageNoteZh: '買便當或熟食，請店員幫忙微波加熱',
    wordBreakdown: [
      { word: '温めて', meaning: '加熱' },
      { word: 'ください', meaning: '請（拜託）' },
    ],
    phraseChunks: [
      { japanese: '温めて', romaji: 'atatamete', chinese: '加熱' },
      { japanese: 'ください', romaji: 'kudasai', chinese: '請' },
    ],
    keywords: ['温めて', 'あたためて', 'ください'],
  },
  {
    id: 17,
    category: 'convenience-store',
    japanese: '冷たいのをください',
    kana: 'つめたいのを ください',
    romaji: 'tsumetai no o kudasai',
    meaningZh: '我要冰的',
    usageNoteZh: '買飲料時指定要冰的',
    wordBreakdown: [
      { word: '冷たい', meaning: '冰的' },
      { word: 'のを', meaning: '（冰的）那個' },
      { word: 'ください', meaning: '請給我' },
    ],
    phraseChunks: [
      { japanese: '冷たいのを', romaji: 'tsumetai no o', chinese: '冰的' },
      { japanese: 'ください', romaji: 'kudasai', chinese: '請給我' },
    ],
    keywords: ['冷たい', 'つめたい', 'ください'],
  },
  {
    id: 18,
    category: 'convenience-store',
    japanese: '温かいのをください',
    kana: 'あたたかいのを ください',
    romaji: 'atatakai no o kudasai',
    meaningZh: '我要熱的',
    usageNoteZh: '買飲料或湯品時指定要熱的',
    wordBreakdown: [
      { word: '温かい', meaning: '熱的' },
      { word: 'のを', meaning: '（熱的）那個' },
      { word: 'ください', meaning: '請給我' },
    ],
    phraseChunks: [
      { japanese: '温かいのを', romaji: 'atatakai no o', chinese: '熱的' },
      { japanese: 'ください', romaji: 'kudasai', chinese: '請給我' },
    ],
    keywords: ['温かい', 'あたたかい', 'ください'],
  },
  {
    id: 19,
    category: 'convenience-store',
    japanese: 'クレジットカードは使えますか',
    kana: 'クレジットカードは つかえますか',
    romaji: 'kurejitto kaado wa tsukaemasu ka',
    meaningZh: '可以用信用卡嗎？',
    usageNoteZh: '結帳前確認能否刷信用卡',
    wordBreakdown: [
      { word: 'クレジットカード', meaning: '信用卡' },
      { word: '使えますか', meaning: '能用嗎？' },
    ],
    phraseChunks: [
      { japanese: 'クレジットカードは', romaji: 'kurejitto kaado wa', chinese: '信用卡' },
      { japanese: '使えますか', romaji: 'tsukaemasu ka', chinese: '能用嗎？' },
    ],
    keywords: ['クレジット', 'カード', '使えますか'],
  },
  {
    id: 20,
    category: 'convenience-store',
    japanese: 'Suicaは使えますか',
    kana: 'スイカは つかえますか',
    romaji: 'Suica wa tsukaemasu ka',
    meaningZh: '可以用 Suica 嗎？',
    usageNoteZh: '確認能否用交通 IC 卡付款',
    wordBreakdown: [
      { word: 'Suica', meaning: 'Suica 交通卡' },
      { word: '使えますか', meaning: '能用嗎？' },
    ],
    phraseChunks: [
      { japanese: 'Suicaは', romaji: 'Suica wa', chinese: 'Suica' },
      { japanese: '使えますか', romaji: 'tsukaemasu ka', chinese: '能用嗎？' },
    ],
    keywords: ['Suica', 'スイカ', '使えますか'],
  },
  {
    id: 21,
    category: 'convenience-store',
    japanese: 'レシートをください',
    kana: 'レシートを ください',
    romaji: 'reshiito o kudasai',
    meaningZh: '請給我收據',
    usageNoteZh: '結帳後需要收據時',
    wordBreakdown: [
      { word: 'レシート', meaning: '收據' },
      { word: 'ください', meaning: '請給我' },
    ],
    phraseChunks: [
      { japanese: 'レシートを', romaji: 'reshiito o', chinese: '收據' },
      { japanese: 'ください', romaji: 'kudasai', chinese: '請給我' },
    ],
    keywords: ['レシート', 'ください'],
  },

  // ── 餐廳（8 句）──
  {
    id: 22,
    category: 'restaurant',
    japanese: '何名様ですか',
    kana: 'なんめいさまですか',
    romaji: 'nan mei sama desu ka',
    meaningZh: '請問幾位？',
    usageNoteZh: '店員問人數時，你可以聽懂這句再回答',
    wordBreakdown: [
      { word: '何名', meaning: '幾位' },
      { word: '様', meaning: '（敬語）' },
      { word: 'ですか', meaning: '是嗎？' },
    ],
    phraseChunks: [
      { japanese: '何名', romaji: 'nan mei', chinese: '幾位' },
      { japanese: '様ですか', romaji: 'sama desu ka', chinese: '（敬語）請問？' },
    ],
    keywords: ['何名', 'なんめい', '名'],
  },
  {
    id: 23,
    category: 'restaurant',
    japanese: '二人です',
    kana: 'ふたりです',
    romaji: 'futari desu',
    meaningZh: '兩位',
    usageNoteZh: '進餐廳時回答人數，兩個人',
    wordBreakdown: [
      { word: '二人', meaning: '兩個人' },
      { word: 'です', meaning: '是' },
    ],
    phraseChunks: [
      { japanese: '二人', romaji: 'futari', chinese: '兩個人' },
      { japanese: 'です', romaji: 'desu', chinese: '是' },
    ],
    keywords: ['二人', 'ふたり', '人'],
  },
  {
    id: 24,
    category: 'restaurant',
    japanese: '英語のメニューはありますか',
    kana: 'えいごの メニューは ありますか',
    romaji: 'eigo no menyuu wa arimasu ka',
    meaningZh: '有英文菜單嗎？',
    usageNoteZh: '看不懂日文菜單時',
    wordBreakdown: [
      { word: '英語', meaning: '英文' },
      { word: 'メニュー', meaning: '菜單' },
      { word: 'ありますか', meaning: '有嗎？' },
    ],
    phraseChunks: [
      { japanese: '英語のメニューは', romaji: 'eigo no menyuu wa', chinese: '英文菜單' },
      { japanese: 'ありますか', romaji: 'arimasu ka', chinese: '有嗎？' },
    ],
    keywords: ['メニュー', 'ありますか', '英語'],
  },
  {
    id: 25,
    category: 'restaurant',
    japanese: 'おすすめは何ですか',
    kana: 'おすすめは なんですか',
    romaji: 'osusume wa nan desu ka',
    meaningZh: '有什麼推薦的？',
    usageNoteZh: '進餐廳不知道點什麼時',
    wordBreakdown: [
      { word: 'おすすめ', meaning: '推薦' },
      { word: '何ですか', meaning: '是什麼？' },
    ],
    phraseChunks: [
      { japanese: 'おすすめは', romaji: 'osusume wa', chinese: '推薦' },
      { japanese: '何ですか', romaji: 'nan desu ka', chinese: '是什麼？' },
    ],
    keywords: ['おすすめ', '何ですか', 'なんですか'],
  },
  {
    id: 26,
    category: 'restaurant',
    japanese: 'これをください',
    kana: 'これを ください',
    romaji: 'kore o kudasai',
    meaningZh: '我要這個',
    usageNoteZh: '點菜時指著菜單或圖片說',
    wordBreakdown: [
      { word: 'これ', meaning: '這個' },
      { word: 'ください', meaning: '請給我' },
    ],
    phraseChunks: [
      { japanese: 'これを', romaji: 'kore o', chinese: '這個' },
      { japanese: 'ください', romaji: 'kudasai', chinese: '請給我' },
    ],
    keywords: ['ください', 'これ'],
  },
  {
    id: 27,
    category: 'restaurant',
    japanese: 'ねぎ抜きでお願いします',
    kana: 'ねぎぬきで おねがいします',
    romaji: 'negi nuki de onegaishimasu',
    meaningZh: '不要蔥',
    usageNoteZh: '點餐時說明不要蔥或其他配料',
    wordBreakdown: [
      { word: 'ねぎ抜き', meaning: '不要蔥' },
      { word: 'お願いします', meaning: '拜託了' },
    ],
    phraseChunks: [
      { japanese: 'ねぎ抜きで', romaji: 'negi nuki de', chinese: '不要蔥' },
      { japanese: 'お願いします', romaji: 'onegaishimasu', chinese: '拜託了' },
    ],
    keywords: ['ねぎ', '抜き', 'ぬき', 'お願い'],
  },
  {
    id: 28,
    category: 'restaurant',
    japanese: 'お会計お願いします',
    kana: 'おかいけい おねがいします',
    romaji: 'okaikei onegaishimasu',
    meaningZh: '可以結帳嗎？',
    usageNoteZh: '用餐完畢，請店員結帳',
    wordBreakdown: [
      { word: 'お会計', meaning: '結帳' },
      { word: 'お願いします', meaning: '拜託了' },
    ],
    phraseChunks: [
      { japanese: 'お会計', romaji: 'okaikei', chinese: '結帳' },
      { japanese: 'お願いします', romaji: 'onegaishimasu', chinese: '拜託了' },
    ],
    keywords: ['会計', 'かいけい', 'お願い'],
  },
  {
    id: 29,
    category: 'restaurant',
    japanese: 'おいしかったです',
    kana: 'おいしかったです',
    romaji: 'oishikatta desu',
    meaningZh: '很好吃',
    usageNoteZh: '用餐後稱讚料理，店員會很開心',
    wordBreakdown: [
      { word: 'おいしかった', meaning: '很好吃' },
      { word: 'です', meaning: '（禮貌結尾）' },
    ],
    phraseChunks: [
      { japanese: 'おいしかった', romaji: 'oishikatta', chinese: '很好吃' },
      { japanese: 'です', romaji: 'desu', chinese: '（禮貌）' },
    ],
    keywords: ['おいしかった', 'おいしい', '美味'],
  },

  // ── 問路交通（8 句）──
  {
    id: 30,
    category: 'directions',
    japanese: '駅はどこですか',
    kana: 'えきは どこですか',
    romaji: 'eki wa doko desu ka',
    meaningZh: '車站在哪裡？',
    usageNoteZh: '問路人或站務人員車站在哪',
    wordBreakdown: [
      { word: '駅', meaning: '車站' },
      { word: 'どこですか', meaning: '在哪裡？' },
    ],
    phraseChunks: [
      { japanese: '駅は', romaji: 'eki wa', chinese: '車站' },
      { japanese: 'どこですか', romaji: 'doko desu ka', chinese: '在哪裡？' },
    ],
    keywords: ['駅', 'えき', 'どこですか'],
  },
  {
    id: 31,
    category: 'directions',
    japanese: 'トイレはどこですか',
    kana: 'トイレは どこですか',
    romaji: 'toire wa doko desu ka',
    meaningZh: '廁所在哪裡？',
    usageNoteZh: '想找廁所時向店員或路人詢問',
    wordBreakdown: [
      { word: 'トイレ', meaning: '廁所' },
      { word: 'どこですか', meaning: '在哪裡？' },
    ],
    phraseChunks: [
      { japanese: 'トイレは', romaji: 'toire wa', chinese: '廁所' },
      { japanese: 'どこですか', romaji: 'doko desu ka', chinese: '在哪裡？' },
    ],
    keywords: ['トイレ', 'どこですか'],
  },
  {
    id: 32,
    category: 'directions',
    japanese: 'この電車は東京に行きますか',
    kana: 'この でんしゃは とうきょうに いきますか',
    romaji: 'kono densha wa Toukyou ni ikimasu ka',
    meaningZh: '這班車有到東京嗎？',
    usageNoteZh: '在車站確認這班電車是否到目的地',
    wordBreakdown: [
      { word: 'この電車', meaning: '這班電車' },
      { word: '東京に', meaning: '到東京' },
      { word: '行きますか', meaning: '會去嗎？' },
    ],
    phraseChunks: [
      { japanese: 'この電車は', romaji: 'kono densha wa', chinese: '這班電車' },
      { japanese: '東京に', romaji: 'Toukyou ni', chinese: '到東京' },
      { japanese: '行きますか', romaji: 'ikimasu ka', chinese: '會去嗎？' },
    ],
    keywords: ['電車', 'でんしゃ', '東京', '行きます'],
  },
  {
    id: 33,
    category: 'directions',
    japanese: '新宿に行きたいです',
    kana: 'しんじゅくに いきたいです',
    romaji: 'Shinjuku ni ikitai desu',
    meaningZh: '我要去新宿',
    usageNoteZh: '向站務人員或司機說明目的地',
    wordBreakdown: [
      { word: '新宿に', meaning: '到新宿' },
      { word: '行きたいです', meaning: '想去' },
    ],
    phraseChunks: [
      { japanese: '新宿に', romaji: 'Shinjuku ni', chinese: '到新宿' },
      { japanese: '行きたいです', romaji: 'ikitai desu', chinese: '想去' },
    ],
    keywords: ['新宿', 'しんじゅく', '行きたい', 'いきたい'],
  },
  {
    id: 34,
    category: 'directions',
    japanese: 'ここでタクシーに乗れますか',
    kana: 'ここで タクシーに のれますか',
    romaji: 'koko de takushii ni noremasu ka',
    meaningZh: '這裡可以搭計程車嗎？',
    usageNoteZh: '確認這個地點能否叫計程車',
    wordBreakdown: [
      { word: 'ここで', meaning: '在這裡' },
      { word: 'タクシー', meaning: '計程車' },
      { word: '乗れますか', meaning: '能搭嗎？' },
    ],
    phraseChunks: [
      { japanese: 'ここで', romaji: 'koko de', chinese: '在這裡' },
      { japanese: 'タクシーに', romaji: 'takushii ni', chinese: '計程車' },
      { japanese: '乗れますか', romaji: 'noremasu ka', chinese: '能搭嗎？' },
    ],
    keywords: ['タクシー', '乗れますか', 'のれますか'],
  },
  {
    id: 35,
    category: 'directions',
    japanese: 'いくらですか',
    kana: 'いくらですか',
    romaji: 'ikura desu ka',
    meaningZh: '多少錢？',
    usageNoteZh: '搭計程車或買票前詢問費用',
    wordBreakdown: [
      { word: 'いくら', meaning: '多少錢' },
      { word: 'ですか', meaning: '是嗎？' },
    ],
    phraseChunks: [
      { japanese: 'いくら', romaji: 'ikura', chinese: '多少錢' },
      { japanese: 'ですか', romaji: 'desu ka', chinese: '？' },
    ],
    keywords: ['いくら', '多少'],
  },
  {
    id: 36,
    category: 'directions',
    japanese: 'ここで止めてください',
    kana: 'ここで とめてください',
    romaji: 'koko de tomete kudasai',
    meaningZh: '請在這裡停',
    usageNoteZh: '搭計程車時，請司機在指定地點停車',
    wordBreakdown: [
      { word: 'ここで', meaning: '在這裡' },
      { word: '止めてください', meaning: '請停' },
    ],
    phraseChunks: [
      { japanese: 'ここで', romaji: 'koko de', chinese: '在這裡' },
      { japanese: '止めてください', romaji: 'tomete kudasai', chinese: '請停' },
    ],
    keywords: ['止めて', 'とめて', 'ここ'],
  },
  {
    id: 37,
    category: 'directions',
    japanese: '道に迷いました',
    kana: 'みちに まよいました',
    romaji: 'michi ni mayoimashita',
    meaningZh: '我迷路了',
    usageNoteZh: '向路人求助，說明自己找不到路',
    wordBreakdown: [
      { word: '道に', meaning: '在路上' },
      { word: '迷いました', meaning: '迷路了' },
    ],
    phraseChunks: [
      { japanese: '道に', romaji: 'michi ni', chinese: '在路上' },
      { japanese: '迷いました', romaji: 'mayoimashita', chinese: '迷路了' },
    ],
    keywords: ['迷いました', 'まよいました', '道'],
  },

  // ── 飯店入住（6 句）──
  {
    id: 38,
    category: 'hotel',
    japanese: 'チェックインをお願いします',
    kana: 'チェックインを おねがいします',
    romaji: 'chekkuin o onegaishimasu',
    meaningZh: '我要辦理入住',
    usageNoteZh: '到飯店櫃檯辦理入住時',
    wordBreakdown: [
      { word: 'チェックイン', meaning: '入住' },
      { word: 'お願いします', meaning: '拜託了' },
    ],
    phraseChunks: [
      { japanese: 'チェックインを', romaji: 'chekkuin o', chinese: '入住' },
      { japanese: 'お願いします', romaji: 'onegaishimasu', chinese: '拜託了' },
    ],
    keywords: ['チェックイン', 'お願いします'],
  },
  {
    id: 39,
    category: 'hotel',
    japanese: '予約しています',
    kana: 'よやくしています',
    romaji: 'yoyaku shiteimasu',
    meaningZh: '我有預約',
    usageNoteZh: '到櫃檯時說明自己已經訂房',
    wordBreakdown: [
      { word: '予約', meaning: '預約' },
      { word: 'しています', meaning: '有（已經）' },
    ],
    phraseChunks: [
      { japanese: '予約', romaji: 'yoyaku', chinese: '預約' },
      { japanese: 'しています', romaji: 'shiteimasu', chinese: '有' },
    ],
    keywords: ['予約', 'よやく', 'しています'],
  },
  {
    id: 40,
    category: 'hotel',
    japanese: '名前はWayneです',
    kana: 'なまえは ウェインです',
    romaji: 'namae wa Wayne desu',
    meaningZh: '我的名字是 Wayne',
    usageNoteZh: '辦理入住時報自己的名字',
    wordBreakdown: [
      { word: '名前は', meaning: '名字是' },
      { word: 'Wayne', meaning: 'Wayne（你的名字）' },
    ],
    phraseChunks: [
      { japanese: '名前は', romaji: 'namae wa', chinese: '名字是' },
      { japanese: 'Wayneです', romaji: 'Wayne desu', chinese: 'Wayne' },
    ],
    keywords: ['名前', 'なまえ', 'Wayne', 'ウェイン'],
  },
  {
    id: 41,
    category: 'hotel',
    japanese: '荷物を預かってもらえますか',
    kana: 'にもつを あずかってもらえますか',
    romaji: 'nimotsu o azukatte moraemasu ka',
    meaningZh: '可以寄放行李嗎？',
    usageNoteZh: '入住前或退房後，請飯店幫忙保管行李',
    wordBreakdown: [
      { word: '荷物', meaning: '行李' },
      { word: '預かってもらえますか', meaning: '能幫忙保管嗎？' },
    ],
    phraseChunks: [
      { japanese: '荷物を', romaji: 'nimotsu o', chinese: '行李' },
      { japanese: '預かってもらえますか', romaji: 'azukatte moraemasu ka', chinese: '能保管嗎？' },
    ],
    keywords: ['荷物', 'にもつ', '預かって', 'あずかって'],
  },
  {
    id: 42,
    category: 'hotel',
    japanese: 'チェックアウトは何時ですか',
    kana: 'チェックアウトは なんじですか',
    romaji: 'chekkuauto wa nanji desu ka',
    meaningZh: '幾點退房？',
    usageNoteZh: '確認退房時間，避免超時',
    wordBreakdown: [
      { word: 'チェックアウト', meaning: '退房' },
      { word: '何時', meaning: '幾點' },
    ],
    phraseChunks: [
      { japanese: 'チェックアウトは', romaji: 'chekkuauto wa', chinese: '退房' },
      { japanese: '何時ですか', romaji: 'nanji desu ka', chinese: '幾點？' },
    ],
    keywords: ['チェックアウト', '何時', 'なんじ'],
  },
  {
    id: 43,
    category: 'hotel',
    japanese: 'Wi-Fiはありますか',
    kana: 'ワイファイは ありますか',
    romaji: 'Wi-Fi wa arimasu ka',
    meaningZh: '有 Wi-Fi 嗎？',
    usageNoteZh: '入住時詢問網路密碼或連線方式',
    wordBreakdown: [
      { word: 'Wi-Fi', meaning: '無線網路' },
      { word: 'ありますか', meaning: '有嗎？' },
    ],
    phraseChunks: [
      { japanese: 'Wi-Fiは', romaji: 'Wi-Fi wa', chinese: 'Wi-Fi' },
      { japanese: 'ありますか', romaji: 'arimasu ka', chinese: '有嗎？' },
    ],
    keywords: ['Wi-Fi', 'ワイファイ', 'ありますか'],
  },

  // ── 購物付款（6 句）──
  {
    id: 44,
    category: 'shopping',
    japanese: 'これはいくらですか',
    kana: 'これは いくらですか',
    romaji: 'kore wa ikura desu ka',
    meaningZh: '這個多少錢？',
    usageNoteZh: '在商店看到商品，詢問價格',
    wordBreakdown: [
      { word: 'これ', meaning: '這個' },
      { word: 'いくら', meaning: '多少錢' },
    ],
    phraseChunks: [
      { japanese: 'これは', romaji: 'kore wa', chinese: '這個' },
      { japanese: 'いくらですか', romaji: 'ikura desu ka', chinese: '多少錢？' },
    ],
    keywords: ['いくら', 'これ'],
  },
  {
    id: 45,
    category: 'shopping',
    japanese: 'カードは使えますか',
    kana: 'カードは つかえますか',
    romaji: 'kaado wa tsukaemasu ka',
    meaningZh: '可以刷卡嗎？',
    usageNoteZh: '結帳前確認能否刷卡',
    wordBreakdown: [
      { word: 'カード', meaning: '卡片' },
      { word: '使えますか', meaning: '能用嗎？' },
    ],
    phraseChunks: [
      { japanese: 'カードは', romaji: 'kaado wa', chinese: '卡片' },
      { japanese: '使えますか', romaji: 'tsukaemasu ka', chinese: '能用嗎？' },
    ],
    keywords: ['カード', '使えますか', 'つかえますか'],
  },
  {
    id: 46,
    category: 'shopping',
    japanese: '免税になりますか',
    kana: 'めんぜいに なりますか',
    romaji: 'menzei ni narimasu ka',
    meaningZh: '可以免稅嗎？',
    usageNoteZh: '購物時確認是否符合免稅條件',
    wordBreakdown: [
      { word: '免税', meaning: '免稅' },
      { word: 'なりますか', meaning: '可以嗎？' },
    ],
    phraseChunks: [
      { japanese: '免税に', romaji: 'menzei ni', chinese: '免稅' },
      { japanese: 'なりますか', romaji: 'narimasu ka', chinese: '可以嗎？' },
    ],
    keywords: ['免税', 'めんぜい', 'なりますか'],
  },
  {
    id: 47,
    category: 'shopping',
    japanese: '見ているだけです',
    kana: 'みているだけです',
    romaji: 'mite iru dake desu',
    meaningZh: '我只是看看',
    usageNoteZh: '店員來招呼時，表示只是逛逛',
    wordBreakdown: [
      { word: '見ている', meaning: '正在看' },
      { word: 'だけ', meaning: '只是' },
    ],
    phraseChunks: [
      { japanese: '見ている', romaji: 'mite iru', chinese: '正在看' },
      { japanese: 'だけです', romaji: 'dake desu', chinese: '只是' },
    ],
    keywords: ['見ている', 'みている', 'だけ'],
  },
  {
    id: 48,
    category: 'shopping',
    japanese: '他の色はありますか',
    kana: 'ほかの いろは ありますか',
    romaji: 'hoka no iro wa arimasu ka',
    meaningZh: '有其他顏色嗎？',
    usageNoteZh: '想買商品但想換顏色時',
    wordBreakdown: [
      { word: '他の色', meaning: '其他顏色' },
      { word: 'ありますか', meaning: '有嗎？' },
    ],
    phraseChunks: [
      { japanese: '他の色は', romaji: 'hoka no iro wa', chinese: '其他顏色' },
      { japanese: 'ありますか', romaji: 'arimasu ka', chinese: '有嗎？' },
    ],
    keywords: ['色', 'いろ', '他', 'ありますか'],
  },
  {
    id: 49,
    category: 'shopping',
    japanese: 'これを買います',
    kana: 'これを かいます',
    romaji: 'kore o kaimasu',
    meaningZh: '我要買這個',
    usageNoteZh: '決定購買，指著商品告訴店員',
    wordBreakdown: [
      { word: 'これ', meaning: '這個' },
      { word: '買います', meaning: '買' },
    ],
    phraseChunks: [
      { japanese: 'これを', romaji: 'kore o', chinese: '這個' },
      { japanese: '買います', romaji: 'kaimasu', chinese: '買' },
    ],
    keywords: ['買います', 'かいます', 'これ'],
  },

  // ── 藥妝店/免稅（4 句）──
  {
    id: 50,
    category: 'pharmacy',
    japanese: '風邪薬を探しています',
    kana: 'かぜぐすりを さがしています',
    romaji: 'kazegusuri o sagashiteimasu',
    meaningZh: '我想找感冒藥',
    usageNoteZh: '在藥妝店向店員說明要找的藥品',
    wordBreakdown: [
      { word: '風邪薬', meaning: '感冒藥' },
      { word: '探しています', meaning: '正在找' },
    ],
    phraseChunks: [
      { japanese: '風邪薬を', romaji: 'kazegusuri o', chinese: '感冒藥' },
      { japanese: '探しています', romaji: 'sagashiteimasu', chinese: '正在找' },
    ],
    keywords: ['風邪薬', 'かぜぐすり', '探して', 'さがして'],
  },
  {
    id: 51,
    category: 'pharmacy',
    japanese: '胃薬を探しています',
    kana: 'いぐすりを さがしています',
    romaji: 'igusuri o sagashiteimasu',
    meaningZh: '我想找胃藥',
    usageNoteZh: '吃壞肚子或胃不舒服時，到藥妝店求助',
    wordBreakdown: [
      { word: '胃薬', meaning: '胃藥' },
      { word: '探しています', meaning: '正在找' },
    ],
    phraseChunks: [
      { japanese: '胃薬を', romaji: 'igusuri o', chinese: '胃藥' },
      { japanese: '探しています', romaji: 'sagashiteimasu', chinese: '正在找' },
    ],
    keywords: ['胃薬', 'いぐすり', '探して', 'さがして'],
  },
  {
    id: 52,
    category: 'pharmacy',
    japanese: '免税になりますか',
    kana: 'めんぜいに なりますか',
    romaji: 'menzei ni narimasu ka',
    meaningZh: '可以免稅嗎？',
    usageNoteZh: '在藥妝店結帳前確認免稅',
    wordBreakdown: [
      { word: '免税', meaning: '免稅' },
      { word: 'なりますか', meaning: '可以嗎？' },
    ],
    phraseChunks: [
      { japanese: '免税に', romaji: 'menzei ni', chinese: '免稅' },
      { japanese: 'なりますか', romaji: 'narimasu ka', chinese: '可以嗎？' },
    ],
    keywords: ['免税', 'めんぜい', 'なりますか'],
  },
  {
    id: 53,
    category: 'pharmacy',
    japanese: 'パスポートを持っています',
    kana: 'パスポートを もっています',
    romaji: 'pasupooto o motteimasu',
    meaningZh: '我有護照',
    usageNoteZh: '辦理免稅時，店員可能會要求出示護照',
    wordBreakdown: [
      { word: 'パスポート', meaning: '護照' },
      { word: '持っています', meaning: '有帶著' },
    ],
    phraseChunks: [
      { japanese: 'パスポートを', romaji: 'pasupooto o', chinese: '護照' },
      { japanese: '持っています', romaji: 'motteimasu', chinese: '有帶著' },
    ],
    keywords: ['パスポート', '持っています', 'もって'],
  },

  // ── 緊急求助（4 句）──
  {
    id: 54,
    category: 'emergency',
    japanese: '助けてください',
    kana: 'たすけてください',
    romaji: 'tasukete kudasai',
    meaningZh: '請幫幫我',
    usageNoteZh: '遇到困難或危險時大聲求助',
    wordBreakdown: [
      { word: '助けて', meaning: '幫助' },
      { word: 'ください', meaning: '請' },
    ],
    phraseChunks: [
      { japanese: '助けて', romaji: 'tasukete', chinese: '幫助' },
      { japanese: 'ください', romaji: 'kudasai', chinese: '請' },
    ],
    keywords: ['助けて', 'たすけて', 'ください'],
  },
  {
    id: 55,
    category: 'emergency',
    japanese: '気分が悪いです',
    kana: 'きぶんが わるいです',
    romaji: 'kibun ga warui desu',
    meaningZh: '我不舒服',
    usageNoteZh: '身體不適時向店員或路人說明',
    wordBreakdown: [
      { word: '気分が', meaning: '身體狀況' },
      { word: '悪いです', meaning: '不好' },
    ],
    phraseChunks: [
      { japanese: '気分が', romaji: 'kibun ga', chinese: '身體' },
      { japanese: '悪いです', romaji: 'warui desu', chinese: '不舒服' },
    ],
    keywords: ['気分', 'きぶん', '悪い', 'わるい'],
  },
  {
    id: 56,
    category: 'emergency',
    japanese: '救急車を呼んでください',
    kana: 'きゅうきゅうしゃを よんでください',
    romaji: 'kyuukyuusha o yonde kudasai',
    meaningZh: '請叫救護車',
    usageNoteZh: '嚴重受傷或急病時請人幫忙叫救護車',
    wordBreakdown: [
      { word: '救急車', meaning: '救護車' },
      { word: '呼んでください', meaning: '請叫' },
    ],
    phraseChunks: [
      { japanese: '救急車を', romaji: 'kyuukyuusha o', chinese: '救護車' },
      { japanese: '呼んでください', romaji: 'yonde kudasai', chinese: '請叫' },
    ],
    keywords: ['救急車', 'きゅうきゅうしゃ', '呼んで', 'よんで'],
  },
  {
    id: 57,
    category: 'emergency',
    japanese: '財布をなくしました',
    kana: 'さいふを なくしました',
    romaji: 'saifu o nakushimashita',
    meaningZh: '我遺失了錢包',
    usageNoteZh: '錢包或重要物品遺失時，向警察或站務人員求助',
    wordBreakdown: [
      { word: '財布', meaning: '錢包' },
      { word: 'なくしました', meaning: '遺失了' },
    ],
    phraseChunks: [
      { japanese: '財布を', romaji: 'saifu o', chinese: '錢包' },
      { japanese: 'なくしました', romaji: 'nakushimashita', chinese: '遺失了' },
    ],
    keywords: ['財布', 'さいふ', 'なくしました', '紛失'],
  },
]

export function getSentencesByCategory(categoryId: CategoryId): Sentence[] {
  return sentences.filter((s) => s.category === categoryId)
}
