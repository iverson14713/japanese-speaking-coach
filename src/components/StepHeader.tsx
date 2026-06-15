interface StepHeaderProps {
  step: '①' | '②' | '③'
  title: string
}

export function StepHeader({ step, title }: StepHeaderProps) {
  return (
    <div className="step-header">
      <span className="step-badge">{step}</span>
      <span className="step-title">{title}</span>
    </div>
  )
}
