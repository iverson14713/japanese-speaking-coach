import { makeSentence } from '../helpers'
import type { Sentence } from '../../types'

const lang = 'ko' as const
const cat = 'first-conversation' as const

export const firstConversationKo: Sentence[] = [
  makeSentence({ id: 201, language: lang, category: cat, target: '안녕하세요.', pronunciation: 'annyeonghaseyo', helper: 'annyeong-haseyo', meaning: '你好', usage: '打招呼最常用', keywords: ['안녕', '안녕하세요', 'annyeonghaseyo'] }),
  makeSentence({ id: 202, language: lang, category: cat, target: '처음 뵙겠습니다.', pronunciation: 'cheoeum boepgetseumnida', helper: 'cheoeum boep-get-seum-ni-da', meaning: '初次見面', usage: '第一次見面、自我介紹開場', keywords: ['처음', '뵙겠습니다', 'cheoeum', 'boepgetseumnida'] }),
  makeSentence({ id: 203, language: lang, category: cat, target: '대만에서 왔어요.', pronunciation: 'daeman-eseo wasseoyo', helper: 'dae-man-e-seo wa-sseo-yo', meaning: '我來自台灣', usage: '自我介紹時說明來自哪裡', keywords: ['대만', 'daeman', 'taiwan', 'wasseoyo'], words: [{ word: '대만에서', meaning: '從台灣' }, { word: '왔어요', meaning: '來了' }], chunks: [{ text: '대만에서', pronunciation: 'daeman-eseo', chinese: '從台灣' }, { text: '왔어요', pronunciation: 'wasseoyo', chinese: '來了' }] }),
  makeSentence({ id: 204, language: lang, category: cat, target: '죄송해요, 한국어를 잘 못해요.', pronunciation: 'joesonghaeyo, hangugeoreul jal mothaeyo', helper: 'joe-song-hae-yo, han-gu-geo-reul jal mot-hae-yo', meaning: '不好意思，我不太會說韓文', usage: '請對方諒解、說話慢一點', keywords: ['한국어', 'hangugeo', '잘 못해요', 'mothaeyo'] }),
  makeSentence({ id: 205, language: lang, category: cat, target: '좀 더 천천히 말씀해 주세요.', pronunciation: 'jom deo cheoncheonhi malsseumhae juseyo', helper: 'jom deo cheon-cheon-hi mal-sseum-hae ju-se-yo', meaning: '可以請您說慢一點嗎？', usage: '聽不懂時請對方放慢速度', keywords: ['천천히', 'cheoncheonhi', 'slowly', '말씀해'] }),
  makeSentence({ id: 206, language: lang, category: cat, target: '죄송한데, 잘 못 알아들었어요.', pronunciation: 'joesonghande, jal mot aradeureosseoyo', helper: 'joe-song-han-de, jal mot a-ra-deu-reo-sseo-yo', meaning: '不好意思，我聽不懂', usage: '聽不懂對方說什麼時', keywords: ['알아들', 'aradeul', '못 알아들', 'joesonghande'] }),
  makeSentence({ id: 207, language: lang, category: cat, target: '한 번 더 말씀해 주세요.', pronunciation: 'han beon deo malsseumhae juseyo', helper: 'han beon deo mal-sseum-hae ju-se-yo', meaning: '請再說一次', usage: '沒聽清楚，請對方重複', keywords: ['한 번 더', 'han beon deo', 'again', 'malsseumhae'] }),
  makeSentence({ id: 208, language: lang, category: cat, target: '다시 한번 말해 주세요.', pronunciation: 'dasi hanbeon malhae juseyo', helper: 'da-si han-beon mal-hae ju-se-yo', meaning: '請再說一遍', usage: '請對方重複剛才的話', keywords: ['다시', 'dasi', '한번', 'malhae'] }),
  makeSentence({ id: 209, language: lang, category: cat, target: '이게 무슨 뜻이에요?', pronunciation: 'ige museun tteusieyo?', helper: 'i-ge mu-seun tteu-si-e-yo', meaning: '這是什麼意思？', usage: '聽到不懂的單字或句子時', keywords: ['무슨 뜻', 'museun tteut', 'meaning', 'ige'] }),
  makeSentence({ id: 210, language: lang, category: cat, target: '적어 주실 수 있어요?', pronunciation: 'jeogeo jusil su isseoyo?', helper: 'jeo-geo ju-sil su i-sseo-yo', meaning: '可以寫下來嗎？', usage: '語言不通時請對方寫字', keywords: ['적어', 'jeogeo', 'write', 'jusil'] }),
  makeSentence({ id: 211, language: lang, category: cat, target: '처음 왔어요.', pronunciation: 'cheoeum wasseoyo', helper: 'cheo-eum wa-sseo-yo', meaning: '我是第一次來', usage: '聊天時說明自己是新手旅客', keywords: ['처음', 'cheoeum', 'first time', 'wasseoyo'] }),
  makeSentence({ id: 212, language: lang, category: cat, target: '관광하러 왔어요.', pronunciation: 'gwanggwanghareo wasseoyo', helper: 'gwang-gwang-ha-reo wa-sseo-yo', meaning: '我是來觀光的', usage: '說明來韓國的目的', keywords: ['관광', 'gwanggwang', 'tourism', 'wasseoyo'] }),
  makeSentence({ id: 213, language: lang, category: cat, target: '감사합니다.', pronunciation: 'gamsahamnida', helper: 'gam-sa-ham-ni-da', meaning: '謝謝', usage: '日常感謝最常用', keywords: ['감사', 'gamsa', 'gamsahamnida', 'thanks'] }),
  makeSentence({ id: 214, language: lang, category: cat, target: '정말 감사합니다.', pronunciation: 'jeongmal gamsahamnida', helper: 'jeong-mal gam-sa-ham-ni-da', meaning: '非常謝謝您', usage: '對方幫了大忙時', keywords: ['정말', 'jeongmal', 'gamsahamnida'] }),
  makeSentence({ id: 215, language: lang, category: cat, target: '실례합니다.', pronunciation: 'sillyehamnida', helper: 'sil-lye-ham-ni-da', meaning: '不好意思／借過', usage: '搭話前或輕微打擾別人時', keywords: ['실례', 'sillye', 'sillyehamnida', 'excuse me'] }),
  makeSentence({ id: 216, language: lang, category: cat, target: '죄송합니다.', pronunciation: 'joesonghamnida', helper: 'joe-song-ham-ni-da', meaning: '對不起', usage: '不小心碰到人或做錯事時', keywords: ['죄송', 'joesong', 'joesonghamnida', 'sorry'] }),
  makeSentence({ id: 217, language: lang, category: cat, target: '중국어 하실 수 있어요?', pronunciation: 'junggugeo hasil su isseoyo?', helper: 'jung-gu-geo ha-sil su i-sseo-yo', meaning: '您會說中文嗎？', usage: '韓文溝通困難時試著找中文', keywords: ['중국어', 'junggugeo', 'chinese', 'hasil'] }),
  makeSentence({ id: 218, language: lang, category: cat, target: '안녕히 가세요, 또 봐요.', pronunciation: 'annyeonghi gaseyo, tto bwayo', helper: 'an-nyeong-hi ga-se-yo, tto bwa-yo', meaning: '再見，下次見', usage: '結束對話、離開時', keywords: ['안녕히', 'annyeonghi', '또 봐요', 'gaseyo'] }),
]
