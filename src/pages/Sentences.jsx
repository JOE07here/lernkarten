import { useState } from 'react'
import { sentences, wordOrderRules } from '../data/grammar.js'
import { speak, ttsSupported } from '../speak.js'

const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const sentenceText = (s) => s.tokens.join(' ') + (s.q ? '?' : '.')

function makeRound(prev) {
  let s = sentences[Math.floor(Math.random() * sentences.length)]
  if (prev && sentences.length > 1) while (s.id === prev) s = sentences[Math.floor(Math.random() * sentences.length)]
  const tiles = shuffle(s.tokens.map((text, i) => ({ id: `${i}-${text}`, text, used: false })))
  return { s, tiles }
}

export default function Sentences() {
  const [{ s, tiles }, setRound] = useState(() => makeRound(null))
  const [assembled, setAssembled] = useState([])
  const [status, setStatus] = useState('playing') // playing | correct | wrong
  const [shownTiles, setShownTiles] = useState(tiles)
  const [score, setScore] = useState(0)

  function reset(next) {
    setRound(next)
    setShownTiles(next.tiles)
    setAssembled([])
    setStatus('playing')
  }
  function tap(tile) {
    if (tile.used || status === 'correct') return
    setShownTiles((ts) => ts.map((t) => (t.id === tile.id ? { ...t, used: true } : t)))
    setAssembled((a) => [...a, tile])
    setStatus('playing')
  }
  function undo() {
    if (status === 'correct') return
    const last = assembled[assembled.length - 1]
    if (!last) return
    setAssembled((a) => a.slice(0, -1))
    setShownTiles((ts) => ts.map((t) => (t.id === last.id ? { ...t, used: false } : t)))
    setStatus('playing')
  }
  function check() {
    const guess = assembled.map((t) => t.text).join(' ')
    if (guess === s.tokens.join(' ')) {
      setStatus('correct')
      setScore((n) => n + 1)
      if (ttsSupported) speak(sentenceText(s), 'de-DE')
    } else {
      setStatus('wrong')
    }
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Satzbau — word order</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Tap the words to build the sentence in the right order.
        </p>
      </header>

      {/* Builder */}
      <div className="space-y-4">
        <div className="text-sm text-slate-500 dark:text-slate-400">Solved: <b className="text-slate-900 dark:text-white">{score}</b></div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Build: “{s.en}”</p>
          <p className="mt-1 text-xs text-indigo-500 dark:text-indigo-300">{s.type}</p>

          <div className="mt-3 min-h-12 rounded-xl border border-dashed border-slate-300 p-3 dark:border-slate-700">
            {assembled.length === 0 ? (
              <span className="text-sm text-slate-400 dark:text-slate-500">Tap the words below…</span>
            ) : (
              <span className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">
                {assembled.map((t) => t.text).join(' ')}
                {s.q ? '?' : '.'}
              </span>
            )}
          </div>

          {status === 'correct' && (
            <p className="mt-3 font-semibold text-emerald-600 dark:text-emerald-400">✓ Richtig! {sentenceText(s)}</p>
          )}
          {status === 'wrong' && (
            <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">Not quite — undo and try another order.</p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {shownTiles.map((tile) => (
            <button
              key={tile.id}
              onClick={() => tap(tile)}
              disabled={tile.used}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:border-indigo-400 hover:bg-indigo-50 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
            >
              {tile.text}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button onClick={undo} className="rounded-xl border border-slate-300 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">↶ Undo</button>
          {status === 'correct' ? (
            <button onClick={() => reset(makeRound(s.id))} className="rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-500">Next →</button>
          ) : (
            <button onClick={check} className="rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-500">Check</button>
          )}
          <button onClick={() => reset(makeRound(s.id))} className="rounded-xl border border-slate-300 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Skip ⟳</button>
        </div>
      </div>

      {/* Rules */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
        <h2 className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">💡 The rules</h2>
        <ul className="space-y-2">
          {wordOrderRules.map((r) => (
            <li key={r.rule} className="text-sm text-amber-900/90 dark:text-amber-100/80">
              {r.rule}
              <span className="mt-0.5 block font-medium italic text-amber-800 dark:text-amber-200">“{r.ex}”</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
