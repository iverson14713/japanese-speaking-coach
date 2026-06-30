interface TabIconProps {
  className?: string
}

/** map.fill — bold folded travel map */
export function DialogueTabIcon({ className }: TabIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.25 3.75A2.25 2.25 0 0 1 7.5 1.5h1.9L12 4.1l2.6-2.6h1.9A2.25 2.25 0 0 1 18.75 3.75V19.5l-6.75-3.15L5.25 19.5V3.75Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.34"
        d="M12 4.1v15.25l6.75 3.15V3.75L14.6 1.5 12 4.1Z"
      />
    </svg>
  )
}
