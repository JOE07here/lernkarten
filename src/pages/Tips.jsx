// Evidence-based learning techniques, each tied to a feature of this app.
const tips = [
  {
    icon: '🔁',
    title: 'Spaced repetition',
    science:
      'Hermann Ebbinghaus’s “forgetting curve” shows memories fade fast — but reviewing just before you forget flattens the curve. Reviews spread over days beat massed study.',
    apply: 'Just study a deck each day — the app schedules every card (SM-2) for the moment you’re about to forget it.',
  },
  {
    icon: '🧠',
    title: 'Active recall',
    science:
      'Retrieving an answer from memory (the “testing effect”) builds far stronger memories than re-reading. The effort of recalling is what makes it stick.',
    apply: 'Always try to answer before flipping a card, and use the Bauen & Hören number games instead of just reading.',
  },
  {
    icon: '🔀',
    title: 'Interleaving',
    science:
      'Mixing different topics in one session (rather than “blocking” one at a time) improves long-term retention and your ability to tell similar items apart.',
    apply: 'Rotate between decks — nouns, verbs, numbers, days — in a session instead of finishing one completely.',
  },
  {
    icon: '🗣️',
    title: 'Say it out loud (dual coding)',
    science:
      'Pairing words with sound and images (“dual coding”) and speaking them aloud (the “production effect”) creates multiple memory traces for the same word.',
    apply: 'Tap 🔊 and repeat each word aloud. The Alphabet, Days, Months & Seasons pages pair every word with audio and a picture.',
  },
  {
    icon: '🧩',
    title: 'Chunking',
    science:
      'Working memory holds only a few items at once. Grouping information into meaningful “chunks” lets you hold and recall much more.',
    apply: 'Learn numbers in parts (sech + zehn), days grouped as a week, and months grouped by season.',
  },
  {
    icon: '🎨',
    title: 'Mnemonics & association',
    science:
      'Linking new information to vivid cues you already know (colours, stories, images) gives memory an easy “hook” to grab.',
    apply: 'Use the der/die/das colours, and hooks like Montag = Mond (moon), Donnerstag = Donner (thunder), Sonntag = Sonne (sun).',
  },
  {
    icon: '📆',
    title: 'Little and often',
    science:
      '“Distributed practice” — short, frequent sessions — beats one long cram for durable learning, and keeps motivation higher.',
    apply: 'Aim for ~10 focused minutes a day. Watch your streak and the progress bar climb.',
  },
  {
    icon: '😴',
    title: 'Sleep & breaks',
    science:
      'Sleep consolidates new memories, and short breaks let the brain replay what you just learned. Both measurably improve recall.',
    apply: 'Do a quick review before bed, and take a short break between study sessions.',
  },
  {
    icon: '💬',
    title: 'Learn in context',
    science:
      'Words are easier to remember and use when met in meaningful sentences slightly above your level (Krashen’s “comprehensible input”, i+1).',
    apply: 'Read each card’s example sentence and its translation — don’t just memorise the single word.',
  },
]

export default function Tips() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Lerntipps — how to learn effectively</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Research-backed techniques, and how to use each one right here in the app.
        </p>
      </header>

      <div className="space-y-3">
        {tips.map((t, i) => (
          <div
            key={t.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden>{t.icon}</span>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {i + 1}. {t.title}
              </h2>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t.science}</p>
            <p className="mt-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200">
              <b>In this app:</b> {t.apply}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
