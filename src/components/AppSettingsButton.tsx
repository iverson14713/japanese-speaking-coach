interface AppSettingsButtonProps {
  onClick: () => void
}

export function AppSettingsButton({ onClick }: AppSettingsButtonProps) {
  return (
    <button
      type="button"
      className="app-settings-button"
      onClick={onClick}
      aria-label="設定與關於"
    >
      ⚙️
    </button>
  )
}
