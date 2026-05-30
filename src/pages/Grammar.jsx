import { Link } from 'react-router-dom'
import { grammarTopics } from '../data/grammarTopics.js'

export default function Grammar() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">A1 Grammatik</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          The core grammar for German A1. Tap a topic to practise, and explore the
          linked resources to read more.
        </p>
      </header>

      <div className="space-y-4">
        {grammarTopics.map((t) => (
          <div
            key={t.to}
            className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
          >
            <Link to={t.to} className="group flex items-start justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  <span className="text-xl">{t.icon}</span> {t.title}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t.blurb}</p>
              </div>
              <span className="mt-1 shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white group-hover:bg-indigo-500">
                Practise →
              </span>
            </Link>

            <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                📚 Resources to check
              </p>
              <ul className="flex flex-wrap gap-2">
                {t.resources.map((r) => (
                  <li key={r.url}>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
                    >
                      {r.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500">
        External links open in a new tab. They are free third-party resources, not affiliated with Lernkarten.
      </p>
    </div>
  )
}
