import {
  STREAK_FREEZE_USED_MESSAGE,
  STREAK_MILESTONE_MESSAGES,
  STREAK_MILESTONE_MODAL_DAYS,
  STREAK_RESET_MESSAGE,
  type StreakMilestoneDay,
} from '../constants/streakConfig'
import type { PracticeCompletionResult } from './dailyPracticeStorage'
import { showToast } from './toast'

export interface PracticeCompletionFeedbackHandlers {
  onMilestoneModal?: (milestone: StreakMilestoneDay) => void
}

export function showPracticeCompletionFeedback(
  result: PracticeCompletionResult,
  handlers: PracticeCompletionFeedbackHandlers = {},
): void {
  if (!result.isNewCompletion) {
    return
  }

  if (result.freezeCardUsed) {
    showToast(STREAK_FREEZE_USED_MESSAGE, 3200)
  } else if (result.streakReset) {
    showToast(STREAK_RESET_MESSAGE, 3200)
  }

  for (const milestone of result.newMilestones) {
    const message = STREAK_MILESTONE_MESSAGES[milestone]
    if (STREAK_MILESTONE_MODAL_DAYS.has(milestone)) {
      handlers.onMilestoneModal?.(milestone)
      continue
    }
    showToast(message, milestone === 10 ? 3600 : 3000)
  }
}
