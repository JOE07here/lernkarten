import { Link } from 'react-router-dom'
import { speak, ttsSupported } from '../speak.js'

const ARTICLE_COLOR = {
  der: 'text-blue-500 dark:text-blue-400',
  die: 'text-rose-500 dark:text-rose-400',
  das: 'text-emerald-500 dark:text-emerald-400',
}

function Word({ de }) {
  const m = /^(der|die|das)\s+(.+)/i.exec(de)
  if (!m) return <>{de}</>
  return (
    <>
      <span className={ARTICLE_COLOR[m[1].toLowerCase()]}>{m[1]}</span> {m[2]}
    </>
  )
}

// A picture-card grid for vocabulary that benefits from imagery (emoji).
// Tap a card to hear it. Optional `studyHref` links to the matching SRS deck.
export default function VisualSection({ title, subtitle, items, cols = 'sm:grid-cols-3', studyHref }) {
  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        {studyHref && (
          <Link
            to={studyHref}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Study as flashcards →
          </Link>
        )}
      </header>

      <div className={`grid grid-cols-2 gap-3 ${cols}`}>
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => speak(it.speak, 'de-DE')}
            className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center transition hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
          >
            <span className="text-5xl leading-none" aria-hidden>{it.emoji}</span>
            <span className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
              <Word de={it.de} />
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">{it.en}</span>
            {it.sub && (
              <span className="mt-1 text-xs text-slate-400 dark:text-slate-500">{it.sub}</span>
            )}
            {it.note && (
              <span className="mt-2 text-xs italic text-indigo-500 dark:text-indigo-300/80">💡 {it.note}</span>
            )}
            {ttsSupported && <span className="mt-2 text-xs text-slate-400">🔊 tap to hear</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
