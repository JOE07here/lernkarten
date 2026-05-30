// German articles trainer data.
// Gender is the hard part of German nouns, so the practice focuses on picking
// der / die / das. We also derive the indefinite (ein/eine) and negative
// (kein/keine) forms, and support the one case change A1 needs: accusative,
// where only the masculine article changes (der → den, ein → einen).

// Balanced common A1 nouns (12 der · 12 die · 12 das). `pl` = plural (always "die").
export const articleNouns = [
  // --- der (masculine) ---
  { de: 'Mann', gender: 'der', en: 'man', pl: 'Männer' },
  { de: 'Tag', gender: 'der', en: 'day', pl: 'Tage' },
  { de: 'Apfel', gender: 'der', en: 'apple', pl: 'Äpfel' },
  { de: 'Tisch', gender: 'der', en: 'table', pl: 'Tische' },
  { de: 'Hund', gender: 'der', en: 'dog', pl: 'Hunde' },
  { de: 'Garten', gender: 'der', en: 'garden', pl: 'Gärten' },
  { de: 'Ball', gender: 'der', en: 'ball', pl: 'Bälle' },
  { de: 'Kaffee', gender: 'der', en: 'coffee', pl: 'Kaffees' },
  { de: 'Computer', gender: 'der', en: 'computer', pl: 'Computer' },
  { de: 'Wein', gender: 'der', en: 'wine', pl: 'Weine' },
  { de: 'Baum', gender: 'der', en: 'tree', pl: 'Bäume' },
  { de: 'Stuhl', gender: 'der', en: 'chair', pl: 'Stühle' },
  // --- die (feminine) ---
  { de: 'Frau', gender: 'die', en: 'woman', pl: 'Frauen' },
  { de: 'Schule', gender: 'die', en: 'school', pl: 'Schulen' },
  { de: 'Nacht', gender: 'die', en: 'night', pl: 'Nächte' },
  { de: 'Katze', gender: 'die', en: 'cat', pl: 'Katzen' },
  { de: 'Hand', gender: 'die', en: 'hand', pl: 'Hände' },
  { de: 'Lampe', gender: 'die', en: 'lamp', pl: 'Lampen' },
  { de: 'Tür', gender: 'die', en: 'door', pl: 'Türen' },
  { de: 'Stadt', gender: 'die', en: 'city', pl: 'Städte' },
  { de: 'Blume', gender: 'die', en: 'flower', pl: 'Blumen' },
  { de: 'Milch', gender: 'die', en: 'milk', pl: '—' },
  { de: 'Zeitung', gender: 'die', en: 'newspaper', pl: 'Zeitungen' },
  { de: 'Familie', gender: 'die', en: 'family', pl: 'Familien' },
  // --- das (neuter) ---
  { de: 'Haus', gender: 'das', en: 'house', pl: 'Häuser' },
  { de: 'Kind', gender: 'das', en: 'child', pl: 'Kinder' },
  { de: 'Wasser', gender: 'das', en: 'water', pl: '—' },
  { de: 'Brot', gender: 'das', en: 'bread', pl: 'Brote' },
  { de: 'Buch', gender: 'das', en: 'book', pl: 'Bücher' },
  { de: 'Auto', gender: 'das', en: 'car', pl: 'Autos' },
  { de: 'Bett', gender: 'das', en: 'bed', pl: 'Betten' },
  { de: 'Fenster', gender: 'das', en: 'window', pl: 'Fenster' },
  { de: 'Ei', gender: 'das', en: 'egg', pl: 'Eier' },
  { de: 'Bier', gender: 'das', en: 'beer', pl: 'Biere' },
  { de: 'Mädchen', gender: 'das', en: 'girl', pl: 'Mädchen' },
  { de: 'Telefon', gender: 'das', en: 'telephone', pl: 'Telefone' },
]

export const genders = ['der', 'die', 'das']

// Article forms by case. Practice tests gender; the label shown reflects the case.
export const definite = {
  nom: { der: 'der', die: 'die', das: 'das', plural: 'die' },
  akk: { der: 'den', die: 'die', das: 'das', plural: 'die' },
}
export const indefinite = {
  nom: { der: 'ein', die: 'eine', das: 'ein' },
  akk: { der: 'einen', die: 'eine', das: 'ein' },
}
export const negative = {
  nom: { der: 'kein', die: 'keine', das: 'kein', plural: 'keine' },
  akk: { der: 'keinen', die: 'keine', das: 'kein', plural: 'keine' },
}

// Reference tables for the "Tabelle" tab.
export const tables = [
  {
    title: 'Definite article — “the”',
    head: ['', 'der (m)', 'die (f)', 'das (n)', 'die (pl)'],
    rows: [
      ['Nominative', 'der', 'die', 'das', 'die'],
      ['Accusative', 'den', 'die', 'das', 'die'],
    ],
  },
  {
    title: 'Indefinite article — “a / an”',
    head: ['', 'm', 'f', 'n', 'pl'],
    rows: [
      ['Nominative', 'ein', 'eine', 'ein', '—'],
      ['Accusative', 'einen', 'eine', 'ein', '—'],
    ],
  },
  {
    title: 'Negative article — “no / not a”',
    head: ['', 'm', 'f', 'n', 'pl'],
    rows: [
      ['Nominative', 'kein', 'keine', 'kein', 'keine'],
      ['Accusative', 'keinen', 'keine', 'kein', 'keine'],
    ],
  },
]

// Gender-guessing patterns (guides, not absolute rules).
export const genderHints = [
  { g: 'der', color: 'text-blue-500 dark:text-blue-400', items: 'male people · days, months, seasons · weather (der Regen) · most -er, -ling, -ismus' },
  { g: 'die', color: 'text-rose-500 dark:text-rose-400', items: 'female people · most nouns ending -e · -ung, -heit, -keit, -schaft, -ion, -tät, -ie' },
  { g: 'das', color: 'text-emerald-500 dark:text-emerald-400', items: 'diminutives -chen & -lein (das Mädchen!) · -ment, -um, -o (das Auto) · most young beings (das Kind)' },
]

export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
