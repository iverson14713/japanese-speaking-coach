import { AI_COACH_HUB_ITEMS, type AiCoachHubItemId } from '../../data/aiCoachHub'
import {
  SPEAKING_CHALLENGES,
  type SpeakingChallengeId,
} from '../../data/speakingChallenges'
import type { ProUpgradeReason } from '../../context/ProUpgradeContext'
import { ProFeatureCard } from '../pro/ProFeatureCard'
import { ProTeaserCard } from '../pro/ProTeaserCard'
import { CoachHubCard } from './CoachHubCard'

interface CoachHubViewProps {
  isPro: boolean
  onEnterAiPractice: () => void
  onStartChallenge: (challengeId: SpeakingChallengeId) => void
  onOpenProUpgrade: (reason?: ProUpgradeReason) => void
  onOpenWeaknessAnalysis: () => void
  onOpenFavoriteReview: () => void
}

const PRO_LOCKED_CHALLENGES = new Set<SpeakingChallengeId>(['translation'])

export function CoachHubView({
  isPro,
  onEnterAiPractice,
  onStartChallenge,
  onOpenProUpgrade,
  onOpenWeaknessAnalysis,
  onOpenFavoriteReview,
}: CoachHubViewProps) {
  const handleAiItemClick = (itemId: AiCoachHubItemId) => {
    if (itemId === 'live-practice') {
      onEnterAiPractice()
    }
  }

  const handleChallengeClick = (challengeId: SpeakingChallengeId) => {
    const challenge = SPEAKING_CHALLENGES.find((item) => item.id === challengeId)
    if (!challenge || challenge.status === 'coming-soon') {
      return
    }
    if (!isPro && PRO_LOCKED_CHALLENGES.has(challengeId)) {
      onOpenProUpgrade('advanced-challenge')
      return
    }
    if (challengeId === 'quick-speak' || challengeId === 'translation') {
      onStartChallenge(challengeId)
    }
  }

  return (
    <main className="coach-hub">
      {!isPro ? <ProTeaserCard onUpgrade={() => onOpenProUpgrade('pro-feature')} /> : null}

      <section className="coach-hub__section" aria-labelledby="coach-hub-pro-title">
        <h2 id="coach-hub-pro-title" className="coach-hub__section-title">
          Pro 功能
        </h2>
        <div className="coach-hub__cards coach-hub__cards--pro">
          <ProFeatureCard
            title="今日弱點分析"
            subtitle="AI 幫你整理今天常錯的句子"
            icon="📊"
            locked={!isPro}
            onClick={() => (isPro ? onOpenWeaknessAnalysis() : onOpenProUpgrade('weakness-analysis'))}
          />
          <ProFeatureCard
            title="收藏句 AI 複習"
            subtitle="從收藏句產生 5 題口說複習"
            icon="♥"
            locked={!isPro}
            onClick={() => (isPro ? onOpenFavoriteReview() : onOpenProUpgrade('favorite-review'))}
          />
        </div>
      </section>

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
          {SPEAKING_CHALLENGES.map((challenge) => {
            const status =
              challenge.status === 'coming-soon'
                ? 'coming-soon'
                : !isPro && PRO_LOCKED_CHALLENGES.has(challenge.id)
                  ? 'pro-locked'
                  : 'available'

            return (
              <CoachHubCard
                key={challenge.id}
                title={challenge.title}
                subtitle={challenge.subtitle}
                icon={challenge.icon}
                status={status}
                onClick={() => handleChallengeClick(challenge.id)}
              />
            )
          })}
        </div>
      </section>
    </main>
  )
}
