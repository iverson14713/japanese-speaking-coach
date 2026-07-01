export type CoachOpenIntent =
  | 'translation-challenge'
  | {
      type: 'scenario-roleplay'
      scenarioTitle: string
      scenarioPrompt: string
    }
  | null
