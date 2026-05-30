// A1 grammar chapters for the hub page. Each links to the in-app trainer and
// lists a few reputable, free external resources to read more.
export const grammarTopics = [
  {
    to: '/articles',
    icon: '🏷️',
    title: 'Artikel — der / die / das',
    blurb:
      'Every German noun has a gender (m/f/n). Learn the definite, indefinite and negative articles, with patterns to guess the gender.',
    resources: [
      { label: 'Lingolia — Articles', url: 'https://deutsch.lingolia.com/en/grammar/nouns-and-articles/articles' },
      { label: 'Deutsche Welle — Grammar', url: 'https://learngerman.dw.com/en/grammar' },
      { label: 'The German Project — Nouns & gender', url: 'https://www.thegermanproject.com/german-lessons/nouns' },
    ],
  },
  {
    to: '/cases',
    icon: '🎯',
    title: 'Nominativ & Akkusativ',
    blurb:
      'The two cases you need first: subject vs direct object. The key rule — only the masculine article changes (der → den, ein → einen).',
    resources: [
      { label: 'Lingolia — Cases (Kasus)', url: 'https://deutsch.lingolia.com/en/grammar/cases' },
      { label: 'The German Project — Nominative & Accusative', url: 'https://www.thegermanproject.com/german-lessons/nominative-accusative' },
      { label: 'Learn German Easily — Accusative', url: 'https://learn-german-easily.com/accusative-case-in-german' },
    ],
  },
  {
    to: '/conjugation',
    icon: '🔧',
    title: 'Konjugation — Präsens (verbs)',
    blurb:
      'Conjugate verbs in the present tense: regular endings (-e, -st, -t, -en), the key irregulars sein & haben, and stem-changers (fahren → fährt).',
    resources: [
      { label: 'Lingolia — Present tense (Präsens)', url: 'https://deutsch.lingolia.com/en/grammar/tenses/present-tense' },
      { label: 'Verbformen — conjugation tables', url: 'https://www.verbformen.com/' },
      { label: 'The German Project — Verbs', url: 'https://www.thegermanproject.com/german-lessons/verbs' },
    ],
  },
  {
    to: '/sentences',
    icon: '🧩',
    title: 'Satzbau — word order',
    blurb:
      'How to order a German sentence: the verb is the second element, subject–verb–object, time-first inversion, and how to ask questions.',
    resources: [
      { label: 'Lingolia — Sentences (Satzbau)', url: 'https://deutsch.lingolia.com/en/grammar/sentences' },
      { label: 'Deutsche Welle — Grammar', url: 'https://learngerman.dw.com/en/grammar' },
      { label: 'The German Project — Questions', url: 'https://www.thegermanproject.com/german-lessons/questions' },
    ],
  },
]
