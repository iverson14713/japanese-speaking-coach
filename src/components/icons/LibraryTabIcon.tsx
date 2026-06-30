interface TabIconProps {
  className?: string
}

export function LibraryTabIcon({ className }: TabIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.25 3.5A2.25 2.25 0 0 0 4 5.75v14.5c0 .97.78 1.75 1.75 1.75h.5A2.25 2.25 0 0 0 9.5 19.75V5.75A2.25 2.25 0 0 0 7.25 3.5h-1Z"
      />
      <path
        fill="currentColor"
        d="M11.25 3.5A2.25 2.25 0 0 0 9 5.75v14c0 .97.78 1.75 1.75 1.75h.5A2.25 2.25 0 0 0 14.5 19.5V5.75A2.25 2.25 0 0 0 12.25 3.5h-1Z"
      />
      <path
        fill="currentColor"
        d="M16.25 3.5A2.25 2.25 0 0 0 14 5.75V19.5c0 .97.78 1.75 1.75 1.75h.5A2.25 2.25 0 0 0 19.5 17V5.75A2.25 2.25 0 0 0 17.25 3.5h-1Z"
      />
    </svg>
  )
}
