import { useState } from 'react'
import { speak, ttsSupported } from '../speak.js'

// Worked examples: subject (nominative) + verb + object (accusative).
// `objArticle` shows the accusative form; for masculine it changes (der->den).
const examples = [
  {
    de: ['Der Mann', 'trinkt', 'den Kaffee'],
    roles: ['subject (nom.)', 'verb', 'object (acc.)'],
    en: 'The man drinks the coffee.',
    note: 'Masculine object: der Kaffee → den Kaffee.',
    changed: true,
  },
  {
    de: ['Die Frau', 'liest', 'das Buch'],
    roles: ['subject (nom.)', 'verb', 'object (acc.)'],
    en: 'The woman reads the book.',
    note: 'Neuter object: das stays das.',
    changed: false,
  },
  {
    de: ['Das Kind', 'isst', 'einen Apfel'],
    roles: ['subject (nom.)', 'verb', 'object (acc.)'],
    en: 'The child eats an apple.',
    note: 'Masculine indefinite: ein Apfel → einen Apfel.',
    changed: true,
  },
  {
    de: ['Ich', 'habe', 'eine Katze'],
    roles: ['subject (nom.)', 'verb', 'object (acc.)'],
    en: 'I have a cat.',
    note: 'Feminine object: eine stays eine.',
    changed: false,
  },
]

const sentence = (parts) => parts.join(' ') + '.'

export default function Cases() {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Nominativ &amp; Akkusativ</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          The two cases you need for A1 — and the one article that changes.
        </p>
      </header>

      {/* The core idea */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-500/30 dark:bg-blue-500/10">
          <h2 className="font-semibold text-blue-700 dark:text-blue-300">1 · Nominativ = the subject</h2>
          <p className="mt-1 text-sm text-blue-900/80 dark:text-blue-100/80">
            The person or thing <b>doing</b> the action. Ask: <i>Wer?/Was?</i> (Who?/What?)
          </p>
          <p className="mt-2 text-sm font-medium text-blue-900 dark:text-blue-100">
            <u>Der Mann</u> trinkt Kaffee.
          </p>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/30 dark:bg-rose-500/10">
          <h2 className="font-semibold text-rose-700 dark:text-rose-300">2 · Akkusativ = the object</h2>
          <p className="mt-1 text-sm text-rose-900/80 dark:text-rose-100/80">
            The person or thing <b>receiving</b> the action. Ask: <i>Wen?/Was?</i> (Whom?/What?)
          </p>
          <p className="mt-2 text-sm font-medium text-rose-900 dark:text-rose-100">
            Der Mann trinkt <u>den Kaffee</u>.
          </p>
        </div>
      </div>

      {/* The key rule */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
        <h2 className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">💡 The one rule to remember</h2>
        <p className="text-sm text-amber-900/90 dark:text-amber-100/80">
          In the accusative, <b>only the masculine article changes</b>. Feminine, neuter
          and plural stay exactly the same.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-amber-700/70 dark:text-amber-300/60">
                <th className="px-3 py-1.5 font-medium"></th>
                <th className="px-3 py-1.5 font-medium">m</th>
                <th className="px-3 py-1.5 font-medium">f</th>
                <th className="px-3 py-1.5 font-medium">n</th>
                <th className="px-3 py-1.5 font-medium">pl</th>
              </tr>
            </thead>
            <tbody className="text-amber-900 dark:text-amber-100">
              <tr>
                <td className="px-3 py-1.5 font-medium text-amber-700/80 dark:text-amber-300/70">Nominative</td>
                <td className="px-3 py-1.5">der / ein</td>
                <td className="px-3 py-1.5">die / eine</td>
                <td className="px-3 py-1.5">das / ein</td>
                <td className="px-3 py-1.5">die</td>
              </tr>
              <tr className="border-t border-amber-200/60 dark:border-amber-500/20">
                <td className="px-3 py-1.5 font-medium text-amber-700/80 dark:text-amber-300/70">Accusative</td>
                <td className="px-3 py-1.5 font-bold text-rose-600 dark:text-rose-400">den / einen</td>
                <td className="px-3 py-1.5">die / eine</td>
                <td className="px-3 py-1.5">das / ein</td>
                <td className="px-3 py-1.5">die</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs italic text-amber-700/80 dark:text-amber-200/70">
          Memory hook: only “der → den” and “ein → einen” gain an <b>-n</b>.
        </p>
      </div>

      {/* Worked examples */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Worked examples</h2>
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => ttsSupported && speak(sentence(ex.de), 'de-DE')}
            className="block w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500"
          >
            <div className="flex flex-wrap items-end gap-x-2 gap-y-1">
              {ex.de.map((part, j) => (
                <span key={j} className="flex flex-col">
                  <span
                    className={`text-lg font-semibold ${
                      j === 0
                        ? 'text-blue-600 dark:text-blue-400'
                        : j === 2
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {part}
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                    {ex.roles[j]}
                  </span>
                </span>
              ))}
              {ttsSupported && <span className="ml-auto text-slate-400">🔊</span>}
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{ex.en}</p>
            <p
              className={`mt-1 text-xs ${
                ex.changed
                  ? 'font-medium text-rose-600 dark:text-rose-400'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {ex.changed ? '⚠️ ' : '✓ '}
              {ex.note}
            </p>
          </button>
        ))}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          Tap a sentence to hear it. Then try the Artikel trainer in Accusative mode!
        </p>
      </div>
    </div>
  )
}
