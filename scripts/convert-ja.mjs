import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load legacy sentences via tsx-compatible dynamic require won't work; parse via eval sandbox
const legacyPath = join(__dirname, '../src/data/sentencesLegacy.ts')
const legacyContent = readFileSync(legacyPath, 'utf8')
const arrayStart = legacyContent.indexOf('export const sentences: Sentence[] = [')
const arrayEnd = legacyContent.lastIndexOf(']\n\nexport function getSentencesByCategory')
const arrayBody = legacyContent.slice(arrayStart + 'export const sentences: Sentence[] = '.length, arrayEnd + 1)

// eslint-disable-next-line no-eval
const legacySentences = eval(arrayBody)

const converted = legacySentences.map((s) => ({
  id: s.id,
  language: 'ja',
  category: s.category,
  targetText: s.japanese,
  helperText: s.kana,
  pronunciation: s.romaji,
  meaningZh: s.meaningZh,
  usageNoteZh: s.usageNoteZh,
  wordBreakdown: s.wordBreakdown,
  phraseChunks: s.phraseChunks.map((c) => ({
    text: c.japanese,
    pronunciation: c.romaji,
    chinese: c.chinese,
  })),
  keywords: s.keywords,
}))

const output = `import type { Sentence } from '../types'

export const japaneseSentences: Sentence[] = ${JSON.stringify(converted, null, 2)}
`

writeFileSync(join(__dirname, '../src/data/sentences/ja.ts'), output)
console.log(`Converted ${converted.length} Japanese sentences`)
