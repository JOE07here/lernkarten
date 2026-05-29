// German numbers, generated from rules (not big lookup tables).
// Helpers teach composition: numberParts() splits a number into spoken parts,
// e.g. 16 -> ['sech','zehn'], 21 -> ['ein','und','zwanzig'].

const STANDALONE = [
  'null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben',
  'acht', 'neun', 'zehn', 'elf', 'zwölf',
]
const TEEN_STEM = {
  13: 'drei', 14: 'vier', 15: 'fünf', 16: 'sech', 17: 'sieb', 18: 'acht', 19: 'neun',
}
const TENS = {
  20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig',
  60: 'sechzig', 70: 'siebzig', 80: 'achtzig', 90: 'neunzig',
}
const UNIT_COMPOUND = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun']

function partsUnder100(n) {
  if (n <= 12) return [STANDALONE[n]]
  if (n < 20) return [TEEN_STEM[n], 'zehn']
  const t = Math.floor(n / 10) * 10
  const o = n % 10
  if (o === 0) return [TENS[t]]
  return [UNIT_COMPOUND[o], 'und', TENS[t]]
}

function partsUnder1000(n) {
  const parts = []
  const h = Math.floor(n / 100)
  const rem = n % 100
  if (h > 0) {
    parts.push(h === 1 ? 'ein' : STANDALONE[h])
    parts.push('hundert')
  }
  if (rem > 0) parts.push(...partsUnder100(rem))
  return parts
}

// Spoken word-parts for 0–1000 (used by the build game + breakdown UI).
export function numberParts(n) {
  if (n === 0) return ['null']
  if (n === 1000) return ['ein', 'tausend']
  return partsUnder1000(n)
}

function under1000Word(n) {
  return n === 0 ? '' : partsUnder1000(n).join('')
}

// Full German spelling for 0–1,000,000.
export function germanNumber(n) {
  if (n === 0) return 'null'
  if (n >= 1000000) return 'eine Million'
  let words = ''
  const thousands = Math.floor(n / 1000)
  const rest = n % 1000
  if (thousands > 0) {
    words += (thousands === 1 ? 'ein' : under1000Word(thousands)) + 'tausend'
  }
  if (rest > 0) words += under1000Word(rest)
  return words
}

// Years are read specially for 1100–1999: "[hundreds]hundert[rest]".
// e.g. 1990 -> neunzehnhundertneunzig, 1864 -> achtzehnhundertvierundsechzig.
// 2000+ are read normally (zweitausendvierundzwanzig).
export function germanYear(y) {
  if (y >= 1100 && y <= 1999) {
    const h = Math.floor(y / 100)
    const rest = y % 100
    return (
      partsUnder100(h).join('') +
      'hundert' +
      (rest > 0 ? partsUnder100(rest).join('') : '')
    )
  }
  return germanNumber(y)
}

// Ordinal numbers (1. = erste …). 1–19 add -te, 20+ add -ste, with irregulars.
const ORDINAL_IRREGULAR = { 1: 'erste', 3: 'dritte', 7: 'siebte', 8: 'achte' }
export function germanOrdinal(n) {
  if (ORDINAL_IRREGULAR[n]) return ORDINAL_IRREGULAR[n]
  const base = germanNumber(n)
  return n < 20 ? base + 'te' : base + 'ste'
}

export const ordinalReference = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 19, 20, 21, 30, 100]

// Short "how German numbers work" tips for the Lernen tab.
export const numberTips = [
  { title: 'Teens (13–19)', text: 'stem + zehn. Watch sechs → sech, sieben → sieb: sechzehn, siebzehn.' },
  { title: 'Tens (20–90)', text: 'end in -zig — except 30 = dreißig, which ends in -ßig.' },
  { title: 'Reversed order', text: 'Germans say "one-and-twenty": 21 = einundzwanzig (unit + und + ten).' },
  { title: '“eins” → “ein”', text: 'inside bigger numbers eins loses the -s: einundzwanzig, einhundert, eintausend.' },
  { title: 'Years (1100–1999)', text: 'say the hundreds: 1990 = neunzehnhundertneunzig.' },
]

export const referenceGroups = [
  { title: '0 – 12', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { title: 'Teens (13–19) = stem + zehn', numbers: [13, 14, 15, 16, 17, 18, 19] },
  { title: 'Tens (20–90)', numbers: [20, 30, 40, 50, 60, 70, 80, 90] },
  { title: 'Compound (unit + und + ten)', numbers: [21, 32, 45, 67, 89, 99] },
  { title: 'Hundreds, thousands & more', numbers: [100, 200, 500, 1000, 100000, 1000000] },
]

export const quizPool = (() => {
  const pool = []
  for (let i = 0; i <= 100; i++) pool.push(i)
  for (const n of [110, 121, 234, 347, 456, 500, 678, 789, 999, 1000]) pool.push(n)
  return pool
})()

export const buildPool = (() => {
  const pool = []
  for (let i = 13; i <= 99; i++) pool.push(i)
  for (const n of [100, 121, 234, 347, 500, 678, 999]) pool.push(n)
  return pool
})()

export const PART_BANK = [
  'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun',
  'ein', 'und', 'zehn', 'elf', 'zwölf',
  'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig',
  'sech', 'sieb', 'hundert', 'tausend',
]

// Emoji used by the count-the-objects practice game.
export const countEmojis = ['🍎', '⭐', '🐱', '🚗', '🌸', '🎈', '🐶', '🍪', '⚽', '🌳', '🦆', '🍩']

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
