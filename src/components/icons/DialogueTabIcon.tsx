interface DialogueTabIconProps {
  className?: string
}

/** Colorful travel map + route + location pin */
export function DialogueTabIcon({ className }: DialogueTabIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="#FFE9A8"
        stroke="#E8D49A"
        strokeWidth="0.45"
        d="M4.25 8 12 5.25v13.75L4.25 20.5V8Z"
      />
      <path
        fill="#B8DEB8"
        stroke="#93C193"
        strokeWidth="0.45"
        d="M12 5.25 19.75 8v12.5L12 19V5.25Z"
      />
      <path
        stroke="#4A9AE8"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.1 10.75h2.15l1.05 1.45 2.85-3.1"
      />
      <path
        fill="#F06848"
        d="M12 2.35c1.72 0 3.1 1.38 3.1 3.1 0 2.2-3.1 5.55-3.1 5.55S8.9 7.65 8.9 5.45c0-1.72 1.38-3.1 3.1-3.1Z"
      />
      <circle cx="12" cy="5.45" r="1.05" fill="#fff" />
    </svg>
  )
}
