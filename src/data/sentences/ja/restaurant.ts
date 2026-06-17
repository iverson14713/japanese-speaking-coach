import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ja' as const
const cat = 'restaurant' as const

export const restaurantJa: Sentence[] = [
  makeSentence({ id: 85, language: lang, category: cat, target: '二人です。', pronunciation: 'Futari desu.', helper: 'ふたり です', meaning: '兩位', usage: '進餐廳告訴店員人數', keywords: ['二人', 'ふたり', 'futari', 'two'] }),
  makeSentence({ id: 86, language: lang, category: cat, target: '予約しています。', pronunciation: 'Yoyaku shite imasu.', helper: 'よやく して います', meaning: '我有預約', usage: '有訂位時向接待說明', keywords: ['予約', 'よやく', 'yoyaku'] }),
  makeSentence({ id: 87, language: lang, category: cat, target: '英語のメニューはありますか。', pronunciation: 'Eigo no menyuu wa arimasu ka.', helper: 'えいごの メニューは ありますか', meaning: '有英文菜單嗎？', usage: '看不懂日文菜單時', keywords: ['メニュー', 'menyuu', 'menu', '英語'] }),
  makeSentence({ id: 88, language: lang, category: cat, target: 'おすすめは何ですか。', pronunciation: 'Osusume wa nan desu ka.', helper: 'おすすめは なん ですか', meaning: '有什麼推薦的？', usage: '不知道點什麼時問店員', keywords: ['おすすめ', 'osusume', 'recommend'] }),
  makeSentence({ id: 89, language: lang, category: cat, target: 'これをお願いします。', pronunciation: 'Kore wo onegaishimasu.', helper: 'これを おねがいします', meaning: '我要這個', usage: '點菜時指著菜單或圖片', keywords: ['これ', 'kore', 'onegaishimasu'] }),
  makeSentence({ id: 90, language: lang, category: cat, target: '辛くないのをお願いします。', pronunciation: 'Karakunai no wo onegaishimasu.', helper: 'からくないのを おねがいします', meaning: '請給我不辣的', usage: '點餐時說明口味', keywords: ['辛くない', 'karakunai', 'not spicy'] }),
  makeSentence({ id: 91, language: lang, category: cat, target: 'あまり辛くしないでください。', pronunciation: 'Amari karaku shinaide kudasai.', helper: 'あまり からく しないで ください', meaning: '請不要太辣', usage: '可以接受微辣時', keywords: ['辛く', 'karaku', 'spicy', 'amari'] }),
  makeSentence({ id: 92, language: lang, category: cat, target: 'ピーナッツアレルギーがあります。', pronunciation: 'Piinattsu arerugii ga arimasu.', helper: 'ピーナッツ アレルギーが あります', meaning: '我對花生過敏', usage: '說明食物過敏', keywords: ['アレルギー', 'arerugii', 'allergy', 'ピーナッツ'] }),
  makeSentence({ id: 93, language: lang, category: cat, target: '甲殻類アレルギーがあります。', pronunciation: 'Koukaku-rui arerugii ga arimasu.', helper: 'こうかくるい アレルギーが あります', meaning: '我對海鮮過敏', usage: '海鮮過敏時務必說明', keywords: ['甲殻類', 'こうかくるい', 'shellfish', 'アレルギー'] }),
  makeSentence({ id: 94, language: lang, category: cat, target: 'ベジタリアンです。', pronunciation: 'Bejitarian desu.', helper: 'ベジタリアン です', meaning: '我是素食者', usage: '點餐時說明飲食限制', keywords: ['ベジタリアン', 'bejitarian', 'vegetarian'] }),
  makeSentence({ id: 95, language: lang, category: cat, target: 'お水をください。', pronunciation: 'O-mizu wo kudasai.', helper: 'おみずを ください', meaning: '請給我水', usage: '點水或要水喝', keywords: ['お水', 'おみず', 'omizu', 'water'] }),
  makeSentence({ id: 96, language: lang, category: cat, target: 'おかわりをお願いします。', pronunciation: 'Okawari wo onegaishimasu.', helper: 'おかわりを おねがいします', meaning: '請再來一份', usage: '飲料或白飯想續杯續碗', keywords: ['おかわり', 'okawari', 'refill'] }),
  makeSentence({ id: 97, language: lang, category: cat, target: 'お会計お願いします。', pronunciation: 'O-kaikei onegaishimasu.', helper: 'おかいけい おねがいします', meaning: '請結帳', usage: '用餐完畢請店員結帳', keywords: ['お会計', 'おかいけい', 'okaikei', 'check'] }),
  makeSentence({ id: 98, language: lang, category: cat, target: '別々に払えますか。', pronunciation: 'Betsu-betsu ni haraemasu ka.', helper: 'べつべつに はらえますか', meaning: '可以分開付嗎？', usage: '跟朋友各自付帳', keywords: ['別々', 'べつべつ', 'betsubetsu', 'split'] }),
  makeSentence({ id: 99, language: lang, category: cat, target: '持ち帰りできますか。', pronunciation: 'Mochikaeri dekimasu ka.', helper: 'もちかえり できますか', meaning: '可以外帶嗎？', usage: '想把餐點帶走', keywords: ['持ち帰り', 'もちかえり', 'mochikaeri', 'takeout'] }),
  makeSentence({ id: 100, language: lang, category: cat, target: 'サービス料は含まれていますか。', pronunciation: 'Saabisu-ryou wa fukumarete imasu ka.', helper: 'サービスりょうは ふくまれて いますか', meaning: '有含服務費嗎？', usage: '確認帳單是否含服務費', keywords: ['サービス', 'service', '含まれ'] }),
  makeSentence({ id: 101, language: lang, category: cat, target: '同じものをお願いします。', pronunciation: 'Onaji mono wo onegaishimasu.', helper: 'おなじ ものを おねがいします', meaning: '請給我跟他一樣的', usage: '跟同伴點相同餐點', keywords: ['同じ', 'onaji', 'same'] }),
  makeSentence({ id: 102, language: lang, category: cat, target: '玉ねぎ抜きでお願いします。', pronunciation: 'Tamanegi nuki de onegaishimasu.', helper: 'たまねぎ ぬきで おねがいします', meaning: '請不要洋蔥', usage: '點餐時去掉配料', keywords: ['玉ねぎ', 'たまねぎ', 'tamanegi', 'onion'] }),
  makeSentence({ id: 103, language: lang, category: cat, target: '塩控えめでお願いします。', pronunciation: 'Shio hikaeme de onegaishimasu.', helper: 'しお ひかえめで おねがいします', meaning: '請少鹽一點', usage: '調整口味', keywords: ['塩', 'しお', 'shio', 'salt'] }),
  makeSentence({ id: 104, language: lang, category: cat, target: 'これはグルテンフリーですか。', pronunciation: 'Kore wa guruten furii desu ka.', helper: 'これは グルテンフリー ですか', meaning: '這是無麩質的嗎？', usage: '麩質過敏或飲食限制時', keywords: ['グルテンフリー', 'gluten free', 'gluten'] }),
  makeSentence({ id: 105, language: lang, category: cat, target: 'まだ料理が来ません。', pronunciation: 'Mada ryouri ga kimasen.', helper: 'まだ りょうりが きません', meaning: '餐點還沒來', usage: '等太久時禮貌催促', keywords: ['料理', 'りょうり', 'ryouri', 'mada'] }),
  makeSentence({ id: 106, language: lang, category: cat, target: 'おいしいです。', pronunciation: 'Oishii desu.', helper: 'おいしい です', meaning: '很好吃', usage: '稱讚料理，跟店員聊天', keywords: ['おいしい', 'oishii', 'delicious'] }),
  makeSentence({ id: 107, language: lang, category: cat, target: '外の席に座れますか。', pronunciation: 'Soto no seki ni suwaremasu ka.', helper: 'そとの せきに すわれますか', meaning: '可以坐外面嗎？', usage: '想坐戶外座位時', keywords: ['外', 'そと', 'soto', 'outside'] }),
  makeSentence({ id: 108, language: lang, category: cat, target: '待ち時間はどのくらいですか。', pronunciation: 'Machi jikan wa dono kurai desu ka.', helper: 'まちじかんは どのくらい ですか', meaning: '要等多久？', usage: '餐廳需要排隊時', keywords: ['待ち時間', 'まちじかん', 'wait', 'machi'] }),
  makeSentence({ id: 109, language: lang, category: cat, target: 'カードは使えますか。', pronunciation: 'Kaado wa tsukaemasu ka.', helper: 'カードは つかえますか', meaning: '可以刷卡嗎？', usage: '結帳前確認付款方式', keywords: ['カード', 'card', 'tsukaemasu'] }),
  makeSentence({ id: 110, language: lang, category: cat, target: 'メニューを見せてください。', pronunciation: 'Menyuu wo misete kudasai.', helper: 'メニューを みせて ください', meaning: '可以看一下菜單嗎？', usage: '入座後要菜單', keywords: ['メニュー', 'menyuu', 'menu'] }),
  makeSentence({ id: 111, language: lang, category: cat, target: 'これはとても辛いですか。', pronunciation: 'Kore wa totemo karai desu ka.', helper: 'これは とても からい ですか', meaning: '這個很辣嗎？', usage: '點菜前確認辣度', keywords: ['辛い', 'からい', 'karai', 'spicy'] }),
]
