import { APP_NAME, LEGAL_ROUTES } from '../../constants/legal'

const LINKS = [
  { href: LEGAL_ROUTES.privacy, label: '隱私權政策' },
  { href: LEGAL_ROUTES.terms, label: '服務條款' },
  { href: LEGAL_ROUTES.support, label: '支援與聯絡' },
  { href: LEGAL_ROUTES.deleteData, label: '刪除本機資料說明' },
] as const

interface SettingsModalProps {
  open: boolean
  onClose: () => void
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="settings-modal" role="presentation" onClick={onClose}>
      <div
        className="settings-modal__card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="settings-modal__close"
          onClick={onClose}
          aria-label="關閉"
        >
          ×
        </button>

        <header className="settings-modal__header">
          <p className="settings-modal__app-name">{APP_NAME}</p>
          <p className="settings-modal__subtitle">英文・日文・韓文旅行口說都能練</p>
          <p className="settings-modal__version">v1.0</p>
        </header>

        <nav className="settings-modal__nav" aria-label="設定與關於">
          <h2 id="settings-modal-title" className="settings-modal__title">
            設定 / 關於
          </h2>
          <ul className="settings-modal__list">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a className="settings-modal__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
