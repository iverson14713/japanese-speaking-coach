import { useProEntitlement } from '../hooks/useProEntitlement'
import { useStreakMilestone } from '../context/StreakMilestoneContext'
import type { Language } from '../data/types'
import {
  recordValidPracticeCompletion,
  type PracticeCompletionResult,
} from '../utils/dailyPracticeStorage'
import { showPracticeCompletionFeedback } from '../utils/practiceCompletionFeedback'

export function useRecordPracticeCompletion(language: Language) {
  const { isPro } = useProEntitlement()
  const { showMilestone } = useStreakMilestone()

  return (options?: { silent?: boolean }): PracticeCompletionResult => {
    const result = recordValidPracticeCompletion(language, { isPro })

    if (!options?.silent) {
      showPracticeCompletionFeedback(result, {
        onMilestoneModal: showMilestone,
      })
    }

    return result
  }
}
