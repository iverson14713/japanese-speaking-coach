interface DialogueTabIconProps {
  className?: string
}

/** map.fill — bold folded map for travel scenarios */
export function DialogueTabIcon({ className }: DialogueTabIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.75 4.25A2.5 2.5 0 0 1 7.25 1.75H9.5L12 4.35 14.5 1.75h2.25A2.5 2.5 0 0 1 19.25 4.25V19l-7.25-3.35L4.75 19V4.25Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.38"
        d="M12 4.35V19l7.25 3.35V4.25L14.5 1.75 12 4.35Z"
      />
    </svg>
  )
}
