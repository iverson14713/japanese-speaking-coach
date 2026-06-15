import type { WordBreakdown as WordBreakdownType } from '../data/sentences'

interface WordBreakdownProps {
  words: WordBreakdownType[]
}

export function WordBreakdown({ words }: WordBreakdownProps) {
  return (
    <section className="word-breakdown" aria-label="單字拆解">
      <h2 className="section-title">單字拆解</h2>
      <ul className="word-list">
        {words.map((item) => (
          <li key={item.word} className="word-item">
            <span className="word-jp">{item.word}</span>
            <span className="word-separator">：</span>
            <span className="word-meaning">{item.meaning}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
