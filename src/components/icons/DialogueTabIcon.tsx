interface DialogueTabIconProps {
  className?: string
}

export function DialogueTabIcon({ className }: DialogueTabIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.25 9.75a2.75 2.75 0 1 1 5.5 0c0 2.05-2.75 5.25-2.75 5.25S9.25 11.8 9.25 9.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.75" r="0.95" fill="currentColor" />
      <path
        d="M15.25 4.75h4.25a1.35 1.35 0 0 1 1.35 1.35v3.65a1.35 1.35 0 0 1-1.35 1.35h-1.1l-1.2 1.35v-1.35h-1.3a1.35 1.35 0 0 1-1.35-1.35V6.1a1.35 1.35 0 0 1 1.35-1.35Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M16.6 7.85h3.55M16.6 9.55h2.4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  )
}
