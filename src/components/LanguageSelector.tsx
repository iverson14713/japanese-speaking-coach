import { useEffect, useState } from 'react'
import type { Language } from '../data/types'
import { LANGUAGE_LABELS } from '../data/types'

interface LanguageSelectorProps {
  selected: Language
  onSelect: (language: Language) => void
  variant?: 'default' | 'coach'
}

const LANGUAGE_OPTIONS: { value: Language; label: string; flag: string }[] = [
  { value: 'en', label: '英文', flag: '🇺🇸' },
  { value: 'ja', label: '日文', flag: '🇯🇵' },
  { value: 'ko', label: '韓文', flag: '🇰🇷' },
]

export function LanguageSelector({ selected, onSelect, variant = 'default' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (lang: Language) => {
    onSelect(lang)
    setIsOpen(false)
  }

  return (
    <div className={`language-picker${variant === 'coach' ? ' language-picker--coach' : ''}`}>
      <button
        type="button"
        className="language-picker-trigger"
        onClick={() => setIsOpen(true)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="language-picker-trigger__icon" aria-hidden="true">
          🌐
        </span>
        <span className="language-picker-trigger__label">
          目前學習：{LANGUAGE_LABELS[selected]}
        </span>
        <span className="language-picker-trigger__chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="language-sheet-backdrop"
            aria-label="關閉語言選單"
            onClick={() => setIsOpen(false)}
          />
          <div className="language-sheet" role="listbox" aria-label="選擇學習語言">
            <p className="language-sheet-title">選擇學習語言</p>
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected === option.value}
                className={`language-sheet-option${selected === option.value ? ' active' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="language-sheet-flag">{option.flag}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
