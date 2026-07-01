/** 回答時間（秒）。未來可依難度切換：新手 8 / 一般 5 / 挑戰 3 */
export const QUICK_SPEAK_ANSWER_TIME_SECONDS = 5

export const QUICK_SPEAK_DIFFICULTY_ANSWER_SECONDS = {
  beginner: 8,
  normal: 5,
  challenge: 3,
} as const

export type QuickSpeakDifficulty = keyof typeof QUICK_SPEAK_DIFFICULTY_ANSWER_SECONDS

export function getQuickSpeakAnswerTimeSeconds(
  difficulty: QuickSpeakDifficulty = 'normal',
): number {
  return QUICK_SPEAK_DIFFICULTY_ANSWER_SECONDS[difficulty]
}
