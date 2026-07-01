interface DialogueTabIconProps {
  className?: string
}

/**
 * map.fill style — wide folded travel map (horizontal, not bookmark-like).
 */
export function DialogueTabIcon({ className }: DialogueTabIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.25 7.75 12 4.75l7.75 3V16.25L12 19.25 4.25 16.25V7.75Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.42"
        d="M12 4.75l7.75 3V16.25L12 19.25V4.75Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.55"
        d="M7.25 10.25h2.35l1.15 1.55 2.55-2.9"
      />
    </svg>
  )
}
