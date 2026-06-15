import { useState } from 'react'
import type { WordBreakdown as WordBreakdownType } from '../data/sentences'

interface WordBreakdownProps {
  words: WordBreakdownType[]
}

export function WordBreakdown({ words }: WordBreakdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="collapsible-section word-breakdown" aria-label="單字拆解">
      <button
        type="button"
        className="collapsible-header"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>單字拆解</span>
        <span className="collapsible-chevron" aria-hidden="true">
          {isOpen ? '▴' : '▾'}
        </span>
      </button>
      {isOpen && (
        <ul className="word-list">
          {words.map((item) => (
            <li key={item.word} className="word-item">
              <span className="word-jp">{item.word}</span>
              <span className="word-separator">：</span>
              <span className="word-meaning">{item.meaning}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
