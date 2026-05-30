// German A1 grammar data: present-tense verbs and sentence-order exercises.
// Verb forms are stored explicitly (not generated) so every form is correct,
// including stem-changers (fahren→fährt, sprechen→spricht) and irregulars.

export const pronouns = [
  { key: 'ich', label: 'ich', en: 'I', say: 'ich' },
  { key: 'du', label: 'du', en: 'you (sg.)', say: 'du' },
  { key: 'er', label: 'er/sie/es', en: 'he/she/it', say: 'er' },
  { key: 'wir', label: 'wir', en: 'we', say: 'wir' },
  { key: 'ihr', label: 'ihr', en: 'you (pl.)', say: 'ihr' },
  { key: 'sie', label: 'sie/Sie', en: 'they / you (formal)', say: 'sie' },
]

export const regularEndings = [
  { p: 'ich', end: '-e', ex: 'mache' },
  { p: 'du', end: '-st', ex: 'machst' },
  { p: 'er/sie/es', end: '-t', ex: 'macht' },
  { p: 'wir', end: '-en', ex: 'machen' },
  { p: 'ihr', end: '-t', ex: 'macht' },
  { p: 'sie/Sie', end: '-en', ex: 'machen' },
]

export const verbs = [
  { inf: 'machen', en: 'to do / make', type: 'regular', forms: { ich: 'mache', du: 'machst', er: 'macht', wir: 'machen', ihr: 'macht', sie: 'machen' } },
  { inf: 'wohnen', en: 'to live', type: 'regular', forms: { ich: 'wohne', du: 'wohnst', er: 'wohnt', wir: 'wohnen', ihr: 'wohnt', sie: 'wohnen' } },
  { inf: 'spielen', en: 'to play', type: 'regular', forms: { ich: 'spiele', du: 'spielst', er: 'spielt', wir: 'spielen', ihr: 'spielt', sie: 'spielen' } },
  { inf: 'lernen', en: 'to learn', type: 'regular', forms: { ich: 'lerne', du: 'lernst', er: 'lernt', wir: 'lernen', ihr: 'lernt', sie: 'lernen' } },
  { inf: 'kommen', en: 'to come', type: 'regular', forms: { ich: 'komme', du: 'kommst', er: 'kommt', wir: 'kommen', ihr: 'kommt', sie: 'kommen' } },
  { inf: 'arbeiten', en: 'to work', type: 'stem ends -t (+e)', forms: { ich: 'arbeite', du: 'arbeitest', er: 'arbeitet', wir: 'arbeiten', ihr: 'arbeitet', sie: 'arbeiten' } },
  { inf: 'heißen', en: 'to be called', type: 'stem ends -ß', forms: { ich: 'heiße', du: 'heißt', er: 'heißt', wir: 'heißen', ihr: 'heißt', sie: 'heißen' } },
  { inf: 'sein', en: 'to be', type: 'irregular', forms: { ich: 'bin', du: 'bist', er: 'ist', wir: 'sind', ihr: 'seid', sie: 'sind' } },
  { inf: 'haben', en: 'to have', type: 'irregular', forms: { ich: 'habe', du: 'hast', er: 'hat', wir: 'haben', ihr: 'habt', sie: 'haben' } },
  { inf: 'sprechen', en: 'to speak', type: 'stem e→i', forms: { ich: 'spreche', du: 'sprichst', er: 'spricht', wir: 'sprechen', ihr: 'sprecht', sie: 'sprechen' } },
  { inf: 'fahren', en: 'to drive / go', type: 'stem a→ä', forms: { ich: 'fahre', du: 'fährst', er: 'fährt', wir: 'fahren', ihr: 'fahrt', sie: 'fahren' } },
  { inf: 'lesen', en: 'to read', type: 'stem e→ie', forms: { ich: 'lese', du: 'liest', er: 'liest', wir: 'lesen', ihr: 'lest', sie: 'lesen' } },
  { inf: 'essen', en: 'to eat', type: 'stem e→i', forms: { ich: 'esse', du: 'isst', er: 'isst', wir: 'essen', ihr: 'esst', sie: 'essen' } },
  { inf: 'nehmen', en: 'to take', type: 'irregular', forms: { ich: 'nehme', du: 'nimmst', er: 'nimmt', wir: 'nehmen', ihr: 'nehmt', sie: 'nehmen' } },
  { inf: 'sehen', en: 'to see', type: 'stem e→ie', forms: { ich: 'sehe', du: 'siehst', er: 'sieht', wir: 'sehen', ihr: 'seht', sie: 'sehen' } },
  { inf: 'schlafen', en: 'to sleep', type: 'stem a→ä', forms: { ich: 'schlafe', du: 'schläfst', er: 'schläft', wir: 'schlafen', ihr: 'schlaft', sie: 'schlafen' } },
]

// Word-order rules for the Satzbau explainer.
export const wordOrderRules = [
  { rule: 'The conjugated verb is always the 2nd element in a statement.', ex: 'Ich spiele Fußball.' },
  { rule: 'Default order is Subject – Verb – Object.', ex: 'Der Mann trinkt Kaffee.' },
  { rule: 'Start with time/place? The verb stays 2nd, so the subject moves after it.', ex: 'Heute spiele ich Fußball.' },
  { rule: 'Yes/no questions put the verb first.', ex: 'Spielst du Fußball?' },
  { rule: 'W-questions: question word + verb + subject.', ex: 'Was machst du?' },
]

// Build-the-sentence exercises. `tokens` is the canonical order; `alts` are other
// acceptable orderings. A trailing ? is added for questions, otherwise a full stop.
export const sentences = [
  { id: 's1', tokens: ['Ich', 'spiele', 'Fußball'], en: 'I play football.', type: 'statement (S–V–O)' },
  { id: 's2', tokens: ['Wir', 'lernen', 'Deutsch'], en: 'We are learning German.', type: 'statement (S–V–O)' },
  { id: 's3', tokens: ['Der', 'Mann', 'trinkt', 'Kaffee'], en: 'The man drinks coffee.', type: 'statement (S–V–O)' },
  { id: 's4', tokens: ['Heute', 'spiele', 'ich', 'Fußball'], en: 'Today I play football.', type: 'time first — verb stays 2nd' },
  { id: 's5', tokens: ['Am', 'Montag', 'arbeite', 'ich'], en: 'On Monday I work.', type: 'time first — verb stays 2nd' },
  { id: 's6', tokens: ['Spielst', 'du', 'Fußball'], q: true, en: 'Do you play football?', type: 'yes/no question — verb first' },
  { id: 's7', tokens: ['Trinkst', 'du', 'Kaffee'], q: true, en: 'Do you drink coffee?', type: 'yes/no question — verb first' },
  { id: 's8', tokens: ['Was', 'machst', 'du'], q: true, en: 'What are you doing?', type: 'W-question' },
  { id: 's9', tokens: ['Woher', 'kommst', 'du'], q: true, en: 'Where are you from?', type: 'W-question' },
  { id: 's10', tokens: ['Wie', 'heißt', 'du'], q: true, en: "What's your name?", type: 'W-question' },
]
