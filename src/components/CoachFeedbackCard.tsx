import type { Language } from '../data/types'
import type { CoachFeedback } from '../services/ai/types'
import { SpeakButton } from './SpeakButton'

interface CoachFeedbackCardProps {
  feedback: CoachFeedback
  language: Language
  showTranslation: boolean
}

function FeedbackSection({
  title,
  text,
  pronunciation,
  meaningZh,
  language,
  showPlay,
  showTranslation,
}: {
  title: string
  text: string
  pronunciation?: string
  meaningZh?: string
  language: Language
  showPlay: boolean
  showTranslation: boolean
}) {
  return (
    <section className="coach-feedback-section">
      <h4 className="coach-feedback-section__title">{title}</h4>
      <div className="coach-feedback-section__row">
        <p className="coach-feedback-section__text">{text}</p>
        {showPlay ? (
          <SpeakButton text={text} language={language} label={`播放 ${text}`} size="small" />
        ) : null}
      </div>
      {showTranslation && pronunciation && language !== 'en' ? (
        <p className="coach-feedback-section__pronunciation">{pronunciation}</p>
      ) : null}
      {showTranslation && meaningZh ? (
        <p className="coach-feedback-section__meaning">{meaningZh}</p>
      ) : null}
    </section>
  )
}

export function CoachFeedbackCard({ feedback, language, showTranslation }: CoachFeedbackCardProps) {
  const naturalText = feedback.naturalAlreadyGood ? '這句已經很自然' : feedback.natural

  return (
    <div className="coach-feedback-card">
      <FeedbackSection
        title="✅ 修正版"
        text={feedback.corrected}
        pronunciation={feedback.correctedPronunciation}
        meaningZh={feedback.correctedMeaningZh}
        language={language}
        showPlay
        showTranslation={showTranslation}
      />
      <FeedbackSection
        title="✨ 更自然"
        text={naturalText}
        pronunciation={feedback.naturalAlreadyGood ? undefined : feedback.naturalPronunciation}
        meaningZh={feedback.naturalAlreadyGood ? undefined : feedback.naturalMeaningZh}
        language={language}
        showPlay={!feedback.naturalAlreadyGood}
        showTranslation={showTranslation}
      />
      <section className="coach-feedback-section coach-feedback-section--tip">
        <h4 className="coach-feedback-section__title">💡 小提醒</h4>
        <p className="coach-feedback-section__tip">{feedback.tipZh}</p>
      </section>
      <FeedbackSection
        title="🗣️ 接著聊"
        text={feedback.followUp}
        pronunciation={feedback.followUpPronunciation}
        meaningZh={feedback.followUpMeaningZh}
        language={language}
        showPlay={false}
        showTranslation={showTranslation}
      />
    </div>
  )
}
