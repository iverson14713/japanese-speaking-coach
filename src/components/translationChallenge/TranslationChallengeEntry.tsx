interface TranslationChallengeEntryProps {
  onStart: () => void
}

export function TranslationChallengeEntry({ onStart }: TranslationChallengeEntryProps) {
  return (
    <button type="button" className="translation-challenge-entry" onClick={onStart}>
      <span className="translation-challenge-entry__icon" aria-hidden="true">
        🎮
      </span>
      <span className="translation-challenge-entry__copy">
        <span className="translation-challenge-entry__title">開口翻譯挑戰</span>
        <span className="translation-challenge-entry__desc">看到中文，立刻用外語說出來</span>
      </span>
      <span className="translation-challenge-entry__chevron" aria-hidden="true">
        ›
      </span>
    </button>
  )
}
