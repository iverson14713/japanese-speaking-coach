import { mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../src/data/sentences/ja')
mkdirSync(outDir, { recursive: true })

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function line(s) {
  const parts = [
    `id: ${s.id}`,
    'language: lang',
    'category: cat',
    `target: '${esc(s.t)}'`,
    `pronunciation: '${esc(s.p)}'`,
    `helper: '${esc(s.h)}'`,
    `meaning: '${esc(s.m)}'`,
    `usage: '${esc(s.u)}'`,
    `keywords: [${s.k.map((w) => `'${esc(w)}'`).join(', ')}]`,
  ]
  if (s.words) {
    parts.push(
      `words: [${s.words.map((w) => `{ word: '${esc(w.w)}', meaning: '${esc(w.m)}' }`).join(', ')}]`,
    )
  }
  if (s.chunks) {
    parts.push(
      `chunks: [${s.chunks.map((c) => `{ text: '${esc(c.t)}', pronunciation: '${esc(c.p)}', chinese: '${esc(c.m)}' }`).join(', ')}]`,
    )
  }
  return `  makeSentence({ ${parts.join(', ')} }),`
}

const categories = [
  {
    file: 'first-conversation',
    export: 'firstConversationJa',
    cat: 'first-conversation',
    sentences: [
      { id: 1, t: 'こんにちは。', p: 'Konnichiwa.', h: 'こんにちは', m: '你好', u: '白天打招呼最常用', k: ['こんにちは', 'konnichiwa'] },
      { id: 2, t: 'はじめまして。', p: 'Hajimemashite.', h: 'はじめまして', m: '初次見面', u: '第一次見面、自我介紹開場', k: ['はじめまして', 'hajimemashite', '初めまして'] },
      { id: 3, t: '台湾から来ました。', p: 'Taiwan kara kimashita.', h: 'たいわんから きました', m: '我來自台灣', u: '自我介紹時說明來自哪裡', k: ['台湾', 'たいわん', 'taiwan', 'kimashita'], words: [{ w: '台湾から', m: '從台灣' }, { w: '来ました', m: '來了' }], chunks: [{ t: '台湾から', p: 'Taiwan kara', m: '從台灣' }, { t: '来ました', p: 'kimashita', m: '來了' }] },
      { id: 4, t: 'すみません、日本語があまり話せません。', p: 'Sumimasen, nihongo ga amari hanasemasen.', h: 'すみません、にほんごが あまり はなせません', m: '不好意思，我不太會說日文', u: '請對方諒解、說話慢一點', k: ['日本語', 'にほんご', 'hanasemasen', 'amari'] },
      { id: 5, t: 'もう少しゆっくり話していただけますか。', p: 'Mou sukoshi yukkuri hanashite itadakemasu ka.', h: 'もうすこし ゆっくり はなして いただけますか', m: '可以請您說慢一點嗎？', u: '聽不懂時請對方放慢速度', k: ['ゆっくり', 'yukkuri', 'slowly', 'もう少し'] },
      { id: 6, t: 'すみません、わかりません。', p: 'Sumimasen, wakarimasen.', h: 'すみません、わかりません', m: '不好意思，我聽不懂', u: '聽不懂對方說什麼時', k: ['わかりません', 'wakarimasen', '分かりません'] },
      { id: 7, t: 'もう一度お願いします。', p: 'Mou ichido onegaishimasu.', h: 'もういちど おねがいします', m: '請再說一次', u: '沒聽清楚，請對方重複', k: ['もう一度', 'mou ichido', 'onegaishimasu'] },
      { id: 8, t: 'もう一度言ってください。', p: 'Mou ichido itte kudasai.', h: 'もういちど いって ください', m: '請再說一遍', u: '請對方重複剛才的話', k: ['もう一度', 'itte kudasai', '言って'] },
      { id: 9, t: 'これはどういう意味ですか。', p: 'Kore wa dou iu imi desu ka.', h: 'これは どういう いみ ですか', m: '這是什麼意思？', u: '聽到不懂的單字或句子時', k: ['どういう意味', 'dou iu imi', '意味'] },
      { id: 10, t: '書いてもらえますか。', p: 'Kaite moraemasu ka.', h: 'かいて もらえますか', m: '可以寫下來嗎？', u: '語言不通時請對方寫字', k: ['書いて', 'kaite', 'moraemasu'] },
      { id: 11, t: '初めて来ました。', p: 'Hajimete kimashita.', h: 'はじめて きました', m: '我是第一次來', u: '聊天時說明自己是新手旅客', k: ['初めて', 'hajimete', 'はじめて'] },
      { id: 12, t: '観光で来ました。', p: 'Kankou de kimashita.', h: 'かんこうで きました', m: '我是來觀光的', u: '說明來日本的目的', k: ['観光', 'かんこう', 'kankou'] },
      { id: 13, t: 'ありがとうございます。', p: 'Arigatou gozaimasu.', h: 'ありがとう ございます', m: '謝謝', u: '日常感謝最常用', k: ['ありがとう', 'arigatou', 'gozaimasu'] },
      { id: 14, t: 'どうもありがとうございます。', p: 'Doumo arigatou gozaimasu.', h: 'どうも ありがとう ございます', m: '非常謝謝您', u: '對方幫了大忙時', k: ['どうも', 'doumo', 'arigatou'] },
      { id: 15, t: 'すみません。', p: 'Sumimasen.', h: 'すみません', m: '不好意思／借過', u: '搭話前或輕微打擾別人時', k: ['すみません', 'sumimasen'] },
      { id: 16, t: 'ごめんなさい。', p: 'Gomen nasai.', h: 'ごめんなさい', m: '對不起', u: '不小心碰到人或做錯事時', k: ['ごめんなさい', 'gomen nasai', 'gomen'] },
      { id: 17, t: '中国語は話せますか。', p: 'Chuugoku-go wa hanasemasu ka.', h: 'ちゅうごくごは はなせますか', m: '您會說中文嗎？', u: '日文溝通困難時試著找中文', k: ['中国語', 'ちゅうごくご', 'chuugokugo'] },
      { id: 18, t: 'さようなら、また。', p: 'Sayounara, mata.', h: 'さようなら、また', m: '再見，下次見', u: '結束對話、離開時', k: ['さようなら', 'sayounara', 'また', 'mata'] },
    ],
  },
  {
    file: 'pharmacy',
    export: 'pharmacyJa',
    cat: 'pharmacy',
    sentences: [
      { id: 19, t: '近くの薬局はどこですか。', p: 'Chikaku no yakkyoku wa doko desu ka.', h: 'ちかくの やっきょくは どこ ですか', m: '最近的藥局在哪？', u: '需要買藥時問路', k: ['薬局', 'やっきょく', 'yakkyoku', 'doko'] },
      { id: 20, t: '頭痛薬はありますか。', p: 'Zutsuu-yaku wa arimasu ka.', h: 'ずつうやくは ありますか', m: '有頭痛藥嗎？', u: '在藥局描述簡單症狀', k: ['頭痛', 'ずつう', 'zutsuu', '薬'] },
      { id: 21, t: '風邪薬が欲しいです。', p: 'Kaze-gusuri ga hoshii desu.', h: 'かぜぐすりが ほしい です', m: '我想要感冒藥', u: '說明需要感冒相關藥品', k: ['風邪', 'かぜ', 'kaze', 'gusuri'] },
      { id: 22, t: '絆創膏はありますか。', p: 'Bansoukou wa arimasu ka.', h: 'ばんそうこうは ありますか', m: '有OK繃嗎？', u: '買創可貼或繃帶', k: ['絆創膏', 'ばんそうこう', 'bansoukou'] },
      { id: 23, t: 'のどが痛いです。', p: 'Nodo ga itai desu.', h: 'のどが いたい です', m: '我喉嚨痛', u: '向店員描述症狀', k: ['のど', 'nodo', '痛い', 'itai'] },
      { id: 24, t: 'これは大人用ですか、子供用ですか。', p: 'Kore wa otona-you desu ka, kodomo-you desu ka.', h: 'これは おとなよう ですか、こどもよう ですか', m: '這是給大人還是小孩用的？', u: '確認藥品適用對象', k: ['大人', 'おとな', '子供', 'こども'] },
      { id: 25, t: '一日何回飲めばいいですか。', p: 'Ichinichi nan-kai nomeba ii desu ka.', h: 'いちにち なんかい のめば いい ですか', m: '一天要吃幾次？', u: '確認用藥方式', k: ['何回', 'nan kai', '飲めば'] },
      { id: 26, t: 'これは処方箋が必要ですか。', p: 'Kore wa shohousen ga hitsuyou desu ka.', h: 'これは しょほうせんが ひつよう ですか', m: '這需要處方籤嗎？', u: '確認是否為處方藥', k: ['処方箋', 'しょほうせん', 'shohousen'] },
      { id: 27, t: '日焼け止めはどこですか。', p: 'Hiyake-dome wa doko desu ka.', h: 'ひやけどめは どこ ですか', m: '防曬乳在哪裡？', u: '在藥妝店找防曬用品', k: ['日焼け止め', 'ひやけどめ', 'hiyakedome'] },
      { id: 28, t: 'マスクはありますか。', p: 'Masuku wa arimasu ka.', h: 'ますくは ありますか', m: '有口罩嗎？', u: '購買口罩或日用品', k: ['マスク', 'masuku', 'mask'] },
      { id: 29, t: '試してもいいですか。', p: 'Teshite mo ii desu ka.', h: 'ためしても いい ですか', m: '可以試用嗎？', u: '試用化妝品或保養品', k: ['試して', 'tameshite', '試す'] },
      { id: 30, t: '敏感肌でも使えますか。', p: 'Binkan-hada demo tsukaemasu ka.', h: 'びんかんはだ でも つかえますか', m: '敏感肌也能用嗎？', u: '購買保養品前確認', k: ['敏感肌', 'びんかん', 'binkan'] },
      { id: 31, t: 'もっと小さいサイズはありますか。', p: 'Motto chiisai saizu wa arimasu ka.', h: 'もっと ちいさい さいずは ありますか', m: '有更小的包裝嗎？', u: '旅行想買小容量試用品', k: ['小さい', 'chiisai', 'サイズ', 'saizu'] },
      { id: 32, t: 'これは免税ですか。', p: 'Kore wa menzei desu ka.', h: 'これは めんぜい ですか', m: '這可以免稅嗎？', u: '確認商品是否符合免稅', k: ['免税', 'めんぜい', 'menzei'] },
      { id: 33, t: '免税店はどこですか。', p: 'Menzei-ten wa doko desu ka.', h: 'めんぜいてんは どこ ですか', m: '免稅店在哪裡？', u: '在機場或市區找免稅店', k: ['免税店', 'めんぜいてん', 'menzeiten'] },
      { id: 34, t: '免税の手続きをお願いします。', p: 'Menzei no tetsuzuki wo onegaishimasu.', h: 'めんぜいの てつづきを おねがいします', m: '請幫我辦免稅手續', u: '購物後辦理免稅', k: ['免税', '手続き', 'tetsuzuki', 'menzei'] },
      { id: 35, t: 'カードで払えますか。', p: 'Kaado de haraemasu ka.', h: 'カードで はらえますか', m: '可以刷卡嗎？', u: '在藥妝店結帳時', k: ['カード', 'card', '払えます', 'haraemasu'] },
      { id: 36, t: '袋をください。', p: 'Fukuro wo kudasai.', h: 'ふくろを ください', m: '請給我袋子', u: '購買後需要袋子', k: ['袋', 'ふくろ', 'fukuro', 'kudasai'] },
      { id: 37, t: 'おすすめは何ですか。', p: 'Osusume wa nan desu ka.', h: 'おすすめは なん ですか', m: '有什麼推薦的？', u: '請店員推薦熱門商品', k: ['おすすめ', 'osusume', 'recommend'] },
      { id: 38, t: 'これは日本製ですか。', p: 'Kore wa Nihon-sei desu ka.', h: 'これは にほんせい ですか', m: '這是日本製的嗎？', u: '確認產地', k: ['日本製', 'にほんせい', 'nihonsei'] },
      { id: 39, t: 'これはいくらですか。', p: 'Kore wa ikura desu ka.', h: 'これは いくら ですか', m: '這個多少錢？', u: '詢問藥妝商品價格', k: ['いくら', 'ikura', 'how much'] },
      { id: 40, t: 'これをください。', p: 'Kore wo kudasai.', h: 'これを ください', m: '我要這個', u: '決定購買時指著商品說', k: ['これ', 'kore', 'kudasai', 'ください'] },
    ],
  },
  {
    file: 'directions',
    export: 'directionsJa',
    cat: 'directions',
    sentences: [
      { id: 41, t: '駅はどこですか。', p: 'Eki wa doko desu ka.', h: 'えきは どこ ですか', m: '車站在哪裡？', u: '問路人或站務人員', k: ['駅', 'えき', 'eki', 'doko'] },
      { id: 42, t: '地下鉄の入口はどこですか。', p: 'Chikatetsu no iriguchi wa doko desu ka.', h: 'ちかてつの いりぐちは どこ ですか', m: '地鐵入口在哪？', u: '找地鐵站入口時', k: ['地下鉄', 'ちかてつ', 'chikatetsu'] },
      { id: 43, t: '何番線ですか。', p: 'Nan-ban sen desu ka.', h: 'なんばんせん ですか', m: '是幾號月台？', u: '在車站確認搭車月台', k: ['何番線', 'nanban sen', '番線'] },
      { id: 44, t: '都心までの切符を一枚ください。', p: 'Toshin made no kippu wo ichimai kudasai.', h: 'としんまでの きっぷを いちまい ください', m: '請給我一張到市中心的票', u: '在售票機或櫃檯買票', k: ['切符', 'きっぷ', 'kippu', '都心'] },
      { id: 45, t: 'この電車は渋谷に行きますか。', p: 'Kono densha wa Shibuya ni ikimasu ka.', h: 'この でんしゃは しぶやに いきますか', m: '這班電車到澀谷嗎？', u: '確認車次方向，站名可替換', k: ['渋谷', 'しぶや', 'shibuya', '電車'] },
      { id: 46, t: 'このバスは都心に行きますか。', p: 'Kono basu wa toshin ni ikimasu ka.', h: 'この ばすは としんに いきますか', m: '這班公車到市中心嗎？', u: '在公車站確認路線', k: ['バス', 'basu', '都心', 'toshin'] },
      { id: 47, t: 'どこで乗り換えますか。', p: 'Doko de norikaemasu ka.', h: 'どこで のりかえますか', m: '在哪裡轉車？', u: '需要換線或換車時', k: ['乗り換え', 'のりかえ', 'norikae'] },
      { id: 48, t: 'どのくらいかかりますか。', p: 'Dono kurai kakarimasu ka.', h: 'どのくらい かかりますか', m: '要多久？', u: '問路程或車程時間', k: ['どのくらい', 'dono kurai', 'kakarimasu'] },
      { id: 49, t: '運賃はいくらですか。', p: 'Unchin wa ikura desu ka.', h: 'うんちんは いくら ですか', m: '車資多少？', u: '買票前確認價格', k: ['運賃', 'うんちん', 'unchin', 'ikura'] },
      { id: 50, t: '空港に行きたいです。', p: 'Kuu-kou ni ikitai desu.', h: 'くうこうに いきたい です', m: '我想去機場', u: '向站務或司機說明目的地', k: ['空港', 'くうこう', 'kuukou', 'airport'] },
      { id: 51, t: 'ここでタクシーに乗れますか。', p: 'Koko de takushii ni nori emasu ka.', h: 'ここで タクシーに のれますか', m: '這裡可以搭計程車嗎？', u: '確認能否在此叫車', k: ['タクシー', 'takushii', 'taxi'] },
      { id: 52, t: 'この住所までお願いします。', p: 'Kono juusho made onegaishimasu.', h: 'この じゅうしょまで おねがいします', m: '請帶我去這個地址', u: '上計程車後出示地址', k: ['住所', 'じゅうしょ', 'juusho', 'onegaishimasu'] },
      { id: 53, t: 'ここで止めてください。', p: 'Koko de tomete kudasai.', h: 'ここで とめて ください', m: '請在這裡停', u: '搭計程車或公車時下車', k: ['止めて', 'tomete', 'ここで', 'koko de'] },
      { id: 54, t: 'まっすぐ行ってください。', p: 'Massugu itte kudasai.', h: 'まっすぐ いって ください', m: '請直走', u: '問路後確認方向', k: ['まっすぐ', 'massugu', 'straight'] },
      { id: 55, t: '角を左に曲がってください。', p: 'Kado wo hidari ni magatte kudasai.', h: 'かどを ひだりに まがって ください', m: '請在轉角左轉', u: '指路或確認方向', k: ['左', 'ひだり', 'hidari', '曲がって'] },
      { id: 56, t: 'ここから遠いですか。', p: 'Koko kara tooi desu ka.', h: 'ここから とおい ですか', m: '離這裡遠嗎？', u: '問路程距離', k: ['遠い', 'とおい', 'tooi', 'far'] },
      { id: 57, t: '美術館へはどう行けばいいですか。', p: 'Bijutsukan e wa dou ikeba ii desu ka.', h: 'びじゅつかんへは どう いけば いい ですか', m: '怎麼去美術館？', u: '問路，地點可替換', k: ['どう行けば', 'dou ikeba', '美術館'] },
      { id: 58, t: '出口はどこですか。', p: 'Deguchi wa doko desu ka.', h: 'でぐちは どこ ですか', m: '出口在哪裡？', u: '在車站或商場找出口', k: ['出口', 'でぐち', 'deguchi', 'exit'] },
      { id: 59, t: 'この道で合っていますか。', p: 'Kono michi de atte imasu ka.', h: 'この みちで あって いますか', m: '這條路走對了嗎？', u: '途中確認方向是否正確', k: ['道', 'みち', 'michi', '合って'] },
      { id: 60, t: '乗り過ごしてしまいました。', p: 'Noriko shite shimaimashita.', h: 'のりすごして しまいました', m: '我坐過站了', u: '搭車坐過站時跟司機說', k: ['乗り過ご', 'のりすご', 'noriko'] },
      { id: 61, t: '地図で教えてもらえますか。', p: 'Chizu de oshiete moraemasu ka.', h: 'ちずで おしえて もらえますか', m: '可以在地圖上指給我看嗎？', u: '語言不通時請對方指地圖', k: ['地図', 'ちず', 'chizu', 'map'] },
      { id: 62, t: 'このバス停で合っていますか。', p: 'Kono basu-tei de atte imasu ka.', h: 'この ばすていで あって いますか', m: '這個公車站對嗎？', u: '確認公車站是否正確', k: ['バス停', 'ばすてい', 'basutei'] },
    ],
  },
  {
    file: 'hotel',
    export: 'hotelJa',
    cat: 'hotel',
    sentences: [
      { id: 63, t: 'チェックインをお願いします。', p: 'Chekku-in wo onegaishimasu.', h: 'チェックインを おねがいします', m: '我要辦理入住', u: '到飯店櫃檯時', k: ['チェックイン', 'check in', 'checkin'] },
      { id: 64, t: '予約しています。', p: 'Yoyaku shite imasu.', h: 'よやく して います', m: '我有預約', u: '到櫃檯說明已訂房', k: ['予約', 'よやく', 'yoyaku'] },
      { id: 65, t: '予約名はリンです。', p: 'Yoyaku-mei wa Lin desu.', h: 'よやくめいは リン です', m: '預約名字是 Lin', u: '報訂房姓名，可換成你的名字', k: ['予約名', 'yoyakumei', 'lin'] },
      { id: 66, t: 'パスポートです。', p: 'Pasupooto desu.', h: 'パスポート です', m: '這是我的護照', u: '入住時櫃檯要求證件', k: ['パスポート', 'pasupoto', 'passport'] },
      { id: 67, t: '早めにチェックインできますか。', p: 'Hayame ni chekku-in dekimasu ka.', h: 'はやめに チェックイン できますか', m: '可以提早入住嗎？', u: '提早到飯店想先進房', k: ['早め', 'hayame', 'check in', 'チェックイン'] },
      { id: 68, t: 'レイトチェックアウトはできますか。', p: 'Reito chekku-auto wa dekimasu ka.', h: 'レイトチェックアウトは できますか', m: '可以晚一點退房嗎？', u: '想延後退房時間', k: ['レイトチェックアウト', 'late checkout', 'checkout'] },
      { id: 69, t: '荷物を預かってもらえますか。', p: 'Nimotsu wo azukatte moraemasu ka.', h: 'にもつを あずかって もらえますか', m: '可以寄放行李嗎？', u: '入住前或退房後寄行李', k: ['荷物', 'にもつ', 'nimotsu', '預かって'] },
      { id: 70, t: 'チェックアウトをお願いします。', p: 'Chekku-auto wo onegaishimasu.', h: 'チェックアウトを おねがいします', m: '我要退房', u: '離開飯店辦理退房', k: ['チェックアウト', 'checkout', 'check out'] },
      { id: 71, t: '部屋がきれいではありません。', p: 'Heya ga kirei de wa arimasen.', h: 'へやが きれいでは ありません', m: '房間沒有打掃乾淨', u: '房間清潔有問題時', k: ['部屋', 'へや', 'heya', 'きれい'] },
      { id: 72, t: 'エアコンが壊れています。', p: 'Ea-kon ga kowarete imasu.', h: 'エアコンが こわれて います', m: '冷氣壞了', u: '房間設備故障時', k: ['エアコン', 'aircon', 'ea kon', '壊れ'] },
      { id: 73, t: 'お湯が出ません。', p: 'O-yu ga demasen.', h: 'おゆが でません', m: '沒有熱水', u: '洗澡沒熱水時向櫃檯反映', k: ['お湯', 'oyu', '熱水', 'demasen'] },
      { id: 74, t: 'Wi-Fiのパスワードは何ですか。', p: 'Wi-Fi no pasuwaado wa nan desu ka.', h: 'Wi-Fiの パスワードは なん ですか', m: 'Wi-Fi 密碼是什麼？', u: '入住後連網路', k: ['wifi', 'wi-fi', 'パスワード', 'password'] },
      { id: 75, t: '枕をもう一つください。', p: 'Makura wo mou hitotsu kudasai.', h: 'まくらを もうひとつ ください', m: '請再給我一個枕頭', u: '需要更多寢具時', k: ['枕', 'まくら', 'makura', 'pillow'] },
      { id: 76, t: 'タオルをもう少しください。', p: 'Taoru wo mou sukoshi kudasai.', h: 'タオルを もうすこし ください', m: '請再給幾條毛巾', u: '毛巾不夠用時', k: ['タオル', 'taoru', 'towel'] },
      { id: 77, t: 'モーニングコールを七時にお願いします。', p: 'Moorningu kooru wo shichi-ji ni onegaishimasu.', h: 'モーニングコールを しちじに おねがいします', m: '請七點叫醒我', u: '請飯店早上電話叫醒', k: ['モーニングコール', 'morning call', '七時'] },
      { id: 78, t: 'ルームキーをなくしました。', p: 'Ruumu kii wo nakushimashita.', h: 'ルームキーを なくしました', m: '我把房卡弄丟了', u: '房卡遺失向櫃檯求助', k: ['ルームキー', 'room key', 'nakushimashita'] },
      { id: 79, t: 'エレベーターはどこですか。', p: 'Erebeetaa wa doko desu ka.', h: 'エレベーターは どこ ですか', m: '電梯在哪裡？', u: '在大廳找電梯', k: ['エレベーター', 'elevator', 'erebeetaa'] },
      { id: 80, t: '朝食は付いていますか。', p: 'Choushoku wa tsuite imasu ka.', h: 'ちょうしょくは ついて いますか', m: '有含早餐嗎？', u: '確認訂房是否含早餐', k: ['朝食', 'ちょうしょく', 'choushoku', 'breakfast'] },
      { id: 81, t: '変換プラグはありますか。', p: 'Henkan puragu wa arimasu ka.', h: 'へんかん プラグは ありますか', m: '有轉接頭嗎？', u: '台灣插頭不合時借用', k: ['変換プラグ', 'adapter', 'plug'] },
      { id: 82, t: 'チェックアウトは何時ですか。', p: 'Chekku-auto wa nan-ji desu ka.', h: 'チェックアウトは なんじ ですか', m: '幾點退房？', u: '確認退房時間', k: ['チェックアウト', 'checkout', '何時', 'nanji'] },
      { id: 83, t: 'Wi-Fiがつながりません。', p: 'Wi-Fi ga tsunagarimasen.', h: 'Wi-Fiが つながりません', m: 'Wi-Fi 連不上', u: '網路連不上時', k: ['wifi', 'wi-fi', 'tsunagarimasen'] },
      { id: 84, t: 'もう一泊延長したいです。', p: 'Mou ippaku enchou shitai desu.', h: 'もう いっぱく えんちょう したい です', m: '我想多住一晚', u: '想延長住宿時', k: ['延長', 'えんちょう', 'enchou', '一泊'] },
    ],
  },
  {
    file: 'restaurant',
    export: 'restaurantJa',
    cat: 'restaurant',
    sentences: [
      { id: 85, t: '二人です。', p: 'Futari desu.', h: 'ふたり です', m: '兩位', u: '進餐廳告訴店員人數', k: ['二人', 'ふたり', 'futari', 'two'] },
      { id: 86, t: '予約しています。', p: 'Yoyaku shite imasu.', h: 'よやく して います', m: '我有預約', u: '有訂位時向接待說明', k: ['予約', 'よやく', 'yoyaku'] },
      { id: 87, t: '英語のメニューはありますか。', p: 'Eigo no menyuu wa arimasu ka.', h: 'えいごの メニューは ありますか', m: '有英文菜單嗎？', u: '看不懂日文菜單時', k: ['メニュー', 'menyuu', 'menu', '英語'] },
      { id: 88, t: 'おすすめは何ですか。', p: 'Osusume wa nan desu ka.', h: 'おすすめは なん ですか', m: '有什麼推薦的？', u: '不知道點什麼時問店員', k: ['おすすめ', 'osusume', 'recommend'] },
      { id: 89, t: 'これをお願いします。', p: 'Kore wo onegaishimasu.', h: 'これを おねがいします', m: '我要這個', u: '點菜時指著菜單或圖片', k: ['これ', 'kore', 'onegaishimasu'] },
      { id: 90, t: '辛くないのをお願いします。', p: 'Karakunai no wo onegaishimasu.', h: 'からくないのを おねがいします', m: '請給我不辣的', u: '點餐時說明口味', k: ['辛くない', 'karakunai', 'not spicy'] },
      { id: 91, t: 'あまり辛くしないでください。', p: 'Amari karaku shinaide kudasai.', h: 'あまり からく しないで ください', m: '請不要太辣', u: '可以接受微辣時', k: ['辛く', 'karaku', 'spicy', 'amari'] },
      { id: 92, t: 'ピーナッツアレルギーがあります。', p: 'Piinattsu arerugii ga arimasu.', h: 'ピーナッツ アレルギーが あります', m: '我對花生過敏', u: '說明食物過敏', k: ['アレルギー', 'arerugii', 'allergy', 'ピーナッツ'] },
      { id: 93, t: '甲殻類アレルギーがあります。', p: 'Koukaku-rui arerugii ga arimasu.', h: 'こうかくるい アレルギーが あります', m: '我對海鮮過敏', u: '海鮮過敏時務必說明', k: ['甲殻類', 'こうかくるい', 'shellfish', 'アレルギー'] },
      { id: 94, t: 'ベジタリアンです。', p: 'Bejitarian desu.', h: 'ベジタリアン です', m: '我是素食者', u: '點餐時說明飲食限制', k: ['ベジタリアン', 'bejitarian', 'vegetarian'] },
      { id: 95, t: 'お水をください。', p: 'O-mizu wo kudasai.', h: 'おみずを ください', m: '請給我水', u: '點水或要水喝', k: ['お水', 'おみず', 'omizu', 'water'] },
      { id: 96, t: 'おかわりをお願いします。', p: 'Okawari wo onegaishimasu.', h: 'おかわりを おねがいします', m: '請再來一份', u: '飲料或白飯想續杯續碗', k: ['おかわり', 'okawari', 'refill'] },
      { id: 97, t: 'お会計お願いします。', p: 'O-kaikei onegaishimasu.', h: 'おかいけい おねがいします', m: '請結帳', u: '用餐完畢請店員結帳', k: ['お会計', 'おかいけい', 'okaikei', 'check'] },
      { id: 98, t: '別々に払えますか。', p: 'Betsu-betsu ni haraemasu ka.', h: 'べつべつに はらえますか', m: '可以分開付嗎？', u: '跟朋友各自付帳', k: ['別々', 'べつべつ', 'betsubetsu', 'split'] },
      { id: 99, t: '持ち帰りできますか。', p: 'Mochikaeri dekimasu ka.', h: 'もちかえり できますか', m: '可以外帶嗎？', u: '想把餐點帶走', k: ['持ち帰り', 'もちかえり', 'mochikaeri', 'takeout'] },
      { id: 100, t: 'サービス料は含まれていますか。', p: 'Saabisu-ryou wa fukumarete imasu ka.', h: 'サービスりょうは ふくまれて いますか', m: '有含服務費嗎？', u: '確認帳單是否含服務費', k: ['サービス', 'service', '含まれ'] },
      { id: 101, t: '同じものをお願いします。', p: 'Onaji mono wo onegaishimasu.', h: 'おなじ ものを おねがいします', m: '請給我跟他一樣的', u: '跟同伴點相同餐點', k: ['同じ', 'onaji', 'same'] },
      { id: 102, t: '玉ねぎ抜きでお願いします。', p: 'Tamanegi nuki de onegaishimasu.', h: 'たまねぎ ぬきで おねがいします', m: '請不要洋蔥', u: '點餐時去掉配料', k: ['玉ねぎ', 'たまねぎ', 'tamanegi', 'onion'] },
      { id: 103, t: '塩控えめでお願いします。', p: 'Shio hikaeme de onegaishimasu.', h: 'しお ひかえめで おねがいします', m: '請少鹽一點', u: '調整口味', k: ['塩', 'しお', 'shio', 'salt'] },
      { id: 104, t: 'これはグルテンフリーですか。', p: 'Kore wa guruten furii desu ka.', h: 'これは グルテンフリー ですか', m: '這是無麩質的嗎？', u: '麩質過敏或飲食限制時', k: ['グルテンフリー', 'gluten free', 'gluten'] },
      { id: 105, t: 'まだ料理が来ません。', p: 'Mada ryouri ga kimasen.', h: 'まだ りょうりが きません', m: '餐點還沒來', u: '等太久時禮貌催促', k: ['料理', 'りょうり', 'ryouri', 'mada'] },
      { id: 106, t: 'おいしいです。', p: 'Oishii desu.', h: 'おいしい です', m: '很好吃', u: '稱讚料理，跟店員聊天', k: ['おいしい', 'oishii', 'delicious'] },
      { id: 107, t: '外の席に座れますか。', p: 'Soto no seki ni suwaremasu ka.', h: 'そとの せきに すわれますか', m: '可以坐外面嗎？', u: '想坐戶外座位時', k: ['外', 'そと', 'soto', 'outside'] },
      { id: 108, t: '待ち時間はどのくらいですか。', p: 'Machi jikan wa dono kurai desu ka.', h: 'まちじかんは どのくらい ですか', m: '要等多久？', u: '餐廳需要排隊時', k: ['待ち時間', 'まちじかん', 'wait', 'machi'] },
      { id: 109, t: 'カードは使えますか。', p: 'Kaado wa tsukaemasu ka.', h: 'カードは つかえますか', m: '可以刷卡嗎？', u: '結帳前確認付款方式', k: ['カード', 'card', 'tsukaemasu'] },
      { id: 110, t: 'メニューを見せてください。', p: 'Menyuu wo misete kudasai.', h: 'メニューを みせて ください', m: '可以看一下菜單嗎？', u: '入座後要菜單', k: ['メニュー', 'menyuu', 'menu'] },
      { id: 111, t: 'これはとても辛いですか。', p: 'Kore wa totemo karai desu ka.', h: 'これは とても からい ですか', m: '這個很辣嗎？', u: '點菜前確認辣度', k: ['辛い', 'からい', 'karai', 'spicy'] },
    ],
  },
  {
    file: 'convenience-store',
    export: 'convenienceStoreJa',
    cat: 'convenience-store',
    sentences: [
      { id: 112, t: 'これをください。', p: 'Kore wo kudasai.', h: 'これを ください', m: '我要這個', u: '結帳時指著商品說', k: ['これ', 'kore', 'kudasai'] },
      { id: 113, t: '温めてください。', p: 'Atatamete kudasai.', h: 'あたためて ください', m: '請幫我加熱', u: '買便當或熟食請店員加熱', k: ['温めて', 'atatamete', 'heat'] },
      { id: 114, t: 'アイスでお願いします。', p: 'Aisu de onegaishimasu.', h: 'アイスで おねがいします', m: '我要冰的', u: '買飲料時指定要冰的', k: ['アイス', 'aisu', 'iced', 'cold'] },
      { id: 115, t: 'ホットでお願いします。', p: 'Hotto de onegaishimasu.', h: 'ホットで おねがいします', m: '我要熱的', u: '買飲料或咖啡指定溫度', k: ['ホット', 'hotto', 'hot'] },
      { id: 116, t: '袋はいりません。', p: 'Fukuro wa irimasen.', h: 'ふくろは いりません', m: '不需要袋子', u: '店員問要不要袋子時', k: ['袋', 'ふくろ', 'fukuro', 'irimasen'] },
      { id: 117, t: 'カードで払えますか。', p: 'Kaado de haraemasu ka.', h: 'カードで はらえますか', m: '可以刷卡嗎？', u: '結帳前確認能否刷卡', k: ['カード', 'card', 'haraemasu'] },
      { id: 118, t: 'レシートをください。', p: 'Reshiito wo kudasai.', h: 'レシートを ください', m: '請給我收據', u: '結帳後需要收據時', k: ['レシート', 'reshiito', 'receipt'] },
      { id: 119, t: 'トイレはどこですか。', p: 'Toire wa doko desu ka.', h: 'トイレは どこ ですか', m: '廁所在哪裡？', u: '在便利商店找廁所', k: ['トイレ', 'toire', 'restroom'] },
      { id: 120, t: '近くにATMはありますか。', p: 'Chikaku ni ATM wa arimasu ka.', h: 'ちかくに ATMは ありますか', m: '附近有 ATM 嗎？', u: '需要提領現金時', k: ['atm', 'ATM', 'chikaku'] },
      { id: 121, t: 'ペットボトルの水はありますか。', p: 'Petto botoru no mizu wa arimasu ka.', h: 'ペットボトルの みずは ありますか', m: '有瓶裝水嗎？', u: '找特定商品時', k: ['水', 'みず', 'mizu', 'water'] },
      { id: 122, t: 'お菓子はどこにありますか。', p: 'Okashi wa doko ni arimasu ka.', h: 'おかしは どこに ありますか', m: '零食在哪裡？', u: '在店裡找商品區', k: ['お菓子', 'おかし', 'okashi', 'snacks'] },
      { id: 123, t: '電子レンジはありますか。', p: 'Denshi renji wa arimasu ka.', h: 'でんしレンジは ありますか', m: '有微波爐嗎？', u: '想自己加熱食物時', k: ['電子レンジ', 'renji', 'microwave'] },
      { id: 124, t: 'お箸をください。', p: 'O-hashi wo kudasai.', h: 'おはしを ください', m: '請給我筷子', u: '買便當需要餐具時', k: ['お箸', 'おはし', 'ohashi', 'chopsticks'] },
      { id: 125, t: '充電器はありますか。', p: 'Juudenshi wa arimasu ka.', h: 'じゅうでんきは ありますか', m: '有充電器嗎？', u: '手機沒電急需充電', k: ['充電器', 'じゅうでんき', 'juudenki', 'charger'] },
      { id: 126, t: '何時まで開いていますか。', p: 'Nan-ji made aite imasu ka.', h: 'なんじまで あいて いますか', m: '開到幾點？', u: '快關門時確認營業時間', k: ['何時', 'nanji', '開いて', 'aite'] },
      { id: 127, t: '税込みですか。', p: 'Zeikomi desu ka.', h: 'ぜいこみ ですか', m: '有含稅嗎？', u: '確認標價是否含稅', k: ['税込み', 'ぜいこみ', 'zeikomi', 'tax'] },
      { id: 128, t: 'SIMカードは売っていますか。', p: 'SIM kaado wa utte imasu ka.', h: 'SIMカードは うって いますか', m: '有賣 SIM 卡嗎？', u: '台灣旅客到日本常需網卡', k: ['sim', 'SIM', 'sim card', 'kaado'] },
    ],
  },
  {
    file: 'shopping',
    export: 'shoppingJa',
    cat: 'shopping',
    sentences: [
      { id: 129, t: 'これはいくらですか。', p: 'Kore wa ikura desu ka.', h: 'これは いくら ですか', m: '這個多少錢？', u: '在商店詢問價格', k: ['いくら', 'ikura', 'how much'] },
      { id: 130, t: 'ちょっと高いですね。', p: 'Chotto takai desu ne.', h: 'ちょっと たかい ですね', m: '有點貴呢', u: '表示猶豫或試著議價', k: ['高い', 'たかい', 'takai', 'expensive'] },
      { id: 131, t: '割引はありますか。', p: 'Waribiki wa arimasu ka.', h: 'わりびきは ありますか', m: '有折扣嗎？', u: '詢問是否有優惠', k: ['割引', 'わりびき', 'waribiki', 'discount'] },
      { id: 132, t: 'もっと小さいサイズはありますか。', p: 'Motto chiisai saizu wa arimasu ka.', h: 'もっと ちいさい さいずは ありますか', m: '有更小的尺寸嗎？', u: '衣服或鞋子尺寸不合', k: ['小さい', 'chiisai', 'size', 'サイズ'] },
      { id: 133, t: 'もっと大きいサイズはありますか。', p: 'Motto ookii saizu wa arimasu ka.', h: 'もっと おおきい さいずは ありますか', m: '有更大的尺寸嗎？', u: '需要更大尺寸時', k: ['大きい', 'ookii', 'size'] },
      { id: 134, t: '他の色はありますか。', p: 'Hoka no iro wa arimasu ka.', h: 'ほかの いろは ありますか', m: '有其他顏色嗎？', u: '想換顏色時', k: ['色', 'いろ', 'iro', 'color'] },
      { id: 135, t: '試着できますか。', p: 'Shichaku dekimasu ka.', h: 'しちゃく できますか', m: '可以試穿嗎？', u: '買衣服鞋子前試穿', k: ['試着', 'しちゃく', 'shichaku', 'try on'] },
      { id: 136, t: '試着室はどこですか。', p: 'Shichaku-shitsu wa doko desu ka.', h: 'しちゃくしつは どこ ですか', m: '試衣間在哪裡？', u: '試穿前找試衣間', k: ['試着室', 'しちゃくしつ', 'fitting room'] },
      { id: 137, t: '免税できますか。', p: 'Menzei dekimasu ka.', h: 'めんぜい できますか', m: '可以免稅嗎？', u: '購物時確認免稅資格', k: ['免税', 'menzei', 'tax free'] },
      { id: 138, t: 'カードで払えますか。', p: 'Kaado de haraemasu ka.', h: 'カードで はらえますか', m: '可以刷卡嗎？', u: '結帳前確認付款方式', k: ['カード', 'card', 'haraemasu'] },
      { id: 139, t: 'プレゼント用に包んでください。', p: 'Purezento-you ni tsutsunde kudasai.', h: 'プレゼントように つつんで ください', m: '請幫我包成禮物', u: '買禮物請店員包裝', k: ['プレゼント', 'present', '包んで', 'tsutsunde'] },
      { id: 140, t: '返品はできますか。', p: 'Henpin wa dekimasu ka.', h: 'へんぴんは できますか', m: '可以退貨嗎？', u: '購買前確認能否退貨', k: ['返品', 'henpin', 'return'] },
      { id: 141, t: 'これにします。', p: 'Kore ni shimasu.', h: 'これに します', m: '我要買這個', u: '決定購買時', k: ['これ', 'kore', 'shimasu'] },
      { id: 142, t: '見ているだけです。', p: 'Mite iru dake desu.', h: 'みて いる だけ です', m: '我只是看看', u: '店員招呼時表示隨便逛逛', k: ['見ている', 'mite iru', 'just looking'] },
      { id: 143, t: '台湾に送れますか。', p: 'Taiwan ni okuremasu ka.', h: 'たいわんに おくれますか', m: '可以寄到台灣嗎？', u: '買太多想直寄回家', k: ['台湾', 'taiwan', '送れ', 'okuremasu'] },
      { id: 144, t: '現金のみですか。', p: 'Genkin nomi desu ka.', h: 'げんきん のみ ですか', m: '只能付現金嗎？', u: '確認是否只收現金', k: ['現金', 'genkin', 'cash only'] },
      { id: 145, t: 'レシートをください。', p: 'Reshiito wo kudasai.', h: 'レシートを ください', m: '請給我收據', u: '結帳後要收據或退稅用', k: ['レシート', 'reshiito', 'receipt'] },
      { id: 146, t: 'セール中ですか。', p: 'Seeru chuu desu ka.', h: 'セールちゅう ですか', m: '正在特價嗎？', u: '確認商品是否在打折', k: ['セール', 'seeru', 'sale'] },
      { id: 147, t: 'これが最後の一つですか。', p: 'Kore ga saigo no hitotsu desu ka.', h: 'これが さいごの ひとつ ですか', m: '這是最後一個嗎？', u: '搶限量商品時確認', k: ['最後', 'saigo', 'last one'] },
      { id: 148, t: 'これは免税品ですか。', p: 'Kore wa menzei-hin desu ka.', h: 'これは めんぜいひん ですか', m: '這是免稅商品嗎？', u: '在免稅店或機場購物', k: ['免税品', 'menzeihin', 'duty free'] },
      { id: 149, t: '袋をください。', p: 'Fukuro wo kudasai.', h: 'ふくろを ください', m: '請給我袋子', u: '需要購物袋時', k: ['袋', 'fukuro', 'bag'] },
      { id: 150, t: 'ぴったりです。', p: 'Pittari desu.', h: 'ぴったり です', m: '很合穿', u: '試穿滿意，決定購買', k: ['ぴったり', 'pittari', 'fits'] },
    ],
  },
  {
    file: 'emergency',
    export: 'emergencyJa',
    cat: 'emergency',
    sentences: [
      { id: 151, t: '助けてください。', p: 'Tasukete kudasai.', h: 'たすけて ください', m: '請幫幫我', u: '遇到困難或危險時求助', k: ['助けて', 'tasukete', 'help'] },
      { id: 152, t: '道に迷いました。', p: 'Michi ni mayoimashita.', h: 'みちに まよいました', m: '我迷路了', u: '找不到路時向路人求助', k: ['道に迷', 'みち', 'mayoimashita', 'lost'] },
      { id: 153, t: '体調が悪いです。', p: 'Taichou ga warui desu.', h: 'たいちょうが わるい です', m: '我身體不舒服', u: '身體不適時說明狀況', k: ['体調', 'たいちょう', 'taichou', 'warui'] },
      { id: 154, t: '救急車を呼んでください。', p: 'Kyuukyuusha wo yonde kudasai.', h: 'きゅうきゅうしゃを よんで ください', m: '請叫救護車', u: '嚴重受傷或急病時', k: ['救急車', 'きゅうきゅうしゃ', 'ambulance'] },
      { id: 155, t: '警察を呼んでください。', p: 'Keisatsu wo yonde kudasai.', h: 'けいさつを よんで ください', m: '請叫警察', u: '遭遇竊盜或危險時', k: ['警察', 'けいさつ', 'keisatsu', 'police'] },
      { id: 156, t: '財布をなくしました。', p: 'Saifu wo nakushimashita.', h: 'さいふを なくしました', m: '我遺失了錢包', u: '錢包遺失向警察或櫃檯求助', k: ['財布', 'saifu', 'wallet', 'nakushimashita'] },
      { id: 157, t: 'パスポートをなくしました。', p: 'Pasupooto wo nakushimashita.', h: 'パスポートを なくしました', m: '我遺失了護照', u: '護照遺失，緊急求助', k: ['パスポート', 'pasupoto', 'passport', 'lost'] },
      { id: 158, t: '携帯をなくしました。', p: 'Keitai wo nakushimashita.', h: 'けいたいを なくしました', m: '我手機弄丟了', u: '手機遺失時說明', k: ['携帯', 'keitai', 'phone', 'lost'] },
      { id: 159, t: '携帯の電池が切れました。', p: 'Keitai no denchi ga kiremashita.', h: 'けいたいの でんちが きれました', m: '我手機沒電了', u: '需要充電或借電話時', k: ['電池', 'denchi', 'battery', 'kiremashita'] },
      { id: 160, t: '医者に診てもらいたいです。', p: 'Isha ni mite moraitai desu.', h: 'いしゃに みて もらいたい です', m: '我想看醫生', u: '身體不舒服需要醫療', k: ['医者', 'isha', 'doctor'] },
      { id: 161, t: 'アレルギーが出ました。', p: 'Arerugii ga demashita.', h: 'アレルギーが でました', m: '我過敏了', u: '食物或藥物過敏緊急狀況', k: ['アレルギー', 'arerugii', 'allergy'] },
      { id: 162, t: '一番近い病院はどこですか。', p: 'Ichiban chikai byouin wa doko desu ka.', h: 'いちばん ちかい びょういんは どこ ですか', m: '最近的醫院在哪？', u: '需要就醫時找醫院', k: ['病院', 'びょういん', 'byouin', 'hospital'] },
      { id: 163, t: 'ホテルに連絡してください。', p: 'Hoteru ni renraku shite kudasai.', h: 'ホテルに れんらく してください', m: '請聯絡我的飯店', u: '緊急時請人幫忙打給飯店', k: ['ホテル', 'hoteru', 'hotel', 'renraku'] },
      { id: 164, t: 'かばんを盗まれました。', p: 'Kaban wo nusumaremashita.', h: 'かばんを ぬすまれました', m: '我的包包被偷了', u: '遭遇竊盜向警察報案', k: ['盗まれ', 'nusumare', 'stolen', 'kaban'] },
      { id: 165, t: '火事です。119番に電話してください。', p: 'Kaji desu. Hyaku-juu-kyuu-ban ni denwa shite kudasai.', h: 'かじ です。119ばんに でんわ してください', m: '失火了，請打 119', u: '火災緊急狀況（日本）', k: ['火事', 'kaji', '119', 'fire'] },
      { id: 166, t: '電話を借りられますか。', p: 'Denwa wo kariraremasu ka.', h: 'でんわを かりられますか', m: '可以借電話嗎？', u: '自己手機沒電或遺失時', k: ['電話', 'denwa', 'phone', 'kariraremasu'] },
      { id: 167, t: '緊急の電話番号は何番ですか。', p: 'Kinkyuu no denwa bangou wa nan-ban desu ka.', h: 'きんきゅうの でんばんごうは なんばん ですか', m: '緊急電話是幾號？', u: '不知道當地急救電話時', k: ['緊急', 'kinkyuu', 'emergency', '電話番号'] },
    ],
  },
]

for (const category of categories) {
  const body = `import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = '${category.cat}' as const

export const ${category.export}: Sentence[] = [
${category.sentences.map(line).join('\n')}
]
`
  writeFileSync(join(outDir, `${category.file}.ts`), body, 'utf8')
}

const imports = categories
  .map((c) => `import { ${c.export} } from './ja/${c.file}'`)
  .join('\n')
const spreads = categories.map((c) => `  ...${c.export},`).join('\n')

const jaIndex = `import type { Sentence } from '../types'
${imports}

export const japaneseSentences: Sentence[] = [
${spreads}
]
`

writeFileSync(join(__dirname, '../src/data/sentences/ja.ts'), jaIndex, 'utf8')

const total = categories.reduce((sum, c) => sum + c.sentences.length, 0)
console.log(`Generated ${total} Japanese sentences in ${categories.length} categories.`)
