import { AI_COACH_HUB_ITEMS, type AiCoachHubItemId } from '../../data/aiCoachHub'
import {
  SPEAKING_CHALLENGES,
  type SpeakingChallengeId,
} from '../../data/speakingChallenges'
import { CoachHubCard } from './CoachHubCard'

interface CoachHubViewProps {
  onEnterAiPractice: () => void
  onStartChallenge: (challengeId: SpeakingChallengeId) => void
}

export function CoachHubView({ onEnterAiPractice, onStartChallenge }: CoachHubViewProps) {
  const handleAiItemClick = (itemId: AiCoachHubItemId) => {
    if (itemId === 'live-practice') {
      onEnterAiPractice()
    }
  }

  const handleChallengeClick = (challengeId: SpeakingChallengeId) => {
    if (challengeId === 'quick-speak' || challengeId === 'translation') {
      onStartChallenge(challengeId)
    }
  }

  return (
    <main className="coach-hub">
      <section className="coach-hub__section" aria-labelledby="coach-hub-ai-title">
        <h2 id="coach-hub-ai-title" className="coach-hub__section-title">
          AI 教練
        </h2>
        <div className="coach-hub__cards">
          {AI_COACH_HUB_ITEMS.map((item) => (
            <CoachHubCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              status={item.status}
              onClick={() => handleAiItemClick(item.id)}
            />
          ))}
        </div>
      </section>

      <section className="coach-hub__section" aria-labelledby="coach-hub-challenge-title">
        <h2 id="coach-hub-challenge-title" className="coach-hub__section-title">
          口說挑戰
        </h2>
        <div className="coach-hub__cards">
          {SPEAKING_CHALLENGES.map((challenge) => (
            <CoachHubCard
              key={challenge.id}
              title={challenge.title}
              subtitle={challenge.subtitle}
              icon={challenge.icon}
              status={challenge.status}
              onClick={() => handleChallengeClick(challenge.id)}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
