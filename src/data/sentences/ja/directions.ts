import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = 'directions' as const

export const directionsJa: Sentence[] = [
  makeSentence({ id: 41, language: lang, category: cat, target: '駅はどこですか。', pronunciation: 'Eki wa doko desu ka.', helper: 'えきは どこ ですか', meaning: '車站在哪裡？', usage: '問路人或站務人員', keywords: ['駅', 'えき', 'eki', 'doko'] }),
  makeSentence({ id: 42, language: lang, category: cat, target: '地下鉄の入口はどこですか。', pronunciation: 'Chikatetsu no iriguchi wa doko desu ka.', helper: 'ちかてつの いりぐちは どこ ですか', meaning: '地鐵入口在哪？', usage: '找地鐵站入口時', keywords: ['地下鉄', 'ちかてつ', 'chikatetsu'] }),
  makeSentence({ id: 43, language: lang, category: cat, target: '何番線ですか。', pronunciation: 'Nan-ban sen desu ka.', helper: 'なんばんせん ですか', meaning: '是幾號月台？', usage: '在車站確認搭車月台', keywords: ['何番線', 'nanban sen', '番線'] }),
  makeSentence({ id: 44, language: lang, category: cat, target: '都心までの切符を一枚ください。', pronunciation: 'Toshin made no kippu wo ichimai kudasai.', helper: 'としんまでの きっぷを いちまい ください', meaning: '請給我一張到市中心的票', usage: '在售票機或櫃檯買票', keywords: ['切符', 'きっぷ', 'kippu', '都心'] }),
  makeSentence({ id: 45, language: lang, category: cat, target: 'この電車は渋谷に行きますか。', pronunciation: 'Kono densha wa Shibuya ni ikimasu ka.', helper: 'この でんしゃは しぶやに いきますか', meaning: '這班電車到澀谷嗎？', usage: '確認車次方向，站名可替換', keywords: ['渋谷', 'しぶや', 'shibuya', '電車'] }),
  makeSentence({ id: 46, language: lang, category: cat, target: 'このバスは都心に行きますか。', pronunciation: 'Kono basu wa toshin ni ikimasu ka.', helper: 'この ばすは としんに いきますか', meaning: '這班公車到市中心嗎？', usage: '在公車站確認路線', keywords: ['バス', 'basu', '都心', 'toshin'] }),
  makeSentence({ id: 47, language: lang, category: cat, target: 'どこで乗り換えますか。', pronunciation: 'Doko de norikaemasu ka.', helper: 'どこで のりかえますか', meaning: '在哪裡轉車？', usage: '需要換線或換車時', keywords: ['乗り換え', 'のりかえ', 'norikae'] }),
  makeSentence({ id: 48, language: lang, category: cat, target: 'どのくらいかかりますか。', pronunciation: 'Dono kurai kakarimasu ka.', helper: 'どのくらい かかりますか', meaning: '要多久？', usage: '問路程或車程時間', keywords: ['どのくらい', 'dono kurai', 'kakarimasu'] }),
  makeSentence({ id: 49, language: lang, category: cat, target: '運賃はいくらですか。', pronunciation: 'Unchin wa ikura desu ka.', helper: 'うんちんは いくら ですか', meaning: '車資多少？', usage: '買票前確認價格', keywords: ['運賃', 'うんちん', 'unchin', 'ikura'] }),
  makeSentence({ id: 50, language: lang, category: cat, target: '空港に行きたいです。', pronunciation: 'Kuu-kou ni ikitai desu.', helper: 'くうこうに いきたい です', meaning: '我想去機場', usage: '向站務或司機說明目的地', keywords: ['空港', 'くうこう', 'kuukou', 'airport'] }),
  makeSentence({ id: 51, language: lang, category: cat, target: 'ここでタクシーに乗れますか。', pronunciation: 'Koko de takushii ni nori emasu ka.', helper: 'ここで タクシーに のれますか', meaning: '這裡可以搭計程車嗎？', usage: '確認能否在此叫車', keywords: ['タクシー', 'takushii', 'taxi'] }),
  makeSentence({ id: 52, language: lang, category: cat, target: 'この住所までお願いします。', pronunciation: 'Kono juusho made onegaishimasu.', helper: 'この じゅうしょまで おねがいします', meaning: '請帶我去這個地址', usage: '上計程車後出示地址', keywords: ['住所', 'じゅうしょ', 'juusho', 'onegaishimasu'] }),
  makeSentence({ id: 53, language: lang, category: cat, target: 'ここで止めてください。', pronunciation: 'Koko de tomete kudasai.', helper: 'ここで とめて ください', meaning: '請在這裡停', usage: '搭計程車或公車時下車', keywords: ['止めて', 'tomete', 'ここで', 'koko de'] }),
  makeSentence({ id: 54, language: lang, category: cat, target: 'まっすぐ行ってください。', pronunciation: 'Massugu itte kudasai.', helper: 'まっすぐ いって ください', meaning: '請直走', usage: '問路後確認方向', keywords: ['まっすぐ', 'massugu', 'straight'] }),
  makeSentence({ id: 55, language: lang, category: cat, target: '角を左に曲がってください。', pronunciation: 'Kado wo hidari ni magatte kudasai.', helper: 'かどを ひだりに まがって ください', meaning: '請在轉角左轉', usage: '指路或確認方向', keywords: ['左', 'ひだり', 'hidari', '曲がって'] }),
  makeSentence({ id: 56, language: lang, category: cat, target: 'ここから遠いですか。', pronunciation: 'Koko kara tooi desu ka.', helper: 'ここから とおい ですか', meaning: '離這裡遠嗎？', usage: '問路程距離', keywords: ['遠い', 'とおい', 'tooi', 'far'] }),
  makeSentence({ id: 57, language: lang, category: cat, target: '美術館へはどう行けばいいですか。', pronunciation: 'Bijutsukan e wa dou ikeba ii desu ka.', helper: 'びじゅつかんへは どう いけば いい ですか', meaning: '怎麼去美術館？', usage: '問路，地點可替換', keywords: ['どう行けば', 'dou ikeba', '美術館'] }),
  makeSentence({ id: 58, language: lang, category: cat, target: '出口はどこですか。', pronunciation: 'Deguchi wa doko desu ka.', helper: 'でぐちは どこ ですか', meaning: '出口在哪裡？', usage: '在車站或商場找出口', keywords: ['出口', 'でぐち', 'deguchi', 'exit'] }),
  makeSentence({ id: 59, language: lang, category: cat, target: 'この道で合っていますか。', pronunciation: 'Kono michi de atte imasu ka.', helper: 'この みちで あって いますか', meaning: '這條路走對了嗎？', usage: '途中確認方向是否正確', keywords: ['道', 'みち', 'michi', '合って'] }),
  makeSentence({ id: 60, language: lang, category: cat, target: '乗り過ごしてしまいました。', pronunciation: 'Noriko shite shimaimashita.', helper: 'のりすごして しまいました', meaning: '我坐過站了', usage: '搭車坐過站時跟司機說', keywords: ['乗り過ご', 'のりすご', 'noriko'] }),
  makeSentence({ id: 61, language: lang, category: cat, target: '地図で教えてもらえますか。', pronunciation: 'Chizu de oshiete moraemasu ka.', helper: 'ちずで おしえて もらえますか', meaning: '可以在地圖上指給我看嗎？', usage: '語言不通時請對方指地圖', keywords: ['地図', 'ちず', 'chizu', 'map'] }),
  makeSentence({ id: 62, language: lang, category: cat, target: 'このバス停で合っていますか。', pronunciation: 'Kono basu-tei de atte imasu ka.', helper: 'この ばすていで あって いますか', meaning: '這個公車站對嗎？', usage: '確認公車站是否正確', keywords: ['バス停', 'ばすてい', 'basutei'] }),
]
