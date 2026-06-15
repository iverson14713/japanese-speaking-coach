import type { Sentence } from '../data/sentences'

interface SentenceCardProps {
  sentence: Sentence
}

export function SentenceCard({ sentence }: SentenceCardProps) {
  return (
    <section className="sentence-card" aria-label="今日句子">
      <p className="sentence-label">今日句子</p>
      <p className="sentence-japanese">{sentence.japanese}</p>
      <p className="sentence-kana">{sentence.kana}</p>
      <p className="sentence-romaji">{sentence.romaji}</p>
      <p className="sentence-chinese">{sentence.chinese}</p>
    </section>
  )
}
