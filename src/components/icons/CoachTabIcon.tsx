interface TabIconProps {
  className?: string
}

export function CoachTabIcon({ className }: TabIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.5 4.75A3.25 3.25 0 0 0 3.25 8v5.25A3.25 3.25 0 0 0 6.5 16.5h.55l1.35 2.7a.9.9 0 0 0 1.61-.2l.24-.75H14.2l.24.75a.9.9 0 0 0 1.61.2l1.35-2.7h.55a3.25 3.25 0 0 0 3.25-3.25V8A3.25 3.25 0 0 0 17.5 4.75h-11Z"
      />
    </svg>
  )
}
