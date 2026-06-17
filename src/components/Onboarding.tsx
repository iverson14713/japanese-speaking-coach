import { useState } from 'react'

const SLIDES = [
  {
    icon: '☀️',
    title: '出國前，每天練一句',
    description: '用簡單句子累積旅行口說，英文、日文、韓文都能練。',
  },
  {
    icon: '📖',
    title: '150+ 句旅行口說',
    description: '整理機場、飯店、餐廳、交通、購物等常用場景。',
  },
  {
    icon: '💬',
    title: 'AI 教練陪你開口',
    description: '可以自由聊天，也可以模擬旅行情境，不會說時用中文問也可以。',
  },
] as const

interface OnboardingProps {
  onComplete: () => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)
  const slide = SLIDES[step]
  const isLast = step === SLIDES.length - 1

  const handleNext = () => {
    if (isLast) {
      onComplete()
      return
    }
    setStep((current) => current + 1)
  }

  return (
    <div className="onboarding" role="dialog" aria-modal="true" aria-label="首次導覽">
      <div className="onboarding__header">
        <button type="button" className="onboarding__skip" onClick={onComplete}>
          跳過
        </button>
      </div>

      <div className="onboarding__body">
        <div className="onboarding__icon" aria-hidden="true">
          {slide.icon}
        </div>
        <h2 className="onboarding__title">{slide.title}</h2>
        <p className="onboarding__description">{slide.description}</p>

        <div className="onboarding__pager" aria-hidden="true">
          {SLIDES.map((_, index) => (
            <span
              key={index}
              className={`onboarding__pager-dot${index === step ? ' active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="onboarding__footer">
        {isLast ? (
          <button type="button" className="onboarding__primary" onClick={onComplete}>
            開始練習
          </button>
        ) : (
          <button type="button" className="onboarding__primary" onClick={handleNext}>
            下一步
          </button>
        )}
      </div>
    </div>
  )
}
