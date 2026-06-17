import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = 'hotel' as const

export const hotelJa: Sentence[] = [
  makeSentence({ id: 63, language: lang, category: cat, target: 'チェックインをお願いします。', pronunciation: 'Chekku-in wo onegaishimasu.', helper: 'チェックインを おねがいします', meaning: '我要辦理入住', usage: '到飯店櫃檯時', keywords: ['チェックイン', 'check in', 'checkin'] }),
  makeSentence({ id: 64, language: lang, category: cat, target: '予約しています。', pronunciation: 'Yoyaku shite imasu.', helper: 'よやく して います', meaning: '我有預約', usage: '到櫃檯說明已訂房', keywords: ['予約', 'よやく', 'yoyaku'] }),
  makeSentence({ id: 65, language: lang, category: cat, target: '予約名はリンです。', pronunciation: 'Yoyaku-mei wa Lin desu.', helper: 'よやくめいは リン です', meaning: '預約名字是 Lin', usage: '報訂房姓名，可換成你的名字', keywords: ['予約名', 'yoyakumei', 'lin'] }),
  makeSentence({ id: 66, language: lang, category: cat, target: 'パスポートです。', pronunciation: 'Pasupooto desu.', helper: 'パスポート です', meaning: '這是我的護照', usage: '入住時櫃檯要求證件', keywords: ['パスポート', 'pasupoto', 'passport'] }),
  makeSentence({ id: 67, language: lang, category: cat, target: '早めにチェックインできますか。', pronunciation: 'Hayame ni chekku-in dekimasu ka.', helper: 'はやめに チェックイン できますか', meaning: '可以提早入住嗎？', usage: '提早到飯店想先進房', keywords: ['早め', 'hayame', 'check in', 'チェックイン'] }),
  makeSentence({ id: 68, language: lang, category: cat, target: 'レイトチェックアウトはできますか。', pronunciation: 'Reito chekku-auto wa dekimasu ka.', helper: 'レイトチェックアウトは できますか', meaning: '可以晚一點退房嗎？', usage: '想延後退房時間', keywords: ['レイトチェックアウト', 'late checkout', 'checkout'] }),
  makeSentence({ id: 69, language: lang, category: cat, target: '荷物を預かってもらえますか。', pronunciation: 'Nimotsu wo azukatte moraemasu ka.', helper: 'にもつを あずかって もらえますか', meaning: '可以寄放行李嗎？', usage: '入住前或退房後寄行李', keywords: ['荷物', 'にもつ', 'nimotsu', '預かって'] }),
  makeSentence({ id: 70, language: lang, category: cat, target: 'チェックアウトをお願いします。', pronunciation: 'Chekku-auto wo onegaishimasu.', helper: 'チェックアウトを おねがいします', meaning: '我要退房', usage: '離開飯店辦理退房', keywords: ['チェックアウト', 'checkout', 'check out'] }),
  makeSentence({ id: 71, language: lang, category: cat, target: '部屋がきれいではありません。', pronunciation: 'Heya ga kirei de wa arimasen.', helper: 'へやが きれいでは ありません', meaning: '房間沒有打掃乾淨', usage: '房間清潔有問題時', keywords: ['部屋', 'へや', 'heya', 'きれい'] }),
  makeSentence({ id: 72, language: lang, category: cat, target: 'エアコンが壊れています。', pronunciation: 'Ea-kon ga kowarete imasu.', helper: 'エアコンが こわれて います', meaning: '冷氣壞了', usage: '房間設備故障時', keywords: ['エアコン', 'aircon', 'ea kon', '壊れ'] }),
  makeSentence({ id: 73, language: lang, category: cat, target: 'お湯が出ません。', pronunciation: 'O-yu ga demasen.', helper: 'おゆが でません', meaning: '沒有熱水', usage: '洗澡沒熱水時向櫃檯反映', keywords: ['お湯', 'oyu', '熱水', 'demasen'] }),
  makeSentence({ id: 74, language: lang, category: cat, target: 'Wi-Fiのパスワードは何ですか。', pronunciation: 'Wi-Fi no pasuwaado wa nan desu ka.', helper: 'Wi-Fiの パスワードは なん ですか', meaning: 'Wi-Fi 密碼是什麼？', usage: '入住後連網路', keywords: ['wifi', 'wi-fi', 'パスワード', 'password'] }),
  makeSentence({ id: 75, language: lang, category: cat, target: '枕をもう一つください。', pronunciation: 'Makura wo mou hitotsu kudasai.', helper: 'まくらを もうひとつ ください', meaning: '請再給我一個枕頭', usage: '需要更多寢具時', keywords: ['枕', 'まくら', 'makura', 'pillow'] }),
  makeSentence({ id: 76, language: lang, category: cat, target: 'タオルをもう少しください。', pronunciation: 'Taoru wo mou sukoshi kudasai.', helper: 'タオルを もうすこし ください', meaning: '請再給幾條毛巾', usage: '毛巾不夠用時', keywords: ['タオル', 'taoru', 'towel'] }),
  makeSentence({ id: 77, language: lang, category: cat, target: 'モーニングコールを七時にお願いします。', pronunciation: 'Moorningu kooru wo shichi-ji ni onegaishimasu.', helper: 'モーニングコールを しちじに おねがいします', meaning: '請七點叫醒我', usage: '請飯店早上電話叫醒', keywords: ['モーニングコール', 'morning call', '七時'] }),
  makeSentence({ id: 78, language: lang, category: cat, target: 'ルームキーをなくしました。', pronunciation: 'Ruumu kii wo nakushimashita.', helper: 'ルームキーを なくしました', meaning: '我把房卡弄丟了', usage: '房卡遺失向櫃檯求助', keywords: ['ルームキー', 'room key', 'nakushimashita'] }),
  makeSentence({ id: 79, language: lang, category: cat, target: 'エレベーターはどこですか。', pronunciation: 'Erebeetaa wa doko desu ka.', helper: 'エレベーターは どこ ですか', meaning: '電梯在哪裡？', usage: '在大廳找電梯', keywords: ['エレベーター', 'elevator', 'erebeetaa'] }),
  makeSentence({ id: 80, language: lang, category: cat, target: '朝食は付いていますか。', pronunciation: 'Choushoku wa tsuite imasu ka.', helper: 'ちょうしょくは ついて いますか', meaning: '有含早餐嗎？', usage: '確認訂房是否含早餐', keywords: ['朝食', 'ちょうしょく', 'choushoku', 'breakfast'] }),
  makeSentence({ id: 81, language: lang, category: cat, target: '変換プラグはありますか。', pronunciation: 'Henkan puragu wa arimasu ka.', helper: 'へんかん プラグは ありますか', meaning: '有轉接頭嗎？', usage: '台灣插頭不合時借用', keywords: ['変換プラグ', 'adapter', 'plug'] }),
  makeSentence({ id: 82, language: lang, category: cat, target: 'チェックアウトは何時ですか。', pronunciation: 'Chekku-auto wa nan-ji desu ka.', helper: 'チェックアウトは なんじ ですか', meaning: '幾點退房？', usage: '確認退房時間', keywords: ['チェックアウト', 'checkout', '何時', 'nanji'] }),
  makeSentence({ id: 83, language: lang, category: cat, target: 'Wi-Fiがつながりません。', pronunciation: 'Wi-Fi ga tsunagarimasen.', helper: 'Wi-Fiが つながりません', meaning: 'Wi-Fi 連不上', usage: '網路連不上時', keywords: ['wifi', 'wi-fi', 'tsunagarimasen'] }),
  makeSentence({ id: 84, language: lang, category: cat, target: 'もう一泊延長したいです。', pronunciation: 'Mou ippaku enchou shitai desu.', helper: 'もう いっぱく えんちょう したい です', meaning: '我想多住一晚', usage: '想延長住宿時', keywords: ['延長', 'えんちょう', 'enchou', '一泊'] }),
]
