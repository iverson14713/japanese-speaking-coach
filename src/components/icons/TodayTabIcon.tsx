interface TabIconProps {
  className?: string
}

export function TodayTabIcon({ className }: TabIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.2 2.15c.35.55.82 1.08 1.35 1.65 1.55 1.7 3.45 3.8 3.45 6.95a5.25 5.25 0 1 1-9.6 0c0-3.15 1.9-5.25 3.45-6.95.53-.57 1-1.1 1.35-1.65.34-.53 1.06-.53 1.4 0Z"
      />
      <path
        fill="currentColor"
        fillOpacity="0.45"
        d="M12 11.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5Z"
      />
    </svg>
  )
}
