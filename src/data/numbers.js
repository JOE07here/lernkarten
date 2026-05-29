// German numbers 0–1000, generated from rules (not a 1000-entry table).
// The point of these helpers is to TEACH composition: numberParts() splits a
// number into the word-parts you'd say, e.g. 16 -> ['sech','zehn'],
// 21 -> ['ein','und','zwanzig'], 347 -> ['drei','hundert','sieben','und','vierzig'].

// 0–12 are said as whole words.
const STANDALONE = [
  'null', 'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben',
  'acht', 'neun', 'zehn', 'elf', 'zwölf',
]

// 13–19 are stem + "zehn" (note sechs->sech, sieben->sieb).
const TEEN_STEM = {
  13: 'drei', 14: 'vier', 15: 'fünf', 16: 'sech', 17: 'sieb', 18: 'acht', 19: 'neun',
}

// Round tens (note dreißig with ß, sech/sieb again).
const TENS = {
  20: 'zwanzig', 30: 'dreißig', 40: 'vierzig', 50: 'fünfzig',
  60: 'sechzig', 70: 'siebzig', 80: 'achtzig', 90: 'neunzig',
}

// The unit said before "und" in 21–99 ("eins" becomes "ein").
const UNIT_COMPOUND = ['', 'ein', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun']

function twoDigitParts(n) {
  if (n <= 12) return [STANDALONE[n]]
  if (n < 20) return [TEEN_STEM[n], 'zehn']
  const t = Math.floor(n / 10) * 10
  const o = n % 10
  if (o === 0) return [TENS[t]]
  return [UNIT_COMPOUND[o], 'und', TENS[t]]
}

// Split a number 0–1000 into its spoken word-parts.
export function numberParts(n) {
  if (n === 0) return ['null']
  if (n === 1000) return ['ein', 'tausend']
  const parts = []
  const h = Math.floor(n / 100)
  const rem = n % 100
  if (h > 0) {
    parts.push(h === 1 ? 'ein' : STANDALONE[h])
    parts.push('hundert')
  }
  if (rem > 0) parts.push(...twoDigitParts(rem))
  return parts
}

// The full German spelling, e.g. germanNumber(347) === 'dreihundertsiebenundvierzig'.
export function germanNumber(n) {
  return numberParts(n).join('')
}

// Curated reference rows for the "Lernen" tab.
export const referenceGroups = [
  { title: '0 – 12', numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  { title: 'Teens (13–19) = stem + zehn', numbers: [13, 14, 15, 16, 17, 18, 19] },
  { title: 'Tens (20–90)', numbers: [20, 30, 40, 50, 60, 70, 80, 90] },
  { title: 'Compound (unit + und + ten)', numbers: [21, 32, 45, 67, 89, 99] },
  { title: 'Hundreds & thousand', numbers: [100, 200, 500, 347, 1000] },
]

// All numbers that show an interesting composition, for the games.
export const quizPool = (() => {
  const pool = []
  for (let i = 0; i <= 100; i++) pool.push(i)
  for (const n of [110, 121, 234, 347, 456, 500, 678, 789, 999, 1000]) pool.push(n)
  return pool
})()

// Numbers worth building (skip trivial 0–12 single tiles most of the time).
export const buildPool = (() => {
  const pool = []
  for (let i = 13; i <= 99; i++) pool.push(i) // teens + compounds: the tricky bit
  for (const n of [100, 121, 234, 347, 500, 678, 999]) pool.push(n)
  return pool
})()

// Distractor word-parts for the build game.
export const PART_BANK = [
  'eins', 'zwei', 'drei', 'vier', 'fünf', 'sechs', 'sieben', 'acht', 'neun',
  'ein', 'und', 'zehn', 'elf', 'zwölf',
  'zwanzig', 'dreißig', 'vierzig', 'fünfzig', 'sechzig', 'siebzig', 'achtzig', 'neunzig',
  'sech', 'sieb', 'hundert', 'tausend',
]

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
